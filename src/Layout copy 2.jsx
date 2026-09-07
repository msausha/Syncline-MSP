// src/components/Layout.jsx
import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ChatWidget from './components/chat/ChatWidget';

export default function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // ────────────────────────────────────────────────
  // DIAGNOSTIC – measure navbar + hero critical parts
  // ────────────────────────────────────────────────
  // useEffect(() => {
  //   const logDimensions = () => {
  //     const navbar = document.querySelector('.navbar') || document.querySelector('nav');
  //     const main = mainRef.current;
  //     const heroSection = document.querySelector('section'); // first section = HeroCTASection
  //     const liveUpdate = document.querySelector('[class*="Live Tech Update"]')?.closest('div') 
  //                     || document.querySelector('.bg-slate-900\\/80, .bg-slate-900\\/70'); // ticker container
  //     const heroLeft = heroSection?.querySelector('.lg\\:col-span-7') 
  //                   || heroSection?.querySelector('[class*="col-span-7"]');
  //     const heroRight = heroSection?.querySelector('.lg\\:col-span-5') 
  //                    || heroSection?.querySelector('[class*="col-span-5"]');
  //     const h1 = heroSection?.querySelector('h1');

  //     const cssVarNavbarHeight = getComputedStyle(document.documentElement)
  //       .getPropertyValue('--navbar-height')
  //       .trim();

  //     console.groupCollapsed(
  //       `%c[Layout Diagnostic] ${pathname} @ ${new Date().toLocaleTimeString()}`,
  //       'color:#38bdf8;font-weight:bold'
  //     );

  //     // Viewport
  //     console.log('%cViewport', 'color:#94a3b8', {
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //       devicePixelRatio: window.devicePixelRatio,
  //     });

  //     // CSS variable
  //     console.log('%c--navbar-height (CSS var)', 'color:#94a3b8', cssVarNavbarHeight);

  //     // Navbar
  //     if (navbar) {
  //       const rect = navbar.getBoundingClientRect();
  //       console.log('%cNavbar', 'color:#22d3ee', {
  //         height: Math.round(rect.height),
  //         width: Math.round(rect.width),
  //         top: Math.round(rect.top),
  //         bottom: Math.round(rect.bottom),
  //         position: getComputedStyle(navbar).position,
  //         zIndex: getComputedStyle(navbar).zIndex,
  //       });
  //     } else {
  //       console.warn('Navbar element not found (.navbar or nav)');
  //     }

  //     // Main (the padded container)
  //     if (main) {
  //       const rect = main.getBoundingClientRect();
  //       const style = getComputedStyle(main);
  //       console.log('%c<main>', 'color:#a78bfa', {
  //         paddingTop: style.paddingTop,
  //         height: Math.round(rect.height),
  //         width: Math.round(rect.width),
  //         top: Math.round(rect.top),
  //       });
  //     }

  //     // Hero section
  //     if (heroSection) {
  //       const rect = heroSection.getBoundingClientRect();
  //       console.log('%cHero <section>', 'color:#34d399', {
  //         height: Math.round(rect.height),
  //         width: Math.round(rect.width),
  //         top: Math.round(rect.top),
  //         bottom: Math.round(rect.bottom),
  //         offsetTop: heroSection.offsetTop,
  //       });
  //     } else {
  //       console.warn('Hero section not found');
  //     }

  //     // Live Tech Update ticker (the “garbled” area)
  //     if (liveUpdate) {
  //       const rect = liveUpdate.getBoundingClientRect();
  //       console.log('%cLive Tech Update container', 'color:#f472b6', {
  //         height: Math.round(rect.height),
  //         width: Math.round(rect.width),
  //         top: Math.round(rect.top),
  //         left: Math.round(rect.left),
  //         text: liveUpdate.innerText?.slice(0, 80) + '…',
  //       });
  //     } else {
  //       console.warn('Live Tech Update container not found');
  //     }

  //     // Left column (text content)
  //     if (heroLeft) {
  //       const rect = heroLeft.getBoundingClientRect();
  //       console.log('%cHero LEFT column', 'color:#fbbf24', {
  //         height: Math.round(rect.height),
  //         width: Math.round(rect.width),
  //         top: Math.round(rect.top),
  //       });
  //     }

  //     // Right column (logo animation)
  //     if (heroRight) {
  //       const rect = heroRight.getBoundingClientRect();
  //       console.log('%cHero RIGHT column (logo)', 'color:#fbbf24', {
  //         height: Math.round(rect.height),
  //         width: Math.round(rect.width),
  //         top: Math.round(rect.top),
  //       });
  //     }

  //     // H1
  //     if (h1) {
  //       const rect = h1.getBoundingClientRect();
  //       const style = getComputedStyle(h1);
  //       console.log('%cHero H1', 'color:#f87171', {
  //         fontSize: style.fontSize,
  //         lineHeight: style.lineHeight,
  //         height: Math.round(rect.height),
  //         width: Math.round(rect.width),
  //         top: Math.round(rect.top),
  //       });
  //     }

  //     // Quick overlap check
  //     if (navbar && heroSection) {
  //       const navBottom = navbar.getBoundingClientRect().bottom;
  //       const heroTop = heroSection.getBoundingClientRect().top;
  //       const gap = heroTop - navBottom;
  //       console.log(
  //         `%cNavbar → Hero gap: ${Math.round(gap)}px ${gap < 0 ? '⚠️ OVERLAP!' : gap < 8 ? '⚠️ too tight' : '✓'}`,
  //         gap < 0 ? 'color:#ef4444;font-weight:bold' : 'color:#94a3b8'
  //       );
  //     }

  //     console.groupEnd();
  //   };

    // Run after paint + after a short delay (for GSAP / framer animations)
    const run = () => {
      requestAnimationFrame(() => {
        setTimeout(logDimensions, 120);
      });
    };

    run();

    // Re-measure on resize
    window.addEventListener('resize', run);
    return () => window.removeEventListener('resize', run);
  }, [pathname]);

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased">
      {/* Navbar handles its own fixed positioning */}
      <Navbar />

      {/* Chat widget */}
      <div className="fixed bottom-4 right-4 z-[9999] sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8">
        <ChatWidget />
      </div>

      {/* Main content – use the CSS variable for consistent offset */}
      <main ref={mainRef} className="flex-grow pt-[var(--navbar-height)]">
        <Outlet />
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}