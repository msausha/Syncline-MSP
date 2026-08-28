// src/pages/ServicesHub.jsx
// Professional, honest, Microsoft-first services landing page for Syncline IT Solutions.

import React from 'react';
import { Server, Cloud, Shield, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import ServiceTeaser from '../components/services/ServiceTeaser';

const services = [
  {
    icon: Server,
    title: 'Managed IT Support',
    desc: 'Proactive monitoring, clear communication, and reliable day‑to‑day support for Victorian small businesses.',
    to: '/managed-it',
    accent: 'text-indigo-400',
  },
  {
    icon: Cloud,
    title: 'Microsoft 365 & Azure Cloud',
    desc: 'Modern cloud setup, migration, and ongoing management using Microsoft 365 and Azure services.',
    to: '/cloud',
    accent: 'text-cyan-400',
  },
  {
    icon: Shield,
    title: 'Business Protection',
    desc: 'Practical security essentials: secure sign‑in, device protection, backups, and Microsoft 365 security hardening.',
    to: '/security',
    accent: 'text-emerald-400',
  },
  {
    icon: Zap,
    title: 'Automation & Smart Workflows',
    desc: 'Custom tools and automation that remove repetitive IT tasks and help your team work more efficiently.',
    to: '/automation',
    accent: 'text-purple-400',
  },
];

export default function ServicesHub() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      <SEO
        title="IT Services for Melbourne & Victorian SMBs | Syncline IT Solutions"
        description="Managed IT support, Microsoft 365, Azure cloud, business protection, and automation — professional IT services designed for small and medium businesses across Victoria."
        path="/services"
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">Our Services</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Practical, reliable IT services built for Melbourne and Victorian small and medium businesses.
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
