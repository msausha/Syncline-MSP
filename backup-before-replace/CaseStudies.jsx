// src/pages/CaseStudies.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// FIXED: `MotionLink` was defined using the old `motion(Link)` call form
// BEFORE the `motion` import even appeared in the file. Reordered, and
// switched to `motion.create()` to match ManagedIT.jsx / MonitoringDashboard.jsx
// (framer-motion 11+ deprecated the bare `motion(Component)` form).
const MotionLink = motion.create(Link);
import { Building2, BarChart3, Users, ArrowRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import SEO from '../components/SEO';

const CaseStudies = () => {
  const studies = [
    {
      icon: Building2,
      title: 'Manufacturing – 42% Reduction in Downtime',
      desc: 'We rebuilt their entire IT stack, implemented 24/7 monitoring, and eliminated recurring outages.'
    },
    {
      icon: Users,
      title: 'Professional Services – 3x Faster Ticket Resolution',
      desc: 'Automation, remote support, and a dedicated account manager transformed their workflow.'
    },
    {
      icon: BarChart3,
      title: 'Retail – Secure, Scalable Multi‑Site Network',
      desc: 'We deployed a modern, secure network across 12 locations with zero business disruption.'
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950">
      <SEO
        title="Case Studies | Syncline IT Solutions"
        description="Real IT outcomes for Victorian businesses — downtime reduction, faster ticket resolution, and secure multi-site networks."
        path="/case-studies"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Case Studies
            <span className="block text-4xl lg:text-5xl text-indigo-400 mt-2">Real Results from Victorian Businesses</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            These aren't theories — they're real outcomes delivered to real organisations across Victoria.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {studies.map((s, i) => (
            <GlassCard key={i} className="p-6">
              <s.icon className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-slate-400">{s.desc}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-8 lg:p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Let's Build Your IT Future - Together - Book a Consultation
          </h2>

          <MotionLink
            to="/contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="
              relative inline-flex items-center gap-3 px-10 py-4
              font-bold text-lg text-white rounded-2xl transition-all
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              shadow-[0_0_25px_rgba(139,92,246,0.45)]
              hover:shadow-[0_0_35px_rgba(236,72,153,0.55)]
              hover:brightness-110
              group
            "
          >
            <span className="relative z-10">Contact Me</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />

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

export default CaseStudies;
