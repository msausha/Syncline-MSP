// src/components/terms/TermsSection.jsx
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { motion } from 'framer-motion';
import {
  FileText,
  Shield,
  AlertTriangle,
  Scale,
  Ban,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
} from 'lucide-react';

const TermsSection = () => {
  const sections = [
    {
      icon: FileText,
      title: '1. Acceptance of Terms',
      content: (
        <p className="text-slate-300 leading-relaxed">
          By accessing or using the Syncline IT Solutions website and services, you agree to be bound by these Terms of Service. 
          If you do not agree with any part of these terms, please do not use our website or services.
        </p>
      ),
    },
    {
      icon: Shield,
      title: '2. Services',
      content: (
        <p className="text-slate-300 leading-relaxed">
          Syncline IT Solutions provides managed IT support, cloud solutions, cybersecurity, automation, and related technology services 
          to businesses primarily in Victoria, Australia. The exact scope of work will be agreed in writing for each engagement.
        </p>
      ),
    },
    {
      icon: Scale,
      title: '3. Use of the Website',
      content: (
        <>
          <p className="mb-3 text-slate-300">You agree to use this website only for lawful purposes. You must not:</p>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
              <span>Attempt to gain unauthorised access to any part of the website or our systems</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
              <span>Use the website in any way that could damage, disable, or impair it</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
              <span>Submit false or misleading information through contact forms</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: Ban,
      title: '4. Intellectual Property',
      content: (
        <p className="text-slate-300 leading-relaxed">
          All content on this website, including text, graphics, logos, and software, is the property of Syncline IT Solutions 
          or its licensors and is protected by Australian and international intellectual property laws. You may not copy, 
          reproduce, or distribute any content without our prior written permission.
        </p>
      ),
    },
    {
      icon: AlertTriangle,
      title: '5. Limitation of Liability',
      content: (
        <p className="text-slate-300 leading-relaxed">
          To the maximum extent permitted by law, Syncline IT Solutions shall not be liable for any indirect, incidental, 
          special, or consequential damages arising from your use of the website or our services. Our total liability 
          for any claim related to the services will be limited to the fees paid for the specific service giving rise to the claim.
        </p>
      ),
    },
    {
      icon: RefreshCw,
      title: '6. Changes to These Terms',
      content: (
        <p className="text-slate-300 leading-relaxed">
          We may update these Terms of Service from time to time. The updated version will be posted on this page with 
          a revised “Last updated” date. Continued use of the website after changes constitutes acceptance of the new terms.
        </p>
      ),
    },
    {
      icon: Scale,
      title: '7. Governing Law',
      content: (
        <p className="text-slate-300 leading-relaxed">
          These Terms of Service are governed by the laws of Victoria, Australia. Any disputes arising from these terms 
          or your use of our services will be subject to the exclusive jurisdiction of the courts of Victoria.
        </p>
      ),
    },
  ];

  return (
    <section id="terms" className="relative py-20 lg:py-32 bg-slate-950 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/5 to-transparent" />
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
            Terms of{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Service
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
              These Terms of Service govern your use of the Syncline IT Solutions website and the technology services 
              we provide. Please read them carefully.
            </p>
          </GlassCard>
        </motion.div>

        {/* Terms sections */}
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
              If you have any questions about these Terms of Service, please contact us using the details above.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsSection;