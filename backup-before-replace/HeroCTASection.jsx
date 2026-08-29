// src/components/hero/HeroCTASection.jsx — v6
import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Phone, ArrowRight, CheckCircle, Clock, Shield, ChevronDown,
  Server, Cloud, Database, AlertTriangle, TrendingUp, Activity, Zap,
  Cpu, Lock, Workflow,
} from 'lucide-react';
import HeroLogoAnimation from './HeroLogoAnimation';

const PROBLEMS = [
  { problem: 'IT issues slowing down work', solution: 'Steady, proactive maintenance' },
  { problem: 'Confusing cloud setup', solution: 'Clear, well‑organised Microsoft 365 & cloud support' },
  { problem: 'Risk of losing important files', solution: 'Reliable backup and recovery options' },
  { problem: 'Unclear security basics', solution: 'Simple, practical protection for everyday use' },
];


const TECH = [
  { Icon: Server,   label: 'Systems & Devices', c: 'cyan' },
  { Icon: Cloud,    label: 'Cloud Services',    c: 'blue' },
  { Icon: Database, label: 'Backup Options',    c: 'purple' },
  { Icon: Lock,     label: 'Protection Basics', c: 'green' },
  { Icon: Cpu,      label: 'Health Checks',     c: 'orange' },
  { Icon: Workflow, label: 'Smart Workflows',   c: 'pink' },
];


const BENEFITS = [
  { Icon: CheckCircle, text: 'Fewer interruptions with steady system care', c: 'green' },
  { Icon: Activity,    text: 'Smooth, reliable day‑to‑day performance',     c: 'blue' },
  { Icon: Cloud,       text: 'Simple, organised cloud & Microsoft 365 setup', c: 'cyan' },
  { Icon: Database,    text: 'Backups you can trust when you need them',    c: 'purple' },
  { Icon: TrendingUp,  text: 'Technology that grows with your business',     c: 'orange' },
];


const TERMINAL_LINES = [
  { text: '> Checking device status…',        cls: 'text-cyan-400' },
  { text: '> Reviewing cloud setup…',         cls: 'text-blue-400' },
  { text: '> Confirming backup availability…', cls: 'text-purple-400' },
  { text: '> Routine checks completed ✓',     cls: 'text-green-400' },
];


const JOURNEY = [
  { Icon: AlertTriangle, label: 'Before: Frequent IT issues', c: 'red' },
  { Icon: Phone,         label: 'Step 1: Quick Conversation', c: 'blue' },
  { Icon: Activity,      label: 'Step 2: Steady Support',     c: 'cyan' },
  { Icon: TrendingUp,    label: 'Step 3: Confident Growth',   c: 'green' },
];


const HeroCTASection = () => {
  const [problemIdx,   setProblemIdx]   = useState(0);
  const [terminalStep, setTerminalStep] = useState(0);

  const timelineRef = useRef(null);
  const terminalRef = useRef(null);
  const techRef     = useRef(null);

  const isTimelineInView = useInView(timelineRef, { once: true, margin: '-50px' });
  const isTerminalInView = useInView(terminalRef, { once: true, margin: '-50px' });
  const isTechInView     = useInView(techRef,     { once: true, margin: '-50px' });

  useEffect(() => {
    const id = setInterval(() => setProblemIdx(p => (p + 1) % PROBLEMS.length), 3500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!isTerminalInView) return;
    const id = setInterval(() => setTerminalStep(s => Math.min(s + 1, TERMINAL_LINES.length)), 1200);
    return () => clearInterval(id);
  }, [isTerminalInView]);

  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-blue-950/90 to-cyan-950/80">

      {/* Ambient blobs — pinned inside, no overflow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ duration: 28, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* ── HERO ─────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">

        {/* Two-column flex row — stacks on mobile */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16 min-h-[calc(100vh-8rem)]">

          {/* LEFT — copy */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 self-start px-4 py-2
                         bg-white/10 rounded-full border border-white/20
                         text-white text-sm font-bold backdrop-blur-sm"
            >
              🇦🇺 Free IT Health Check
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-black leading-tight"
            >
              <span className="block text-4xl sm:text-5xl xl:text-6xl text-white">
                Reliable IT Support
              </span>
              <span className="block text-4xl sm:text-5xl xl:text-6xl
                               bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400
                               bg-clip-text text-transparent">
                for Victorian SMBs
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-300 leading-relaxed max-w-lg"
            >
              Proactive support for cloud, M365, networks & backups.
              Stop firefighting, start scaling.
            </motion.p>

            {/* Problem/Solution — fixed height container so no layout shift */}
            <div className="relative h-[88px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={problemIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-stretch gap-3"
                >
                  <div className="flex-1 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex flex-col justify-center">
                    <p className="text-red-400 text-xs font-semibold mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Problem
                    </p>
                    <p className="text-white font-semibold text-sm leading-snug">{PROBLEMS[problemIdx].problem}</p>
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 p-3 bg-green-500/10 border border-green-500/30 rounded-xl flex flex-col justify-center">
                    <p className="text-green-400 text-xs font-semibold mb-1 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" /> Solution
                    </p>
                    <p className="text-white font-semibold text-sm leading-snug">{PROBLEMS[problemIdx].solution}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <RouterLink
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold
                             text-white rounded-xl
                             bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500
                             shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                >
                  Book Free Health Check <ArrowRight className="w-4 h-4" />
                </RouterLink>
              </motion.div>
              <motion.a
                href="tel:1300000000"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-bold
                           text-cyan-300 border-2 border-cyan-500/50 rounded-xl
                           bg-slate-900/60 backdrop-blur-sm
                           hover:border-cyan-400 transition-colors"
              >
                <Phone className="w-4 h-4" /> 1300 XXX XXX
              </motion.a>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-5 text-sm text-slate-300">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> 99.9% Uptime</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400" /> &lt;2hr Response</span>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-cyan-400" /> 150+ SMBs</span>
            </div>

            {/* Tech chips */}
            <div ref={techRef}>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-medium">
                Powered by enterprise tech
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isTechInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.07 }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                                text-xs font-semibold
                                bg-${t.c}-500/10 border border-${t.c}-500/30 text-${t.c}-300`}
                  >
                    <t.Icon className="w-3.5 h-3.5" /> {t.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — logo
              Fixed width column. overflow-hidden clips GSAP scale bleed.
              HeroLogoAnimation is a plain block — no absolute escapes. */}
          <div className="w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 overflow-hidden">
            <HeroLogoAnimation />
          </div>

        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex justify-center pt-6 pb-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="p-2 rounded-full bg-white/5 border border-white/10"
          >
            <ChevronDown className="w-5 h-5 text-blue-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── BELOW FOLD — normal document flow ──────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* BENEFITS */}
        <div className="py-16 lg:py-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">
            How We Support Victorian SMBs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 bg-slate-900/60 rounded-xl border border-white/10"
              >
                <b.Icon className={`w-6 h-6 text-${b.c}-400 flex-shrink-0 mt-0.5`} />
                <span className="text-slate-300 text-base">{b.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* JOURNEY */}
        <div ref={timelineRef} className="py-16 lg:py-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            Your IT Journey
          </h2>
          <div className="relative flex flex-col sm:flex-row justify-between items-center gap-8 max-w-4xl mx-auto">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block"
              viewBox="0 0 1000 160" preserveAspectRatio="none"
            >
              <motion.path
                d="M 130,80 Q 330,30 500,80 T 870,80"
                fill="none" stroke="rgb(6,182,212)" strokeWidth="2"
                strokeOpacity="0.4" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isTimelineInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2.5 }}
              />
            </svg>
            {JOURNEY.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32, scale: 0.7 }}
                animate={isTimelineInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.3, type: 'spring', stiffness: 100 }}
                className="z-10 flex flex-col items-center gap-3"
              >
                <div className={`p-5 rounded-2xl bg-${s.c}-500/15 border-2 border-${s.c}-500/50`}>
                  <s.Icon className={`w-10 h-10 text-${s.c}-400`} />
                </div>
                <p className="text-base font-semibold text-white text-center">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TERMINAL */}
        <div ref={terminalRef} className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="relative p-6 bg-slate-900/90 rounded-2xl border border-cyan-500/30 backdrop-blur-xl font-mono overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-400 ml-2 text-sm">terminal@syncline.com.au</span>
              </div>
              <motion.div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                animate={{ y: ['0%', '4000%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              {TERMINAL_LINES.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i < terminalStep ? 1 : 0 }}
                  className={`mb-2 text-base ${line.cls}`}
                >
                  {line.text}
                </motion.p>
              ))}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-2 h-5 bg-green-400 align-middle"
              />
            </div>
          </div>
        </div>

        {/* METRICS */}
        <div className="py-16 lg:py-24">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'Revenue Protected', value: 85,   c: 'cyan'  },
              { label: 'Uptime SLA',        value: 99.9, c: 'blue'  },
              { label: 'Risk Reduction',    value: 95,   c: 'green' },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-6 bg-slate-900/60 rounded-2xl border border-white/10"
              >
                <p className={`text-${m.c}-400 text-base mb-3 font-semibold`}>{m.label}</p>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, delay: 0.3 + i * 0.15 }}
                    className={`h-full bg-gradient-to-r from-${m.c}-500 to-${m.c}-400 rounded-full`}
                  />
                </div>
                <p className="text-4xl font-black text-white">{m.value}%</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="py-16 lg:py-24 text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { Icon: CheckCircle, text: 'Free assessment', c: 'green' },
              { Icon: Clock,       text: '48-hour report',  c: 'blue'  },
              { Icon: Zap,         text: 'No obligation',   c: 'cyan'  },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2.5 text-white text-base bg-white/5 px-5 py-3 rounded-xl border border-white/10"
              >
                <item.Icon className={`w-5 h-5 text-${item.c}-400`} /> {item.text}
              </motion.div>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block mb-6">
            <RouterLink
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 text-xl font-bold text-white rounded-2xl
                         bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500
                         shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
            >
              Get Started Today <ArrowRight className="w-6 h-6" />
            </RouterLink>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 text-lg"
          >
            ⭐ Trusted by 150+ Victorian businesses
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroCTASection;