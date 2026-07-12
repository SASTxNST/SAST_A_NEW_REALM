import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrbitRing from "../components/OrbitRing";
import Reveal from "../components/Reveal";
import { asset } from "../utils/asset";
import { upcomingEvents } from "../data/events";
import { projects } from "../data/projects";


function TextScrambler({ text, isHovered }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!@#$%^&*()_+{}|:<>?[]-=/";
  
  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }
    
    let frame = 0;
    const queue = [];
    for (let i = 0; i < text.length; i++) {
      const from = "";
      const to = text[i];
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 25);
      queue.push({ from, to, start, end, char: "" });
    }
    
    let rId;
    const update = () => {
      let output = "";
      let complete = 0;
      
      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += char;
        } else {
          output += to;
        }
      }
      
      setDisplayText(output);
      
      if (complete < queue.length) {
        frame++;
        rId = requestAnimationFrame(update);
      }
    };
    
    rId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rId);
  }, [text, isHovered]);
  
  return <span>{displayText}</span>;
}

function ActiveProjectRow({ p, index }) {
  const [isHovered, setIsHovered] = useState(false);

  // SVG blueprints for each project
  const getBlueprintSVG = (id) => {
    if (id === "rit-automation") {
      return (
        <svg viewBox="0 0 240 140" width="100%" height="100%" fill="none" stroke="#6e8cff" strokeWidth="0.8">
          {/* Dial indicator */}
          <circle cx="60" cy="70" r="35" strokeDasharray="3 3" />
          <circle cx="60" cy="70" r="25" />
          <line x1="60" y1="70" x2="80" y2="55" stroke="var(--lime)" strokeWidth="1.2" />
          <circle cx="60" cy="70" r="3" fill="#6e8cff" />
          
          {/* Telemetry wave */}
          <path d="M 110,90 Q 120,40 130,80 T 150,50 T 170,90 T 190,40" stroke="var(--ion)" strokeWidth="1" />
          
          {/* Grid annotations */}
          <rect x="110" y="30" width="100" height="8" strokeDasharray="2 2" />
          <text x="115" y="37" fill="#6e8cff" fontSize="6" fontFamily="monospace">CTRL_SYS_OK</text>
          <text x="110" y="115" fill="#6e8cff" fontSize="7" fontFamily="monospace">IGNITION_SEQ // ACTIVE</text>
        </svg>
      );
    } else if (id === "sast-oreinthon") {
      return (
        <svg viewBox="0 0 240 140" width="100%" height="100%" fill="none" stroke="#6e8cff" strokeWidth="0.8">
          {/* Radar target lock-on */}
          <circle cx="120" cy="70" r="45" />
          <circle cx="120" cy="70" r="30" strokeDasharray="4 2" />
          <circle cx="120" cy="70" r="15" />
          <line x1="70" y1="70" x2="170" y2="70" />
          <line x1="120" y1="20" x2="120" y2="120" />
          {/* Blips */}
          <circle cx="145" cy="55" r="3.5" fill="var(--lime)" stroke="none" />
          <circle cx="100" cy="90" r="2.5" fill="var(--ion)" stroke="none" />
          <text x="15" y="25" fill="#6e8cff" fontSize="7" fontFamily="monospace">LOCK_RANGE: 150KM</text>
          <text x="15" y="125" fill="#6e8cff" fontSize="7" fontFamily="monospace">T-MINUS 24:00:00</text>
        </svg>
      );
    } else {
      // ISRO BAH / default
      return (
        <svg viewBox="0 0 240 140" width="100%" height="100%" fill="none" stroke="#6e8cff" strokeWidth="0.8">
          {/* Satellite payload */}
          <rect x="75" y="45" width="90" height="50" rx="2" />
          {/* Solar grids */}
          <rect x="15" y="55" width="60" height="30" strokeDasharray="3 1" />
          <line x1="45" y1="55" x2="45" y2="85" />
          <rect x="165" y="55" width="60" height="30" strokeDasharray="3 1" />
          <line x1="195" y1="55" x2="195" y2="85" />
          {/* Transceiver */}
          <circle cx="120" cy="45" r="8" />
          <line x1="120" y1="37" x2="120" y2="20" />
          <circle cx="120" cy="20" r="2.5" fill="var(--lime)" stroke="none" />
          <text x="75" y="115" fill="#6e8cff" fontSize="7" fontFamily="monospace">ISRO_BAH_payload.obj</text>
        </svg>
      );
    }
  };

  const alignClass = index % 2 === 0 ? "align-left" : "align-right";

  return (
    <Link
      to="/projects"
      className={`active-project-row ${alignClass} ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: "block", textDecoration: "none" }}
    >
      <div className="active-project-inner">
        {/* Corner Brackets */}
        <svg className="corner-bracket top-left" viewBox="0 0 20 20" width="16" height="16" fill="none">
          <path d="M 16 2 L 2 2 L 2 16" stroke="var(--lime)" strokeWidth="2" />
        </svg>
        <svg className="corner-bracket top-right" viewBox="0 0 20 20" width="16" height="16" fill="none">
          <path d="M 4 2 L 18 2 L 18 16" stroke="var(--lime)" strokeWidth="2" />
        </svg>
        <svg className="corner-bracket bottom-left" viewBox="0 0 20 20" width="16" height="16" fill="none">
          <path d="M 16 18 L 2 18 L 2 4" stroke="var(--lime)" strokeWidth="2" />
        </svg>
        <svg className="corner-bracket bottom-right" viewBox="0 0 20 20" width="16" height="16" fill="none">
          <path d="M 4 18 L 18 18 L 18 4" stroke="var(--lime)" strokeWidth="2" />
        </svg>

        {/* Content Info */}
        <div className="active-project-content">
          <div className="active-project-meta">
            <span className="mono project-status-tag">{p.status}</span>
            <span className="mono project-year-tag">{p.year}</span>
          </div>
          <h3 className="display active-project-title">{p.name}</h3>
          <p className="active-project-desc mono">
            <TextScrambler text={p.blurb} isHovered={isHovered} />
          </p>
        </div>

        {/* Blueprint Reveal Panel */}
        <div className="active-project-blueprint">
          <div className="blueprint-grid-overlay"></div>
          {getBlueprintSVG(p.id)}
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateZ = -scrollY * 0.75; 
  const opacity = Math.max(0.08, 0.85 - scrollY / 550);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="container hero-inner-flex">
          {/* Top element: Welcome Title */}
          <h1 className="display hero-welcome-title">
            Welcome to the new realm
          </h1>
          
          {/* Middle element: The 3D Receding SAST Logo */}
          <div className="hero-logo-space">
            <span
              className="hero-logo-text display-hollow"
              aria-hidden="true"
              style={{
                transform: `perspective(300px) rotateX(40deg) translateZ(${translateZ}px)`,
                opacity: opacity,
                transition: "transform 0.05s linear, opacity 0.05s linear",
              }}
            >
              SAST
            </span>
          </div>

          {/* Bottom element: CTAs */}
          <div className="hero-actions-flex">
            <Link to="/join" className="btn btn-primary">
              Join SAST <span className="btn-arrow">&rarr;</span>
            </Link>
            <Link to="/team" className="btn btn-ghost">
              See our team
            </Link>
          </div>

          {/* Mobile-only floating collage to fill empty space under CTAs */}
          <Reveal delay={300} className="hero-mobile-collage">
            <div className="collage-img collage-img-top">
              <img src={asset("/images/home/h2.png")} alt="SAST rocket launch" />
            </div>
            <div className="collage-img collage-img-bottom">
              <img src={asset("/images/home/h1.png")} alt="SAST team at work" />
            </div>
          </Reveal>
        </div>
      </section>


      {/* ---------- Mission teaser ---------- */}
      <section className="section mission-teaser">
        <div className="container mission-grid">
          <Reveal>
            <span className="eyebrow">Mission</span>
            <h2 className="display section-title">
              Curiosity is the fuel.<br />Engineering is the vehicle.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lede">
              We exist for students who'd rather build the thing than just study it —
              from a first soldering iron to a rocket on the pad. Every division runs
              on real projects, real deadlines, and real launches.
            </p>
            <Link to="/about" className="btn btn-ghost mission-link">
              About SAST <span className="btn-arrow">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>


      {/* ---------- Projects teaser ---------- */}
      <section className="section projects-teaser">
        {/* Floating collage — absolutely positioned in the top-right empty space */}
        <div className="projects-collage">
          <div className="collage-img collage-img-top">
            <img src={asset("/images/home/h2.png")} alt="SAST rocket launch" />
          </div>
          <div className="collage-img collage-img-bottom">
            <img src={asset("/images/home/h1.png")} alt="SAST team at work" />
          </div>
        </div>

        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Currently building</span>
            <h2 className="display section-title">Active projects</h2>
          </Reveal>

          <div className="active-projects-list">
            {projects.slice(0, 3).map((p, i) => (
              <div key={p.id}>
                <Reveal delay={i * 100}>
                  <ActiveProjectRow p={p} index={i} />
                </Reveal>

                {/* Diagonal dashed connector to next card */}
                {i < 2 && (
                  <div className="project-connector-wrap">
                    <svg
                      viewBox="0 0 600 80"
                      width="100%"
                      height="80"
                      fill="none"
                      preserveAspectRatio="none"
                      className="project-connector-svg"
                    >
                      {i % 2 === 0 ? (
                        <>
                          <path
                            d="M 180 4 C 260 4, 340 76, 440 76"
                            stroke="var(--lime)"
                            strokeWidth="1.5"
                            strokeDasharray="6 4"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 432 68 L 440 76 L 432 84"
                            stroke="var(--lime)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            d="M 420 4 C 340 4, 260 76, 160 76"
                            stroke="var(--lime)"
                            strokeWidth="1.5"
                            strokeDasharray="6 4"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 168 68 L 160 76 L 168 84"
                            stroke="var(--lime)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </>
                      )}
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ---------- Event teaser ---------- */}
      <section className="section event-banner">
        <OrbitRing className="event-orbit" satellite={false} />
        <div className="container event-banner-inner">
          <Reveal>
            <span className="eyebrow">Next up</span>
            <h2 className="display section-title">{upcomingEvents[0].title}</h2>
            <p className="lede">
              {upcomingEvents[0].date} &middot; {upcomingEvents[0].location}
            </p>
            <Link to="/events" className="btn btn-primary">
              See all events <span className="btn-arrow">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Join CTA ---------- */}
      <section className="section join-cta">
        <div className="container join-cta-inner">
          <Reveal>
            <h2 className="display section-title">
              No experience needed.<br />Just curiosity.
            </h2>
            <p className="lede">
              Every division starts new members from zero. Come find out where you fit.
            </p>
            <Link to="/join" className="btn btn-primary">
              Start your application <span className="btn-arrow">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
