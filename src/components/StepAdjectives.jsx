import { useState } from 'react';

export default function StepAdjectives({ onNext }) {
  const [adjectives, setAdjectives] = useState('');

  return (
    <div className="step-container animate-step-enter">
      <div className="step-content">
        <div className="card text-center">
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '16%' }} /></div>
          <div className="eyebrow">Getting to know you</div>
          <h1 className="heading-main text-center">
            Describe yourself in <em className="text-pakhi-purple italic font-normal">5 adjectives</em>
          </h1>
          <p className="text-pakhi-muted text-[15px] mb-7">Separate them with commas. There's no wrong answer.</p>

          <textarea
            value={adjectives}
            onChange={(e) => setAdjectives(e.target.value)}
            placeholder="e.g. Bold, Creative, Kind, Curious, Resilient"
            rows={3}
            className="input-field text-center resize-none mb-6"
            autoFocus
          />
          <button
            onClick={() => adjectives.trim() && onNext({ adjectives: adjectives.trim() })}
            disabled={!adjectives.trim()}
            className="btn-primary"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
