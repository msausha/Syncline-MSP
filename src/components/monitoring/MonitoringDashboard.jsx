// src/components/monitoring/MonitoringDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
const MotionLink = motion.create(Link);

// FIXED: previously imported from non-existent `@lucide/*` subpaths.
// Corrected to named exports from `lucide-react`. (TrendingUp and
// ArrowDown were imported but never used — removed to keep the bundle
// lean; add them back if a future stat needs a "down" trend.)
import {
  Shield,
  Zap,
  ArrowUp,
  Activity,
  Server,
  Wifi,
  CheckCircle,
} from 'lucide-react';

import GlassCard from '../ui/GlassCard';

const MonitoringDashboard = () => {
  const [metrics, setMetrics] = useState({
    devicesHealthy: 12,
    updatesPending: 3,
    backupsOk: 9,
    checksCompleted: 27
  });

  const [activity, setActivity] = useState([
    { time: 'Just now', event: 'Health check completed', status: 'success' },
    { time: '10m ago', event: 'Backup confirmed', status: 'success' },
    { time: '1h ago', event: 'Software update available', status: 'info' },
    { time: '3h ago', event: 'System restarted', status: 'success' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        devicesHealthy: prev.devicesHealthy + (Math.random() > 0.5 ? 1 : 0),
        updatesPending: Math.max(0, prev.updatesPending + (Math.random() > 0.7 ? 1 : -1)),
        backupsOk: prev.backupsOk,
        checksCompleted: prev.checksCompleted + 1
      }));

      if (Math.random() > 0.7) {
        setActivity(prev => [
          {
            time: 'Just now',
            event: ['Health check completed', 'Backup confirmed', 'Update available'][Math.floor(Math.random() * 3)],
            status: 'success'
          },
          ...prev.slice(0, 5)
        ]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: 'Devices Healthy',
      value: metrics.devicesHealthy,
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      trend: 'up',
      detail: 'Checked recently'
    },
    {
      label: 'Updates Pending',
      value: metrics.updatesPending,
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      trend: 'neutral',
      detail: 'Across all devices'
    },
    {
      label: 'Backups Confirmed',
      value: metrics.backupsOk,
      icon: CheckCircle,
      color: 'from-purple-500 to-pink-500',
      trend: 'up',
      detail: 'Last 24 hours'
    },
    {
      label: 'Checks Completed',
      value: metrics.checksCompleted,
      icon: Zap,
      color: 'from-amber-500 to-yellow-500',
      trend: 'up',
      detail: 'Routine system checks'
    }
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs sm:text-sm font-medium mb-4">
            Dashboard Overview
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 lg:mb-6 leading-tight text-balance">
            Clear{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              insights, no complexity
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed">
            See how we monitor and protect Victorian SMBs around the clock.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 lg:mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <GlassCard className="p-5 sm:p-6 lg:p-7 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    {stat.trend === 'up' && <ArrowUp className="w-4 h-4 text-green-400" />}
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-slate-500 hidden sm:inline">Live</span>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm sm:text-base font-medium text-slate-300 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.detail}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-6 lg:p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-white">Recent Activity</h3>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-400">Live feed</span>
                </div>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                <AnimatePresence>
                  {activity.map((item, i) => (
                    <motion.div
                      key={`${item.event}-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className={`flex items-start gap-4 p-4 rounded-xl ${
                        item.status === 'success' ? 'bg-green-900/10' : 'bg-amber-900/10'
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg ${
                        item.status === 'success' ? 'bg-green-500/20' : 'bg-amber-500/20'
                      }`}>
                        <CheckCircle className={`w-5 h-5 ${
                          item.status === 'success' ? 'text-green-400' : 'text-amber-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.event}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-6 lg:p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-white">Systems Status</h3>
                <span className="px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium">
                  All Systems Operational
                </span>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Cloud Infrastructure', icon: Server, status: 'operational', uptime: '99.99%' },
                  { name: 'Security Gateway', icon: Shield, status: 'operational', uptime: '100%' },
                  { name: 'Backup Systems', icon: Activity, status: 'operational', uptime: '99.97%' },
                  { name: 'VPN Network', icon: Wifi, status: 'operational', uptime: '99.95%' }
                ].map((system, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                      <system.icon className="w-5 h-5 text-slate-400" />
                      <span className="text-white font-medium text-sm lg:text-base">{system.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs sm:text-sm text-slate-400">{system.uptime}</span>
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center mt-20">
        <MotionLink
          to="/contact"
          whileHover={{ scale: 1.08, y: -4 }}
          whileTap={{ scale: 0.97 }}
          className="
            relative inline-flex items-center gap-4 px-12 py-5
            font-bold text-xl text-white rounded-2xl
            bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700
            shadow-[0_0_35px_rgba(6,182,212,0.45)]
            hover:shadow-[0_0_55px_rgba(6,182,212,0.75)]
            transition-all duration-300
            overflow-hidden group
          "
        >
          <span className="relative z-10 flex items-center gap-3">
            Book Your Monitoring Demo
            <ArrowUp className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
          <span
            className="
              absolute inset-0 rounded-2xl opacity-70 blur-2xl
              bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700
              animate-pulse
            "
          ></span>
          <span
            className="
              absolute inset-0 rounded-2xl border border-white/20
              group-hover:border-white/40 transition-all
            "
          ></span>
        </MotionLink>
      </div>
    </section>
  );
};

export default MonitoringDashboard;
