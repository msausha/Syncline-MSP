// src/components/privacy/PrivacyPolicySection.jsx
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { motion } from 'framer-motion';
import {
  Shield,
  Eye,
  Lock,
  FileText,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
} from 'lucide-react';

const PrivacyPolicySection = () => {
  const sections = [
    {
      icon: Eye,
      title: '1. Information We Collect',
      content: (
        <>
          <p className="mb-3">We may collect the following information when you interact with us:</p>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
              <span>Name, email address and phone number when you contact us or request a free assessment</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
              <span>Business details you provide during enquiries</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
              <span>Technical data such as IP address, browser type and pages visited (standard website analytics)</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: FileText,
      title: '2. How We Use Your Information',
      content: (
        <>
          <p className="mb-3">We use your information to:</p>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
              <span>Respond to enquiries and provide IT support services</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
              <span>Improve our website and services</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
              <span>Send relevant business communications only when you have requested them</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: Lock,
      title: '3. Sharing of Information',
      content: (
        <p className="text-slate-300 leading-relaxed">
          We do not sell your personal information. We may share limited data with trusted service providers 
          (for example website hosting or email services) only as needed to operate our business and deliver 
          the services you request.
        </p>
      ),
    },
    {
      icon: Shield,
      title: '4. Data Security',
      content: (
        <p className="text-slate-300 leading-relaxed">
          We take reasonable technical and organisational measures to protect your information against 
          unauthorised access, loss or misuse.
        </p>
      ),
    },
    {
      icon: CheckCircle,
      title: '5. Your Rights',
      content: (
        <p className="text-slate-300 leading-relaxed">
          You may request access to, correction of, or deletion of your personal information at any time 
          by contacting us at{' '}
          <a href="mailto:info@syncline.com.au" className="text-cyan-400 hover:text-cyan-300 underline">
            info@syncline.com.au
          </a>.
        </p>
      ),
    },
  ];

  return (
    <section id="privacy-policy" className="relative py-20 lg:py-32 bg-slate-950 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-600/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
            Legal
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-6">
            Privacy{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            Syncline IT Solutions — Last updated: 19 September 2026
          </p>
        </motion.div>

        {/* Intro card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <GlassCard className="p-8" gradient>
            <p className="text-lg text-slate-300 leading-relaxed">
              This Privacy Policy explains how Syncline IT Solutions (“we”, “us”, or “our”) collects, 
              uses and protects your information when you interact with our website, Facebook Page, 
              or any related services.
            </p>
          </GlassCard>
        </motion.div>

        {/* Policy sections */}
        <div className="space-y-6 mb-16">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard className="p-8">
                <div className="flex items-start gap-5">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex-shrink-0">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                    <div className="text-slate-300 leading-relaxed">{section.content}</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 lg:p-10" gradient>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6 text-cyan-400" />
              Contact Us
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Location</p>
                  <p className="text-slate-400 text-sm">Victoria, Australia</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <a
                    href="mailto:info@syncline.com.au"
                    className="text-cyan-400 hover:text-cyan-300 text-sm"
                  >
                    info@syncline.com.au
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <a href="tel:0406001444" className="text-cyan-400 hover:text-cyan-300 text-sm">
                    0406 001 444
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-8 text-slate-400 text-sm">
              If you have any questions about this Privacy Policy, please contact us using the details above.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicySection;