import { useState } from 'react';

export default function ScreenName({ onNext }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const canSubmit = firstName.trim().length > 0;

  const handleSubmit = () => {
    if (canSubmit) {
      onNext({ firstName: firstName.trim(), lastName: lastName.trim() });
    }
  };

  return (
    <div className="step-container animate-step-enter">
      <div className="step-content">
        <div className="card text-center">
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '15%' }} /></div>
          <div className="eyebrow">Getting to know you</div>
          <h1 className="heading-main text-center">
            What should we <em className="text-pakhi-purple italic font-normal">call you?</em>
          </h1>
          <p className="text-pakhi-muted text-[15px] leading-relaxed mb-7">
            So we can make this personal for you.
          </p>

          <div className="space-y-4 mb-8">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="input-field"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && canSubmit && handleSubmit()}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name (Optional)"
              className="input-field"
              onKeyDown={(e) => e.key === 'Enter' && canSubmit && handleSubmit()}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="btn-primary"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
