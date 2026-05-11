import { useState } from 'react';

const AWARENESS_OPTIONS = [
  'I track it closely',
  "I'm learning",
  "I don't really know much yet",
];

const LIFESTYLE_OPTIONS = [
  'Very active',
  'Moderately active',
  'Low activity',
  'Trying to get there',
];

export default function StepLifestyle({ onNext }) {
  const [awareness, setAwareness] = useState('');
  const [lifestyle, setLifestyle] = useState('');

  return (
    <div className="step-container animate-step-enter">
      <div className="step-content">
        <div className="card">
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '85%' }} /></div>

          {/* Cycle awareness */}
          <div className="text-center mb-10">
            <div className="eyebrow">Almost done</div>
            <h2 className="heading-main text-center">
              How would you describe your <em className="text-pakhi-purple italic font-normal">cycle awareness?</em>
            </h2>
            <div className="space-y-2.5">
              {AWARENESS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAwareness(opt)}
                  className={`option-card ${awareness === opt ? 'selected' : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Lifestyle */}
          <div className="text-center">
            <h2 className="heading-main text-center mb-5">
              What's your current <em className="text-pakhi-purple italic font-normal">lifestyle</em> like?
            </h2>
            <div className="space-y-2.5">
              {LIFESTYLE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setLifestyle(opt)}
                  className={`option-card ${lifestyle === opt ? 'selected' : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => awareness && lifestyle && onNext({ cycleAwareness: awareness, lifestyle })}
            disabled={!awareness || !lifestyle}
            className="btn-primary mt-8"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
