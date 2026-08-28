// src/components/navbar/OffcanvasMenu.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIXED: these were previously imported as `import X from '@lucide/x'` etc.
// `@lucide/x` is not a package your project has installed — only
// `lucide-react` is in package.json, and it exports icons as named
// exports, not per-icon subpackages. That import would fail at build
// time. Correct usage below.
import {
  X,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Server,
  Cloud,
  Shield,
  Zap,
  BookOpen,
  Users,
  FileCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logoPng from "/src/assets/brand/Exports/Old/Syncline_Master_512.png";

const OffcanvasMenu = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const directLinks = [
    { title: 'Contact', href: '/contact' }
  ];

  const menuSections = [
    {
      id: 'services',
      title: 'Services',
      items: [
        { icon: Server, title: 'Managed IT Support', href: '/managed-it' },
        { icon: Cloud, title: 'Cloud Solutions', href: '/cloud' },
        { icon: Shield, title: 'Cybersecurity', href: '/security' },
        { icon: Zap, title: 'Automation & AI', href: '/automation' }
      ]
    },
    {
      id: 'resources',
      title: 'Resources',
      items: [
        { icon: BookOpen, title: 'Case Studies', href: '/case-studies' },
        // FIXED: was '/about-Syncline' (capital S), which didn't match
        // the route registered in App.jsx ('/about-syncline') — a 404.
        { icon: Users, title: 'About Syncline', href: '/about-syncline' },
        { icon: FileCheck, title: 'IT Health Check', href: '/it-health-check' },
        { icon: Shield, title: 'Customer Portal', href: '/customer-portal' }
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] lg:hidden"
          />

          {/* Offcanvas Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-white/10 z-[9999] flex flex-col overflow-hidden lg:hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
              <img
                src={logoPng}
                alt="Syncline IT Logo"
                width="40"
                height="40"
                className="h-10 w-auto"
              />
                </div>
                <span className="text-xl font-bold text-white">Syncline IT Solutions</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-white" aria-hidden="true" />
              </button>
            </div>

            {/* Contact Info Banner */}
            <div className="mx-6 mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:1300000000" className="text-white font-medium">1300 XXX XXX</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:info@syncline.com.au" className="text-slate-300 text-sm">info@syncline.com.au</a>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2">
              <Link to="/" onClick={onClose} className="block py-3 text-white font-semibold text-lg hover:text-blue-400 transition-colors border-b border-white/5">
                Home
              </Link>

              {menuSections.map((section) => (
                <div key={section.id} className="border-b border-white/5 pb-2">
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    className="w-full flex items-center justify-between py-3 text-white font-semibold text-lg"
                    aria-expanded={expandedSection === section.id}
                  >
                    {section.title}
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        expandedSection === section.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expandedSection === section.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 space-y-1">
                          {section.items.map((item, i) => (
                            <Link
                              key={i}
                              to={item.href}
                              onClick={onClose}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                              <item.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                              <span className="text-slate-300 group-hover:text-white transition-colors text-base">
                                {item.title}
                              </span>
                              <ChevronRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-blue-400 transition-colors" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {directLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.href}
                  onClick={onClose}
                  className="block py-3 text-white font-semibold text-lg hover:text-blue-400 transition-colors border-b border-white/5"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="p-6 border-t border-white/10 bg-slate-900">
              <Link
                to="/contact"
                onClick={onClose}
                className="block w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Get Free IT Assessment
              </Link>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-start gap-3 text-slate-400">
                  <MapPin className="w-5 h-5 mt-0.5 text-blue-400" />
                  <div>
                    <p className="text-sm">Serving Victoria, Australia</p>
                    <p className="text-xs text-slate-500">Melbourne · Geelong · Ballarat · Bendigo</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OffcanvasMenu;
