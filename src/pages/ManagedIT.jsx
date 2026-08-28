// src/pages/ManagedIT.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const MotionLink = motion.create(Link);
import { Server, Clock, Shield, Users, CheckCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import GlassCard from '../components/ui/GlassCard';

const ManagedITPage = () => {
  const features = [
    {
      icon: Clock,
      title: 'Proactive Monitoring',
      desc: 'We keep an eye on your systems so issues are caught early — not after they disrupt your team.',
    },
    {
      icon: Shield,
      title: 'Reliable Remote Support',
      desc: 'Fast, practical help when something goes wrong — without long wait times or confusing escalation paths.',
    },
    {
      icon: Users,
      title: 'Single Point of Contact',
      desc: 'Clear communication and one person who knows your environment — no phone menus or ticket shuffling.',
    },
    {
      icon: CheckCircle,
      title: 'Stable, Predictable IT',
      desc: 'A structured approach to updates, backups, and maintenance so your business stays productive.',
    },
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950">
      <SEO
        title="Managed IT Support for Melbourne & Victorian SMBs | Syncline IT Solutions"
        description="Proactive monitoring, reliable remote support, clear communication, and structured IT management — managed IT support designed for small and medium businesses across Victoria."
        path="/managed-it"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Managed IT Support
            <span className="block text-4xl lg:text-5xl text-indigo-400 mt-2">
              Practical, Reliable, Built for SMBs
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            IT shouldn’t slow your business down. Syncline provides structured, proactive support that keeps your systems stable, secure, and ready for work — without the complexity or cost of a large MSP.
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
          <h2 className="text-4xl font-black text-white mb-6">Ready to Improve Your IT?</h2>

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
            <span className="relative z-10 flex items-center gap-3">
              Get Your Free IT Health Check
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>

            <span
              className="
                absolute inset-0 rounded-2xl opacity-60 blur-xl
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                animate-pulse
              "
            ></span>

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
