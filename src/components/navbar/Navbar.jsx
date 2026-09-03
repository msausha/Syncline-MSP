// src/components/navbar/Navbar.jsx - FIXED LOGO + FIXED LINKS VERSION
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Menu, Phone, ChevronDown } from 'lucide-react';
import MegaMenu from './MegaMenu';
import OffcanvasMenu from './OffcanvasMenu';
import logo from "/src/assets/brand/synclineLogo.png"; // Adjust the path to your logo image


//"C:\Temp\syncline-website_MAIN\src\assets\brand\syncline-full-768.png"


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMenuEnter = (menuId) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuId);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 300);
  };

  const handleLinkClick = () => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // NOTE: "to" added for services/resources — previously these had
  // hasDropdown: true and no "to" at all, so they rendered as a plain
  // <button> with no href. Google (and keyboard/middle-click users)
  // had no URL to land on for "Services" or "Resources". They now
  // link to real hub pages (/services, /resources) while keeping the
  // hover-to-open MegaMenu behaviour on desktop.
  const navItems = [
    { id: 'home', label: 'Home', to: '/', hasDropdown: false },
    { id: 'services', label: 'Services', to: '/services', hasDropdown: true },
    { id: 'resources', label: 'Resources', to: '/resources', hasDropdown: true },
    { label: 'Contact', to: '/contact', hasDropdown: false },
  ];

  return (
    <>
<motion.nav
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  className="fixed top-0 left-0 right-0 z-[1000] navbar"
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 py-3">
            {/* Logo */}
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
            >
              <div className="relative flex-shrink-0 inline-block">
                <img
                  src={logo}
                  alt="Syncline IT Logo"
                  width="72"
                  height="72"
                  className="h-10 w-auto sm:h-12 lg:h-18 object-contain"
                />
                <div className="absolute -bottom-0.5 -right-3.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse flex-shrink-0" />
              </div>
              <div className="min-w-0 hidden sm:block">
              </div>
            </NavLink>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation">
              {navItems.map((item) => (
                <div
                  key={item.id || item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleMenuEnter(item.id)}
                  onMouseLeave={() => item.hasDropdown && handleMenuLeave()}
                >
                  <NavLink
                    to={item.to}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-slate-300 hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isActive ? 'text-white bg-white/10 font-semibold' : ''
                      } ${activeMenu === item.id ? 'text-white bg-white/5' : ''}`
                    }
                    aria-haspopup={item.hasDropdown ? 'true' : undefined}
                    aria-expanded={item.hasDropdown ? activeMenu === item.id : undefined}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeMenu === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </NavLink>
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:1300000000"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium text-sm">0406 001 444</span>
              </a>
              <NavLink
                to="/contact"
                onClick={handleLinkClick}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Free Assessment
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Compact MegaMenu */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-0 w-full bg-slate-950 border-t border-slate-800 shadow-2xl overflow-hidden z-[999]"
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
              }}
              onMouseLeave={handleMenuLeave}
            >
              <div className="max-w-7xl mx-auto px-6 py-10" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <MegaMenu type={activeMenu} isOpen={true} onClose={handleLinkClick} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Offcanvas */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <OffcanvasMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

