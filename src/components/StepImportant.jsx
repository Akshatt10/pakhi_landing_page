import { useState } from 'react';

const OPTIONS = [
  'Finding a travel buddy',
  'Making genuine connections',
  'Just meeting new people',
  'Finding like-minded women',
  'Building long-term friendships',
  'Exploring collaborations',
  'Growing personally & emotionally',
  'Having a safe space to open up',
  'Trying new experiences regularly',
  'Being part of something meaningful',
];

export default function StepImportant({ onNext }) {
  const [selected, setSelected] = useState([]);

  const toggle = (opt) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );
  };

  return (
    <div className="step-container animate-step-enter">
      <div className="step-content">
        <div className="card text-center">
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '25%' }} /></div>
          <div className="eyebrow">Your priorities</div>
          <h1 className="heading-main text-center">
            What's <em className="text-pakhi-purple italic font-normal">most important</em> to you?
          </h1>
          <p className="text-pakhi-muted text-[15px] mb-6">Tap all that feel like you.</p>

          <div className="flex flex-wrap justify-center gap-2.5 mb-7">
            {OPTIONS.map((opt, i) => (
              <button
                key={opt}
                onClick={() => toggle(opt)}
                className={`chip opacity-0 animate-chip-pop ${selected.includes(opt) ? 'selected' : ''}`}
                style={{ animationDelay: `${0.1 + i * 0.04}s` }}
              >
                {selected.includes(opt) && <span className="text-xs">✓</span>}
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={() => selected.length > 0 && onNext({ importantToYou: selected })}
            disabled={selected.length === 0}
            className="btn-primary"
          >
            Continue →
          </button>
          <button className="btn-ghost" onClick={() => onNext({ importantToYou: [] })}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
