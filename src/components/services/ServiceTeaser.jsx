// src/components/services/ServiceTeaser.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function ServiceTeaser({ icon: Icon, title, desc, to, accent = 'text-blue-400' }) {
  return (
    <GlassCard className="p-6 h-full flex flex-col">
      {Icon && <Icon className={`w-10 h-10 mb-4 ${accent}`} />}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 mb-4 flex-grow">{desc}</p>
      <Link
        to={to}
        className="..."
      >
        <span aria-hidden="true">Learn more</span>
        <span className="sr-only">about {title}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </GlassCard>
  );
}