// src/pages/ITHealthCheck.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// FIXED: `MotionLink` was previously defined using `motion(Link)` BEFORE
// `motion` was even imported (the import line came after this line in
// the original file). ES module imports are hoisted so it happened to
// work, but it's fragile and confusing. Also switched to `motion.create()`
// to match the API used consistently in ManagedIT.jsx / MonitoringDashboard.jsx
// (framer-motion 11+ deprecated the older `motion(Component)` call form).
const MotionLink = motion.create(Link);
import { ShieldCheck, ServerCog, Lock, AlertTriangle, ArrowRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import SEO from '../components/SEO';

const ITHealthCheck = () => {
  const checks = [
    { icon: ShieldCheck, title: 'Security Posture Review', desc: 'Identify vulnerabilities, misconfigurations, and outdated systems.' },
    { icon: ServerCog, title: 'Infrastructure Assessment', desc: 'Servers, networking, backups, cloud — full technical audit.' },
    { icon: Lock, title: 'Compliance & Risk', desc: 'Ensure alignment with Australian cybersecurity standards.' },
    { icon: AlertTriangle, title: 'Incident Readiness', desc: 'Evaluate your ability to respond to outages or cyber events.' }
  ];
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950">
      <SEO
        title="Free IT Health Check for Victorian SMBs | Syncline IT Solutions"
        description="A complete, no-obligation assessment of your IT environment — security, performance, reliability, and business continuity — with a report in 48 hours."
        path="/it-health-check"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Free IT Health Check
            <span className="block text-4xl lg:text-5xl text-indigo-400 mt-2">Know Your Risks Before They Cost You</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A complete assessment of your IT environment — security, performance, reliability, and business continuity.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {checks.map((c, i) => (
            <GlassCard key={i} className="p-6">
              <c.icon className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
              <p className="text-slate-400">{c.desc}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-8 lg:p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Stop Fighting IT? Get Your Free Assessment
          </h2>
          <MotionLink
            to="/contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all group"
          >
            Get Your Free IT Health Check - Book Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </MotionLink>
        </GlassCard>
      </div>
    </section>
  );
};
export default ITHealthCheck;
