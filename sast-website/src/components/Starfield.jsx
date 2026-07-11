import { useEffect, useRef } from "react";

// Ambient, low-density starfield with a very slow drift.
// Fixed behind all content — the "space" that every page sits in.
export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let raf;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 9000);
      stars = new Array(count).fill(0).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.1 + 0.2,
        a: Math.random() * 0.6 + 0.15,
        speed: Math.random() * 0.015 + 0.003,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,245,250,${s.a})`;
        ctx.fill();
        if (!reduceMotion) {
          s.y += s.speed;
          if (s.y > canvas.height) s.y = 0;
        }
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="space-bg-container" aria-hidden="true">
      <canvas ref={canvasRef} className="starfield" />
      
      {/* Faint, glowing deep-space nebula clouds */}
      <div className="nebula-cloud nebula-1"></div>
      <div className="nebula-cloud nebula-2"></div>
      <div className="nebula-cloud nebula-3"></div>

      {/* Large, barely visible technical blueprints */}
      <svg className="space-blueprints-svg" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <pattern id="globalGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2e4bd8" strokeWidth="0.5" opacity="0.06" />
            <circle cx="0" cy="0" r="1" fill="#6e8cff" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#globalGrid)" />
        
        {/* Top-Right: Satellite Orbit Wireframe */}
        <g transform="translate(1250, 180) scale(0.65)" opacity="0.05" stroke="#6e8cff" strokeWidth="1" fill="none">
          <circle cx="0" cy="0" r="100" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="80" />
          <line x1="-140" y1="0" x2="140" y2="0" />
          <line x1="0" y1="-140" x2="0" y2="140" />
          <path d="M-80,-80 L-100,-100 M80,-80 L100,-100 M-80,80 L-100,100 M80,80 L100,100" />
          <text x="-40" y="-115" fill="#6e8cff" fontSize="10" fontFamily="monospace" stroke="none">SAT-ORBIT-D2</text>
        </g>
        
        {/* Bottom-Left: Propulsion Engine Wireframe */}
        <g transform="translate(140, 720) scale(0.7)" opacity="0.05" stroke="#6e8cff" strokeWidth="1" fill="none">
          <path d="M -30,-80 L 30,-80 L 25,-15 L 50,70 L -50,70 L -25,-15 Z" />
          <line x1="-50" y1="70" x2="50" y2="70" />
          <ellipse cx="0" cy="70" rx="50" ry="8" />
          <ellipse cx="0" cy="30" rx="38" ry="6" />
          <ellipse cx="0" cy="0" rx="28" ry="5" />
          <ellipse cx="0" cy="-50" rx="32" ry="5" />
          <ellipse cx="0" cy="-80" rx="36" ry="6" strokeDasharray="3 3" />
          <line x1="0" y1="-110" x2="0" y2="100" strokeDasharray="4 4" />
          <text x="60" y="0" fill="#6e8cff" fontSize="9" fontFamily="monospace" stroke="none">SEC-09 THRUST</text>
          <text x="60" y="15" fill="#6e8cff" fontSize="8" fontFamily="monospace" stroke="none">P_MAX = 450kN</text>
        </g>

        {/* Top-Left: Constellation Map */}
        <g transform="translate(200, 160) scale(0.65)" opacity="0.05" stroke="#6e8cff" strokeWidth="0.8" fill="none">
          <circle cx="50" cy="50" r="3" fill="#6e8cff" />
          <circle cx="150" cy="20" r="2.5" fill="#6e8cff" />
          <circle cx="200" cy="110" r="3.5" fill="#6e8cff" />
          <circle cx="110" cy="140" r="2" fill="#6e8cff" />
          <line x1="50" y1="50" x2="150" y2="20" />
          <line x1="150" y1="20" x2="200" y2="110" />
          <line x1="200" y1="110" x2="110" y2="140" strokeDasharray="2 2" />
          <line x1="110" y1="140" x2="50" y2="50" />
          <circle cx="130" cy="80" r="60" strokeDasharray="3 3" />
          <text x="40" y="195" fill="#6e8cff" fontSize="9" fontFamily="monospace" stroke="none">ORION ALPHA SECTOR</text>
        </g>

        {/* Bottom-Right: Rover Chassis Blueprint */}
        <g transform="translate(1280, 740) scale(0.6)" opacity="0.04" stroke="#6e8cff" strokeWidth="1" fill="none">
          <rect x="-80" y="-30" width="160" height="60" rx="3" />
          <circle cx="-50" cy="-30" r="25" />
          <circle cx="50" cy="-30" r="25" />
          <circle cx="-50" cy="30" r="25" />
          <circle cx="50" cy="30" r="25" />
          <line x1="0" y1="0" x2="0" y2="-60" />
          <circle cx="0" cy="-60" r="8" />
          <text x="-90" y="70" fill="#6e8cff" fontSize="10" fontFamily="monospace" stroke="none">ROVER CHASSIS VIEW</text>
        </g>
      </svg>
    </div>
  );
}
