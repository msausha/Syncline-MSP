// src/pages/CustomerPortal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Ticket, Shield, ArrowRight, FolderKanban } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import SEO from '../components/SEO';

const CustomerPortal = () => {
  const items = [
    { icon: Ticket, title: 'Submit & Track Tickets', desc: 'Create new requests and monitor progress in real time.' },
    { icon: FileText, title: 'Access Documentation', desc: 'Network diagrams, credentials, policies, and IT documentation.' },
    { icon: Shield, title: 'Security Status', desc: 'View backups, patching, monitoring, and compliance status.' },
    { icon: FolderKanban, title: 'Asset Management', desc: 'See devices, warranties, software licenses, and lifecycle data.' }
  ];
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950">
      <SEO
        title="Client workspace (coming soon) | Syncline IT Solutions"
        description="Log in to track support tickets, access documentation, and view your security and asset status — all in one place."
        path="/customer-portal"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Client workspace (coming soon)
            <span className="block text-4xl lg:text-5xl text-indigo-400 mt-2">Your IT — Fully Transparent</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Everything you need in one place: tickets, documentation, security status, and asset visibility.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {items.map((i, idx) => (
            <GlassCard key={idx} className="p-6">
              <i.icon className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{i.title}</h3>
              <p className="text-slate-400">{i.desc}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-8 lg:p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-6">Portal Login</h2>
          <a href="/login" className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all group">
            Go to Portal
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </GlassCard>
      </div>
    </section>
  );
};
export default CustomerPortal;

