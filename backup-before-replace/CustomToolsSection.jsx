import React from 'react';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
const MotionLink = motion.create(Link);

// Individual Lucide icon imports (recommended for performance)
import Shield from '@lucide/shield';
import Database from '@lucide/database';
import Ticket from '@lucide/ticket';
import Eye from '@lucide/eye';
import Lock from '@lucide/lock';
import RefreshCw from '@lucide/refresh-cw';
import FileText from '@lucide/file-text';
import Users from '@lucide/users';
import ArrowRight from '@lucide/arrow-right';
import CheckCircle2 from '@lucide/check-circle-2';
import GlassCard from '../ui/GlassCard';

const CustomToolsSection = () => {
  const tools = [
    {
      icon: Shield,
      title: 'Custom VPN System',
      description: 'Secure remote access built for your business. Not a one-size-fits-all solution.',
      features: [
        'Zero-trust architecture',
        'Multi-factor authentication',
        'Device compliance checks',
        'Encrypted tunnels'
      ],
      color: 'from-blue-600 to-indigo-600',
      iconBg: 'bg-blue-500/20'
    },
    {
      icon: Database,
      title: 'Customer Portal',
      description: 'Your own branded portal to access documents, tickets, and system status 24/7.',
      features: [
        'Document repository',
        'Real-time system status',
        'Invoice & payment history',
        'Team management'
      ],
      color: 'from-emerald-600 to-teal-600',
      iconBg: 'bg-emerald-500/20'
    },
    {
      icon: Ticket,
      title: 'Ticketing System',
      description: 'Transparent support with full visibility into every request and its status.',
      features: [
        'Email & portal submission',
        'Priority-based routing',
        'SLA tracking',
        'Full ticket history'
      ],
      color: 'from-purple-600 to-pink-600',
      iconBg: 'bg-purple-500/20'
    }
  ];

  const benefits = [
    { icon: Eye, text: 'Full Transparency', description: 'See exactly what\'s happening with your IT' },
    { icon: Lock, text: 'Your Data, Secured', description: 'professional-grade encryption everywhere' },
    { icon: RefreshCw, text: 'Always Up-to-Date', description: 'Continuous improvements at no extra cost' },
    { icon: FileText, text: 'Documented', description: 'Every process is documented for you' }
  ];

  return (
    <section id="tools" className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4">
            Built In-House
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Custom Tools That{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Set Us Apart
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            We don't just use off-the-shelf solutions. We build custom systems designed around how you work.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-8 h-full group" gradient>
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">{tool.title}</h3>
                <p className="text-slate-400 mb-6">{tool.description}</p>

                {/* Features */}
                <ul className="space-y-3">
                  {tool.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Benefits Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <benefit.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{benefit.text}</h4>
                    <p className="text-sm text-slate-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
<MotionLink
  to="/contact"
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.97 }}
  className="
    inline-flex items-center gap-3 px-8 py-4
    bg-gradient-to-r from-purple-600 to-pink-600
    text-white font-bold text-lg rounded-2xl
    shadow-xl shadow-purple-500/25
    hover:shadow-2xl hover:shadow-purple-500/40
    transition-all group
  "
>
  See Our Tools in Action
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</MotionLink>

        </motion.div>
      </div>
    </section>
  );
};

export default CustomToolsSection;
