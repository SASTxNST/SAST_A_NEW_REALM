import { useMemo } from "react";
import Reveal from "../components/Reveal";
import { team } from "../data/team";

export default function Team() {
  const president = useMemo(() => team.find((m) => m.role === "President"), []);
  const vicePresidents = useMemo(() => team.filter((m) => m.role === "Vice President"), []);
  const members = useMemo(() => team.filter((m) => m.role === "Member"), []);

  return (
    <>
      <section className="page-hero page-hero-compact page-hero-centered">
        <div className="container">

          <Reveal>
            <span className="eyebrow">Team</span>
            <h1 className="display page-hero-title">The people behind it.</h1>
            <p className="lede">
              Every project on this site was built by students in the roster below.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section team-page">
        <div className="container">
          <div className="team-hierarchy">
            {/* ── President Row ── */}
            {president && (
              <div className="team-hierarchy-section">
                <Reveal>
                  <h2 className="team-group-title mono">President</h2>
                </Reveal>
                <div className="team-row-president">
                  <Reveal className="team-card team-card-leader">
                    <div className="team-photo photo">
                      <img src={president.image} alt={president.name} />
                    </div>
                    <h3 className="team-name">{president.name}</h3>
                    <p className="team-role mono">{president.role}</p>
                  </Reveal>
                </div>
              </div>
            )}

            {/* ── Vice Presidents Row ── */}
            {vicePresidents.length > 0 && (
              <div className="team-hierarchy-section">
                <Reveal>
                  <h2 className="team-group-title mono">Vice Presidents</h2>
                </Reveal>
                <div className="team-row-vps">
                  {vicePresidents.map((vp, idx) => (
                    <Reveal key={vp.name} delay={idx * 100} className="team-card team-card-leader">
                      <div className="team-photo photo">
                        <img src={vp.image} alt={vp.name} />
                      </div>
                      <h3 className="team-name">{vp.name}</h3>
                      <p className="team-role mono">{vp.role}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* ── Members Row ── */}
            {members.length > 0 && (
              <div className="team-hierarchy-section">
                <Reveal>
                  <h2 className="team-group-title mono">Team Members</h2>
                </Reveal>
                <div className="team-row-members">
                  {members.map((member, idx) => (
                    <Reveal key={member.name} delay={(idx % 6) * 60} className="team-card">
                      <div className="team-photo photo">
                        <img src={member.image} alt={member.name} />
                      </div>
                      <h3 className="team-name">{member.name}</h3>
                      <p className="team-role mono">{member.role}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

