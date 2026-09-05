// src/pages/ServicesHub.jsx
// Real landing page for the "Services" nav item. Previously "Services"
// was a hover-only dropdown button with no href — there was no single
// URL Google or a user could land on for "Syncline IT services".
import React from 'react';
import { Server, Cloud, Shield, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceTeaser from '../components/services/ServiceTeaser';

const services = [
  {
    icon: Server,
    title: 'Managed IT Support',
    desc: 'proactive monitoring, rapid response, and a dedicated account manager for your business.',
    to: '/managed-it',
    accent: 'text-indigo-400',
  },
  {
    icon: Cloud,
    title: 'Cloud & Microsoft 365',
    desc: 'Migration, setup, and ongoing support for Azure Virtual Desktop and Microsoft 365.',
    to: '/cloud',
    accent: 'text-cyan-400',
  },
  {
    icon: Shield,
    title: 'Business Protection',
    desc: 'Practical security basics, secure sign-in, and dependable backups using Microsoft 365.',
    to: '/security',
    accent: 'text-emerald-400',
  },
  {
    icon: Zap,
    title: 'Automation & AI',
    desc: 'Custom scripts and intelligent tools that eliminate repetitive manual IT work.',
    to: '/automation',
    accent: 'text-purple-400',
  },
];

export default function ServicesHub() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      <SEO
        title="IT Services for Victorian SMBs | Syncline IT Solutions"
        description="Managed IT support, cloud & Microsoft 365, business security, and automation — explore all the IT services Syncline provides for Victorian small businesses."
        path="/services"
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">Our Services</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Enterprise-grade IT, sized and priced for Victorian small and medium businesses.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceTeaser key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

