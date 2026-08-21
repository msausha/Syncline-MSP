// src/pages/SecurityGuide.jsx
import React from 'react';
import SEO from '../components/SEO';

export default function SecurityGuide() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Cybersecurity Guide for Victorian SMBs | Syncline IT Solutions"
        description="Practical cybersecurity guides, best practices, and threat protection strategies for small and medium businesses in Victoria."
        path="/security-guide"
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Cybersecurity Guide</h1>
        <p className="text-slate-400 text-lg">Comprehensive security resources and hardening guides coming soon.</p>
      </div>
    </div>
  );
}