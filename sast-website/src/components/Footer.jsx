import { Link } from "react-router-dom";
import { asset } from "../utils/asset";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={asset("/assets/logo.png")} alt="SAST" className="footer-logo" />
          <p className="footer-tagline">Powered by curiosity, driven by stars.</p>
          <div className="footer-campaign">A NEW REALM</div>
        </div>

        <div className="footer-col">
          <span className="eyebrow">Navigate</span>
          <div className="footer-links-grid">
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/events">Events</Link>
            <Link to="/team">Team</Link>
            <Link to="/join">Join SAST</Link>
            <Link to="/admin" style={{ opacity: 0.4 }}>Admin Panel</Link>
          </div>
        </div>

        <div className="footer-col">
          <span className="eyebrow">Reach us</span>
          <a href="mailto:sast@rishihood.edu.in" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.8 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            sast@rishihood.edu.in
          </a>
          <a href="https://www.instagram.com/sast.rishihood/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.8 }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            Instagram
          </a>
          <a href="https://www.linkedin.com/company/society-for-aerospace-and-space-technology" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.8 }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            LinkedIn
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>&copy; {year} Society for Aerospace and Technology</span>
        <span className="footer-mono">SAST // MISSION LOG ACTIVE</span>
      </div>
    </footer>
  );
}
