import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

export default function PartnerDashboard() {
  const navigate = useNavigate();
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Check if partner is logged in (unified login system)
    const storedUser = localStorage.getItem("userData");
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("authToken");

    if (!storedUser || userRole !== "partner" || !token) {
      navigate("/login");
      return;
    }

    // Load partner data
    const partner = JSON.parse(storedUser);
    setPartnerData(partner);
    setLoading(false);

    // Fetch latest data from backend
    fetchPartnerData(partner.email);
  }, [navigate]);

  const fetchPartnerData = async (email) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.PARTNERS}/${email}`);
      if (response.ok) {
        const data = await response.json();
        if (data.partner) {
          setPartnerData(data.partner);
          localStorage.setItem("userData", JSON.stringify(data.partner));
        }
      }
    } catch (error) {
      console.error("Error fetching partner data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="loading-spinner"
        />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!partnerData) {
    return null;
  }

  const partnerTypeLabels = {
    sponsor: "💼 Sponsor",
    academy: "🏫 Sports Academy",
    manager: "🎯 Event Manager",
    equipment: "⚽ Equipment Provider",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="partner-dashboard-page"
    >
      <div className="partner-dashboard-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-header"
        >
          <div>
            <h1>
              <span className="header-icon">🤝</span>
              Partner Dashboard
            </h1>
            <p>Welcome back, {partnerData.contactPerson || partnerData.organizationName}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </motion.button>
        </motion.div>

        <div className="dashboard-tabs">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "profile", label: "Profile", icon: "👤" },
            { id: "tournaments", label: "My Tournaments", icon: "🏆" },
            { id: "sponsorships", label: "Sponsorships", icon: "💼" },
            { id: "events", label: "Events", icon: "📅" },
            { id: "marketing", label: "Marketing", icon: "📢" },
            { id: "analytics", label: "Analytics", icon: "📈" },
            { id: "contacts", label: "Contacts", icon: "📞" },
            { id: "settings", label: "Settings", icon: "⚙️" },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`dashboard-tab ${activeTab === tab.id ? "active" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        <div className="dashboard-content">
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>Overview</h2>
              <div className="overview-grid">
                <div className="overview-item">
                  <div className="overview-icon">🏢</div>
                  <div>
                    <h3>Organization</h3>
                    <p>{partnerData.organizationName}</p>
                  </div>
                </div>
                <div className="overview-item">
                  <div className="overview-icon">🏷️</div>
                  <div>
                    <h3>Partner Type</h3>
                    <p>{partnerTypeLabels[partnerData.partnerType] || partnerData.partnerType}</p>
                  </div>
                </div>
                <div className="overview-item">
                  <div className="overview-icon">📧</div>
                  <div>
                    <h3>Email</h3>
                    <p>{partnerData.email}</p>
                  </div>
                </div>
                <div className="overview-item">
                  <div className="overview-icon">📱</div>
                  <div>
                    <h3>Phone</h3>
                    <p>{partnerData.phone}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>Profile Information</h2>
              <div className="profile-details">
                <div className="profile-section">
                  <h3>Organization Details</h3>
                  <div className="detail-row">
                    <span className="detail-label">Organization Name:</span>
                    <span className="detail-value">{partnerData.organizationName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Partner Type:</span>
                    <span className="detail-value">{partnerTypeLabels[partnerData.partnerType] || partnerData.partnerType}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Contact Person:</span>
                    <span className="detail-value">{partnerData.contactPerson}</span>
                  </div>
                </div>

                <div className="profile-section">
                  <h3>Contact Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{partnerData.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{partnerData.phone}</span>
                  </div>
                  {partnerData.website && (
                    <div className="detail-row">
                      <span className="detail-label">Website:</span>
                      <span className="detail-value">
                        <a href={partnerData.website} target="_blank" rel="noopener noreferrer">
                          {partnerData.website}
                        </a>
                      </span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{partnerData.address}</span>
                  </div>
                </div>

                <div className="profile-section">
                  <h3>About</h3>
                  <div className="detail-row full-width">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">{partnerData.description}</span>
                  </div>
                  <div className="detail-row full-width">
                    <span className="detail-label">Services:</span>
                    <span className="detail-value">{partnerData.services}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "tournaments" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>My Tournaments</h2>
              <div className="partner-tournaments">
                <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "2rem" }}>
                  Tournaments associated with your organization will appear here.
                  <br />
                  Contact admin to link tournaments to your account.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "sponsorships" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>My Sponsorships</h2>
              <div className="sponsorships-section">
                <div className="section-header">
                  <h3>Active Sponsorships</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary"
                  >
                    + New Sponsorship
                  </motion.button>
                </div>
                <div className="sponsorships-list">
                  <div className="sponsorship-item">
                    <div className="sponsorship-icon">🏆</div>
                    <div className="sponsorship-details">
                      <h4>Summer Championship 2024</h4>
                      <p>Status: Active | Amount: $5,000 | Duration: 3 months</p>
                    </div>
                    <div className="sponsorship-actions">
                      <button className="btn-small">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "events" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>Event Management</h2>
              <div className="events-section">
                <div className="section-header">
                  <h3>My Events</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary"
                  >
                    + Create Event
                  </motion.button>
                </div>
                <div className="events-grid">
                  <div className="event-card">
                    <div className="event-icon">📅</div>
                    <h4>Upcoming Events</h4>
                    <p>View and manage your scheduled events</p>
                    <button className="btn-small">View All</button>
                  </div>
                  <div className="event-card">
                    <div className="event-icon">✅</div>
                    <h4>Past Events</h4>
                    <p>Review completed events and results</p>
                    <button className="btn-small">View History</button>
                  </div>
                  <div className="event-card">
                    <div className="event-icon">📊</div>
                    <h4>Event Analytics</h4>
                    <p>Track performance and engagement</p>
                    <button className="btn-small">View Reports</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "marketing" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>Marketing Tools</h2>
              <div className="marketing-section">
                <div className="marketing-grid">
                  <div className="marketing-item">
                    <div className="marketing-icon">📢</div>
                    <h3>Promotional Materials</h3>
                    <p>Create and download marketing assets</p>
                    <button className="btn-small">Access Materials</button>
                  </div>
                  <div className="marketing-item">
                    <div className="marketing-icon">📱</div>
                    <h3>Social Media</h3>
                    <p>Share events and updates</p>
                    <button className="btn-small">Share Now</button>
                  </div>
                  <div className="marketing-item">
                    <div className="marketing-icon">📧</div>
                    <h3>Email Campaigns</h3>
                    <p>Send newsletters and updates</p>
                    <button className="btn-small">Create Campaign</button>
                  </div>
                  <div className="marketing-item">
                    <div className="marketing-icon">🎯</div>
                    <h3>Target Audience</h3>
                    <p>Define and reach your audience</p>
                    <button className="btn-small">Manage Audience</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>Analytics & Reports</h2>
              <div className="analytics-section">
                <div className="analytics-grid">
                  <div className="analytics-card">
                    <h3>Partnership Performance</h3>
                    <div className="stat-value">$25,000</div>
                    <p>Total sponsorship value</p>
                  </div>
                  <div className="analytics-card">
                    <h3>Events Managed</h3>
                    <div className="stat-value">12</div>
                    <p>Active events this year</p>
                  </div>
                  <div className="analytics-card">
                    <h3>Reach</h3>
                    <div className="stat-value">5.2K</div>
                    <p>Total audience reached</p>
                  </div>
                  <div className="analytics-card">
                    <h3>Engagement Rate</h3>
                    <div className="stat-value">68%</div>
                    <p>Average engagement</p>
                  </div>
                </div>
                <div className="reports-section">
                  <h3>Reports</h3>
                  <div className="reports-list">
                    <div className="report-item">
                      <span>📄 Monthly Performance Report</span>
                      <button className="btn-small">Download</button>
                    </div>
                    <div className="report-item">
                      <span>📊 Quarterly Analytics</span>
                      <button className="btn-small">View</button>
                    </div>
                    <div className="report-item">
                      <span>💰 Financial Summary</span>
                      <button className="btn-small">Download</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "contacts" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>Contact Management</h2>
              <div className="contacts-section">
                <div className="section-header">
                  <h3>My Contacts</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary"
                  >
                    + Add Contact
                  </motion.button>
                </div>
                <div className="contacts-list">
                  <div className="contact-card">
                    <div className="contact-avatar">👤</div>
                    <div className="contact-info">
                      <h4>John Smith</h4>
                      <p>Tournament Organizer</p>
                      <p>john@example.com | +1 (555) 123-4567</p>
                    </div>
                    <div className="contact-actions">
                      <button className="btn-small">Message</button>
                      <button className="btn-small">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dashboard-card"
            >
              <h2>Settings</h2>
              <div className="settings-section">
                <div className="settings-group">
                  <h3>Account Settings</h3>
                  <div className="setting-item">
                    <label>Notification Preferences</label>
                    <select className="form-select">
                      <option>All notifications</option>
                      <option>Important only</option>
                      <option>Email only</option>
                      <option>Disabled</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Language</label>
                    <select className="form-select">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
                <div className="settings-group">
                  <h3>Privacy Settings</h3>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Show my organization in public directory
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Allow other partners to contact me
                    </label>
                  </div>
                </div>
                <div className="settings-group">
                  <h3>Security</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-secondary"
                  >
                    Change Password
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
