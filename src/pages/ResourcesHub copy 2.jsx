// src/pages/ResourcesHub.jsx
// Real landing page for the "Resources" nav item — same fix as
// ServicesHub.jsx: gives Google and users an actual URL to land on.
import React from 'react';
import { BookOpen, Users, FileCheck, Database } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceTeaser from '../components/services/ServiceTeaser';

const resources = [
  {
    icon: BookOpen,
    title: 'Case Studies',
    desc: 'Real results from Victorian businesses we support, across legal, trades, and professional services.',
    to: '/case-studies',
    accent: 'text-amber-400',
  },
  {
    icon: FileCheck,
    title: 'Free IT Health Check',
    desc: 'A no-obligation review of your systems, with a report delivered within 48 hours.',
    to: '/it-health-check',
    accent: 'text-cyan-400',
  },
  {
    icon: Users,
    title: 'About Syncline',
    desc: 'Our mission, values, and approach to IT support for Victorian SMBs.',
    to: '/about-syncline',
    accent: 'text-blue-400',
  },
  {
    icon: Database,
    title: 'Client workspace (coming soon)',
    desc: 'Access documents, raise tickets, and check system status 24/7.',
    to: '/customer-portal',
    accent: 'text-purple-400',
  },
];

export default function ResourcesHub() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      <SEO
        title="Resources & Guides for Victorian SMBs | Syncline IT Solutions"
        description="Case studies, free IT health checks, and helpful guides for Victorian small and medium businesses managing their IT."
        path="/resources"
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">Resources</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Guides, tools, and insights to help your business stay productive.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((r, i) => (
            <ServiceTeaser key={i} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}

