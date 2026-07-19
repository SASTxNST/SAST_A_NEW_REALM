import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Registrations() {
  const [passcode, setPasscode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("sast_recruits_auth") === "true"
  );
  const [authError, setAuthError] = useState("");
  
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5837";

  const fetchRegistrations = async (code) => {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch(`${API_URL}/api/registrations`, {
        headers: {
          "x-admin-passcode": code,
        },
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setRegistrations(result.data);
        setIsLoggedIn(true);
        sessionStorage.setItem("sast_recruits_auth", "true");
        sessionStorage.setItem("sast_recruits_code", code);
      } else {
        setAuthError(result.error || "Access Denied");
        setIsLoggedIn(false);
        sessionStorage.removeItem("sast_recruits_auth");
        sessionStorage.removeItem("sast_recruits_code");
      }
    } catch (err) {
      setAuthError("Failed to connect to the server.");
      setIsLoggedIn(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Attempt auto-login if session exists
    if (isLoggedIn) {
      const code = sessionStorage.getItem("sast_recruits_code");
      if (code) {
        fetchRegistrations(code);
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    fetchRegistrations(passcode);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRegistrations([]);
    sessionStorage.removeItem("sast_recruits_auth");
    sessionStorage.removeItem("sast_recruits_code");
  };

  if (!isLoggedIn) {
    return (
      <div className="page-container flex-center">
        <div className="join-form-wrapper" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="join-glow"></div>
          <div className="join-form-card panel" style={{ padding: '40px' }}>
            <div className="form-header">
              <span className="eyebrow" style={{ color: 'var(--ion)' }}>Secure Access</span>
              <h1 className="display" style={{ fontSize: '32px', marginBottom: '8px' }}>Recruit DB</h1>
              <p style={{ color: 'var(--bone-dim)', fontSize: '14px' }}>Enter clearance code to view operatives.</p>
            </div>

            <form onSubmit={handleLogin} className="join-form" style={{ marginTop: '24px' }}>
              <div className="input-group">
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="mono"
                  style={{ textAlign: 'center', letterSpacing: '4px' }}
                />
                <div className="input-line"></div>
              </div>

              {authError && (
                <div className="error-message mono" style={{ textAlign: 'center', marginTop: '16px' }}>
                  {authError}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '24px' }} disabled={loading}>
                {loading ? "Authenticating..." : "Authorize"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ padding: '120px 24px', minHeight: '100vh' }}>
      <div className="container">
        <div className="pane-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--ion)' }}>Active Records</span>
            <h1 className="display" style={{ fontSize: '48px' }}>Operatives</h1>
          </div>
          <button className="btn btn-ghost mono" onClick={handleLogout}>
            Logout Session
          </button>
        </div>

        {loading ? (
          <p className="mono" style={{ color: 'var(--ion)' }}>Loading records...</p>
        ) : (
          <div className="registrations-table-wrapper" style={{ overflowX: 'auto', background: 'var(--panel)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
              <thead style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--hairline)' }}>
                <tr>
                  <th className="mono font-sm" style={{ padding: '16px 24px', color: 'var(--bone-dim)', fontWeight: 'normal' }}>Operative Name</th>
                  <th className="mono font-sm" style={{ padding: '16px 24px', color: 'var(--bone-dim)', fontWeight: 'normal' }}>Contact (Email / Phone)</th>
                  <th className="mono font-sm" style={{ padding: '16px 24px', color: 'var(--bone-dim)', fontWeight: 'normal' }}>Requested Division</th>
                  <th className="mono font-sm" style={{ padding: '16px 24px', color: 'var(--bone-dim)', fontWeight: 'normal' }}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ padding: '32px 24px', textAlign: 'center', color: 'var(--bone-faint)' }}>No records found in database.</td>
                  </tr>
                ) : (
                  registrations.map((reg) => (
                    <tr key={reg._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontWeight: '500', color: 'var(--bone)' }}>{reg.name}</div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ color: 'var(--ion)', fontSize: '14px' }}>{reg.email}</div>
                        <div className="mono" style={{ color: 'var(--bone-dim)', fontSize: '12px', marginTop: '4px' }}>{reg.phone}</div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span className="mono" style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(110, 140, 255, 0.1)', color: 'var(--ion)', borderRadius: '100px', fontSize: '12px' }}>
                          {reg.team}
                        </span>
                      </td>
                      <td className="mono" style={{ padding: '16px 24px', color: 'var(--bone-dim)', fontSize: '12px' }}>
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
