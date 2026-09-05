// src/components/Layout.jsx
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ChatWidget from './components/chat/ChatWidget'; // Adjust path if your ChatWidget is elsewhere

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Diagnostic script to log exact layout metrics and pinpoint the gap
  useEffect(() => {
    const diagnoseLayout = () => {
      const navbar = document.querySelector('.navbar');
      const main = document.querySelector('main');
      const firstChild = main ? main.firstElementChild : null;

      console.group("=== LAYOUT DIAGNOSTIC REPORT ===");
      console.log("Current Route:", pathname);
      
      if (navbar) {
        console.log("Navbar Height (getBoundingClientRect):", navbar.getBoundingClientRect().height);
        console.log("Navbar Computed Height:", window.getComputedStyle(navbar).height);
      }
      
      if (main) {
        console.log("Main Element Top Padding:", window.getComputedStyle(main).paddingTop);
        console.log("Main Element Computed Height:", window.getComputedStyle(main).height);
      }

      if (firstChild) {
        console.log("First Section Tag/Class:", firstChild.tagName, firstChild.className);
        console.log("First Section Computed Margin-Top:", window.getComputedStyle(firstChild).marginTop);
        console.log("First Section Computed Padding-Top:", window.getComputedStyle(firstChild).paddingTop);
        console.log("First Section Bounding Rect Top:", firstChild.getBoundingClientRect().top);
      }
      console.groupEnd();
    };

    const timer = setTimeout(diagnoseLayout, 150);
    return () => clearTimeout(timer);
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
      <main className="flex-grow pt-[var(--navbar-height)]">
        <Outlet />
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}