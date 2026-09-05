// src/components/footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin,
  Linkedin, Facebook, ArrowUp,
} from 'lucide-react';

// --- Syncline Brand Assets ---
import BrandPrimary from '/src/assets/brand/synclineLogo.png';
import BrandSymbol from '/src/assets/brand/syncline-symbol-512.png';
import BrandFull1024 from '/src/assets/brand/syncline-full-1024.png';
import BrandFullWhite512 from '/src/assets/brand/syncline-full-white-512.png';
import BrandSocialBlue from '/src/assets/brand/syncline-social-blue-1024.png';
import BrandSocialWhite from '/src/assets/brand/syncline-social-white-1024.png';
import BrandSocialNavy from '/src/assets/brand/syncline-social-navy-1024.png';
import BrandSocialGrey from '/src/assets/brand/syncline-social-grey-1024.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Managed IT Support', href: '/managed-it' },
      { name: 'Cloud Solutions', href: '/cloud' },
      { name: 'Cybersecurity', href: '/security' },
      { name: 'Automation & AI', href: '/automation' },
    ],
    company: [
      { name: 'About Us', href: '/about-syncline' },
      { name: 'Client workspace (coming soon)', href: '/customer-portal' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'IT Health Check', href: '/it-health-check' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Security Guide', href: '/security-guide' },
      { name: 'SMB IT Checklist', href: '/checklist' },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-white/5">

      {/* ═══════════ MAIN FOOTER ═══════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand + contact — wider column */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <img
                src={BrandPrimary}
                alt="Syncline IT Solutions"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Your trusted IT partner for secure, reliable, and scalable
              technology solutions across Victoria.
            </p>

            <div className="space-y-2.5">
              <a
                href="tel:0406001444"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0 text-cyan-500/80" />
                0406 001 444
              </a>
              <a
                href="mailto:info@syncline.com.au"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0 text-cyan-500/80" />
                info@syncline.com.au
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 flex-shrink-0 text-cyan-500/80" />
                Victoria, Australia
              </div>
            </div>

            <div className="flex gap-2.5 mt-6">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg bg-white/5 border border-white/5
                           hover:bg-blue-500/15 hover:border-blue-500/30 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-slate-400 hover:text-blue-400" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-lg bg-white/5 border border-white/5
                           hover:bg-blue-500/15 hover:border-blue-500/30 transition-colors"
              >
                <Facebook className="w-4 h-4 text-slate-400 hover:text-blue-400" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mini logo mark card */}
          <div className="lg:col-span-2 flex lg:justify-end">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5
                            flex flex-col items-center justify-center gap-3 w-full max-w-[180px]">
              <img
                src={BrandSymbol}
                alt="Syncline symbol"
                className="h-16 w-16 object-contain"
              />
              <p className="text-[11px] text-slate-500 text-center leading-snug">
                Syncline IT Solutions
                <br />
                Victoria, Australia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ BRAND SHOWCASE ═══════════
          Professional introduction of logo variants for web viewers.
          Each tile uses a background that suits that asset. */}
      <div className="border-t border-white/5 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-medium mb-1">
                Brand system
              </p>
              <h3 className="text-base font-semibold text-white">
                Syncline logos & marks
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md sm:text-right">
              Primary, symbol, full lockup, and social variants — shown on the
              backgrounds they are designed for.
            </p>
          </div>




          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

                      {/* Primary — dark */}
                      <div className="group rounded-xl border border-white/10 bg-slate-950 p-5
                                      flex flex-col items-center justify-between gap-3 min-h-[140px]
                                      hover:border-cyan-500/30 transition-colors">
                        <div className="flex-1 flex items-center justify-center w-full py-2">
                          <img
                            src={BrandPrimary}
                            alt="Primary logo"
                            className="max-h-12 w-auto object-contain"
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 group-hover:text-slate-400">
                          Primary
                        </span>
                      </div>

                      {/* Symbol — dark */}
                      <div className="group rounded-xl border border-white/10 bg-slate-950 p-5
                                      flex flex-col items-center justify-between gap-3 min-h-[140px]
                                      hover:border-cyan-500/30 transition-colors">
                        <div className="flex-1 flex items-center justify-center w-full py-2">
                          <img
                            src={BrandSymbol}
                            alt="Symbol mark"
                            className="max-h-14 w-auto object-contain"
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 group-hover:text-slate-400">
                          Symbol
                        </span>
                      </div>

                      {/* Full colour lockup — dark */}
                      <div className="group rounded-xl border border-white/10 bg-slate-950 p-5
                                      flex flex-col items-center justify-between gap-3 min-h-[140px]
                                      hover:border-cyan-500/30 transition-colors">
                        <div className="flex-1 flex items-center justify-center w-full py-2">
                          <img
                            src={BrandFull1024}
                            alt="Full colour lockup"
                            className="max-h-12 w-auto object-contain"
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 group-hover:text-slate-400">
                          Full colour
                        </span>
                      </div>

                      {/* White full — dark */}
                      <div className="group rounded-xl border border-white/10 bg-slate-950 p-5
                                      flex flex-col items-center justify-between gap-3 min-h-[140px]
                                      hover:border-cyan-500/30 transition-colors">
                        <div className="flex-1 flex items-center justify-center w-full py-2">
                          <img
                            src={BrandFullWhite512}
                            alt="White lockup"
                            className="max-h-12 w-auto object-contain"
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 group-hover:text-slate-400">
                          White lockup
                        </span>
                      </div>







{/* Social blue — light */}
            <div className="group rounded-xl border border-white/10 bg-slate-100 p-2
                            flex flex-col items-center justify-between gap-2 min-h-[150px]
                            overflow-hidden hover:border-cyan-500/40 transition-colors">
              <div className="flex-1 flex items-center justify-center w-full h-full">
                <img
                  src={BrandSocialBlue}
                  alt="Social blue"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-slate-600 group-hover:text-slate-800 pb-1">
                Social · blue
              </span>
            </div>

            {/* Social white — dark */}
            <div className="group rounded-xl border border-white/10 bg-slate-950 p-2
                            flex flex-col items-center justify-between gap-2 min-h-[150px]
                            overflow-hidden hover:border-cyan-500/30 transition-colors">
              <div className="flex-1 flex items-center justify-center w-full h-full">
                <img
                  src={BrandSocialWhite}
                  alt="Social white"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 group-hover:text-slate-400 pb-1">
                Social · white
              </span>
            </div>

            {/* Social navy — light */}
            <div className="group rounded-xl border border-white/10 bg-slate-100 p-2
                            flex flex-col items-center justify-between gap-2 min-h-[150px]
                            overflow-hidden hover:border-cyan-500/40 transition-colors">
              <div className="flex-1 flex items-center justify-center w-full h-full">
                <img
                  src={BrandSocialNavy}
                  alt="Social navy"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-slate-600 group-hover:text-slate-800 pb-1">
                Social · navy
              </span>
            </div>

            {/* Watermark / grey — dark */}
            <div className="group rounded-xl border border-white/10 bg-slate-950 p-2
                            flex flex-col items-center justify-between gap-2 min-h-[150px]
                            overflow-hidden hover:border-cyan-500/30 transition-colors">
              <div className="flex-1 flex items-center justify-center w-full h-full">
                <img
                  src={BrandSocialGrey}
                  alt="Watermark"
                  className="w-full h-full object-cover rounded-lg opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 group-hover:text-slate-400 pb-1">
                Watermark
              </span>
            </div>


            



          </div>





        </div>
      </div>

      {/* ═══════════ BOTTOM BAR ═══════════ */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-xs text-slate-500">
              <span>© {currentYear} Syncline IT Solutions. All rights reserved.</span>
              <span className="hidden sm:inline text-slate-700">·</span>
              <span>ABN: XX XXX XXX XXX</span>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="#privacy"
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="p-2 rounded-lg bg-white/5 border border-white/5
                           hover:bg-cyan-500/15 hover:border-cyan-500/30 transition-colors group"
              >
                <ArrowUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;