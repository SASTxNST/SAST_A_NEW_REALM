import Reveal from "../components/Reveal";
import { achievements } from "../data/achievements";

export default function Achievements() {
  return (
    <>
      <section className="page-hero page-hero-compact">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Achievements</span>
            <h1 className="display page-hero-title">The mission log.</h1>
            <p className="lede">
              A running record of what SAST has built, won, and published —
              in the order it happened.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section timeline-section">
        <div className="container">
          <div className="timeline">
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={i * 80} className="timeline-row">
                <div className="timeline-marker">
                  <span className="mono">{a.date}</span>
                  <span className="timeline-dot" />
                </div>
                <div className="timeline-content panel">
                  <h3 className="timeline-title">{a.title}</h3>
                  <p className="timeline-detail">{a.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
