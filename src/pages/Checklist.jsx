// src/pages/Checklist.jsx
import React from 'react';
import SEO from '../components/SEO';

export default function Checklist() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8">
      <SEO
        title="IT Infrastructure Checklist | Syncline IT Solutions"
        description="Download our comprehensive IT infrastructure checklist to audit your business network, backups, and security postures."
        path="/checklist"
      />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">Business IT Checklist</h1>
        <p className="text-slate-400 text-lg">Your downloadable infrastructure assessment checklist.</p>
      </div>
    </div>
  );
}