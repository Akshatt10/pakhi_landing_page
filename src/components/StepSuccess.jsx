export default function StepSuccess({ name }) {
  const perks = [
    { emoji: '🎉', text: 'Community events' },
    { emoji: '✈️', text: 'Early access to trips' },
    { emoji: '🎓', text: 'First workshop free' },
    { emoji: '🎟️', text: 'Coupon codes of partner brands' },
  ];

  return (
    <div className="step-container animate-step-enter py-12">
      <div className="step-content">
        <div className="card text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
          
          {/* Subtle gradient flare inside the card */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-pakhi-pink/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pakhi-purple/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-xl animate-chip-pop"
                 style={{ background: 'linear-gradient(135deg, #E8547A, #7C4DBA)' }}>
              🌸
            </div>

            <p className="eyebrow !text-pakhi-pink !mb-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              You're in, love
            </p>

            <h1 className="heading-main text-center text-4xl sm:text-5xl opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Welcome, <em className="text-pakhi-purple italic font-normal">{name}.</em>
            </h1>

            <p className="text-pakhi-muted text-[16px] leading-relaxed mb-8 max-w-md mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.45s' }}>
              You've just joined incredible women who are done with the silence around their bodies. <strong className="font-semibold text-pakhi-dark">This is your circle now.</strong>
            </p>

            {/* Perks */}
            <div className="flex gap-2.5 flex-wrap justify-center mb-10">
              {perks.map((perk, i) => (
                <div key={perk.text}
                     className="px-4 py-2.5 rounded-full text-[13px] text-pakhi-dark font-medium opacity-0 animate-slide-up flex items-center gap-2"
                     style={{
                       animationDelay: `${0.5 + i * 0.15}s`,
                       background: '#FDE8EF',
                       border: '1px solid rgba(232, 84, 122, 0.2)'
                     }}>
                  <span>{perk.emoji}</span>
                  {perk.text}
                </div>
              ))}
            </div>

            <a href="https://www.myntra.com/sanitary-napkins/pakhi/pakhi-organic-bamboo-sanitary-pads-with-panty-liner---7-pcs-xl/41703436/buy" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 rounded-full bg-white text-pakhi-dark font-semibold text-[15px] transition-all duration-300 hover:-translate-y-1 opacity-0 animate-slide-up"
               style={{
                 animationDelay: '1.2s',
                 boxShadow: '0 8px 30px rgba(124, 77, 186, 0.15)',
                 border: '1px solid rgba(232, 84, 122, 0.15)'
               }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Myntra_Logo.png" alt="Myntra" className="h-6 w-auto object-contain" />
              Shop Pakhi on Myntra →
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}
