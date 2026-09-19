// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './Layout';

const HomePage                = lazy(() => import('./pages/Home'));
const SecurityPage            = lazy(() => import('./components/security/SecuritySection'));
const ContactPage             = lazy(() => import('./pages/Contact'));
const ManagedIT               = lazy(() => import('./pages/ManagedIT'));
const CloudSolutions          = lazy(() => import('./pages/Cloud'));
const Automation              = lazy(() => import('./pages/Automation'));
const CaseStudies             = lazy(() => import('./pages/CaseStudies'));
const ITHealthCheck           = lazy(() => import('./pages/ITHealthCheck'));
const AboutSyncline           = lazy(() => import('./pages/AboutSyncline'));
const CustomerPortal          = lazy(() => import('./pages/CustomerPortal'));
const ServicesHub             = lazy(() => import('./pages/ServicesHub'));
const ResourcesHub            = lazy(() => import('./pages/ResourcesHub'));
const SecurityGuide           = lazy(() => import('./pages/SecurityGuide'));
const ChecklistPage           = lazy(() => import('./pages/Checklist'));
const LoginPage               = lazy(() => import('./pages/Login'));
const MonitoringDashboardPage = lazy(() => import('./pages/MonitoringDashboardPage'));

// ✅ Privacy Policy page
const PrivacyPolicy           = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));


const PageLoader = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>

          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesHub />} />
          <Route path="/resources" element={<ResourcesHub />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/managed-it" element={<ManagedIT />} />
          <Route path="/cloud" element={<CloudSolutions />} />
          <Route path="/automation" element={<Automation />} />

          {/* Resources & Extras */}
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/it-health-check" element={<ITHealthCheck />} />
          <Route path="/about-syncline" element={<AboutSyncline />} />
          <Route path="/customer-portal" element={<CustomerPortal />} />

          {/* Fixed Missing Routes */}
          <Route path="/security-guide" element={<SecurityGuide />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/monitoring-dashboard" element={<MonitoringDashboardPage />} />

          {/* ✅ Privacy Policy */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* ✅ Terms */}
          <Route path="/terms" element={<Terms />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}