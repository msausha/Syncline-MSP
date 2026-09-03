import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Compact icon card used inside the navbar mega-menu and resource grids.
// All colour classes are passed as literal strings so Tailwind keeps them.
export default function ServiceCard({ icon: Icon, title, benefit, desc, to, accentText = 'text-cobalt', accentBg = 'bg-cobalt', onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group relative block p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cobalt/40 hover:shadow-[0_0_24px_-8px_hsl(var(--cobalt))] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className={`shrink-0 grid place-items-center w-11 h-11 rounded-lg bg-white/5 ${accentText} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 pr-6">
          <h4 className="text-sm font-semibold text-quartz">{title}</h4>
          {benefit && (
            <p className={`text-[11px] uppercase tracking-[0.15em] mt-1 ${accentText}`}>{benefit}</p>
          )}
          {desc && <p className="text-sm text-slate-400 mt-2 leading-relaxed">{desc}</p>}
        </div>
      </div>
      <ArrowRight className="absolute right-4 bottom-4 w-4 h-4 text-slate-600 group-hover:text-quartz group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}