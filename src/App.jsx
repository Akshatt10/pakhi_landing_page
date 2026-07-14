import { useState, useCallback, useRef } from 'react';
import ScreenHook from './components/ScreenHook';
import ScreenName from './components/ScreenName';
import ScreenWhoYouAre from './components/ScreenWhoYouAre';
import ScreenCycle from './components/ScreenCycle';
import Affirmation from './components/Affirmation';
import StepFinal from './components/StepFinal';
import StepSuccess from './components/StepSuccess';

const TOTAL_STEPS = 7;

export default function App() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [transitioning, setTransitioning] = useState(false);

  const clickTimeout = useRef(null);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (clickTimeout.current !== null) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      handleAdminExport();
    } else {
      clickTimeout.current = setTimeout(() => {
        window.open('https://mypakhi.com', '_blank', 'noopener,noreferrer');
        clickTimeout.current = null;
      }, 300);
    }
  };

  const handleAdminExport = async () => {
    const code = window.prompt("Enter Admin Access Code to export database:");
    if (!code) return;
    try {
      const res = await fetch('/api/export', { headers: { 'x-admin-key': code } });
      if (!res.ok) {
        const data = await res.json();
        alert(`Export failed: ${data.error}`);
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pakhi-community-signups.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Error generating export.");
    }
  };

  const goToStep = useCallback((nextStep) => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(nextStep);
      setTransitioning(false);
      window.scrollTo(0, 0);
    }, 200);
  }, []);

  const advance = useCallback((data = {}) => {
    setResponses((prev) => ({ ...prev, ...data }));
    goToStep(step + 1);
  }, [step, goToStep]);

  const handleFinalSubmit = async (contactData) => {
    const allData = { ...responses, ...contactData };
    setSubmitting(true);
    setServerError('');
    try {
      const res = await fetch('/api/signups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allData),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || 'Something went wrong');
        setSubmitting(false);
        return;
      }
      setResponses(allData);
      goToStep(TOTAL_STEPS);
    } catch {
      setServerError('Could not connect to server. Please try again.');
    }
    setSubmitting(false);
  };

  const progressPercent = Math.min((step / (TOTAL_STEPS - 1)) * 100, 100);

  const getDotState = (dotIndex) => {
    // Map 7 steps to 4 dots
    const stepGroups = [2, 4, 6, 7];
    if (step >= stepGroups[dotIndex]) return 'done';
    if (step >= (dotIndex === 0 ? 0 : stepGroups[dotIndex - 1])) return 'active';
    return '';
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <ScreenHook onNext={advance} />;
      case 1: return <ScreenName onNext={advance} />;
      case 2: return <Affirmation text={`Hi, ${responses.firstName || ''}. We've been waiting for you.`} onDone={() => goToStep(3)} />;
      case 3: return <ScreenWhoYouAre onNext={advance} />;
      case 4: return <ScreenCycle onNext={advance} />;
      case 5: return <Affirmation text="We've got you covered." onDone={() => goToStep(6)} />;
      case 6: return <StepFinal name={responses.firstName} onSubmit={handleFinalSubmit} submitting={submitting} serverError={serverError} />;
      case 7: return <StepSuccess name={responses.firstName} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-body bg-pakhi-cream">
      {/* Ambient floating blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[100px] -left-[100px] w-[500px] h-[500px] rounded-full opacity-[0.22] blur-[80px] animate-drift-1"
               style={{ background: '#E8547A' }} />
          <div className="absolute -bottom-[80px] -right-[80px] w-[400px] h-[400px] rounded-full opacity-[0.22] blur-[80px] animate-drift-2"
               style={{ background: '#7C4DBA' }} />
          <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full opacity-[0.18] blur-[80px] animate-drift-3"
               style={{ background: '#F7A8BE' }} />
        </div>

      {/* Top nav: logo + dot indicators */}
      {step < TOTAL_STEPS && (
        <nav className="relative z-20 px-6 sm:px-10 py-5 flex items-center justify-between max-w-4xl mx-auto">
          <div onClick={handleLogoClick} className="cursor-pointer select-none text-2xl">
            💖
          </div>

          {step > 0 && step < TOTAL_STEPS && (
            <div className="flex gap-2 items-center">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`step-dot ${getDotState(i)}`} />
              ))}
            </div>
          )}
        </nav>
      )}

      {/* Step content */}
      <div className={`relative z-10 transition-opacity duration-200 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        {renderStep()}
      </div>

      {/* Footer — only on first screen */}
      {step === 0 && (
        <footer className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 py-6 mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-pakhi-pink/10">
            <p className="text-[10px] text-pakhi-muted/60">
              © {new Date().getFullYear()} MooZ Care LLP · A MooZCare Initiative
            </p>
            <div className="flex items-center gap-5">
              {[
                { label: 'Instagram', url: 'https://www.instagram.com/pakhicares/' },
                { label: 'Facebook', url: 'https://www.facebook.com/pakhicares' },
                { label: 'YouTube', url: 'https://www.youtube.com/@pakhicares' },
              ].map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                   className="text-xs transition-colors text-pakhi-muted/50 hover:text-pakhi-pink">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
