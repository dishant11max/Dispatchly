import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ServicesPage from "@/pages/ServicesPage";
import HubsPage from "@/pages/HubsPage";
import AboutPage from "@/pages/AboutPage";
import DriverLoginPage from "@/pages/DriverLoginPage";
import DriverVerificationPage from "@/pages/DriverVerificationPage";
import DriverDashboardPage from "@/pages/DriverDashboardPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import ClientLoginPage from "@/pages/ClientLoginPage";
import ClientDashboardPage from "@/pages/ClientDashboardPage";
import ContactPage from "@/pages/ContactPage";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/hubs" element={<HubsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/driver-login" element={<DriverLoginPage />} />
          <Route
            path="/driver-verification"
            element={<DriverVerificationPage />}
          />
          <Route path="/driver-dashboard" element={<DriverDashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/client-login" element={<ClientLoginPage />} />
          <Route path="/client-dashboard" element={<ClientDashboardPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
