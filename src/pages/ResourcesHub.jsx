// src/pages/ResourcesHub.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileCheck,
  Users,
  Database,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Building2,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import SEO from '../components/SEO';

// Images from src/assets/brand/Exports/Web/
import workspaceTools from '../assets/brand/Exports/Web/workspace-tools.jpg';
import deskSetup from '../assets/brand/Exports/Web/desk-setup.jpg';
import lightningBolt from '../assets/brand/Exports/Web/lightning-bolt.jpg';
import cityData from '../assets/brand/Exports/Web/city-data-overlay.jpg';

const resources = [
  {
    id: 'case-studies',
    icon: BookOpen,
    title: 'Case Studies',
    tagline: 'Real results from Victorian businesses',
    image: cityData,
    accent: 'from-amber-500/20 to-amber-600/5',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    description:
      'Detailed accounts of how we have helped legal firms, trade businesses, professional services, and not-for-profits improve reliability, security, and productivity.',
    highlights: [
      'Before-and-after metrics where available',
      'Technology decisions explained in plain language',
      'Lessons that apply to similar-sized organisations',
    ],
    to: '/case-studies',
  },
  {
    id: 'health-check',
    icon: FileCheck,
    title: 'Free IT Health Check',
    tagline: 'Clarity in 48 hours',
    image: workspaceTools,
    accent: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    description:
      'A structured, no-obligation review of your current Microsoft 365 tenant, endpoints, backups, and security posture. You receive a written report with prioritised recommendations.',
    highlights: [
      'Microsoft Secure Score baseline + quick wins',
      'Backup verification and restore confidence',
      'Licence optimisation opportunities',
      'Clear next-step roadmap — no sales pressure',
    ],
    to: '/it-health-check',
  },
  {
    id: 'about',
    icon: Users,
    title: 'About Syncline',
    tagline: 'How we work with Victorian SMBs',
    image: deskSetup,
    accent: 'from-blue-500/20 to-blue-600/5',
    border: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    description:
      'Our mission, values, and the practical principles that guide every engagement. We exist to give smaller organisations access to the same quality of IT that larger enterprises take for granted.',
    highlights: [
      'Local, relationship-driven support model',
      'Transparent pricing and reporting',
      'Focus on long-term stability over short-term projects',
    ],
    to: '/about-syncline',
  },
  {
    id: 'portal',
    icon: Database,
    title: 'Client Workspace',
    tagline: 'Coming soon — your always-on portal',
    image: lightningBolt,
    accent: 'from-purple-500/20 to-purple-600/5',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    description:
      'A secure client portal where you can raise tickets, view system status, access documentation, and track open work. Built for busy business owners who want visibility without chasing emails.',
    highlights: [
      '24/7 ticket submission and status tracking',
      'Document library for policies and guides',
      'Real-time system health overview',
    ],
    to: '/customer-portal',
  },
];

export default function ResourcesHub() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      <SEO
        title="Resources & Guides for Victorian SMBs | Syncline IT Solutions"
        description="Case studies, free IT health checks, company information, and upcoming client tools — practical resources for Victorian small and medium businesses."
        path="/resources"
      />

      {/* Hero */}
      <div className="relative pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="absolute inset-0">
          <img
            src={workspaceTools}
            alt="Workspace tools and technology background representing resources and guides"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/90 to-slate-950" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-4">
            Knowledge & Tools
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Resources that help you<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              make better IT decisions
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Practical guides, real-world results, and free assessments designed for business
            owners and managers who need clear information — not marketing noise.
          </p>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {resources.map((item) => (
            <article
              key={item.id}
              className={`group relative rounded-3xl border ${item.border} bg-gradient-to-br ${item.accent} overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10`}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-slate-900/80 backdrop-blur border border-white/10 ${item.iconColor}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{item.tagline}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h2 className="text-xl lg:text-2xl font-bold mb-3">{item.title}</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">{item.description}</p>

                <ul className="space-y-2 mb-6">
                  {item.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-slate-200">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${item.iconColor}`} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={item.to}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white group/link"
                >
                  {item.id === 'portal' ? 'Learn more' : `View ${item.title}`}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Trust / Process strip */}
        <div className="mt-20 rounded-3xl border border-white/10 bg-slate-900/50 p-8 lg:p-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: ClipboardList,
                title: 'Structured assessments',
                text: 'Every health check follows the same rigorous checklist.',
              },
              {
                icon: Building2,
                title: 'Victorian focus',
                text: 'We understand local compliance and business realities.',
              },
              {
                icon: ShieldCheck,
                title: 'No hard sell',
                text: 'Recommendations are prioritised by risk and value, not commission.',
              },
              {
                icon: Clock,
                title: 'Fast turnaround',
                text: 'Health check reports delivered within two business days.',
              },
            ].map((item) => (
              <div key={item.title}>
                <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 text-cyan-400 mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white mb-1.5">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}