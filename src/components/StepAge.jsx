import { useState } from 'react';

const AGE_OPTIONS = ['16–25', '26–35', '36–45', '46+'];

export default function StepAge({ onNext }) {
  const [selected, setSelected] = useState('');

  return (
    <div className="step-container animate-step-enter">
      <div className="step-content">
        <div className="card text-center">
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '65%' }} /></div>
          <div className="eyebrow">A few quick ones</div>
          <h1 className="heading-main text-center">
            Which age group do you <em className="text-pakhi-purple italic font-normal">fall into?</em>
          </h1>
          <p className="text-pakhi-muted text-[15px] mb-7">So we can tailor what we offer you.</p>

          <div className="grid grid-cols-2 gap-3 mb-7">
            {AGE_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelected(opt)}
                className={`option-card text-center !py-5 text-base font-heading font-semibold ${selected === opt ? 'selected' : ''}`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={() => selected && onNext({ ageGroup: selected })}
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
