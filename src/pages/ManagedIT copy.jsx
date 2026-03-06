// src/pages/ManagedIT.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const MotionLink = motion.create(Link);



import { Server, Clock, Shield, Users, CheckCircle, ArrowRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

const ManagedITPage = () => {
  const features = [
    { icon: Clock, title: '24/7 Monitoring & Alerting', desc: 'Proactive detection before issues impact your business' },
    { icon: Shield, title: 'Rapid Onsite & Remote Response', desc: '<2hr average for critical incidents' },
    { icon: Users, title: 'Dedicated Account Manager', desc: 'Your single point of contact – no phone menus' },
    { icon: CheckCircle, title: 'Guaranteed Uptime SLA', desc: '99.9% backed by credits if we miss it' }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Managed IT Support
            <span className="block text-4xl lg:text-5xl text-indigo-400 mt-2">Always On – So You Can Be</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Stop reacting to IT problems. We prevent them — 24/7 monitoring, rapid response, and a dedicated team that treats your business like our own.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((f, i) => (
            <GlassCard key={i} className="p-6">
              <f.icon className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-slate-400">{f.desc}</p>
            </GlassCard>
          ))}
        </div>

<GlassCard className="p-8 lg:p-12 text-center">
  <h2 className="text-4xl font-black text-white mb-6">
    Ready to Stop Fighting IT?
  </h2>

  <MotionLink
    to="/contact"
    whileHover={{ scale: 1.06, y: -3 }}
    whileTap={{ scale: 0.97 }}
    className="
      relative inline-flex items-center gap-3 px-10 py-4
      font-bold text-lg text-white rounded-2xl transition-all
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
      shadow-[0_0_25px_rgba(139,92,246,0.45)]
      hover:shadow-[0_0_40px_rgba(236,72,153,0.55)]
      hover:brightness-110
      group overflow-hidden
    "
  >
    {/* Text + Icon */}
    <span className="relative z-10 flex items-center gap-3">
      Get Your Free IT Health Check
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </span>

    {/* Animated glow aura */}
    <span
      className="
        absolute inset-0 rounded-2xl opacity-60 blur-xl
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        animate-pulse
      "
    ></span>

    {/* Subtle animated border */}
    <span
      className="
        absolute inset-0 rounded-2xl border border-white/20
        group-hover:border-white/40 transition-all
      "
    ></span>
  </MotionLink>
</GlassCard>



      </div>
    </section>
  );
};

export default ManagedITPage;