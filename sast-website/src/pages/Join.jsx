import { useState } from "react";
import Reveal from "../components/Reveal";
import OrbitRing from "../components/OrbitRing";

const STEPS = [
  {
    n: "01",
    title: "Apply",
    detail: "Fill out the form below with your interests and preferred division.",
  },
  {
    n: "02",
    title: "Info session",
    detail: "Attend a short group session — meet current members, see live projects.",
  },
  {
    n: "03",
    title: "Division interview",
    detail: "A casual 15-minute conversation with the division lead you're interested in.",
  },
  {
    n: "04",
    title: "Onboarding",
    detail: "Get added to the team, paired with a mentor, and placed on your first project.",
  },
];

const DIVISIONS = [
  "Tech team",
  "R&D team",
  "Product team",
  "Design team",
  "Electronics team",
  "Content creation team",
  "Not sure yet",
];

export default function Join() {
  const [form, setForm] = useState({ name: "", email: "", year: "", division: "", note: "" });
  const [submitted, setSubmitted] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // NOTE for SAST: wire this up to a real backend before launch —
    // e.g. Formspree, a Google Form, or EmailJS. This currently just
    // confirms locally so the flow can be reviewed end-to-end.
    setSubmitted(true);
  }

  return (
    <>
      <section className="page-hero">
        <OrbitRing className="page-hero-orbit" satellite={false} />
        <div className="container">
          <Reveal>
            <span className="eyebrow">Join SAST</span>
            <h1 className="display page-hero-title">
              No experience needed.<br />Just <span className="accent">curiosity</span>.
            </h1>
            <p className="lede">
              We take members at any level, from first-year beginners to upperclassmen
              switching tracks. Here's exactly how recruitment works.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section join-steps">
        <div className="container">
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 90} className="step-card panel">
                <span className="mono step-n">{s.n}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-detail">{s.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section join-form-section">
        <div className="container join-form-grid">
          <Reveal>
            <span className="eyebrow">Application</span>
            <h2 className="display section-title">Start here.</h2>
            <p className="lede">
              Takes about two minutes. We'll email you with next steps within a week.
            </p>
          </Reveal>

          <Reveal delay={100}>
            {submitted ? (
              <div className="panel form-success">
                <span className="eyebrow">Received</span>
                <h3 className="form-success-title">You're on the list.</h3>
                <p className="lede">
                  Thanks, {form.name.split(" ")[0] || "there"} — keep an eye on your inbox
                  for the next info session.
                </p>
              </div>
            ) : (
              <form className="join-form panel" onSubmit={handleSubmit}>
                <label className="field">
                  <span>Full name</span>
                  <input required type="text" value={form.name} onChange={update("name")} />
                </label>
                <label className="field">
                  <span>College email</span>
                  <input required type="email" value={form.email} onChange={update("email")} />
                </label>
                <div className="field-row">
                  <label className="field">
                    <span>Year</span>
                    <select required value={form.year} onChange={update("year")}>
                      <option value="" disabled>Select</option>
                      <option>1st year</option>
                      <option>2nd year</option>
                      <option>3rd year</option>
                      <option>4th year</option>
                    </select>
                  </label>
                  <label className="field">
                    <span>Interested division</span>
                    <select required value={form.division} onChange={update("division")}>
                      <option value="" disabled>Select</option>
                      {DIVISIONS.map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="field">
                  <span>Anything you'd like us to know? (optional)</span>
                  <textarea rows="3" value={form.note} onChange={update("note")} />
                </label>
                <button type="submit" className="btn btn-primary">
                  Submit application <span className="btn-arrow">&rarr;</span>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
