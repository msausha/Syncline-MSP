// src/pages/Home.jsx
import React, { Suspense, lazy } from 'react';
import Navbar from '../components/navbar/Navbar';
import HeroCTASection from '../components/hero/HeroCTASection';

// Lazy load all below-fold components
const ServicesSection = lazy(() => import('../components/services/ServicesSection'));
const MonitoringDashboard = lazy(() => import('../components/monitoring/MonitoringDashboard'));
const CustomToolsSection = lazy(() => import('../components/tools/CustomToolsSection'));
const SecuritySection = lazy(() => import('../components/security/SecuritySection'));
const TestimonialsSection = lazy(() => import('../components/testimonials/TestimonialsSection'));
const AboutSection = lazy(() => import('../components/about/AboutSection'));
const CTASection = lazy(() => import('../components/cta/CTASection'));
const ContactSection = lazy(() => import('../components/contact/ContactSection'));
const Footer = lazy(() => import('../components/footer/Footer'));
const ChatWidget = lazy(() => import('../components/chat/ChatWidget'));
const AutomationPage = lazy(() => import('./Automation'));
const CloudPage = lazy(() => import('./Cloud'));
const ManagedITPage = lazy(() => import('./ManagedIT'));

// Optimized loading fallback
const SectionFallback = () => (
  <div className="w-full py-20 lg:py-32 bg-slate-900/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-12 bg-slate-800/60 rounded-xl w-3/4 max-w-lg mx-auto mb-8 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-72 bg-slate-800/60 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Accessibility skip link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        {/* Hero Section - Always visible, not lazy loaded */}
        <HeroCTASection />

        {/* All below-fold sections - Lazy loaded for performance */}
        <section id="monitoring">
          <Suspense fallback={<SectionFallback />}>
            <MonitoringDashboard />
          </Suspense>
        </section>

        <section id="tools">
          <Suspense fallback={<SectionFallback />}>
            <CustomToolsSection />
          </Suspense>
        </section>

        <section id="security">
          <Suspense fallback={<SectionFallback />}>
            <SecuritySection />
          </Suspense>
        </section>

        <section id="testimonials">
          <Suspense fallback={<SectionFallback />}>
            <TestimonialsSection />
          </Suspense>
        </section>

        <section id="services">
          <Suspense fallback={<SectionFallback />}>
            <ServicesSection />
          </Suspense>
        </section>

        <section id="about">
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
          </Suspense>
        </section>

        <section id="automation">
          <Suspense fallback={<SectionFallback />}>
            <AutomationPage />
          </Suspense>
        </section>

        <section id="cloud">
          <Suspense fallback={<SectionFallback />}>
            <CloudPage />
          </Suspense>
        </section>

        <section id="managed-it">
          <Suspense fallback={<SectionFallback />}>
            <ManagedITPage />
          </Suspense>
        </section>

        <section id="contact">
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </section>

        {/* Chat Widget - Lazy loaded */}
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      </main>
    </div>
  );
}