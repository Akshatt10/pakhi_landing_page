import { useState } from 'react';

const EXPERIENCE_OPTIONS = [
  'Pretty comfortable overall',
  'Some discomfort, but I manage',
  'It slows me down significantly',
  "It's painful, I mostly rest",
];

const AWARENESS_OPTIONS = [
  'I track it closely',
  "I'm learning",
  "I haven't really started yet",
];

export default function ScreenCycle({ onNext }) {
  const [experience, setExperience] = useState('');
  const [awareness, setAwareness] = useState('');

  const canSubmit = experience && awareness;

  return (
    <div className="step-container animate-step-enter py-12">
      <div className="step-content">
        <div className="card text-center max-w-2xl mx-auto">
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '70%' }} /></div>
          
          <div className="eyebrow mb-6">Your Body, Your Cycle</div>

          {/* Question 1 */}
          <div className="mb-10">
            <h2 className="heading-main text-center text-2xl sm:text-3xl">
              How would you describe your <em className="text-pakhi-purple italic font-normal">period experience?</em>
            </h2>
            <div className="space-y-2 mt-5">
              {EXPERIENCE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setExperience(opt)}
                  className={`option-card ${experience === opt ? 'selected' : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="mb-8">
            <h2 className="heading-main text-center text-2xl sm:text-3xl">
              How aware are you of your <em className="text-pakhi-purple italic font-normal">cycle?</em>
            </h2>
            <div className="space-y-2 mt-5">
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

          <button
            onClick={() => canSubmit && onNext({ periodExperience: experience, cycleAwareness: awareness })}
            disabled={!canSubmit}
            className="btn-primary mt-4"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
