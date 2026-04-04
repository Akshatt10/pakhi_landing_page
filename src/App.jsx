import { useState, useEffect } from 'react';

export default function App() {
  const [form, setForm] = useState({ name: '', age: '', sex: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [signupCount, setSignupCount] = useState(0);
  const [serverError, setServerError] = useState('');

  // Fetch current signup count on load
  useEffect(() => {
    fetch('/api/signups')
      .then(r => r.json())
      .then(d => setSignupCount(d.count || 0))
      .catch(() => {});
  }, []);

  const spotsLeft = Math.max(0, 100 - signupCount);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.age) e.age = 'Required';
    else if (+form.age < 13 || +form.age > 99) e.age = '13-99';
    if (!form.sex) e.sex = 'Required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^[\+]?[\d\s\-]{8,15}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Invalid number';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    setServerError('');
    try {
      const res = await fetch('/api/signups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || 'Something went wrong');
        setSubmitting(false);
        return;
      }
      setSignupCount(data.totalSignups);
      setSubmitted(true);
    } catch {
      setServerError('Could not connect to server. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0710] relative overflow-hidden font-sans selection:bg-pink-500/30">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        {/* Ambient radial glows matching the feather's pink */}
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-[#E91E8C]/[0.08] blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#7B2CBF]/[0.1] blur-[120px]" />
      </div>

      {/* Announcement bar */}
      <div className="relative z-10 bg-gradient-to-r from-transparent via-[#E91E8C]/10 to-transparent border-b border-[#E91E8C]/20 text-center py-2.5 px-4 backdrop-blur-md">
        <p className="text-xs sm:text-sm text-pink-200/90 font-medium tracking-widest uppercase">
          ✦ Something Beautiful is Coming — Be The First To Know ✦
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        {/* Nav */}
        <nav className="flex items-center justify-between mb-12 sm:mb-16">
          <a href="https://mypakhi.com" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity">
            <img src="/logo.png" alt="Pakhi Logo" className="h-16 w-auto" />
          </a>
          <a
            href="https://mypakhi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/50 hover:text-pakhi-accent transition-colors border border-white/10 px-5 py-2 rounded-full hover:border-pakhi-accent/40"
          >
            Visit mypakhi.com ↗
          </a>
        </nav>

        {/* Hero + Form Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
          {/* Left — Hero Text */}
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pakhi-accent/10 border border-pakhi-accent/25 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-pakhi-accent animate-pulse-soft" />
              <span className="text-xs font-semibold text-pakhi-accent tracking-wider uppercase">New Launch</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              <span className="text-white">Be Among The</span>
              <br />
              <span className="text-pakhi-accent">First 100</span>
            </h1>

            <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-md">
              We're launching something special. Sign up now and the
              <strong className="text-pakhi-accent-soft"> top 100 </strong>
              get exclusive Pakhi goodies delivered free to their doorstep.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 mt-6">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-pakhi-accent">{spotsLeft}</span>
                <span className="text-xs text-white/40 uppercase tracking-wider">Spots Left</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <span className="block text-2xl sm:text-3xl font-serif font-bold text-white/80">100%</span>
                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">Organic</span>
              </div>
              <div className="hidden sm:block w-px h-10 bg-white/10" />
              <div>
                <span className="block text-2xl sm:text-3xl">🎁</span>
                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">Free Gifts</span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="opacity-0 animate-slide-up relative z-20 mt-4 lg:mt-0" style={{ animationDelay: '0.2s' }}>
            {/* Premium Glassmorphism Container */}
            <div className="relative rounded-[2rem] p-6 sm:p-10 bg-[#120e24]/60 backdrop-blur-xl border border-white/[0.05] shadow-[0_0_80px_rgba(233,30,140,0.07)] overflow-hidden">
              {/* Inner subtle glow ring */}
              <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, white, transparent)' }}></div>
              
              {submitted ? (
                /* ───── Success State ───── */
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-pakhi-green/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-pakhi-green-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">You're In! 🎉</h3>
                  <p className="text-white/50 mb-6">
                    You're now in the running for exclusive Pakhi freebies. We'll be in touch!
                  </p>
                  <a
                    href="https://mypakhi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3 bg-pakhi-accent text-white font-semibold rounded-full hover:bg-pakhi-accent-light transition-colors"
                  >
                    Explore Pakhi ↗
                  </a>
                </div>
              ) : (
                /* ───── Form ───── */
                <>
                  <div className="mb-7">
                    <h2 className="text-xl font-serif font-bold text-white mb-1">Sign Up for the Launch</h2>
                    <p className="text-white/35 text-sm">Takes 30 seconds. No spam, ever.</p>
                  </div>

                  {serverError && (
                    <div className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-fade-in">
                      {serverError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className={`input-field ${errors.name ? 'error' : ''}`}
                        autoComplete="name"
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-1 ml-1">{errors.name}</p>}
                    </div>

                    {/* Age + Sex row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="number"
                          name="age"
                          value={form.age}
                          onChange={handleChange}
                          placeholder="Age"
                          min="13"
                          max="99"
                          className={`input-field ${errors.age ? 'error' : ''}`}
                        />
                        {errors.age && <p className="text-xs text-red-400 mt-1 ml-1">{errors.age}</p>}
                      </div>
                      <div>
                        <select
                          name="sex"
                          value={form.sex}
                          onChange={handleChange}
                          className={`input-field appearance-none ${!form.sex ? 'text-white/30' : ''} ${errors.sex ? 'error' : ''}`}
                        >
                          <option value="" disabled className="bg-pakhi-navy text-white/50">Sex</option>
                          <option value="Female" className="bg-pakhi-navy text-white">Female</option>
                          <option value="Male" className="bg-pakhi-navy text-white">Male</option>
                          <option value="Non-binary" className="bg-pakhi-navy text-white">Non-binary</option>
                          <option value="Prefer not to say" className="bg-pakhi-navy text-white">Prefer not to say</option>
                        </select>
                        {errors.sex && <p className="text-xs text-red-400 mt-1 ml-1">{errors.sex}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className={`input-field ${errors.email ? 'error' : ''}`}
                        autoComplete="email"
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-1 ml-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number (+91 XXXXX XXXXX)"
                        className={`input-field ${errors.phone ? 'error' : ''}`}
                        autoComplete="tel"
                      />
                      {errors.phone && <p className="text-xs text-red-400 mt-1 ml-1">{errors.phone}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative w-full py-4 mt-4 overflow-hidden rounded-xl bg-gradient-to-r from-[#E91E8C] to-[#ff6ec4] text-white font-semibold text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(233,30,140,0.3)] hover:shadow-[0_0_40px_rgba(233,30,140,0.5)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {/* Shine effect inside button */}
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"></div>
                      
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {submitting ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="60" strokeLinecap="round" />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          'Reserve My Spot'
                        )}
                      </span>
                    </button>
                  </form>

                  <p className="text-center text-white/30 text-xs mt-6 font-medium">
                    Your data is safe with us. No spam, we promise.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-24 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6 pb-6">
          <p className="text-white/25 text-[10px] sm:text-xs text-center sm:text-left">
            © {new Date().getFullYear()} MooZ Care LLP · A MooZCare Initiative
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Instagram', url: 'https://www.instagram.com/pakhicares/' },
              { label: 'Facebook', url: 'https://www.facebook.com/pakhicares' },
              { label: 'YouTube', url: 'https://www.youtube.com/@pakhicares' },
            ].map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/25 text-xs hover:text-pakhi-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
