// src/components/cta/CTASection.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';

import { 
  AlertTriangle, Phone, Shield, Zap, TrendingUp, ArrowRight, 
  CheckCircle, Clock, Server, Lock, Activity, Database, 
  Cloud, Cpu, HardDrive, Layers, Code, Boxes
} from 'lucide-react';

const CTASection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const terminalRef = useRef(null);
  const networkRef = useRef(null);
  const logosRef = useRef(null);

  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const isTerminalInView = useInView(terminalRef, { once: true, margin: "-100px" });
  const isNetworkInView = useInView(networkRef, { once: true, margin: "-100px" });
  const isLogosInView = useInView(logosRef, { once: true, margin: "-100px" });

  const rotatingTexts = [
    { 
      text: 'Turn IT chaos into reliable growth.',
      style: 'font-serif italic text-2xl lg:text-3xl tracking-wide'
    },
    { 
      text: 'Eliminate ransomware fears forever.',
      style: 'font-bold text-xl lg:text-2xl tracking-tight uppercase'
    },
    { 
      text: 'Stop losing revenue to downtime.',
      style: 'font-mono text-2xl lg:text-3xl tracking-wider'
    },
    { 
      text: 'Build unbreakable trust in your IT.',
      style: 'font-sans italic text-xl lg:text-2xl font-light tracking-wide'
    }
  ];

  const [currentText, setCurrentText] = useState(0);
  const [terminalStep, setTerminalStep] = useState(0);

  // Rotate transformative texts every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Terminal typing animation
  useEffect(() => {
    if (isTerminalInView) {
      const interval = setInterval(() => {
        setTerminalStep(prev => (prev < 5 ? prev + 1 : prev));
      }, 1200);
      return () => clearInterval(interval);
    }
  }, [isTerminalInView]);

  const terminalLines = [
    { text: '> Scanning systems for vulnerabilities...', color: 'text-red-400' },
    { text: '> Deploying zero-trust security protocols...', color: 'text-orange-400' },
    { text: '> Optimising performance & cloud resources...', color: 'text-blue-400' },
    { text: '> Enabling proactive 24/7 monitoring...', color: 'text-purple-400' },
    { text: '> Transformation complete. Growth unlocked.', color: 'text-green-400' }
  ];

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-6 py-3 bg-white/10 rounded-full text-white font-medium mb-8 backdrop-blur-sm border border-white/20"
        >
          ???? Limited-Time Free IT Transformation Assessment
        </motion.div>

        {/* Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6"
        >
          <div className="mb-2">
            Transform Your Victorian SMB IT Risks
          </div>
          <div 
            className="bg-gradient-to-r from-cyan-400 via-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            style={{ backgroundSize: '200% 100%' }}
          >
            Into Reliable Business Growth
          </div>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-12"
        >
          Australian SMBs trust us to eliminate downtime, defeat cyber threats, and unlock growth — 
          with transparent pricing and proven results.
        </motion.p>

        {/* Rotating Text */}
        <div className="relative h-16 sm:h-20 mb-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentText}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 flex items-center justify-center font-bold text-cyan-300 ${rotatingTexts[currentText].style}`}
            >
              {rotatingTexts[currentText].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* LOGO SHOWCASE - Horizontal Single Row */}
        <div ref={logosRef} className="mb-16">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-bold text-white mb-8"
          >
            Comprehensive IT Solutions
          </motion.h3>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              { icon: Cloud, label: 'Cloud', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
              { icon: Activity, label: 'Networking', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
              { icon: Boxes, label: 'M365', color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
              { icon: Server, label: 'Azure', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
              { icon: Shield, label: 'Security', color: 'text-red-400 bg-red-500/10 border-red-500/30' },
              { icon: Code, label: 'Software', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
              { icon: Cpu, label: 'Hardware', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
              { icon: HardDrive, label: 'Infrastructure', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.15, y: -8 }}
                className="flex flex-col items-center gap-2"
              >
                <motion.div 
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2 + (i % 3) * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl ${service.color} border-2 flex items-center justify-center backdrop-blur-sm`}
                >
                  <service.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${service.color.split(' ')[0]}`} />
                </motion.div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">{service.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* LIVE DATA FLOW NETWORK */}
        <div ref={networkRef} className="relative mb-20 h-64 sm:h-80 max-w-6xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl font-bold text-white mb-8"
          >
            Live Data Flow & Monitoring Network
          </motion.h3>
          
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 300">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Network Lines */}
            {[
              { x1: 120, y1: 150, x2: 280, y2: 100, color: 'cyan' },
              { x1: 280, y1: 100, x2: 440, y2: 150, color: 'blue' },
              { x1: 440, y1: 150, x2: 600, y2: 100, color: 'purple' },
              { x1: 600, y1: 100, x2: 760, y2: 150, color: 'green' },
              { x1: 760, y1: 150, x2: 880, y2: 150, color: 'orange' }
            ].map((line, i) => (
              <motion.line
                key={i}
                x1={line.x1} y1={line.y1}
                x2={line.x2} y2={line.y2}
                stroke={`var(--color-${line.color})`}
                strokeWidth="2"
                className={`stroke-${line.color}-500`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isNetworkInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2, delay: i * 0.15 }}
              />
            ))}
            
            {/* Animated Data Packets */}
            {isNetworkInView && [
              { x1: 120, y1: 150, x2: 280, y2: 100, color: '#06b6d4' },
              { x1: 280, y1: 100, x2: 440, y2: 150, color: '#3b82f6' },
              { x1: 440, y1: 150, x2: 600, y2: 100, color: '#8b5cf6' },
              { x1: 600, y1: 100, x2: 760, y2: 150, color: '#10b981' },
              { x1: 760, y1: 150, x2: 880, y2: 150, color: '#f59e0b' }
            ].map((path, i) => (
              <motion.circle
                key={i}
                r="6"
                fill={path.color}
                filter="url(#glow)"
                animate={{
                  cx: [path.x1, path.x2, path.x1],
                  cy: [path.y1, path.y2, path.y1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear"
                }}
              />
            ))}
          </svg>

          {/* Network Nodes */}
          {[
            { Icon: Server, label: 'Edge Server', left: '12%', top: '50%', color: 'cyan' },
            { Icon: Shield, label: 'Firewall', left: '28%', top: '33%', color: 'blue' },
            { Icon: Activity, label: 'Monitoring', left: '44%', top: '50%', color: 'purple' },
            { Icon: Database, label: 'Database', left: '60%', top: '33%', color: 'green' },
            { Icon: Cloud, label: 'Cloud Storage', left: '76%', top: '50%', color: 'orange' },
            { Icon: Cpu, label: 'AI Engine', right: '12%', top: '50%', color: 'cyan' }
          ].map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isNetworkInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 200 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ 
                left: node.left || 'auto', 
                right: node.right || 'auto',
                top: node.top 
              }}
            >
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-${node.color}-500/20 border-3 border-${node.color}-500 flex items-center justify-center backdrop-blur-sm`}
              >
                <node.Icon className={`w-8 h-8 sm:w-10 sm:h-10 text-${node.color}-400`} />
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={isNetworkInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 2 + i * 0.15 }}
                className={`mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-${node.color}-300 bg-slate-900/80 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap`}
              >
                {node.label}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* WORKFLOW TIMELINE */}
        <div ref={timelineRef} className="relative mb-20">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-white mb-12"
          >
            Your IT Transformation Journey
          </motion.h3>
          
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 max-w-5xl mx-auto">
            {/* Connecting Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 1000 200">
              <motion.path 
                d="M 150,100 Q 350,50 500,100 T 850,100" 
                fill="none"
                stroke="rgb(6, 182, 212)"
                strokeWidth="3"
                strokeOpacity="0.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isTimelineInView ? { pathLength: 1 } : {}}
                transition={{ duration: 3 }}
              />
            </svg>

            {[
              { Icon: AlertTriangle, label: 'IT Fires & Risks', color: 'red', rotate: 12 },
              { Icon: Phone, label: 'Free Assessment', color: 'blue', rotate: -6 },
              { Icon: Shield, label: 'Proactive Security', color: 'cyan', rotate: 6 },
              { Icon: TrendingUp, label: 'Reliable Growth', color: 'green', rotate: -12 }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.5, rotate: step.rotate * 2 }}
                animate={isTimelineInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1, 
                  rotate: 0 
                } : {}}
                transition={{ 
                  delay: i * 0.4,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                className="z-10"
              >
                <motion.div 
                  animate={i === 3 && isTimelineInView ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                  className={`p-6 rounded-2xl bg-${step.color}-500/20 text-${step.color}-400 border-2 border-${step.color}-500`}
                >
                  <step.Icon className="w-12 h-12 sm:w-16 sm:h-16" />
                </motion.div>
                <p className="mt-4 text-base sm:text-lg font-semibold text-white">{step.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TERMINAL ANIMATION */}
        <div ref={terminalRef} className="max-w-4xl mx-auto mb-20">
          <div className="relative p-6 sm:p-8 bg-slate-900/90 rounded-2xl border border-cyan-500/30 backdrop-blur-xl text-left font-mono overflow-hidden shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-slate-400 ml-2 text-xs sm:text-sm">terminal@Synclineit.au — transformation.sh</span>
            </div>

            {/* Scanline effect */}
            <motion.div 
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none"
              animate={{ y: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {terminalLines.map((line, i) => (
              <motion.p 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: i < terminalStep ? 1 : 0 }}
                className={`mb-2 text-sm sm:text-lg ${line.color}`}
              >
                {line.text}
              </motion.p>
            ))}
            
            <motion.span 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-5 bg-green-400 ml-1"
            />
          </div>
        </div>

        {/* METRICS */}
        <div className="metrics-grid grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-16">
          {[
            { label: 'Average Revenue Saved', value: 85, color: 'cyan' },
            { label: 'Guaranteed Uptime', value: 99.9, color: 'blue' },
            { label: 'Risk Reduction', value: 95, color: 'green' }
          ].map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ borderColor: `rgb(var(--color-${metric.color}))`, scale: 1.02 }}
              className="relative p-6 sm:p-8 bg-slate-900/60 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden group transition-all"
            >
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: i }}
                className={`absolute top-4 right-4 w-8 h-8 bg-${metric.color}-400 rounded-full blur-md`}
              />
              <p className={`text-${metric.color}-400 text-base sm:text-lg mb-4 font-semibold`}>{metric.label}</p>
              <div className="relative h-10 sm:h-12 bg-slate-800 rounded-full overflow-hidden mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${metric.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 rounded-full shadow-lg shadow-${metric.color}-500/50`}
                />
              </div>
              <motion.p 
                initial={{ textContent: 0 }}
                whileInView={{ textContent: metric.value }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, delay: 0.5 }}
                className="text-4xl sm:text-5xl font-black text-white"
              >
                {metric.value}%
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* BENEFITS */}
        <div className="benefits-grid flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-16">
          {[
            { Icon: CheckCircle, text: 'Free in-depth security & performance assessment', color: 'green' },
            { Icon: Clock, text: 'Clear report within 48 hours', color: 'blue' },
            { Icon: Zap, text: 'No obligation — just actionable insights', color: 'cyan' }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-3 sm:gap-4 text-white text-sm sm:text-base lg:text-lg backdrop-blur-sm bg-white/5 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-white/10"
            >
              <benefit.Icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${benefit.color}-400 flex-shrink-0`} />
              <span>{benefit.text}</span>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <RouterLink
              to="/contact"
              className="relative group inline-flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl lg:text-2xl font-bold text-white rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-2xl overflow-hidden transition-all"
            >
              <span className="relative z-10">Book Your Free Assessment</span>
              <ArrowRight className="relative z-10 w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-3 transition-transform" />
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </RouterLink>
          </motion.div>

          <motion.a
            href="tel:1300XXXXXX"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl lg:text-2xl font-bold text-cyan-300 rounded-2xl border-2 sm:border-3 border-cyan-500/60 bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/80 hover:border-cyan-400 transition-all"
          >
            <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="hidden sm:inline">Call 1300 XXX XXX Now</span>
            <span className="sm:hidden">Call Now</span>
          </motion.a>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-slate-400 text-base sm:text-lg"
        >
          ? Trusted by 150+ Victorian & Tasmanian businesses
        </motion.p>
      </div>
    </section>
  );
};

export default CTASection;
