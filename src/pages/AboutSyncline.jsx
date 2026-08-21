// src/pages/AboutSyncline.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// FIXED: `MotionLink` was defined using `motion.create(Link)` BEFORE the
// `motion` import appeared in the file. ES module imports are hoisted so
// this happened to run fine, but reordered for clarity/safety.
const MotionLink = motion.create(Link);
import { UserCheck, Award, Cpu, Target, ArrowRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import SEO from '../components/SEO';

const AboutSyncline = () => {
  const highlights = [
    { icon: Cpu, title: 'Infrastructure Architect', desc: 'Designing secure, scalable systems for SMEs and multi‑site organisations.' },
    { icon: Award, title: 'Enterprise‑Grade Standards', desc: 'Every solution follows the same rigor used by large‑scale IT teams.' },
    { icon: Target, title: 'Outcome‑Driven Approach', desc: 'Technology must deliver measurable business results — not just "fix issues".' },
    { icon: UserCheck, title: 'Your Dedicated IT Partner', desc: 'No call centres. No ticket queues. Direct access to your IT expert.' }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950">
      <SEO
        title="About Syncline | Syncline IT Solutions"
        description="Meet the dedicated IT partner behind Syncline — enterprise-grade standards, outcome-driven support, and direct access with no call centres."
        path="/about-syncline"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            About Syncline
            <span className="block text-4xl lg:text-5xl text-indigo-400 mt-2">Your Dedicated IT Partner</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            I help Victorian businesses build reliable, secure, and future‑proof IT foundations — without the complexity or corporate overhead.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((h, i) => (
            <GlassCard key={i} className="p-6">
              <h.icon className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{h.title}</h3>
              <p className="text-slate-400">{h.desc}</p>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-8 lg:p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Let's Build Your IT Future
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

export default AboutSyncline;
