// src/components/navbar/MegaMenu.jsx - FIXED COMPACT VERSION
import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

import {
  Server, Cloud, Shield, Zap, Database, Users, MapPin, FileCheck,
  Monitor, BookOpen, ArrowRight
} from 'lucide-react';

const MegaMenu = ({ type, isOpen, onClose }) => {
  const servicesContent = {
    title: 'Our Services',
    items: [
      {
        icon: Server,
        title: 'Managed IT Support',
        description: 'Friendly help, remote support, and practical guidance.',
        to: '/managed-it',
      },
      {
        icon: Cloud,
        title: 'Cloud & Microsoft 365',
        description: 'Setup, migration, and support for your everyday tools.',
        to: '/cloud',
      },
      {
        icon: Shield,
        title: 'Business Protection',
        description: 'Simple, practical security and reliable backups.',
        to: '/security',
      },
      {
        icon: Zap,
        title: 'Smart Workflows',
        description: 'Modern tools that reduce repetitive tasks.',
        to: '/automation',
      }
    ],
    cta: {
      text: 'Not sure what you need? Let\u2019s chat',
      to: '/contact'
    }
  };

  const resourcesContent = {
    title: 'Resources',
    items: [
      { icon: BookOpen, title: 'Case Studies', to: '/case-studies' },
      { icon: FileCheck, title: 'IT Health Check', to: '/it-health-check' },
      { icon: Monitor, title: 'Client Dashboard', to: '/monitoring-dashboard' },
      // FIXED: was '/about-Syncline' in some places elsewhere in the app —
      // this file already used lowercase, now App.jsx's route matches it.
      { icon: Users, title: 'About Syncline', to: '/about-syncline' },
      { icon: Database, title: 'Customer Portal', to: '/customer-portal' }
    ],
    footer: {
      title: 'Helpful Information',
      text: 'Guides, tools, and insights to help your business stay productive.',
    }
  };

  const content = type === 'services' ? servicesContent : resourcesContent;

  if (!isOpen) return null;

  return (
    <div className="w-full" role="menu">
      <h3 className="text-lg font-bold text-white mb-4">
        {content.title}
      </h3>

      {type === 'services' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-6">
            {content.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) => `
                    group block p-5 rounded-xl
                    bg-slate-900/50 border border-slate-800
                    hover:border-blue-600/60 hover:bg-slate-800/80
                    transition-all duration-200
                    ${isActive ? 'border-blue-600 bg-blue-950/30' : ''}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-950/50 group-hover:bg-blue-900/60 transition-colors flex-shrink-0">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-[15px] text-white group-hover:text-blue-300 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[13px] text-slate-400 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800">
            <NavLink
              to={content.cta.to}
              onClick={onClose}
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              {content.cta.text}
              <ArrowRight className="w-5 h-5" />
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-6">
            {content.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) => `
                    group block p-5 rounded-xl
                    bg-slate-900/50 border border-slate-800
                    hover:border-blue-600/60 hover:bg-slate-800/80
                    transition-all duration-200
                    ${isActive ? 'border-blue-600 bg-blue-950/30' : ''}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-blue-950/50 transition-colors flex-shrink-0">
                      <item.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-[15px] text-white group-hover:text-blue-300 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[13px] text-slate-400 line-clamp-1">
                        {content.footer.text}
                      </p>
                    </div>
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <h4 className="text-[15px] font-semibold text-white mb-1">{content.footer.title}</h4>
            <p className="text-[13px] text-slate-400 leading-relaxed">
              {content.footer.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;
