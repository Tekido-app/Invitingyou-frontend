import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { fadeIn, transitions } from "./utils/animations";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Templates } from "./pages/Templates";
import { Editor } from "./pages/Editor";
import { CreateEvent } from "./pages/CreateEvent";
import { EventDashboard } from "./pages/EventDashboard";
import { ReviewInvitation } from "./pages/ReviewInvitation";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Navbar } from "./components/layout/Navbar";
import { PublicRSVP } from "./pages/PublicRSVP";
import { About } from "./pages/About";
import { Pricing } from "./pages/Pricing";
import { PartyTips } from "./pages/PartyTips";
import { WordingIdeas } from "./pages/WordingIdeas";
import { Contact } from "./pages/Contact";
import { HelpCenter } from "./pages/HelpCenter";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { Press } from "./pages/Press";

import { AuthProvider } from "./context/AuthContext";

function AppContent() {
  const location = useLocation();

  // Hide navbar on editor and event details pages
  const hideNavbar =
    location.pathname.startsWith("/editor") ||
    location.pathname.startsWith("/event/details") ||
    location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!hideNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={fadeIn}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transitions.elegant}
          className="flex-1"
        >
          <Routes location={location}>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/rsvp/:eventId/:guestId" element={<PublicRSVP />} />
            <Route path="/rsvp/:eventId" element={<PublicRSVP />} />

            {/* Information pages */}
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/party-tips" element={<PartyTips />} />
            <Route path="/wording-ideas" element={<WordingIdeas />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/press" element={<Press />} />

            {/* Protected routes */}
            <Route
              path="/editor/:templateId"
              element={
                <ProtectedRoute>
                  <Editor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/events/:eventId"
              element={
                <ProtectedRoute>
                  <EventDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event/details/:eventId"
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event/review/:eventId"
              element={
                <ProtectedRoute>
                  <ReviewInvitation />
                </ProtectedRoute>
              }
            />
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
