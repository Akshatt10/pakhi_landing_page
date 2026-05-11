import { useState } from 'react';

const OPTIONS = [
  { emoji: '✈️', text: 'Travel circles & spontaneous getaways' },
  { emoji: '🧠', text: 'Workshops that change how you think' },
  { emoji: '🌸', text: 'Cycle awareness & body literacy tools' },
  { emoji: '🏃‍♀️', text: 'Fitness + running groups' },
  { emoji: '🎵', text: 'Intimate musical nights' },
  { emoji: '🤝', text: 'Real networking (not LinkedIn energy)' },
  { emoji: '☕', text: 'Weekend slow experiences' },
  { emoji: '💬', text: 'Safe conversations without filters' },
  { emoji: '🎨', text: 'Creative collaboration circles' },
  { emoji: '🎁', text: 'Early access to Pakhi drops' },
  { emoji: '📚', text: 'Skill-building spaces' },
  { emoji: '🏡', text: 'Support systems that feel like home' },
];

export default function StepEvents({ onNext }) {
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
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '55%' }} /></div>
          <div className="eyebrow">Your lifestyle</div>
          <h1 className="heading-main text-center">
            What <em className="text-pakhi-purple italic font-normal">excites you</em> the most?
          </h1>
          <p className="text-pakhi-muted text-[15px] mb-6">We'll personalise your experience around this.</p>

          <div className="flex flex-wrap justify-center gap-2.5 mb-7">
            {OPTIONS.map((opt, i) => (
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
            onClick={() => selected.length > 0 && onNext({ excitingEvents: selected })}
            disabled={selected.length === 0}
            className="btn-primary"
          >
            Continue →
          </button>
          <button className="btn-ghost" onClick={() => onNext({ excitingEvents: [] })}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
