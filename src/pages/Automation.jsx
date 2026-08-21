// src/pages/Automation.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import GlassCard from '../components/ui/GlassCard';

const AutomationPage = () => {
  const capabilities = [
    { icon: Zap, title: 'Workflow Automation', desc: 'Eliminate repetitive tasks with custom scripts & integrations' },
    { icon: Code, title: 'Python & PowerShell Automation', desc: 'Tailored scripts for reporting, backups, compliance' },
    { icon: Bot, title: 'AI-Powered Assistance', desc: 'Smart ticketing, anomaly detection, and predictive support' }
  ];
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      <SEO
        title="Automation & AI for Victorian SMBs | Syncline IT Solutions"
        description="Custom workflow automation, Python & PowerShell scripting, and AI-powered IT assistance that saves Victorian small businesses hours every week."
        path="/automation"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Automation & AI
            <span className="block text-4xl lg:text-5xl text-purple-400 mt-2">Work Smarter, Not Harder</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Stop wasting time on manual IT tasks. We build custom automation and intelligent tools that save hours every week and prevent human error.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {capabilities.map((c, i) => (
            <GlassCard key={i} className="p-6">
              <c.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
              <p className="text-slate-400">{c.desc}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-8 lg:p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-6">Let Technology Work for You</h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all group"
          >
            Discover Your Automation Opportunities
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </GlassCard>
      </div>
    </section>
  );
};
export default AutomationPage;
