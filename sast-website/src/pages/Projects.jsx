import Reveal from "../components/Reveal";
import { projects } from "../data/projects";

/* ── per-project doodle icons (SVG) ─────────────────────────── */
function getDoodle(i) {
  const doodles = [
    /* 0 – gear / automation */
    <svg key="gear" width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="30" cy="30" r="8" />
      <path d="M30 10v4M30 46v4M10 30h4M46 30h4M16.4 16.4l2.8 2.8M40.8 40.8l2.8 2.8M43.6 16.4l-2.8 2.8M19.2 40.8l-2.8 2.8" />
    </svg>,
    /* 1 – clock / 24h hackathon */
    <svg key="clock" width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="30" cy="30" r="20" />
      <line x1="30" y1="14" x2="30" y2="30" strokeWidth="2" />
      <line x1="30" y1="30" x2="42" y2="36" strokeWidth="2" />
      <circle cx="30" cy="30" r="2" fill="currentColor" />
      <path d="M30 10 v-4M30 54 v-4M10 30 h-4M54 30 h-4" strokeWidth="1" opacity="0.5"/>
    </svg>,
    /* 2 – satellite / ISRO */
    <svg key="satellite" width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="23" y="23" width="14" height="14" rx="2" />
      <line x1="10" y1="30" x2="23" y2="30" />
      <line x1="37" y1="30" x2="50" y2="30" />
      <rect x="5" y="26" width="5" height="8" rx="1" />
      <rect x="50" y="26" width="5" height="8" rx="1" />
      <line x1="30" y1="10" x2="30" y2="23" />
      <line x1="30" y1="37" x2="30" y2="50" />
      <circle cx="30" cy="8" r="2" fill="currentColor" />
    </svg>,
    /* 3 – rocket / NASA */
    <svg key="rocket" width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 8 C36 14 40 22 40 32 L40 44 L20 44 L20 32 C20 22 24 14 30 8Z" />
      <path d="M20 38 L12 46 L20 44" />
      <path d="M40 38 L48 46 L40 44" />
      <circle cx="30" cy="28" r="4" />
      <line x1="30" y1="44" x2="30" y2="52" strokeDasharray="3 3" />
    </svg>,
  ];
  return doodles[i % doodles.length];
}

const STATUS_COLOR = {
  "In progress": "var(--ion)",
  "Completed":   "var(--accent)",
  "Upcoming":    "#c084fc",
};

export default function Projects() {
  return (
    <>
      <section className="page-hero page-hero-projects-bg">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Projects</span>
            <h1 className="display page-hero-title">What we're building.</h1>
            <p className="lede">
              From airframes to autonomous rovers — every project here was designed,
              built, and tested by SAST members.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section divisions">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">This Semester</span>
            <h2 className="display section-title">{projects.length} projects. One mission.</h2>
          </Reveal>

          <div className="roadmap-container">
            {/* ── background blueprint layer ── */}
            <div className="roadmap-blueprint-bg">
              <svg viewBox="0 0 800 1400" preserveAspectRatio="none" width="100%" height="100%">
                <defs>
                  <pattern id="pgridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2e4bd8" strokeWidth="0.5" opacity="0.12" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pgridPattern)" />
                <circle cx="150" cy="250" r="160" fill="#2e4bd8" opacity="0.06" filter="blur(80px)" />
                <circle cx="650" cy="750" r="200" fill="#c084fc" opacity="0.05" filter="blur(100px)" />
                <circle cx="250" cy="1200" r="180" fill="#1d4ed8" opacity="0.05" filter="blur(90px)" />
                {/* Gear wireframe */}
                <g transform="translate(620, 340) scale(0.9)" opacity="0.12" stroke="#6e8cff" strokeWidth="1" fill="none">
                  <circle cx="0" cy="0" r="50" strokeDasharray="6 4" />
                  <circle cx="0" cy="0" r="28" />
                  {[0,45,90,135,180,225,270,315].map((a, i) => (
                    <rect key={i} x="-8" y="-60" width="16" height="18" transform={`rotate(${a})`} rx="2" />
                  ))}
                </g>
                {/* Compass wireframe */}
                <g transform="translate(80, 900) scale(0.8)" opacity="0.12" stroke="#6e8cff" strokeWidth="1" fill="none">
                  <circle cx="0" cy="0" r="60" />
                  <circle cx="0" cy="0" r="50" strokeDasharray="4 4" />
                  <line x1="0" y1="-60" x2="0" y2="60" />
                  <line x1="-60" y1="0" x2="60" y2="0" />
                  <polygon points="0,-40 8,0 0,10 -8,0" fill="#6e8cff" opacity="0.4" />
                </g>
              </svg>
            </div>

            {/* ── glowing snake path ── */}
            <svg className="roadmap-path-svg" viewBox="0 0 800 1400" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ppathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2e4bd8" />
                  <stop offset="50%" stopColor="#6e8cff" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <filter id="pglow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* glow trace */}
              <path
                d="M 230,100 C 450,160 650,200 580,380 C 500,580 180,530 220,720 C 270,880 630,830 580,1020 C 500,1230 200,1250 220,1380"
                stroke="url(#ppathGradient)" strokeWidth="16" strokeLinecap="round" opacity="0.22" filter="url(#pglow)"
              />
              {/* crisp line */}
              <path
                d="M 230,100 C 450,160 650,200 580,380 C 500,580 180,530 220,720 C 270,880 630,830 580,1020 C 500,1230 200,1250 220,1380"
                stroke="url(#ppathGradient)" strokeWidth="4" strokeLinecap="round" opacity="0.85"
              />
              {/* dashes */}
              <path
                d="M 230,100 C 450,160 650,200 580,380 C 500,580 180,530 220,720 C 270,880 630,830 580,1020 C 500,1230 200,1250 220,1380"
                stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 6" opacity="0.9"
              />
              {/* decorative dots */}
              <circle cx="480" cy="120" r="12" stroke="#6e8cff" strokeWidth="1" fill="none" opacity="0.3" />
              <g transform="translate(350, 460) rotate(45)" opacity="0.35">
                <path d="M0,-15 L8,0 L4,10 L-4,10 L-8,0 Z" stroke="#6e8cff" strokeWidth="1" fill="none" />
                <path d="M-4,10 L-8,15 L-4,13 L0,15 L4,13 L8,15 L4,10" stroke="#6e8cff" strokeWidth="1" fill="none" />
              </g>
              <circle cx="100" cy="780" r="14" stroke="#6e8cff" strokeWidth="1" fill="none" opacity="0.3" />
              <line x1="78" y1="780" x2="122" y2="780" stroke="#6e8cff" strokeWidth="1" opacity="0.3" />
            </svg>

            {/* ── launch badge ── */}
            <div className="roadmap-launch-badge">
              <span className="launch-text">More soon</span>
              <svg className="launch-rocket" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 3.3-2 3.3s2.04-.5 3.3-2L9 15l-3-3-1.5 4.5z" />
                <path d="M12 12l9-9-3 12-6-3-9-9 9 9z" />
              </svg>
            </div>

            {/* ── floating B&W snapshot photos in the gaps ── */}
            <div className="projects-snap projects-snap-1">
              <img src="/images/projects/nebula.png" alt="SAST Nebula poster" className="projects-snap-img" />
            </div>
            <div className="projects-snap projects-snap-2">
              <img src="/images/projects/grp.png" alt="SAST group" className="projects-snap-img" />
            </div>
            <div className="projects-snap projects-snap-3">
              <img src="/images/projects/bp.png" alt="SAST VR demo" className="projects-snap-img" />
            </div>
            <div className="projects-snap projects-snap-4">
              <img src="/images/projects/bg.png" alt="SAST CAD gears" className="projects-snap-img" />
            </div>

            {/* ── project cards ── */}
            <div className="roadmap-cards">
              {projects.map((p, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <Reveal key={p.id} delay={i * 80} className={`roadmap-card-wrap ${isLeft ? "card-left" : "card-right"}`}>
                    <div className={`division-card panel roadmap-card blob-shape-${i + 1}`}>
                      <div className="roadmap-card-content">
                        <span className="mono division-index" style={{ color: STATUS_COLOR[p.status] || "var(--ion)" }}>
                          {String(i + 1).padStart(2, "0")} — {p.status}
                        </span>
                        <h3 className="division-name">{p.name}</h3>
                        <p className="division-blurb">{p.blurb}</p>
                      </div>
                      <div className="roadmap-card-doodle">
                        {getDoodle(i)}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
