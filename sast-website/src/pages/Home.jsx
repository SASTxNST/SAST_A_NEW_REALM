import { Link } from "react-router-dom";
import OrbitRing from "../components/OrbitRing";
import Reveal from "../components/Reveal";
import { achievements } from "../data/achievements";
import { upcomingEvents } from "../data/events";
import { projects } from "../data/projects";

const STATS = [
  { value: "40+", label: "Active members" },
  { value: "12", label: "Projects built" },
  { value: "3", label: "Launches flown" },
  { value: "6", label: "Awards won" },
];

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <span className="hero-watermark display-hollow" aria-hidden="true">SAST</span>
        <OrbitRing className="hero-orbit" />
        <div className="container hero-inner">
          <span className="eyebrow">Society for Aerospace and Technology</span>
          <h1 className="display hero-title">
            We build what<br />
            most people only <span className="accent">launch</span>.
          </h1>
          <p className="lede hero-lede">
            SAST is a student-run aerospace and technology club — rockets, satellites,
            autonomous systems, and the research behind them. Powered by curiosity,
            driven by stars.
          </p>
          <div className="hero-actions">
            <Link to="/join" className="btn btn-primary">
              Join SAST <span className="btn-arrow">&rarr;</span>
            </Link>
            <Link to="/projects" className="btn btn-ghost">
              See our projects
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Stats readout ---------- */}
      <section className="stats-strip">
        <div className="container stats-grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="stat">
              <span className="stat-value display">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </Reveal>
          ))}
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

      {/* ---------- Achievements teaser ---------- */}
      <section className="section achievements-teaser">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Mission Log</span>
            <h2 className="display section-title">Recent achievements</h2>
          </Reveal>

          <div className="log-list">
            {achievements.slice(0, 3).map((a, i) => (
              <Reveal key={a.title} delay={i * 90} as="div" className="log-row">
                <span className="log-date mono">{a.date}</span>
                <div>
                  <h3 className="log-title">{a.title}</h3>
                  <p className="log-detail">{a.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Link to="/achievements" className="btn btn-ghost">
            View all achievements <span className="btn-arrow">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* ---------- Projects teaser ---------- */}
      <section className="section projects-teaser">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Currently building</span>
            <h2 className="display section-title">Active projects</h2>
          </Reveal>
          <div className="teaser-grid">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <Link to="/projects" className="project-card panel">
                  <div className="project-card-top">
                    <span className="mono project-status">{p.status}</span>
                    <span className="mono">{p.year}</span>
                  </div>
                  <h3 className="display project-card-name">{p.name}</h3>
                  <p className="project-card-cat">{p.category}</p>
                </Link>
              </Reveal>
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
