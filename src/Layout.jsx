// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';


import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ChatWidget from './components/chat/ChatWidget'; // Adjust path if your ChatWidget is elsewhere



export default function Layout() {
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