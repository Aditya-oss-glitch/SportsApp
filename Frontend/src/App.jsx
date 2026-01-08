import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import TeamRegister from "./pages/TeamRegister";
import Tournament from "./pages/Tournament";
import Admin from "./pages/Admin";
import Partners from "./pages/Partners";
import About from "./pages/About";
import SportDetails from "./pages/SportDetails";
import PartnerRegister from "./pages/PartnerRegister";
import PartnerDashboard from "./pages/PartnerDashboard";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CaptainDashboard from "./pages/CaptainDashboard";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/team-register" element={<TeamRegister />} />
          <Route path="/tournaments" element={<Tournament />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/about" element={<About />} />
          <Route path="/sport/:sportName" element={<SportDetails />} />
          <Route path="/partner-register" element={<PartnerRegister />} />
          <Route path="/partner-dashboard" element={<PartnerDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/captain-dashboard" element={<CaptainDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}