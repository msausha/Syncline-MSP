// src/components/security/SecuritySection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// FIXED: these were previously imported from non-existent `@lucide/*`
// subpaths (`@lucide/shield`, `@lucide/lock`, etc.) — your project
// only has `lucide-react` installed, which exports icons as named
// exports. The old imports would have failed at build time.
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  Database,
  CheckCircle,
  FileCheck,
  Users,
  Wifi,
  ArrowRight,
} from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import SEO from '../SEO';

const SecuritySection = () => {
const securityLayers = [
  {
    icon: Lock,
    title: 'Secure Sign-In',
    description: 'Modern sign‑in using Microsoft 365 security features — MFA, conditional access, and sensible identity controls.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10'
  },
  {
    icon: Shield,
    title: 'Device Protection',
    description: 'Practical protection for laptops and desktops — updates, compliance checks, and baseline security settings.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10'
  },
  {
    icon: Eye,
    title: 'Health & Activity Checks',
    description: 'Routine reviews of your Microsoft 365 environment to catch issues early and keep your systems stable.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10'
  },
  {
    icon: Database,
    title: 'Backup Setup',
    description: 'Reliable backup options for email, files, and devices — using Microsoft 365 tools or trusted third‑party solutions.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10'
  },
  {
    icon: FileCheck,
    title: 'Basic Best Practices',
    description: 'Clear guidance on safe usage, password habits, and practical day‑to‑day protection for your team.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10'
  },
  {
    icon: Users,
    title: 'Staff Awareness',
    description: 'Simple, easy‑to‑follow training so your staff know how to avoid common risks and stay safe online.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10'
  }
];

const stats = [
  { value: 'Local', label: 'Support Team', sublabel: 'Based in Victoria' },
  { value: 'Routine', label: 'System Reviews', sublabel: 'Helping keep things running smoothly' },
  { value: 'Fast', label: 'Remote Assistance', sublabel: 'Most issues resolved quickly' },
  { value: 'Flexible', label: 'Backup Options', sublabel: 'Cloud and local choices' }
];


  return (
    <section id="security" className="relative py-20 lg:py-32 bg-slate-900 overflow-hidden">
      {/* This component is used both standalone at /security and can be
          reused elsewhere — SEO tag here targets the standalone route.
          If you embed this same component inline on the homepage again,
          extract a lighter teaser instead (see ServiceTeaser.jsx) to
          avoid duplicating this page's content at two URLs. */}
      <SEO
        title="Business Security & Backups for Victorian SMBs | Syncline IT Solutions"
        description="Practical, everyday security basics — secure sign-in, device protection, and dependable backups — built on the Microsoft 365 tools you already have."
        path="/security"
      />

      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/5 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
          <h1 className="text-3xl font-bold text-white mb-6">
            Business Security & Backups for Victorian SMBs
          </h1>

            <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
              Practical Security Basics
            </span>

            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6" id="security-heading">
              Everyday Protection{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h2>

            <p className="text-lg text-slate-400 mb-8">
              We help your business stay safe online with clear guidance, secure sign-ins, and dependable backups — all using the tools already built into Microsoft 365. No complex systems or heavy security stacks.
            </p>

            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white mb-1">Good to know</h4>
                <p className="text-sm text-slate-400">
                  Most small businesses only need a few practical steps to stay safe day-to-day — and we help you put those in place.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <GlassCard key={i} className="p-6 text-center" delay={i * 0.1}>
                <div className="text-3xl lg:text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="font-semibold text-slate-300 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sublabel}</div>
              </GlassCard>
            ))}
          </motion.div>
        </div>

        {/* Security Layers */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {securityLayers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="p-6 h-full group">
                <div className={`w-12 h-12 rounded-xl ${layer.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <layer.icon className={`w-6 h-6 ${layer.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{layer.title}</h3>
                <p className="text-slate-400">{layer.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Remote Work Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 lg:p-12" gradient>
            <div className="grid lg:grid-cols-2 gap-8 items-center">

              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 rounded-full mb-4">
                  <Wifi className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-medium">Remote Work Made Simple</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
                  Simple, Secure Access for Your Team
                </h3>

                <p className="text-lg text-slate-400 mb-6">
                  We help your team work confidently from home or the office using practical, easy-to-use tools already built into Microsoft 365. No complicated setups or expensive licensing.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    'Safe sign-in and access for your staff',
                    'Works across laptops, desktops, and mobile devices',
                    'Simple setup for remote file and email access',
                    'Clear guidance and support when your team needs help'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* FIXED: was a plain <a href="/contact">, which forces a
                    full page reload instead of client-side navigation.
                    Link keeps it a fast SPA transition; crawlability is
                    unaffected either way since it's a real href. */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all group"
                >
                  Talk to Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="relative">
                <div className="relative bg-slate-800/50 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-green-400 font-medium">Remote Access Ready</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-slate-400">Email & Files</span>
                      <span className="text-white font-medium">Accessible</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-slate-400">Microsoft 365</span>
                      <span className="text-white font-medium">Configured</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-slate-400">Support</span>
                      <span className="text-white font-medium">Available</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 p-3 bg-blue-600 rounded-xl shadow-lg"
                >
                  <Lock className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 p-3 bg-green-600 rounded-xl shadow-lg"
                >
                  <Shield className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </section>
  );
};

export default SecuritySection;
