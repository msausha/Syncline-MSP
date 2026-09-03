import { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Interactive "Resilience Checklist" — users tap items to mark them assessed,
// with a live progress bar. Reinforces the diagnostic-tool feel.
export default function ResilienceChecklist({ items, accentText = 'text-cobalt', accentBg = 'bg-cobalt' }) {
  const [checked, setChecked] = useState(() => items.map(() => false));
  const done = checked.filter(Boolean).length;
  const pct = Math.round((done / items.length) * 100);

  const toggle = (i) =>
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-semibold text-quartz uppercase tracking-[0.18em]">Resilience Checklist</h4>
        <span className={`text-xs font-mono ${accentText}`}>{done}/{items.length}</span>
      </div>
      <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden mb-6">
        <motion.div
          className={`h-full ${accentBg}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      <ul className="space-y-2.5">
        {items.map((it, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center gap-3 text-left group"
            >
              <span
                className={`grid place-items-center w-5 h-5 rounded-md border transition-all shrink-0 ${
                  checked[i]
                    ? `${accentBg} border-transparent`
                    : 'border-white/20 group-hover:border-white/40'
                }`}
              >
                {checked[i] && <Check className="w-3 h-3 text-obsidian" strokeWidth={3} />}
              </span>
              <span
                className={`text-sm transition-colors ${
                  checked[i] ? 'text-slate-500 line-through' : 'text-slate-300'
                }`}
              >
                {it}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[11px] text-slate-600 leading-relaxed">
        Tap each item to self-assess. Syncline covers every line on this list — book a free health check for a full review.
      </p>
    </div>
  );
}