// src/pages/Cloud.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cloud as CloudIcon, Database, Zap, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import GlassCard from '../components/ui/GlassCard';

const CloudPage = () => {
  const features = [
    { icon: CloudIcon, title: 'Azure Virtual Desktop', desc: 'A practical option for teams who need a shared, secure desktop they can access from anywhere.' },
    { icon: Database, title: 'Microsoft 365 Support', desc: 'Setup, guidance, and ongoing help with Outlook, Teams, and SharePoint.' },
    { icon: Zap, title: 'Smooth Cloud Transitions', desc: 'Helping your business move to the cloud with minimal disruption.' },
    { icon: Shield, title: 'Protection & Backups', desc: 'Practical security basics and reliable backup options for peace of mind.' },
  ];
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-cyan-950/20 to-slate-950">
      <SEO
        title="Cloud Solutions for Victorian SMBs | Syncline IT Solutions"
        description="Cloud migration, Microsoft 365 support, and Azure Virtual Desktop — modern, secure cloud solutions managed for Victorian small businesses."
        path="/cloud"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Cloud Solutions
            <span className="block text-4xl lg:text-5xl text-cyan-400 mt-2">Modern. Secure. Yours.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Move to the cloud with confidence. We handle migration, optimization, security, and daily management — so you get performance and peace of mind.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((f, i) => (
            <GlassCard key={i} className="p-6">
              <f.icon className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-slate-400">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-8 lg:p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-6">Cloud Done Right – No Guesswork</h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all group"
          >
            Book Free Assessment
          </Link>
        </GlassCard>
      </div>
    </section>
  );
};
export default CloudPage;
