// src/pages/MonitoringDashboardPage.jsx
import React from 'react';
import SEO from '../components/SEO';
import MonitoringDashboard from '../components/monitoring/MonitoringDashboard';

export default function MonitoringDashboardPage() {
  return (
    <>
      {/* noindex: this exact widget is already embedded on the homepage
          (section id="monitoring"). Rather than fight over which URL is
          canonical for identical live-metrics content, this standalone
          copy is excluded from indexing entirely. It still works fine
          as a shareable demo link. */}
      <SEO
        title="Live Monitoring Dashboard | Syncline IT Solutions"
        description="A live look at how Syncline monitors devices, backups, and system health for Victorian SMBs."
        path="/monitoring-dashboard"
        noindex
      />
      <MonitoringDashboard />
    </>
  );
}
