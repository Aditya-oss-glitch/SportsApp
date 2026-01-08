// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/register`,
  TEAMS: `${API_BASE_URL}/teams`,
  TOURNAMENTS: `${API_BASE_URL}/tournaments`,
  SPORTS: `${API_BASE_URL}/sports`,
  PARTNERS_REGISTER: `${API_BASE_URL}/partners/register`,
  PARTNERS_LOGIN: `${API_BASE_URL}/partners/login`,
  PARTNERS: `${API_BASE_URL}/partners`,
  ADMIN_LOGIN: `${API_BASE_URL}/admin/login`,
  CAPTAIN_LOGIN: `${API_BASE_URL}/captains/login`,
  CAPTAINS: `${API_BASE_URL}/captains`,
  HEALTH: API_BASE_URL.replace("/api", "/health"),
};

export default API_BASE_URL;
