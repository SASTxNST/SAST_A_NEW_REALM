// The signature motif carried from the SAST logo: a thin glowing
// orbit ellipse with a satellite travelling along its path.
// Reused across the site — hero, stats, section dividers — as the
// one recognizable visual thread that ties every page back to the brand.
export default function OrbitRing({ className = "", satellite = true }) {
  return (
    <svg
      className={`orbit-ring ${className}`}
      viewBox="0 0 600 320"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="orbitGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2e4bd8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2e4bd8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="300" cy="160" rx="260" ry="270" fill="url(#orbitGlow)" opacity="0.35" />
      <ellipse
        cx="300"
        cy="160"
        rx="280"
        ry="110"
        stroke="#6e8cff"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      {satellite && (
        <g className="orbit-satellite">
          <animateMotion
            dur="18s"
            repeatCount="indefinite"
            path="M 580,160 A 280 110 0 1 1 20,160 A 280 110 0 1 1 580,160"
          />
          <circle r="3.5" fill="#f4f5fa" />
          <circle r="8" fill="#6e8cff" opacity="0.35" />
        </g>
      )}
    </svg>
  );
}
