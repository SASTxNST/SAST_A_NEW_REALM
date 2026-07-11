import Reveal from "../components/Reveal";
import { asset } from "../utils/asset";
import { upcomingEvents, pastEvents } from "../data/events";

function EventRow({ e, i, past }) {
  return (
    <Reveal delay={i * 80} className={`event-row panel ${past ? "event-row-past" : ""}`}>
      <span className="mono event-date">{e.date}</span>
      <div className="event-body">
        <h3 className="event-title">{e.title}</h3>
        {e.location && e.location !== "TBD" && <p className="event-location mono">{e.location}</p>}
        {e.detail && e.detail !== "TBD" && <p className="event-detail">{e.detail}</p>}
      </div>
    </Reveal>
  );
}

export default function Events() {
  return (
    <>
      <section className="page-hero page-hero-events-custom">
        <div className="container page-hero-events-container">
          <div className="page-hero-events-text">
            <Reveal>
              <span className="eyebrow">Events</span>
              <h1 className="display page-hero-title">What's next, what's happened.</h1>
              <p className="lede">
                Workshops, launches, and competitions — open to members and, for most
                sessions, curious newcomers too.
              </p>
            </Reveal>
          </div>

          <div className="events-hero-collage-container">
            {/* The blueprint grid underlay */}
            <div className="events-hero-blueprint">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="eventsGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#2e4bd8" strokeWidth="0.5" opacity="0.12" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#eventsGrid)" />
                
                {/* Blueprint lines & doodles connecting/surrounding the photo boxes */}
                <circle cx="50%" cy="50%" r="130" stroke="#2e4bd8" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.25" />
                <circle cx="50%" cy="50%" r="70" stroke="#2e4bd8" strokeWidth="0.5" opacity="0.15" />
                
                {/* Crosshairs & radar lines */}
                <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#2e4bd8" strokeWidth="0.5" opacity="0.2" />
                <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#2e4bd8" strokeWidth="0.5" opacity="0.2" />
                
                {/* Orbit trajectory arcs */}
                <path d="M 10,20 Q 150,150 350,80" stroke="#2e4bd8" strokeWidth="0.5" strokeDasharray="3 3" fill="none" opacity="0.3" />
                <path d="M 20,380 Q 220,180 380,320" stroke="#2e4bd8" strokeWidth="0.5" fill="none" opacity="0.2" />
                
                {/* Target indicator ticks */}
                <path d="M 30,30 L 30,15 L 45,15" stroke="#2e4bd8" strokeWidth="1" opacity="0.4" />
                <path d="M 370,370 L 370,385 L 355,385" stroke="#2e4bd8" strokeWidth="1" opacity="0.4" />
              </svg>
            </div>

            {/* Overlapping photo cards */}
            <div className="collage-card card-1 photo">
              <img src={asset("/images/events/e1.png")} alt="SAST Event 1" />
              <span className="mono card-label">EVT_NEBULA</span>
            </div>
            <div className="collage-card card-2 photo">
              <img src={asset("/images/events/e2.png")} alt="SAST Event 2" />
              <span className="mono card-label">EVT_TRACKER</span>
            </div>
            <div className="collage-card card-3 photo">
              <img src={asset("/images/events/e3.png")} alt="SAST Event 3" />
              <span className="mono card-label">EVT_SAT_V2</span>
            </div>
            <div className="collage-card card-4 photo">
              <img src={asset("/images/events/e4.png")} alt="SAST Event 4" />
              <span className="mono card-label">EVT_MAPPING</span>
            </div>
            <div className="collage-card card-5 photo">
              <img src={asset("/images/events/e5.png")} alt="SAST Event 5" />
              <span className="mono card-label">EVT_T_DELTA</span>
            </div>
          </div>
        </div>
      </section>

      <div className="events-main-wrapper">
        {/* ── Background Depth Layer (Nebula, grids, CAD wireframes) ── */}
        <div className="roadmap-blueprint-bg">
          <svg viewBox="0 0 800 1800" preserveAspectRatio="none" width="100%" height="100%">
            <defs>
              <pattern id="eventsPageGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2e4bd8" strokeWidth="0.5" opacity="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#eventsPageGrid)" />
            
            {/* Muted deep-space glow blobs */}
            <circle cx="200" cy="300" r="250" fill="#2e4bd8" opacity="0.18" filter="blur(90px)" />
            <circle cx="700" cy="800" r="280" fill="#c084fc" opacity="0.16" filter="blur(110px)" />
            <circle cx="150" cy="1400" r="250" fill="#1d4ed8" opacity="0.15" filter="blur(100px)" />

            {/* Radar / Compass Wireframe (Left top) */}
            <g transform="translate(100, 250) scale(0.9)" opacity="0.32" stroke="#6e8cff" strokeWidth="1" fill="none">
              <circle cx="0" cy="0" r="90" />
              <circle cx="0" cy="0" r="70" strokeDasharray="4 4" />
              <circle cx="0" cy="0" r="40" />
              <line x1="-110" y1="0" x2="110" y2="0" />
              <line x1="0" y1="-110" x2="0" y2="110" />
              <path d="M -60,-60 L 60,60" />
              <path d="M -60,60 L 60,-60" />
            </g>

            {/* Rocket CAD Wireframe (Right mid) */}
            <g transform="translate(680, 750) scale(0.7)" opacity="0.35" stroke="#6e8cff" strokeWidth="1" fill="none">
              {/* Rocket Nose Cone */}
              <path d="M 0,-150 Q 35,-50 35,50 L -35,50 Q -35,-50 0,-150 Z" />
              {/* Rocket Body */}
              <rect x="-35" y="50" width="70" height="200" />
              <line x1="-35" y1="120" x2="35" y2="120" />
              <line x1="-35" y1="190" x2="35" y2="190" />
              {/* Fins */}
              <path d="M -35,210 L -75,260 L -35,250 Z" />
              <path d="M 35,210 L 75,260 L 35,250 Z" />
              {/* Engine nozzle */}
              <polygon points="-15,250 15,250 25,280 -25,280" />
              {/* Dimension lines */}
              <line x1="-90" y1="-150" x2="-90" y2="280" strokeDasharray="3 3" />
              <line x1="-95" y1="-150" x2="-85" y2="-150" />
              <line x1="-95" y1="280" x2="-85" y2="280" />
            </g>

            {/* Satellite CAD Wireframe (Left lower) */}
            <g transform="translate(120, 1300) scale(0.65)" opacity="0.32" stroke="#6e8cff" strokeWidth="1" fill="none">
              {/* Main bus */}
              <rect x="-40" y="-40" width="80" height="80" rx="4" />
              <circle cx="0" cy="0" r="20" />
              {/* Solar panels */}
              <rect x="-140" y="-20" width="100" height="40" />
              <line x1="-90" y1="-20" x2="-90" y2="20" />
              <rect x="40" y="-20" width="100" height="40" />
              <line x1="90" y1="-20" x2="90" y2="20" />
              {/* Communications dish */}
              <path d="M 0,-40 C -15,-65 15,-65 0,-40 Z" />
              <line x1="0" y1="-40" x2="0" y2="-75" />
              <circle cx="0" cy="-75" r="4" fill="#6e8cff" />
              {/* Orbit arc */}
              <path d="M -160,20 A 180,180 0 0 1 160,20" strokeDasharray="4 4" />
            </g>
          </svg>
        </div>

        {/* ── Main content sections ── */}
        <section className="section events-page" style={{ paddingTop: "32px", paddingBottom: "64px" }}>
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">Upcoming</span>
              <h2 className="display section-title">Mark your calendar</h2>
            </Reveal>
            <div className="events-list">
              {upcomingEvents.map((e, i) => (
                <EventRow e={e} i={i} key={e.title} />
              ))}
            </div>
          </div>
        </section>

        <section className="section events-page events-past" style={{ paddingBottom: "96px" }}>
          <div className="container">
            <Reveal className="section-head">
              <span className="eyebrow">Archive</span>
              <h2 className="display section-title">Past events</h2>
            </Reveal>
            <div className="events-list">
              {pastEvents.map((e, i) => (
                <EventRow e={e} i={i} key={e.title} past />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

