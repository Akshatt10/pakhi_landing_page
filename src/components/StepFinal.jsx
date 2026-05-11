import { useState } from 'react';

export default function StepFinal({ name, onSubmit, submitting, serverError }) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!phone.trim()) e.phone = 'Phone is required';
    else if (!/^[\+]?[\d\s\-]{8,15}$/.test(phone.replace(/\s/g, ''))) e.phone = 'Invalid number';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email';
    return e;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit({ phone: phone.trim(), email: email.trim().toLowerCase() });
  };

  return (
    <div className="step-container animate-step-enter">
      <div className="step-content">
        <div className="card text-center">
          <div className="progress-bar"><div className="progress-bar-fill" style={{ width: '95%' }} /></div>
          <div className="eyebrow">Almost done</div>
          <h1 className="heading-main text-center">
            You're <em className="text-pakhi-purple italic font-normal">this close</em> to our inner circle!
          </h1>
          <p className="text-pakhi-muted text-[15px] italic mb-1">
            "This isn't for everyone. And that's what makes it special."
          </p>
          <p className="text-pakhi-muted text-[14px] mb-7">
            Allow us to reach out to you, {name}! <span className="text-xs text-pakhi-muted/60">(promise, we don't spam)</span>
          </p>

          {serverError && (
            <div className="mb-5 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm animate-fade-in">
              {serverError}
            </div>
          )}

          <div className="space-y-3 mb-6">
            <div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: '' })); }}
                placeholder="Phone Number (+91 XXXXX XXXXX)"
                className={`input-field ${errors.phone ? 'error' : ''}`}
                autoComplete="tel"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1 ml-2">{errors.phone}</p>}
            </div>

            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
                placeholder="Email Address"
                className={`input-field ${errors.email ? 'error' : ''}`}
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1 ml-2">{errors.email}</p>}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-primary"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="60" strokeLinecap="round" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Join the Circle 🌸'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
