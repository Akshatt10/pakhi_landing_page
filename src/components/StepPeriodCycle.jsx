import { useState } from 'react';

const CYCLE_OPTIONS = [
  { emoji: '📅', text: 'Pretty regular' },
  { emoji: '🌀', text: 'All over the place' },
  { emoji: '😬', text: 'Painful cramps' },
  { emoji: '🌊', text: 'Heavy flow' },
  { emoji: '🍃', text: 'Light & easy' },
  { emoji: '😴', text: 'Super fatigued' },
  { emoji: '🧠', text: 'Mood swings' },
  { emoji: '🤷‍♀️', text: 'Still figuring it out' },
];

export default function StepPeriodCycle({ onNext }) {
  const [selected, setSelected] = useState([]);

  const toggle = (text) => {
    setSelected((prev) =>
      prev.includes(text) ? prev.filter((x) => x !== text) : [...prev, text]
    );
  };

  return (
    <div className="step-container animate-step-enter">
      <div className="step-content">
        <div className="card text-center">
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '75%' }} /></div>
          <div className="eyebrow">Your Cycle</div>
          <h1 className="heading-main text-center">
            How would you describe your <em className="text-pakhi-purple italic font-normal">cycle?</em>
          </h1>
          <p className="text-pakhi-muted text-[15px] mb-6">Tap all that feel like you. No right answer.</p>

          <div className="flex flex-wrap justify-center gap-2.5 mb-7">
            {CYCLE_OPTIONS.map((opt, i) => (
              <button
                key={opt.text}
                onClick={() => toggle(opt.text)}
                className={`chip opacity-0 animate-chip-pop ${selected.includes(opt.text) ? 'selected' : ''}`}
                style={{ animationDelay: `${0.1 + i * 0.04}s` }}
              >
                <span className="emoji">{opt.emoji}</span>
                {opt.text}
              </button>
            ))}
          </div>

          <button
            onClick={() => selected.length > 0 && onNext({ periodCycle: selected })}
            disabled={selected.length === 0}
            className="btn-primary"
          >
            Next →
          </button>
          <button className="btn-ghost" onClick={() => onNext({ periodCycle: [] })}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
