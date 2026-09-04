// src/components/footer/Footer.jsx
import React from 'react';
import { 
  Shield, Phone, Mail, MapPin, 
  Linkedin, Facebook, ArrowUp 
} from 'lucide-react';
// --- Syncline Brand Assets (Enterprise Naming) ---
import BrandPrimary from "/src/assets/brand/synclineLogo.png";                     // Main brand logo
import BrandSymbol from "/src/assets/brand/syncline-symbol-512.png";                              // High‑res 600px logo
import BrandFull1024 from "/src/assets/brand/syncline-full-1024.png";              // Full logo 1024px
import BrandFullWhite512 from "/src/assets/brand/syncline-full-white-512.png";     // Full white logo 512px

// Social / Icon Variants
import BrandSocialBlue from "/src/assets/brand/syncline-social-blue-1024.png";     // Social blue variant
import BrandSocialWhite from "/src/assets/brand/syncline-social-white-1024.png";   // Social white variant
import BrandSocialNavy from "/src/assets/brand/syncline-social-navy-1024.png";     // Social navy variant
import BrandSocialGrey from "/src/assets/brand/syncline-social-grey-1024.png";     // Social grey variant

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
      { name: 'Client workspace (coming soon)', href: '/customer-portal' },
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
              src={BrandPrimary}
              alt="Syncline IT Solutions Logo"
              width="12"
              height="12"
              className="w-24 h-24 object-contain"
            />

            {/* Brand Asset Strip */}
<div className="border-t border-white/5 bg-slate-950/80">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div className="flex flex-wrap justify-center gap-8 opacity-80 hover:opacity-100 transition-opacity">

      {/* Primary Logo */}


      {/* Horizontal Logo */}
      <img
        src={BrandSymbol}
        alt="Syncline Horizontal Logo"
        className="h-24 w-auto object-contain"
      />

      {/* Vertical Logo */}
      <img
        src={BrandFull1024}
        alt="Syncline Vertical Logo"
        className="h-12 w-auto object-contain"
      />

      {/* Icon Mark */}
      <img
        src={BrandSocialBlue}
        alt="Syncline Icon Mark"
        className="h-12 w-auto object-contain"
      />

      {/* White Logo */}
      <img
        src={BrandSocialWhite}
        alt="Syncline White Logo"
        className="h-12 w-auto object-contain"
      />

      {/* Watermark */}
      <img
        src={BrandSocialGrey}
        alt="Syncline Watermark"
        className="h-12 w-auto object-contain"
      />

      {/* Partner Badge Example */}
      <img
        src={BrandSocialNavy}
        alt="Microsoft Partner Badge"
        className="h-12 w-auto object-contain"
      />

      {/* Certification Badge Example */}
      <img
        src={BrandFullWhite512}
        alt="Azure Certified Badge"
        className="h-12 w-auto object-contain"
      />

    </div>
  </div>
</div>

            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Your trusted IT partner for secure, reliable, and scalable technology solutions across Victoria.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:1300000000" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                0406 001 444
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
              <span>ABN: XX  XXX</span>
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
