import { useEffect } from 'react';

export default function Affirmation({ text, onDone, duration = 2500 }) {
  useEffect(() => {
    const timer = setTimeout(onDone, duration);
    return () => clearTimeout(timer);
  }, [onDone, duration]);

  return (
    <div className="step-container">
      <div className="step-content justify-center">
        <div className="text-center max-w-lg mx-auto">
          <p className="affirmation-text animate-affirmation">
            "{text}"
          </p>
        </div>
      </div>
    </div>
  );
}
