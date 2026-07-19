import { useState } from "react";
import DIVISIONS from "../data/divisions.json";

export default function Join() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    team: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user types
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required.";
    
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
    if (!phoneRegex.test(formData.phone)) return "Please enter a valid phone number.";
    
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) return "Please enter a valid email address.";
    
    if (!formData.team) return "Please select a team to join.";
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Allow overriding API URL via Vite env vars, fallback to localhost for dev
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5837';
      
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong during registration');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-container">
      {/* Scanline overlay for aesthetic */}
      <div className="terminal-scanlines" aria-hidden="true" />
      <div className="terminal-vignette" aria-hidden="true" />

      <div className="join-card panel">
        <h1 className="display">Join SAST</h1>
        <p className="lede">Embark on a new mission. Complete the form below to initiate onboarding.</p>

        {success ? (
          <div className="success-message-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="success-message">
              <span className="terminal-cursor">█</span>
              <p className="accent">Thanks, our team will reach out to you soon and schedule an interview for you, please be prepared accordingly</p>
            </div>
            <div className="contact-info" style={{ fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--bone)', lineHeight: '1.6', background: 'var(--panel)', padding: '24px', borderRadius: 'var(--radius)', border: '1px solid var(--hairline)' }}>
              <p style={{ color: 'var(--ion)', marginBottom: '16px', fontFamily: 'var(--display)', fontSize: '18px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Reach out to us</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ion)' }}>
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <a href="mailto:sast@rishihood.edu.in" style={{ color: 'var(--bone)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--ion)'} onMouseOut={(e) => e.target.style.color = 'var(--bone)'}>sast@rishihood.edu.in</a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ion)' }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>9548889129 <span style={{ color: 'var(--bone-faint)' }}>(Aadi Kalra, Vice president)</span></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ion)' }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>9693662269 <span style={{ color: 'var(--bone-faint)' }}>(Prachi Choubey, Vice president)</span></span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form className="join-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name" className="eyebrow">Operative Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="eyebrow">Comm Link (Phone)</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number" 
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="eyebrow">Transmission Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address" 
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="team" className="eyebrow">Select Division</label>
              <div className="select-wrapper">
                <select 
                  id="team" 
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select a team...</option>
                  {DIVISIONS.map((div, i) => (
                    <option key={i} value={div.name}>{div.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="form-error">
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary join-submit" disabled={loading}>
              {loading ? "Transmitting..." : "Initiate Sequence"}
              {!loading && <span className="btn-arrow">→</span>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
