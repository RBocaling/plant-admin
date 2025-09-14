import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";

// Pages
import Shop from "./pages/Shop";
import PlantStore from "./pages/PlantStore";
import AboutUs from "./pages/AboutUs";
import FAQs from "./pages/FAQs";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import DownloadApp from "./pages/DownloadApp";
import LoginPage from "./pages/Login";
import AdminDashboard from "./pages/Dashboard";
import AdminOverview from "./pages/Overview";
import AdminInventory from "./pages/Inventory";
import AdminReports from "./pages/Reports";
import Feedback from "./pages/Feedback";
import PlantCare from "./pages/PlantCare";
import UserManagement from "./pages/UserManagement";
import SystemConfig from "./pages/SystemConfig";
import AccessLogs from "./pages/AccessLogs";
import PlantCms from "./pages/PlantCms";
// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTop from "./components/ScrollToTop";
import AdminLayout from "./components/AdminLayout";
import useUserAuth from "./hooks/useUserAuth";

const App = () => {
    const {data, isLoading, isError, role} = useUserAuth()


  return (
    <TooltipProvider>
      <ScrollToTop />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/plant-store" element={<PlantStore />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/download" element={<DownloadApp />} />

          {/* Admin Routes */}
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="plant-care" element={<PlantCare />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="system-config" element={<SystemConfig />} />
            <Route path="access-logs" element={<AccessLogs />} />
<<<<<<< HEAD
            <Route path="plant-cms" element={<PlantCms />} />
=======

            {/* new */}
            <Route path="/shop-items" element={<Shop />} />
>>>>>>> 3c6ba390d13aa339562afc74905f7858485a46f6
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster position="top-center" />
    </TooltipProvider>
  );
};

export default App;