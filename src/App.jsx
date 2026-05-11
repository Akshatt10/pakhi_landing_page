import { useState, useCallback, useRef } from 'react';
import StepIntro from './components/StepIntro';
import StepWelcome from './components/StepWelcome';
import StepAdjectives from './components/StepAdjectives';
import StepImportant from './components/StepImportant';
import Affirmation from './components/Affirmation';
import StepCommunity from './components/StepCommunity';
import StepEvents from './components/StepEvents';
import StepAge from './components/StepAge';
import StepPeriodCycle from './components/StepPeriodCycle';
import StepLifestyle from './components/StepLifestyle';
import StepFinal from './components/StepFinal';
import StepSuccess from './components/StepSuccess';

const TOTAL_STEPS = 13;

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

  // Map steps to dot groups (4 dots like in the reference)
  const getDotState = (dotIndex) => {
    // Map 13 steps to 4 dots: 0-2=dot1, 3-5=dot2, 6-8=dot3, 9-12=dot4
    const stepGroups = [3, 6, 9, 13];
    if (step >= stepGroups[dotIndex]) return 'done';
    if (step >= (dotIndex === 0 ? 0 : stepGroups[dotIndex - 1])) return 'active';
    return '';
  };

  const renderStep = () => {
    switch (step) {
      case 0: return <StepIntro onNext={advance} />;
      case 1: return <StepWelcome name={responses.name} onNext={advance} />;
      case 2: return <StepAdjectives onNext={advance} />;
      case 3: return <StepImportant onNext={advance} />;
      case 4: return <Affirmation text="That makes sense." onDone={() => goToStep(5)} />;
      case 5: return <StepCommunity onNext={advance} />;
      case 6: return <Affirmation text="You're not joining a community, you're returning to one." onDone={() => goToStep(7)} duration={3000} />;
      case 7: return <StepEvents onNext={advance} />;
      case 8: return <StepAge onNext={advance} />;
      case 9: return <StepPeriodCycle onNext={advance} />;
      case 10: return <StepLifestyle onNext={advance} />;
      case 11: return <Affirmation text="We send a warm hug your way 🤗" onDone={() => goToStep(12)} />;
      case 12: return <StepFinal name={responses.name} onSubmit={handleFinalSubmit} submitting={submitting} serverError={serverError} />;
      case 13: return <StepSuccess name={responses.name} />;
      default: return null;
    }
  };

  const isSuccessScreen = step === TOTAL_STEPS;

  return (
    <div className={`min-h-screen relative overflow-hidden font-body ${isSuccessScreen ? '' : 'bg-pakhi-cream'}`}>
      {/* Ambient floating blobs — only on light screens */}
      {!isSuccessScreen && (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[100px] -left-[100px] w-[500px] h-[500px] rounded-full opacity-[0.22] blur-[80px] animate-drift-1"
               style={{ background: '#E8547A' }} />
          <div className="absolute -bottom-[80px] -right-[80px] w-[400px] h-[400px] rounded-full opacity-[0.22] blur-[80px] animate-drift-2"
               style={{ background: '#7C4DBA' }} />
          <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full opacity-[0.18] blur-[80px] animate-drift-3"
               style={{ background: '#F7A8BE' }} />
        </div>
      )}

      {/* Top nav: logo + dot indicators */}
      {!isSuccessScreen && (
        <nav className="relative z-20 px-6 sm:px-10 py-5 flex items-center justify-between max-w-4xl mx-auto">
          <div onClick={handleLogoClick} className="cursor-pointer select-none">
            <img src="/logo.png" alt="Pakhi" className="h-10 w-auto pointer-events-none" />
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
