import { useState } from 'react';

const BRINGS_OPTIONS = [
  'To feel more connected',
  'To understand my body better',
  'To find my people',
  'It just felt right',
];

const AGE_OPTIONS = [
  'Under 18',
  '18–22',
  '23–28',
  '29+',
];

const MATTERS_OPTIONS = [
  'Finding like-minded women',
  'Making genuine connections',
  'Safe space to open up',
  'Growing personally & emotionally',
  'Trying new experiences',
  'Being part of something meaningful',
  'Exploring collaborations',
  'Travel & spontaneous getaways',
];

export default function ScreenWhoYouAre({ onNext }) {
  const [bringsYou, setBringsYou] = useState('');
  const [age, setAge] = useState('');
  const [matters, setMatters] = useState([]);

  const toggleMatter = (opt) => {
    setMatters((prev) => {
      if (prev.includes(opt)) return prev.filter((x) => x !== opt);
      return [...prev, opt];
    });
  };

  const canSubmit = bringsYou && age && matters.length > 0;

  return (
    <div className="step-container animate-step-enter py-12">
      <div className="step-content">
        <div className="card text-center max-w-2xl mx-auto">
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '40%' }} /></div>
          
          {/* Question 1 */}
          <div className="mb-10">
            <h2 className="heading-main text-center text-2xl sm:text-3xl">
              What <em className="text-pakhi-purple italic font-normal">brings you here?</em>
            </h2>
            <div className="space-y-2 mt-5">
              {BRINGS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setBringsYou(opt)}
                  className={`option-card ${bringsYou === opt ? 'selected' : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="mb-10">
            <h2 className="heading-main text-center text-2xl sm:text-3xl">
              Which <em className="text-pakhi-purple italic font-normal">age group</em> do you fall into?
            </h2>
            <div className="grid grid-cols-2 gap-3 mt-5">
              {AGE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAge(opt)}
                  className={`option-card text-center !py-4 font-semibold ${age === opt ? 'selected' : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="mb-10">
            <h2 className="heading-main text-center text-2xl sm:text-3xl">
              What <em className="text-pakhi-purple italic font-normal">matters most</em> to you right now?
            </h2>
            <p className="text-pakhi-muted text-sm mb-5">Pick all that resonate with you</p>
            <div className="flex flex-wrap justify-center gap-2">
              {MATTERS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => toggleMatter(opt)}
                  className={`chip ${matters.includes(opt) ? 'selected' : ''}`}
                >
                  {matters.includes(opt) && <span className="text-xs">✓</span>}
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => canSubmit && onNext({ whatBringsYou: bringsYou, ageGroup: age, mattersMost: matters })}
            disabled={!canSubmit}
            className="btn-primary mt-4"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
