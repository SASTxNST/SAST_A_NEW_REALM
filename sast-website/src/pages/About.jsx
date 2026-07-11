import Reveal from "../components/Reveal";
import OrbitRing from "../components/OrbitRing";
import { divisions } from "../data/divisions";
import { about } from "../data/about";

function getDoodle(index) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="25" y="35" width="50" height="32" rx="3" />
        <line x1="20" y1="67" x2="80" y2="67" strokeWidth="2.5" />
        <path d="M 68 15 L 82 29" strokeWidth="1" />
        <rect x="68" y="20" width="8" height="5" transform="rotate(-45 72 22)" strokeWidth="1.2" />
        <path d="M 60 25 A 6 6 0 0 0 55 18" strokeWidth="1" />
        <path d="M 40 20 A 15 15 0 0 0 25 35" strokeWidth="1" />
        <path d="M 45 15 A 20 20 0 0 0 20 30" strokeWidth="1" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="50" cy="50" rx="36" ry="12" transform="rotate(30 50 50)" />
        <ellipse cx="50" cy="50" rx="36" ry="12" transform="rotate(90 50 50)" />
        <ellipse cx="50" cy="50" rx="36" ry="12" transform="rotate(150 50 50)" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
        <circle cx="21" cy="33" r="2" fill="currentColor" />
        <circle cx="79" cy="67" r="2" fill="currentColor" />
        <circle cx="75" cy="22" r="8" />
        <path d="M 75 12 L 75 14 M 75 30 L 75 32 M 65 22 L 67 22 M 83 22 L 85 22" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="15" y1="50" x2="85" y2="50" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="25" cy="50" r="4" fill="currentColor" />
        <path d="M 22 42 L 25 45 L 30 38" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
        <path d="M 47 42 L 50 45 L 55 38" strokeWidth="1.5" />
        <circle cx="75" cy="50" r="4" fill="currentColor" />
        <line x1="75" y1="50" x2="75" y2="25" strokeWidth="1.5" />
        <polygon points="75 25, 90 30, 75 35" fill="currentColor" opacity="0.15" />
        <path d="M 85 15 L 90 20 L 84 24 L 79 19 Z" />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="20 70, 70 70, 70 20" />
        <polygon points="32 64, 62 64, 62 34" strokeWidth="1" />
        <path d="M 15 25 C 35 50, 55 10, 85 35" strokeDasharray="3 3" />
        <rect x="25" y="20" width="35" height="8" rx="1" transform="rotate(35 42 24)" />
        <polygon points="56 36, 68 40, 58 45" />
      </svg>
    );
  }
  if (index === 4) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="30" y="30" width="40" height="40" rx="4" />
        <rect x="42" y="42" width="16" height="16" rx="2" fill="currentColor" opacity="0.15" />
        <line x1="18" y1="40" x2="30" y2="40" />
        <line x1="18" y1="50" x2="30" y2="50" />
        <line x1="18" y1="60" x2="30" y2="60" />
        <line x1="70" y1="40" x2="82" y2="40" />
        <line x1="70" y1="50" x2="82" y2="50" />
        <line x1="70" y1="60" x2="82" y2="60" />
        <line x1="40" y1="18" x2="40" y2="30" />
        <line x1="50" y1="18" x2="50" y2="30" />
        <line x1="60" y1="18" x2="60" y2="30" />
        <line x1="40" y1="70" x2="40" y2="82" />
        <line x1="50" y1="70" x2="50" y2="82" />
        <line x1="60" y1="70" x2="60" y2="82" />
        <circle cx="16" cy="50" r="2" fill="currentColor" />
        <circle cx="84" cy="50" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (index === 5) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 25 45 C 25 35, 45 25, 60 25 L 60 65 C 45 65, 25 55, 25 45 Z" />
        <path d="M 60 30 L 75 22 L 75 68 L 60 60" />
        <rect x="20" y="42" width="6" height="15" rx="1" />
        <path d="M 82 35 A 15 15 0 0 1 82 55" strokeWidth="2" />
        <path d="M 87 30 A 22 22 0 0 1 87 60" strokeWidth="2" />
        <rect x="15" y="15" width="22" height="15" rx="2" />
        <circle cx="26" cy="22" r="4" />
      </svg>
    );
  }
  return null;
}

export default function About() {
  return (
    <>
      <section className="page-hero page-hero-about-bg">
        <OrbitRing className="page-hero-orbit" satellite={false} />
        <div className="container">
          <Reveal>
            <span className="eyebrow">About</span>
            <h1 className="display page-hero-title" dangerouslySetInnerHTML={{ __html: about.heroTitle }} />
            <p className="lede">{about.heroLede}</p>
          </Reveal>
        </div>
      </section>

      <section className="section about-story">
        <div className="container about-story-container">
          <div className="about-story-text">
            <Reveal className="section-head">
              <span className="eyebrow">Our Story</span>
              <h2 className="display section-title">Built by students, for the future.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede">{about.storyParagraph1}</p>
              <p className="lede" style={{ marginTop: 18 }}>{about.storyParagraph2}</p>
            </Reveal>
          </div>

          <div className="about-story-photos">
            <div className="story-photo-wrap photo-wrap-1">
              <div className="story-photo photo">
                <img src="/images/about/story-1.png" alt="Looking through telescope at sunset" />
              </div>
            </div>
            <div className="story-photo-wrap photo-wrap-2">
              <div className="story-photo photo">
                <img src="/images/about/story-2.jpg" alt="Team meeting discussion" />
              </div>
            </div>
            <div className="story-photo-wrap photo-wrap-3">
              <div className="story-photo photo">
                <img src="/images/about/story-3.png" alt="Student project team posing" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section divisions">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Divisions</span>
            <h2 className="display section-title">{divisions.length} teams. One club.</h2>
          </Reveal>
          
          <div className="roadmap-container">
            <div className="roadmap-blueprint-bg">
              <svg viewBox="0 0 800 1600" preserveAspectRatio="none" width="100%" height="100%">
                <defs>
                  <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2e4bd8" strokeWidth="0.5" opacity="0.12" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#gridPattern)" />
                
                <circle cx="200" cy="300" r="180" fill="#2e4bd8" opacity="0.06" filter="blur(80px)" />
                <circle cx="600" cy="900" r="220" fill="#c084fc" opacity="0.05" filter="blur(100px)" />
                <circle cx="300" cy="1300" r="200" fill="#1d4ed8" opacity="0.05" filter="blur(90px)" />
                
                {/* Rocket CAD Wireframe (Right Side, middle) */}
                <g transform="translate(620, 480) scale(0.9)" opacity="0.12">
                  <line x1="0" y1="-150" x2="0" y2="200" stroke="#6e8cff" strokeWidth="0.5" strokeDasharray="5 5" />
                  <path d="M 0,-120 C 15,-80 25,-40 25,0 L 25,120 L -25,120 L -25,0 C -25,-40 -15,-80 0,-120 Z" stroke="#6e8cff" strokeWidth="1" fill="none" />
                  <line x1="-25" y1="0" x2="25" y2="0" stroke="#6e8cff" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="-25" y1="40" x2="25" y2="40" stroke="#6e8cff" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="-25" y1="80" x2="25" y2="80" stroke="#6e8cff" strokeWidth="0.8" strokeDasharray="2 2" />
                  <path d="M 25,80 L 50,120 L 25,120 Z" stroke="#6e8cff" strokeWidth="1" fill="none" />
                  <path d="M -25,80 L -50,120 L -25,120 Z" stroke="#6e8cff" strokeWidth="1" fill="none" />
                  <polygon points="-15,120 15,120 8,135 -8,135" stroke="#6e8cff" strokeWidth="1" fill="none" />
                  <line x1="60" y1="-120" x2="60" y2="120" stroke="#6e8cff" strokeWidth="0.5" />
                  <line x1="55" y1="-120" x2="65" y2="-120" stroke="#6e8cff" strokeWidth="0.5" />
                  <line x1="55" y1="120" x2="65" y2="120" stroke="#6e8cff" strokeWidth="0.5" />
                  <text x="70" y="6" fill="#6e8cff" fontSize="10" fontFamily="monospace">H=2400mm</text>
                  <line x1="-25" y1="145" x2="25" y2="145" stroke="#6e8cff" strokeWidth="0.5" />
                  <line x1="-25" y1="140" x2="-25" y2="150" stroke="#6e8cff" strokeWidth="0.5" />
                  <line x1="25" y1="140" x2="25" y2="150" stroke="#6e8cff" strokeWidth="0.5" />
                  <text x="-20" y="160" fill="#6e8cff" fontSize="10" fontFamily="monospace">D=500mm</text>
                </g>

                {/* Rover CAD Wireframe (Left Side, lower) */}
                <g transform="translate(80, 1020) scale(0.85)" opacity="0.12">
                  <rect x="0" y="0" width="120" height="70" rx="4" stroke="#6e8cff" strokeWidth="1" fill="none" />
                  <line x1="20" y1="0" x2="20" y2="70" stroke="#6e8cff" strokeWidth="0.5" strokeDasharray="3 3" />
                  <line x1="100" y1="0" x2="100" y2="70" stroke="#6e8cff" strokeWidth="0.5" strokeDasharray="3 3" />
                  <circle cx="20" cy="85" r="20" stroke="#6e8cff" strokeWidth="1" fill="none" />
                  <circle cx="20" cy="85" r="5" stroke="#6e8cff" strokeWidth="1" fill="none" />
                  <circle cx="100" cy="85" r="20" stroke="#6e8cff" strokeWidth="1" fill="none" />
                  <circle cx="100" cy="85" r="5" stroke="#6e8cff" strokeWidth="1" fill="none" />
                  <line x1="20" y1="65" x2="20" y2="105" stroke="#6e8cff" strokeWidth="0.5" />
                  <line x1="0" y1="85" x2="40" y2="85" stroke="#6e8cff" strokeWidth="0.5" />
                  <line x1="100" y1="65" x2="100" y2="105" stroke="#6e8cff" strokeWidth="0.5" />
                  <line x1="80" y1="85" x2="120" y2="85" stroke="#6e8cff" strokeWidth="0.5" />
                  <line x1="30" y1="0" x2="30" y2="-40" stroke="#6e8cff" strokeWidth="1" />
                  <rect x="20" y="-55" width="20" height="15" rx="2" stroke="#6e8cff" strokeWidth="1" fill="none" />
                  <circle cx="30" cy="-48" r="3" stroke="#6e8cff" strokeWidth="1" fill="none" />
                  <line x1="90" y1="0" x2="110" y2="-30" stroke="#6e8cff" strokeWidth="0.8" />
                  <circle cx="110" cy="-30" r="2" fill="#6e8cff" />
                  <line x1="40" y1="-10" x2="80" y2="-10" stroke="#6e8cff" strokeWidth="1.5" />
                  <rect x="35" y="-18" width="50" height="8" stroke="#6e8cff" strokeWidth="0.8" fill="none" />
                  <text x="130" y="25" fill="#6e8cff" fontSize="11" fontFamily="monospace">ROVER UNIT-B</text>
                  <text x="130" y="45" fill="#6e8cff" fontSize="9" fontFamily="monospace">SYS.OK [98%]</text>
                </g>

                {/* Compass Marker */}
                <g transform="translate(620, 1380) scale(0.65)" opacity="0.1">
                  <circle cx="100" cy="100" r="80" stroke="#6e8cff" strokeWidth="0.8" strokeDasharray="4 4" fill="none" />
                  <circle cx="100" cy="100" r="90" stroke="#6e8cff" strokeWidth="0.5" fill="none" />
                  <line x1="100" y1="0" x2="100" y2="200" stroke="#6e8cff" strokeWidth="0.8" />
                  <line x1="0" y1="100" x2="200" y2="100" stroke="#6e8cff" strokeWidth="0.8" />
                  <text x="92" y="-10" fill="#6e8cff" fontSize="14" fontFamily="monospace">N</text>
                </g>
              </svg>
            </div>
            <svg className="roadmap-path-svg" viewBox="0 0 800 1600" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2e4bd8" />
                  <stop offset="50%" stopColor="#6e8cff" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              <path
                d="M 230,120 C 450,180 650,220 580,420 C 500,640 180,590 220,790 C 270,950 630,900 580,1100 C 500,1310 180,1260 220,1460 C 260,1620 550,1620 550,1680"
                stroke="url(#pathGradient)"
                strokeWidth="16"
                strokeLinecap="round"
                opacity="0.22"
                filter="url(#glow)"
              />
              
              <path
                d="M 230,120 C 450,180 650,220 580,420 C 500,640 180,590 220,790 C 270,950 630,900 580,1100 C 500,1310 180,1260 220,1460 C 260,1620 550,1620 550,1680"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.85"
              />

              <path
                d="M 230,120 C 450,180 650,220 580,420 C 500,640 180,590 220,790 C 270,950 630,900 580,1100 C 500,1310 180,1260 220,1460 C 260,1620 550,1620 550,1680"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="8 6"
                opacity="0.9"
              />
              
              <circle cx="480" cy="140" r="15" stroke="#6e8cff" strokeWidth="1" fill="none" opacity="0.3" />
              <ellipse cx="480" cy="140" rx="25" ry="6" transform="rotate(-15 480 140)" stroke="#6e8cff" strokeWidth="1" fill="none" opacity="0.3" />
              
              <path d="M 680,240 L 730,190 M 690,250 L 740,200" stroke="#6e8cff" strokeWidth="1" opacity="0.3" />
              <circle cx="680" cy="245" r="3" fill="#6e8cff" opacity="0.3" />

              <g transform="translate(380, 500) rotate(45)" opacity="0.35">
                <path d="M0,-15 L8,0 L4,10 L-4,10 L-8,0 Z" stroke="#6e8cff" strokeWidth="1" fill="none" />
                <path d="M-4,10 L-8,15 L-4,13 L0,15 L4,13 L8,15 L4,10" stroke="#6e8cff" strokeWidth="1" fill="none" />
              </g>

              <circle cx="100" cy="850" r="18" stroke="#6e8cff" strokeWidth="1" fill="none" opacity="0.3" />
              <line x1="75" y1="850" x2="125" y2="850" stroke="#6e8cff" strokeWidth="1" opacity="0.3" />

              <g transform="translate(80, 320)" opacity="0.25"><path d="M0,-5 L1,-1 L5,0 L1,1 L0,5 L-1,1 L-5,0 L-1,-1 Z" fill="#6e8cff" /></g>
              <g transform="translate(710, 780)" opacity="0.25"><path d="M0,-5 L1,-1 L5,0 L1,1 L0,5 L-1,1 L-5,0 L-1,-1 Z" fill="#6e8cff" /></g>
              <g transform="translate(150, 1380)" opacity="0.25"><path d="M0,-5 L1,-1 L5,0 L1,1 L0,5 L-1,1 L-5,0 L-1,-1 Z" fill="#6e8cff" /></g>
            </svg>
            
            <div className="roadmap-launch-badge">
              <span className="launch-text">Launch</span>
              <svg className="launch-rocket" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 3.3-2 3.3s2.04-.5 3.3-2L9 15l-3-3-1.5 4.5z"></path><path d="M12 12l9-9-3 12-6-3-9-9 9 9z"></path><path d="M16 8a2 2 0 1 1-4-4 2 2 0 0 1 4 4z"></path></svg>
            </div>
            
            <div className="roadmap-cards">
              {divisions.map((d, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <Reveal key={d.name} delay={i * 80} className={`roadmap-card-wrap ${isLeft ? "card-left" : "card-right"}`}>
                    <div className={`division-card panel roadmap-card blob-shape-${i + 1}`}>
                      <div className="roadmap-card-content">
                        <span className="mono division-index">{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="division-name">{d.name}</h3>
                        <p className="division-blurb">{d.blurb}</p>
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
