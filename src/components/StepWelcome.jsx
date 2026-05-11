import { useState } from 'react';

const OPTIONS = [
  'To feel more connected',
  'To understand my body better',
  'To find my people',
  'Just curious, but it feels right',
];

export default function StepWelcome({ name, onNext }) {
  const [selected, setSelected] = useState('');

  return (
    <div className="step-container animate-step-enter">
      <div className="step-content">
        <div className="card">
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '8%' }} /></div>
          <div className="eyebrow">Getting to know you</div>
          <h1 className="heading-main text-center">
            Hi {name} 💛 <br />
            <em className="text-pakhi-purple italic font-normal">What brings you here?</em>
          </h1>
          <p className="text-pakhi-muted text-[15px] mb-7">We're glad you're here. Pick what resonates.</p>

          <div className="space-y-2.5 mb-7">
            {OPTIONS.map((opt, i) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`option-card opacity-0 animate-slide-up ${selected === opt ? 'selected' : ''}`}
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={() => selected && onNext({ whatBringsYou: selected })}
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
