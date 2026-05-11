import { useState } from 'react';

export default function StepIntro({ onNext }) {
  const [name, setName] = useState('');

  return (
    <div className="step-container animate-step-enter">
      <div className="step-content">
        <div className="card text-center">
          <div className="eyebrow">Welcome to the Circle</div>
          <h1 className="heading-main text-center">
            Hey, what do we <em className="text-pakhi-purple italic font-normal">call you?</em>
          </h1>
          <p className="text-pakhi-muted text-[15px] leading-relaxed mb-7">
            No long forms. Just a quick hello and we'll make this personal for you.
          </p>

          <div className="pill-input-wrap mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your first name..."
              maxLength={30}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && name.trim() && onNext({ name: name.trim() })}
            />
            <button
              onClick={() => name.trim() && onNext({ name: name.trim() })}
              disabled={!name.trim()}
            >
              Continue →
            </button>
          </div>

          <p className="text-pakhi-muted/70 text-xs">
            No spam, no weird emails. Pinky promise. 🌸
          </p>
        </div>
      </div>
    </div>
  );
}
