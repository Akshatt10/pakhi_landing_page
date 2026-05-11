export default function StepSuccess({ name }) {
  const perks = [
    '🎋 Free bamboo pad sample',
    '✈️ Early access to women\'s trips',
    '🎓 First workshop free',
    '💸 15% off your first order',
  ];

  return (
    <div className="min-h-screen relative flex items-center justify-center text-center text-white overflow-hidden"
         style={{ background: 'linear-gradient(145deg, #1A0A14 0%, #2D1040 50%, #1A0A14 100%)' }}>
      {/* Pulsing glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 rounded-full animate-welcome-pulse"
             style={{ background: 'radial-gradient(circle, rgba(232,84,122,0.4) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-[500px] px-5 py-10">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full mx-auto mb-7 flex items-center justify-center text-4xl animate-avatar-float"
             style={{ background: 'linear-gradient(135deg, #E8547A, #7C4DBA)', boxShadow: '0 0 40px rgba(232,84,122,0.6)' }}>
          🌸
        </div>

        <p className="text-xs tracking-[3px] uppercase text-[#F7A8BE] mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          You're in, love
        </p>

        <h1 className="font-heading text-4xl sm:text-5xl md:text-[52px] font-bold leading-[1.15] mb-5 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s', background: 'linear-gradient(135deg, #fff, #F7A8BE, #B98FE0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Welcome, <em className="italic">{name}.</em><br />Life's about to change.
        </h1>

        <p className="text-base text-white/60 leading-relaxed mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.45s' }}>
          You've just joined incredible women who are done with the silence around their bodies.<br />
          This is your circle now.
        </p>

        {/* Perks */}
        <div className="flex gap-3 flex-wrap justify-center mb-8">
          {perks.map((perk, i) => (
            <div key={perk}
                 className="px-4 py-2 rounded-full text-[13px] text-white/80 opacity-0 animate-chip-float"
                 style={{
                   animationDelay: `${0.5 + i * 0.2}s`,
                   border: '1px solid rgba(255,255,255,0.15)',
                   background: 'rgba(255,255,255,0.06)',
                 }}>
              {perk}
            </div>
          ))}
        </div>

        <a href="https://mypakhi.com" target="_blank" rel="noopener noreferrer"
           className="inline-block px-12 py-4 rounded-full text-white font-medium text-base transition-all duration-300 hover:-translate-y-1 opacity-0 animate-slide-up"
           style={{
             animationDelay: '1.2s',
             background: 'linear-gradient(135deg, #E8547A, #7C4DBA)',
             boxShadow: '0 8px 30px rgba(232,84,122,0.5)',
           }}>
          Explore your perks →
        </a>

        <p className="text-[11px] text-white/30 mt-5 tracking-wide opacity-0 animate-fade-in" style={{ animationDelay: '1.4s' }}>

        </p>
      </div>
    </div>
  );
}
