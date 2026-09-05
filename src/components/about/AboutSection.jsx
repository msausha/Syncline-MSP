// src/components/about/AboutSection.jsx
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { motion } from 'framer-motion';
// FIXED: previously imported from non-existent `@lucide/*` subpaths.
// Corrected to named exports from `lucide-react`.
import {
  Target,
  Heart,
  BookOpen,
  Code,
  Users,
  CheckCircle,
  Award,
  Clock,
  Sparkles,
} from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: 'Transparency',
      description: 'Clear communication and no surprises — you always know what\u2019s happening.'
    },
    {
      icon: Heart,
      title: 'Reliability',
      description: 'We follow through on every commitment because your business depends on it.'
    },
    {
      icon: BookOpen,
      title: 'Clarity',
      description: 'No jargon or confusion — we explain things in plain, practical language.'
    },
    {
      icon: Code,
      title: 'Documentation',
      description: 'Your systems are clearly documented so nothing is ever hidden or forgotten.'
    }
  ];

  const approach = [
    {
      title: 'Listen First',
      description: 'We take time to understand your business before recommending any solution.'
    },
    {
      title: 'Document Everything',
      description: 'Clear guides and simple processes so your team always knows what to do.'
    },
    {
      title: 'Build to Last',
      description: 'We create stable, repeatable setups that grow with your business.'
    },
    {
      title: 'Stay Proactive',
      description: 'We help prevent issues early with regular reviews and practical improvements.'
    }
  ];

  return (
    <section id="about" className="relative py-20 lg:py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-600/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            About Syncline IT Solutions
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6" id="about-heading">
            Your Partner in{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Technology Success
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            I'm MSA — a hands-on IT consultant who believes small businesses deserve professional-grade technology without the enterprise complexity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 h-full" gradient>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed">
                To empower Victorian small and medium businesses with technology that just works. We handle the IT complexity so you can focus entirely on what you do best — running your business and serving your customers.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-8 h-full" gradient>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-lg text-slate-300 leading-relaxed">
                To be the most trusted IT partner for SMBs across Victoria and regional areas. We see a future where every small business has access to the same secure, reliable technology that powers large enterprises.
              </p>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Our Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <GlassCard key={i} className="p-6 text-center group" delay={i * 0.1}>
                <div className="w-14 h-14 mx-auto rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <value.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{value.title}</h4>
                <p className="text-slate-400">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-black text-white mb-4">The Syncline IT Approach</h3>
                <p className="text-lg text-slate-400 mb-8">
                  I've worked with enough businesses to know that most IT problems come from poor communication and undocumented systems. That's why I do things differently.
                </p>
                <div className="space-y-4">
                  {approach.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0 text-white font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="text-slate-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Award, title: 'Microsoft Certified', description: 'Azure and M365 specialist' },
                  { icon: Clock, title: '10+ Years Experience', description: 'Supporting businesses of all sizes' },
                  { icon: Users, title: 'Victorian SMBs Served', description: 'Across Victoria and regional areas' },
                  { icon: CheckCircle, title: '100% Australian', description: 'Local support, local understanding' }
                ].map((cred, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-600/20">
                      <cred.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{cred.title}</h4>
                      <p className="text-sm text-slate-400">{cred.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

