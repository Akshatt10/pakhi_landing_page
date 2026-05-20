import React from 'react';

export default function ScreenHook({ onNext }) {
  return (
    <div className="step-container animate-step-enter">
      <div className="step-content">
        <div className="card text-center">
          <div className="eyebrow">Welcome</div>
          <h1 className="heading-main text-center">
            Hey, you <em className="text-pakhi-purple italic font-normal">made it here.</em>
          </h1>
          <p className="text-pakhi-muted text-[16px] leading-relaxed mb-8">
            That already says something about you.
          </p>

          <button
            onClick={() => onNext({})}
            className="btn-primary"
          >
            Let's begin →
          </button>
        </div>
      </div>
    </div>
  );
}
