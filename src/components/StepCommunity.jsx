import { useState } from 'react';

const OPTIONS = [
  'Yes, a few',
  'Yes, multiple',
  "No, it's my first time",
];

export default function StepCommunity({ onNext }) {
  const [selected, setSelected] = useState('');

  return (
    <div className="step-container animate-step-enter">
      <div className="step-content">
        <div className="card text-center">
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '40%' }} /></div>
          <div className="eyebrow">Community</div>
          <h1 className="heading-main text-center">
            Been part of any <em className="text-pakhi-purple italic font-normal">inner circles?</em>
          </h1>
          <p className="text-pakhi-muted text-[15px] mb-7">Insiders, communities, groups — anything similar.</p>

          <div className="space-y-2.5 mb-7">
            {OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`option-card ${selected === opt ? 'selected' : ''}`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={() => selected && onNext({ communityHistory: selected })}
            disabled={!selected}
            className="btn-primary"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
