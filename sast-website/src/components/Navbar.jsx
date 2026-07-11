import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { asset } from "../utils/asset";

const LINKS = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/events", label: "Events" },
  { to: "/team", label: "Team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-brand" onClick={() => setOpen(false)}>
          <img src={asset("/assets/logo.png")} alt="SAST" />
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/join" className="btn btn-primary nav-cta">
          Join SAST
        </Link>

        <button
          className={`nav-burger ${open ? "nav-burger-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav-mobile ${open ? "nav-mobile-open" : ""}`}>
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className="nav-mobile-link"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
        <Link to="/join" className="btn btn-primary" onClick={() => setOpen(false)}>
          Join SAST
        </Link>
      </div>
    </header>
  );
}
