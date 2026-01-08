export const VectorLogoComponent = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
    <rect width="40" height="40" rx="12" fill="url(#bg-gradient)" fillOpacity="0.2"/>
    <path d="M8 20L18 30L32 10" stroke="url(#main-gradient)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="10" r="3" fill="#34D399" />
    <defs>
      <linearGradient id="main-gradient" x1="8" y1="30" x2="32" y2="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" /><stop offset="1" stopColor="#34D399" />
      </linearGradient>
      <linearGradient id="bg-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#065F46" /><stop offset="1" stopColor="#064E3B" />
      </linearGradient>
    </defs>
  </svg>
);