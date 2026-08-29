// src/pages/Home.jsx
import React, { Suspense, lazy } from 'react';
import Navbar from '../components/navbar/Navbar';
import HeroCTASection from '../components/hero/HeroCTASection';
import SEO from '../components/SEO';
import ServiceTeaser from '../components/services/ServiceTeaser';
import { Server, Cloud as CloudIcon, Shield, Zap } from 'lucide-react';


const MonitoringDashboard = lazy(() => import('../components/monitoring/MonitoringDashboard'));
const CustomToolsSection = lazy(() => import('../components/tools/CustomToolsSection'));
const TestimonialsSection = lazy(() => import('../components/testimonials/TestimonialsSection'));
const AboutSection = lazy(() => import('../components/about/AboutSection'));
const ContactSection = lazy(() => import('../components/contact/ContactSection'));
const ChatWidget = lazy(() => import('../components/chat/ChatWidget'));

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

const serviceTeasers = [
  {
    icon: Server,
    title: 'Managed IT Support',
    desc: '24/7 monitoring, rapid response, and a dedicated account manager.',
    to: '/managed-it',
    accent: 'text-indigo-400',
  },
  {
    icon: CloudIcon,
    title: 'Cloud Solutions',
    desc: 'Migration, Microsoft 365, and secure remote access.',
    to: '/cloud',
    accent: 'text-cyan-400',
  },
  {
    icon: Shield,
    title: 'Business Protection',
    desc: 'Practical security basics and dependable backups.',
    to: '/security',
    accent: 'text-emerald-400',
  },
  {
    icon: Zap,
    title: 'Automation & AI',
    desc: 'Custom scripts and smart tooling that save hours a week.',
    to: '/automation',
    accent: 'text-purple-400',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <SEO
        title="Syncline IT Solutions | Managed IT & Cloud Services"
        description="Professional IT support, cloud services, automation, and security for Victorian SMBs."
        path="/"
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <HeroCTASection />

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

        <section id="explore-services" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">
              Explore Our Services
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceTeasers.map((s, i) => (
                <ServiceTeaser key={i} {...s} />
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials">
          <Suspense fallback={<SectionFallback />}>
            <TestimonialsSection />
          </Suspense>
        </section>

        <section id="about">
          <Suspense fallback={<SectionFallback />}>
            <AboutSection />
          </Suspense>
        </section>

        <section id="contact">
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </section>

        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      </main>
    </div>
  );
}