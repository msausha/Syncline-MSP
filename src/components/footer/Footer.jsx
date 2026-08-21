// src/components/footer/Footer.jsx
import React from 'react';
import { 
  Shield, Phone, Mail, MapPin, 
  Linkedin, Facebook, ArrowUp 
} from 'lucide-react';
import footerLogo from "/src/assets/brand/Exports/Old/Syncline_Master_512.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Managed IT Support', href: '/managed-it' },
      { name: 'Cloud Solutions', href: '/cloud' },
      { name: 'Cybersecurity', href: '/security' },
      { name: 'Automation & AI', href: '/automation' }
    ],
    company: [
      { name: 'About Us', href: '/about-syncline' },
      { name: 'Customer Portal', href: '/customer-portal' },
      { name: 'Contact', href: '/contact' }
    ],
    resources: [
      { name: 'IT Health Check', href: '/it-health-check' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Security Guide', href: '/security-guide' },
      { name: 'SMB IT Checklist', href: '/checklist' }
    ]
  };



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
            <img
              src={footerLogo}
              alt="Syncline IT Solutions Logo"
              width="48"
              height="48"
              className="w-12 h-12 object-contain"
            />
              <div>
                <span className="text-xl font-bold text-white">Syncline IT Solutions</span>
                <span className="block text-xs text-slate-400">Enterprise IT for SMBs</span>
              </div>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Your trusted IT partner for secure, reliable, and scalable technology solutions across Victoria.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:1300000000" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                1300 XXX XXX
              </a>
              <a href="mailto:info@syncline.com.au" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                info@syncline.com.au
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4" />
                Victoria, Australia
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="LinkedIn" className="p-2 bg-white/5 rounded-lg hover:bg-blue-500/20 transition-colors">
                <Linkedin className="w-5 h-5 text-slate-400 hover:text-blue-400" />
              </a>
              <a href="#" aria-label="Facebook" className="p-2 bg-white/5 rounded-lg hover:bg-blue-500/20 transition-colors">
                <Facebook className="w-5 h-5 text-slate-400 hover:text-blue-400" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>© {currentYear} Syncline IT Solutions. All rights reserved.</span>
              <span>ABN: XX XXX XXX XXX</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-sm text-slate-500 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-sm text-slate-500 hover:text-white transition-colors">
                Terms of Service
              </a>
              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="p-2 bg-white/5 rounded-lg hover:bg-blue-500/20 transition-colors group"
              >
                <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;