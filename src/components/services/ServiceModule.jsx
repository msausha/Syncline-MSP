import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Image } from '@/components/ui/image';
import ResilienceChecklist from './ResilienceChecklist';

// A single full-height "Vertical Module" on the Services hub.
// Big outline numeral, 50/50 split, hard-value bullets, optional interactive checklist.
export default function ServiceModule({ data, reverse = false }) {
  const { id, number, icon: Icon, title, tagline, accentText, accentBg, accentBorder, glow, image, bullets, checklist } = data;

  return (
    <section
      id={id}
      className="relative min-h-[80vh] flex items-center py-24 lg:py-32 border-t border-white/5 data-grain overflow-hidden scroll-mt-24"
    >
      <span
        className="pointer-events-none select-none absolute right-[-2rem] top-1/2 -translate-y-1/2 text-[30vw] lg:text-[20rem] font-black leading-none text-outline opacity-70"
        aria-hidden="true"
      >
        {number}
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Hard value */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={reverse ? 'lg:order-2' : ''}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className={`grid place-items-center w-12 h-12 rounded-xl border ${accentBorder} bg-white/[0.03] ${accentText}`}>
                <Icon className="w-6 h-6" strokeWidth={1.5} />
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500">
                {number} — Service
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-quartz tracking-tight">{title}</h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-xl">{tagline}</p>

            <ul className="mt-8 space-y-4">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className={`w-5 h-5 mt-0.5 shrink-0 ${accentText}`} strokeWidth={2} />
                  <span className="text-sm text-slate-300 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/resources#health-check"
              className="group mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm font-medium text-quartz hover:border-cobalt hover:bg-cobalt/10 hover:shadow-[0_0_20px_-8px_hsl(var(--cobalt))] transition-all duration-300"
            >
              Explore {title.split(' ')[0]} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className={reverse ? 'lg:order-1' : ''}
          >
            <div className={`group relative rounded-2xl border border-white/10 hover:border-white/20 overflow-hidden hover:-translate-y-1 transition-all duration-500 ${glow}`}>
              <div className="aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                  fittingType="fill"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">{title}</span>
                <span className={`text-xs font-mono ${accentText} flex items-center gap-1.5`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${accentBg} animate-pulse`} /> Active
                </span>
              </div>
            </div>

            {checklist && (
              <div className="mt-6">
                <ResilienceChecklist items={checklist} accentText={accentText} accentBg={accentBg} />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}