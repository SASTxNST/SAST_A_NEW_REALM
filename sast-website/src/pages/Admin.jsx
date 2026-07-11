import { useState, useEffect } from "react";
import projectsData from "../data/projects.json";
import achievementsData from "../data/achievements.json";
import eventsData from "../data/events.json";
import teamData from "../data/team.json";
import divisionsData from "../data/divisions.json";
import aboutData from "../data/about.json";


// Toast Notification component/helper
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">
        {type === "success" && "✓"}
        {type === "error" && "✗"}
        {type === "info" && "ℹ"}
      </span>
      <span className="toast-message">{message}</span>
    </div>
  );
}

export default function Admin() {
  // Authentication State
  const [passcode, setPasscode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("sast_admin_auth") === "true"
  );
  const [authError, setAuthError] = useState("");

  // CMS Collections State
  const [projects, setProjects] = useState(projectsData);
  const [achievements, setAchievements] = useState(achievementsData);
  const [events, setEvents] = useState(eventsData);
  const [team, setTeam] = useState(teamData);
  const [divisions, setDivisions] = useState(divisionsData);
  const [about, setAbout] = useState(aboutData);

  // Active Management Tab
  const [activeTab, setActiveTab] = useState("dashboard");

  // Modal / Form States
  const [editingItem, setEditingItem] = useState(null); // { index, data } or { index: -1, data: empty } for adding
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { index, title, type }

  // Notification Toast State
  const [toasts, setToasts] = useState([]);

  // Check connection to CMS API
  const [apiOnline, setApiOnline] = useState(false);

  useEffect(() => {
    // Ping API to see if it is available (only in dev mode)
    fetch("/api/data?type=projects")
      .then((res) => {
        if (res.ok) setApiOnline(true);
      })
      .catch(() => setApiOnline(false));
  }, []);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id));
  };

  // Authenticate Passcode
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === "sast2026") {
      setIsLoggedIn(true);
      sessionStorage.setItem("sast_admin_auth", "true");
      setAuthError("");
      addToast("Access Authorized. Welcome back, Captain.", "success");
    } else {
      setAuthError("Incorrect access code. Access Denied.");
      addToast("Authentication Failed", "error");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("sast_admin_auth");
    addToast("Logged out successfully.", "info");
  };

  // API Call to Save Data
  const saveToDisk = async (type, updatedData) => {
    if (!apiOnline) {
      addToast(
        "Local API Offline. Changes saved locally in memory only. Run npm run dev to save to disk.",
        "error"
      );
      return false;
    }

    try {
      addToast(`Syncing ${type}.json to server...`, "info");
      const response = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data: updatedData }),
      });
      if (response.ok) {
        addToast(`${type.charAt(0).toUpperCase() + type.slice(1)} synchronized successfully!`, "success");
        return true;
      } else {
        const err = await response.json();
        addToast(`Failed to sync: ${err.error}`, "error");
        return false;
      }
    } catch (err) {
      addToast(`Error writing to disk: ${err.message}`, "error");
      return false;
    }
  };

  // Open Form for Adding
  const handleAddNew = () => {
    let defaultData = {};
    if (activeTab === "projects") {
      defaultData = { id: "", name: "", category: "Rocketry", status: "In development", year: new Date().getFullYear().toString(), summary: "", image: null };
    } else if (activeTab === "achievements") {
      defaultData = { date: new Date().getFullYear().toString(), title: "", detail: "" };
    } else if (activeTab === "events") {
      defaultData = { date: "", title: "", location: "", detail: "", isPast: false };
    } else if (activeTab === "team") {
      defaultData = { name: "", role: "", division: "Leadership", image: null };
    }

    setEditingItem({ index: -1, data: defaultData });
    setModalOpen(true);
  };

  // Open Form for Editing
  const handleEdit = (index, itemData) => {
    // If events, we want to know if it's past or upcoming based on context
    let dataCopy = { ...itemData };
    if (activeTab === "events") {
      dataCopy.isPast = index >= events.upcomingEvents.length;
      // Adjust index to index relative to parent lists
      const relativeIndex = dataCopy.isPast 
        ? index - events.upcomingEvents.length 
        : index;
      setEditingItem({ index: relativeIndex, data: dataCopy });
    } else {
      setEditingItem({ index, data: dataCopy });
    }
    setModalOpen(true);
  };

  // Handle Form Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { index, data } = editingItem;

    if (activeTab === "projects") {
      const updated = [...projects];
      // Generate ID from name if blank
      if (!data.id) {
        data.id = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      }
      if (index === -1) {
        updated.push(data);
      } else {
        updated[index] = data;
      }
      setProjects(updated);
      setModalOpen(false);
      await saveToDisk("projects", updated);
    } 
    
    else if (activeTab === "achievements") {
      const updated = [...achievements];
      if (index === -1) {
        updated.unshift(data); // Newest on top
      } else {
        updated[index] = data;
      }
      setAchievements(updated);
      setModalOpen(false);
      await saveToDisk("achievements", updated);
    } 
    
    else if (activeTab === "events") {
      const updated = {
        upcomingEvents: [...events.upcomingEvents],
        pastEvents: [...events.pastEvents]
      };

      // If we are editing and they changed the isPast status, we need to move it
      if (index !== -1) {
        const wasPast = editingItem.data.isPast;
        const isPastNow = data.isPast;
        
        // Remove from old list
        if (wasPast) {
          updated.pastEvents.splice(index, 1);
        } else {
          updated.upcomingEvents.splice(index, 1);
        }

        // Add to new list
        if (isPastNow) {
          updated.pastEvents.unshift(data);
        } else {
          updated.upcomingEvents.unshift(data);
        }
      } else {
        // Adding new event
        if (data.isPast) {
          updated.pastEvents.unshift(data);
        } else {
          updated.upcomingEvents.unshift(data);
        }
      }

      // Cleanup temp parameter
      const cleanedUpcoming = updated.upcomingEvents.map(({ isPast, ...rest }) => rest);
      const cleanedPast = updated.pastEvents.map(({ isPast, ...rest }) => rest);
      const finalEvents = { upcomingEvents: cleanedUpcoming, pastEvents: cleanedPast };

      setEvents(finalEvents);
      setModalOpen(false);
      await saveToDisk("events", finalEvents);
    } 
    
    else if (activeTab === "team") {
      const updated = [...team];
      if (index === -1) {
        updated.push(data);
      } else {
        updated[index] = data;
      }
      setTeam(updated);
      setModalOpen(false);
      await saveToDisk("team", updated);
    } 
    
    else if (activeTab === "divisions") {
      const updated = [...divisions];
      updated[index] = data;
      setDivisions(updated);
      setModalOpen(false);
      await saveToDisk("divisions", updated);
    }
  };

  const handleAboutSubmit = async (e) => {
    e.preventDefault();
    await saveToDisk("about", about);
  };

  // Open Delete Confirmation
  const handleDeleteClick = (index, title, itemType) => {
    setDeleteConfirm({ index, title, type: itemType });
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    const { index, type } = deleteConfirm;
    
    if (type === "projects") {
      const updated = projects.filter((_, i) => i !== index);
      setProjects(updated);
      await saveToDisk("projects", updated);
    } 
    
    else if (type === "achievements") {
      const updated = achievements.filter((_, i) => i !== index);
      setAchievements(updated);
      await saveToDisk("achievements", updated);
    } 
    
    else if (type === "events") {
      const updated = {
        upcomingEvents: [...events.upcomingEvents],
        pastEvents: [...events.pastEvents]
      };
      
      const isPast = index >= events.upcomingEvents.length;
      if (isPast) {
        updated.pastEvents.splice(index - events.upcomingEvents.length, 1);
      } else {
        updated.upcomingEvents.splice(index, 1);
      }

      setEvents(updated);
      await saveToDisk("events", updated);
    } 
    
    else if (type === "team") {
      const updated = team.filter((_, i) => i !== index);
      setTeam(updated);
      await saveToDisk("team", updated);
    }

    setDeleteConfirm(null);
    addToast("Item deleted successfully", "success");
  };

  // If not logged in, render passcode entry
  if (!isLoggedIn) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-glow"></div>
        <div className="admin-login-card panel">
          <span className="eyebrow">Secure Access</span>
          <h1 className="display login-title">SAST Terminal</h1>
          <p className="login-subtitle">Enter command passcode to manage content database.</p>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <input
                required
                type="password"
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="login-input"
              />
              <div className="input-line"></div>
            </div>
            
            {authError && <p className="auth-error-msg mono">{authError}</p>}
            
            <button type="submit" className="btn btn-primary login-btn">
              Authorize <span className="btn-arrow">&rarr;</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* Toast Alert stack */}
      <div className="toast-container">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </div>

      {/* Admin Shell */}
      <div className="admin-shell">
        
        {/* Sidebar Nav */}
        <aside className="admin-sidebar panel">
          <div className="sidebar-header">
            <span className="eyebrow sidebar-eyebrow">CMS Terminal</span>
            <h2 className="display sidebar-logo">SAST HQ</h2>
          </div>
          
          <nav className="sidebar-nav">
            <button
              className={`nav-item mono ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`nav-item mono ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </button>
            <button
              className={`nav-item mono ${activeTab === "achievements" ? "active" : ""}`}
              onClick={() => setActiveTab("achievements")}
            >
              Achievements
            </button>
            <button
              className={`nav-item mono ${activeTab === "events" ? "active" : ""}`}
              onClick={() => setActiveTab("events")}
            >
              Events
            </button>
            <button
              className={`nav-item mono ${activeTab === "team" ? "active" : ""}`}
              onClick={() => setActiveTab("team")}
            >
              Team Roster
            </button>
            <button
              className={`nav-item mono ${activeTab === "divisions" ? "active" : ""}`}
              onClick={() => setActiveTab("divisions")}
            >
              Divisions
            </button>
            <button
              className={`nav-item mono ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              About Page
            </button>
          </nav>

          <div className="sidebar-footer">
            <div className="api-status mono">
              <span className={`status-dot ${apiOnline ? "online" : "offline"}`}></span>
              {apiOnline ? "API connected" : "API offline (static)"}
            </div>
            <button className="btn btn-ghost logout-btn mono" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="admin-content">
          
          {/* TAB: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="admin-tab-pane">
              <span className="eyebrow">Telemetry</span>
              <h1 className="display tab-title">Operations Dashboard</h1>
              <p className="tab-subtitle">Real-time CMS data links and active site statistics.</p>
              
              <div className="stats-grid-cms">
                <div className="stat-card panel" onClick={() => setActiveTab("projects")}>
                  <span className="stat-num display">{projects.length}</span>
                  <span className="stat-lbl mono">Projects Built</span>
                </div>
                <div className="stat-card panel" onClick={() => setActiveTab("achievements")}>
                  <span className="stat-num display">{achievements.length}</span>
                  <span className="stat-lbl mono">Mission Log Entries</span>
                </div>
                <div className="stat-card panel" onClick={() => setActiveTab("events")}>
                  <span className="stat-num display">
                    {(events.upcomingEvents?.length || 0) + (events.pastEvents?.length || 0)}
                  </span>
                  <span className="stat-lbl mono">Scheduled Events</span>
                </div>
                <div className="stat-card panel" onClick={() => setActiveTab("team")}>
                  <span className="stat-num display">{team.length}</span>
                  <span className="stat-lbl mono">Team Roster Size</span>
                </div>
              </div>

              <div className="cms-welcome-panel panel">
                <h3 className="welcome-headline">Content Management System Operations</h3>
                <p className="welcome-text">
                  Welcome to the SAST Admin panel. Updates made here are saved directly into 
                  the project's JSON files when run locally in development. The website's pages will dynamically re-render the modifications.
                </p>
                <div className="welcome-tips mono">
                  <h4>💡 Editor Tips:</h4>
                  <ul>
                    <li>To publish updates to the production website, simply perform modifications here and push/commit the updated JSON files.</li>
                    <li>Always use high-resolution external image paths or relative paths inside the public folder.</li>
                    <li>Double check upcoming vs archive dates for events to place them in the correct categories.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === "projects" && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <span className="eyebrow">Deployments</span>
                  <h1 className="display tab-title">Manage Projects</h1>
                </div>
                <button className="btn btn-primary" onClick={handleAddNew}>
                  + Add Project
                </button>
              </div>

              <div className="cms-list">
                {projects.length === 0 ? (
                  <p className="mono no-items">No projects found. Add one to get started.</p>
                ) : (
                  projects.map((p, idx) => (
                    <div key={p.id || idx} className="cms-row panel">
                      <div className="row-info">
                        <span className="row-meta mono">{p.category} &middot; {p.status} ({p.year})</span>
                        <h3 className="row-main-title">{p.name}</h3>
                        <p className="row-desc">{p.summary}</p>
                      </div>
                      <div className="row-actions-cms">
                        <button className="btn btn-ghost btn-sm mono" onClick={() => handleEdit(idx, p)}>
                          Edit
                        </button>
                        <button 
                          className="btn btn-ghost btn-sm btn-danger mono" 
                          onClick={() => handleDeleteClick(idx, p.name, "projects")}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: ACHIEVEMENTS */}
          {activeTab === "achievements" && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <span className="eyebrow">Milestones</span>
                  <h1 className="display tab-title">Achievements Log</h1>
                </div>
                <button className="btn btn-primary" onClick={handleAddNew}>
                  + Add Milestone
                </button>
              </div>

              <div className="cms-list">
                {achievements.length === 0 ? (
                  <p className="mono no-items">No achievements recorded.</p>
                ) : (
                  achievements.map((a, idx) => (
                    <div key={idx} className="cms-row panel">
                      <div className="row-info">
                        <span className="row-meta mono">Year: {a.date}</span>
                        <h3 className="row-main-title">{a.title}</h3>
                        <p className="row-desc">{a.detail}</p>
                      </div>
                      <div className="row-actions-cms">
                        <button className="btn btn-ghost btn-sm mono" onClick={() => handleEdit(idx, a)}>
                          Edit
                        </button>
                        <button 
                          className="btn btn-ghost btn-sm btn-danger mono" 
                          onClick={() => handleDeleteClick(idx, a.title, "achievements")}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: EVENTS */}
          {activeTab === "events" && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <span className="eyebrow">Schedule</span>
                  <h1 className="display tab-title">Events Scheduler</h1>
                </div>
                <button className="btn btn-primary" onClick={handleAddNew}>
                  + Add Event
                </button>
              </div>

              <div className="cms-events-split">
                <div className="events-sub-pane">
                  <h3 className="sub-pane-title display">Upcoming</h3>
                  <div className="cms-list">
                    {(events.upcomingEvents || []).map((e, idx) => (
                      <div key={idx} className="cms-row panel">
                        <div className="row-info">
                          <span className="row-meta mono">{e.date} &middot; {e.location}</span>
                          <h4 className="row-main-title">{e.title}</h4>
                          <p className="row-desc">{e.detail}</p>
                        </div>
                        <div className="row-actions-cms">
                          <button className="btn btn-ghost btn-sm mono" onClick={() => handleEdit(idx, e)}>
                            Edit
                          </button>
                          <button 
                            className="btn btn-ghost btn-sm btn-danger mono" 
                            onClick={() => handleDeleteClick(idx, e.title, "events")}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="events-sub-pane">
                  <h3 className="sub-pane-title display">Archived (Past)</h3>
                  <div className="cms-list">
                    {(events.pastEvents || []).map((e, idx) => {
                      const absoluteIdx = (events.upcomingEvents?.length || 0) + idx;
                      return (
                        <div key={idx} className="cms-row panel event-row-past-cms">
                          <div className="row-info">
                            <span className="row-meta mono">{e.date} &middot; {e.location}</span>
                            <h4 className="row-main-title">{e.title}</h4>
                            <p className="row-desc">{e.detail}</p>
                          </div>
                          <div className="row-actions-cms">
                            <button className="btn btn-ghost btn-sm mono" onClick={() => handleEdit(absoluteIdx, e)}>
                              Edit
                            </button>
                            <button 
                              className="btn btn-ghost btn-sm btn-danger mono" 
                              onClick={() => handleDeleteClick(absoluteIdx, e.title, "events")}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TEAM */}
          {activeTab === "team" && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <span className="eyebrow">Roster</span>
                  <h1 className="display tab-title">Team Roster</h1>
                </div>
                <button className="btn btn-primary" onClick={handleAddNew}>
                  + Add Member
                </button>
              </div>

              <div className="cms-list">
                {team.length === 0 ? (
                  <p className="mono no-items">No members found.</p>
                ) : (
                  team.map((m, idx) => (
                    <div key={idx} className="cms-row panel">
                      <div className="row-info">
                        <span className="row-meta mono">Division: {m.division}</span>
                        <h3 className="row-main-title">{m.name}</h3>
                        <p className="row-desc mono font-sm">{m.role}</p>
                        {m.image && <p className="row-desc mono font-xs text-dim">Image path: {m.image}</p>}
                      </div>
                      <div className="row-actions-cms">
                        <button className="btn btn-ghost btn-sm mono" onClick={() => handleEdit(idx, m)}>
                          Edit
                        </button>
                        <button 
                          className="btn btn-ghost btn-sm btn-danger mono" 
                          onClick={() => handleDeleteClick(idx, m.name, "team")}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: DIVISIONS */}
          {activeTab === "divisions" && (
            <div className="admin-tab-pane">
              <div className="pane-header">
                <div>
                  <span className="eyebrow">Divisions</span>
                  <h1 className="display tab-title">Manage Divisions</h1>
                  <p className="tab-subtitle">Edit the descriptions of the five core organizational units.</p>
                </div>
              </div>

              <div className="cms-list">
                {divisions.map((d, idx) => (
                  <div key={idx} className="cms-row panel">
                    <div className="row-info">
                      <span className="row-meta mono">Division {String(idx + 1).padStart(2, "0")}</span>
                      <h3 className="row-main-title">{d.name}</h3>
                      <p className="row-desc">{d.blurb}</p>
                    </div>
                    <div className="row-actions-cms">
                      <button className="btn btn-ghost btn-sm mono" onClick={() => handleEdit(idx, d)}>
                        Edit Blurb
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ABOUT PAGE */}
          {activeTab === "about" && (
            <div className="admin-tab-pane">
              <span className="eyebrow">Content</span>
              <h1 className="display tab-title">Edit About Page</h1>
              <p className="tab-subtitle">Modify titles, taglines, and narratives on the About page. Supports inline HTML like line breaks.</p>
              
              <form onSubmit={handleAboutSubmit} className="panel cms-welcome-panel modal-form" style={{ marginTop: 24 }}>
                <label className="cms-field">
                  <span>Hero Title</span>
                  <input
                    required
                    type="text"
                    value={about.heroTitle}
                    onChange={(e) => setAbout({ ...about, heroTitle: e.target.value })}
                  />
                </label>
                <label className="cms-field">
                  <span>Hero Lede (Introductory Paragraph)</span>
                  <textarea
                    required
                    rows="3"
                    value={about.heroLede}
                    onChange={(e) => setAbout({ ...about, heroLede: e.target.value })}
                  />
                </label>
                <label className="cms-field">
                  <span>Story Block Title ("Why we exist")</span>
                  <input
                    required
                    type="text"
                    value={about.storyTitle}
                    onChange={(e) => setAbout({ ...about, storyTitle: e.target.value })}
                  />
                </label>
                <label className="cms-field">
                  <span>Story Paragraph 1</span>
                  <textarea
                    required
                    rows="4"
                    value={about.storyParagraph1}
                    onChange={(e) => setAbout({ ...about, storyParagraph1: e.target.value })}
                  />
                </label>
                <label className="cms-field">
                  <span>Story Paragraph 2</span>
                  <textarea
                    required
                    rows="4"
                    value={about.storyParagraph2}
                    onChange={(e) => setAbout({ ...about, storyParagraph2: e.target.value })}
                  />
                </label>
                
                <div style={{ marginTop: 12 }}>
                  <button type="submit" className="btn btn-primary">
                    Save About Info
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: ADD / EDIT DIALOG */}
      {modalOpen && editingItem && (
        <div className="admin-modal-overlay">
          <div className="admin-modal panel">
            <div className="modal-header">
              <h2 className="display modal-title">
                {editingItem.index === -1 ? "Add New Record" : "Edit Record"}
              </h2>
              <button className="modal-close-btn display" onClick={() => setModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="modal-form">
              
              {/* Form inputs based on Active Tab */}
              {activeTab === "projects" && (
                <>
                  <label className="cms-field">
                    <span>Project Name</span>
                    <input
                      required
                      type="text"
                      value={editingItem.data.name}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, name: e.target.value }
                      })}
                    />
                  </label>
                  <div className="field-grid-cms">
                    <label className="cms-field">
                      <span>Category</span>
                      <select
                        value={editingItem.data.category}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, category: e.target.value }
                        })}
                      >
                        <option>Tech team</option>
                        <option>R&D team</option>
                        <option>Product team</option>
                        <option>Design team</option>
                        <option>Electronics team</option>
                        <option>Content creation team</option>
                      </select>
                    </label>
                    <label className="cms-field">
                      <span>Status</span>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Flown, Research, In development"
                        value={editingItem.data.status}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, status: e.target.value }
                        })}
                      />
                    </label>
                  </div>
                  <div className="field-grid-cms">
                    <label className="cms-field">
                      <span>Year</span>
                      <input
                        required
                        type="text"
                        value={editingItem.data.year}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, year: e.target.value }
                        })}
                      />
                    </label>
                    <label className="cms-field">
                      <span>Image URL / Path (Optional)</span>
                      <input
                        type="text"
                        placeholder="e.g., /images/my-project.jpg"
                        value={editingItem.data.image || ""}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, image: e.target.value || null }
                        })}
                      />
                    </label>
                  </div>
                  <label className="cms-field">
                    <span>Project Summary</span>
                    <textarea
                      required
                      rows="4"
                      value={editingItem.data.summary}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, summary: e.target.value }
                      })}
                    />
                  </label>
                </>
              )}

              {activeTab === "achievements" && (
                <>
                  <div className="field-grid-cms">
                    <label className="cms-field">
                      <span>Timeline Date / Year</span>
                      <input
                        required
                        type="text"
                        placeholder="e.g. 2026, OCT 2025"
                        value={editingItem.data.date}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, date: e.target.value }
                        })}
                      />
                    </label>
                    <label className="cms-field">
                      <span>Milestone Title</span>
                      <input
                        required
                        type="text"
                        value={editingItem.data.title}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, title: e.target.value }
                        })}
                      />
                    </label>
                  </div>
                  <label className="cms-field">
                    <span>Milestone Detail Description</span>
                    <textarea
                      required
                      rows="4"
                      value={editingItem.data.detail}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, detail: e.target.value }
                      })}
                    />
                  </label>
                </>
              )}

              {activeTab === "events" && (
                <>
                  <label className="cms-field">
                    <span>Event Title</span>
                    <input
                      required
                      type="text"
                      value={editingItem.data.title}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, title: e.target.value }
                      })}
                    />
                  </label>
                  <div className="field-grid-cms">
                    <label className="cms-field">
                      <span>Date String</span>
                      <input
                        required
                        type="text"
                        placeholder="e.g. AUG 14, 2026"
                        value={editingItem.data.date}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, date: e.target.value }
                        })}
                      />
                    </label>
                    <label className="cms-field">
                      <span>Location</span>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Room 204"
                        value={editingItem.data.location}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, location: e.target.value }
                        })}
                      />
                    </label>
                  </div>
                  <label className="cms-field cms-checkbox-label">
                    <input
                      type="checkbox"
                      checked={editingItem.data.isPast}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, isPast: e.target.checked }
                      })}
                    />
                    <span>Archive Event (Mark as Past)</span>
                  </label>
                  <label className="cms-field">
                    <span>Event Details</span>
                    <textarea
                      required
                      rows="3"
                      value={editingItem.data.detail}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, detail: e.target.value }
                      })}
                    />
                  </label>
                </>
              )}

              {activeTab === "team" && (
                <>
                  <div className="field-grid-cms">
                    <label className="cms-field">
                      <span>Full Name</span>
                      <input
                        required
                        type="text"
                        value={editingItem.data.name}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, name: e.target.value }
                        })}
                      />
                    </label>
                    <label className="cms-field">
                      <span>Role</span>
                      <input
                        required
                        type="text"
                        placeholder="e.g. President, Avionics Lead"
                        value={editingItem.data.role}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, role: e.target.value }
                        })}
                      />
                    </label>
                  </div>
                  <div className="field-grid-cms">
                    <label className="cms-field">
                      <span>Division</span>
                      <select
                        value={editingItem.data.division}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, division: e.target.value }
                        })}
                      >
                        <option>Leadership</option>
                        <option>Tech team</option>
                        <option>R&D team</option>
                        <option>Product team</option>
                        <option>Design team</option>
                        <option>Electronics team</option>
                        <option>Content creation team</option>
                        <option>Advisory</option>
                      </select>
                    </label>
                    <label className="cms-field">
                      <span>Avatar Image URL (Optional)</span>
                      <input
                        type="text"
                        placeholder="e.g. /images/avatars/john.jpg"
                        value={editingItem.data.image || ""}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, image: e.target.value || null }
                        })}
                      />
                    </label>
                  </div>
                </>
              )}

              {activeTab === "divisions" && (
                <>
                  <label className="cms-field">
                    <span>Division Name</span>
                    <input
                      disabled
                      type="text"
                      className="disabled-input"
                      value={editingItem.data.name}
                    />
                  </label>
                  <label className="cms-field">
                    <span>Blurb / Description</span>
                    <textarea
                      required
                      rows="4"
                      value={editingItem.data.blurb}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        data: { ...editingItem.data, blurb: e.target.value }
                      })}
                    />
                  </label>
                </>
              )}

              <div className="modal-actions-cms">
                <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION DIALOG: DELETE */}
      {deleteConfirm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal delete-confirm-modal panel">
            <h3 className="display delete-confirm-title">Confirm Deletion</h3>
            <p className="delete-confirm-text">
              Are you sure you want to permanently delete <strong>{deleteConfirm.title}</strong>? 
              This will update the database file on disk immediately.
            </p>
            <div className="delete-confirm-actions">
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="btn btn-primary delete-btn-confirm" onClick={handleConfirmDelete}>
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
