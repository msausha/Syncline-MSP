// src/pages/ServicesHub.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Server,
  Cloud,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Monitor,
  Lock,
  Cpu,
  Headphones,
} from 'lucide-react';
import SEO from '../components/SEO';

// Images from src/assets/brand/Exports/Web/
import circuitBoard from '../assets/brand/Exports/Web/circuit-board-glow.jpg';
import neuralNetwork from '../assets/brand/Exports/Web/neural-network.jpg';
import dataStream from '../assets/brand/Exports/Web/data-stream.jpg';
import coreSphere from '../assets/brand/Exports/Web/core-sphere.jpg';
import lightningBolt from '../assets/brand/Exports/Web/lightning-bolt.jpg';
import cityData from '../assets/brand/Exports/Web/city-data-overlay.jpg';

const services = [
  {
    id: 'managed-it',
    icon: Server,
    title: 'Managed IT Support',
    tagline: 'Proactive. Accountable. Always on.',
    image: circuitBoard,
    accent: 'from-indigo-500/20 to-indigo-600/5',
    border: 'border-indigo-500/30',
    iconColor: 'text-indigo-400',
    description:
      'Full-stack managed services built for Victorian SMBs who cannot afford downtime. We monitor every endpoint, server, and Microsoft 365 tenant 24/7 and respond before issues become outages.',
    keyPoints: [
      '24/7 monitoring via Microsoft Endpoint Manager + custom RMM',
      'Dedicated account manager + Australian-based engineers',
      'Mean time to first response under 15 minutes during business hours',
      'Monthly health reports with clear recommendations',
      'Hardware lifecycle planning and warranty management',
    ],
    tech: ['Microsoft Intune', 'Azure Monitor', 'Defender for Endpoint', 'Power BI reporting'],
    to: '/managed-it',
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud & Microsoft 365',
    tagline: 'Modern workplace, properly configured.',
    image: dataStream,
    accent: 'from-cyan-500/20 to-cyan-600/5',
    border: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    description:
      'Migration, hardening, and ongoing optimisation of Microsoft 365 and Azure Virtual Desktop. We treat the cloud as infrastructure, not just a collection of apps.',
    keyPoints: [
      'Secure Microsoft 365 tenant design and migration',
      'Azure Virtual Desktop for hybrid or remote teams',
      'Conditional Access + Entra ID best-practice configuration',
      'SharePoint & Teams information architecture',
      'Ongoing licence optimisation and cost control',
    ],
    tech: ['Microsoft 365', 'Azure Virtual Desktop', 'Entra ID', 'SharePoint Online', 'Teams'],
    to: '/cloud',
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Business Protection',
    tagline: 'Practical security that actually works.',
    image: coreSphere,
    accent: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    description:
      'Layered defence using the Microsoft security stack you already pay for, plus proven processes. No fear-mongering — just measurable risk reduction.',
    keyPoints: [
      'Microsoft Defender for Business / Endpoint configuration',
      'Multi-factor authentication + Conditional Access policies',
      'Immutable backups with Microsoft 365 Backup + third-party options',
      'Security awareness training and phishing simulation',
      'Incident response playbooks tailored to SMBs',
    ],
    tech: ['Defender for Endpoint', 'Entra ID Conditional Access', 'Microsoft Purview', 'Secure Score'],
    to: '/security',
  },
  {
    id: 'automation',
    icon: Zap,
    title: 'Automation & AI',
    tagline: 'Eliminate repetitive IT work.',
    image: neuralNetwork,
    accent: 'from-purple-500/20 to-purple-600/5',
    border: 'border-purple-500/30',
    iconColor: 'text-purple-400',
    description:
      'Custom Power Automate flows, scripts, and intelligent tools that remove manual effort from onboarding, offboarding, reporting, and routine maintenance.',
    keyPoints: [
      'Employee onboarding/offboarding automation',
      'Automated Microsoft 365 licence assignment & cleanup',
      'Custom reporting and alerting pipelines',
      'AI-assisted ticket triage and knowledge base suggestions',
      'Integration with existing line-of-business systems',
    ],
    tech: ['Power Automate', 'Power Apps', 'Azure Logic Apps', 'Microsoft Graph', 'Copilot Studio'],
    to: '/automation',
  },
];

export default function ServicesHub() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      <SEO
        title="IT Services for Victorian SMBs | Syncline IT Solutions"
        description="Managed IT support, Microsoft 365 & Azure, business security, and intelligent automation — enterprise-grade services sized for Victorian small and medium businesses."
        path="/services"
      />

      {/* Hero */}
      <div className="relative pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="absolute inset-0">
          <img
            src={cityData}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-4">
            Syncline IT Solutions
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            Enterprise-grade IT<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              built for Victorian SMBs
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Proactive managed services, properly configured Microsoft 365, practical security,
            and intelligent automation. No enterprise bloat — just reliable systems that keep
            your team productive.
          </p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <div className="grid gap-10 lg:gap-14">
          {services.map((service, idx) => (
            <article
              key={service.id}
              className={`group relative rounded-3xl border ${service.border} bg-gradient-to-br ${service.accent} overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-cyan-500/10`}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 lg:h-auto min-h-[320px] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent lg:bg-gradient-to-r" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-slate-900/80 backdrop-blur border border-white/10 ${service.iconColor}`}>
                      <service.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-white/90">{service.tagline}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-3">{service.title}</h2>
                  <p className="text-slate-300 leading-relaxed mb-6">{service.description}</p>

                  <ul className="space-y-2.5 mb-6">
                    {service.keyPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-slate-200">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${service.iconColor}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={service.to}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white group/link"
                  >
                    Explore {service.title}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Why Syncline strip */}
        <div className="mt-24 rounded-3xl border border-white/10 bg-slate-900/60 p-8 lg:p-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Headphones,
                title: 'Australian-based engineers',
                text: 'Real people in Victoria who understand local business realities.',
              },
              {
                icon: Monitor,
                title: 'Microsoft-first stack',
                text: 'We maximise the tools you already own instead of selling more licences.',
              },
              {
                icon: Lock,
                title: 'Security by default',
                text: 'Every engagement starts with Conditional Access, MFA, and backup verification.',
              },
              {
                icon: Cpu,
                title: 'Transparent reporting',
                text: 'Monthly dashboards that show what we fixed, what’s healthy, and what’s next.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center lg:text-left">
                <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 text-cyan-400 mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}