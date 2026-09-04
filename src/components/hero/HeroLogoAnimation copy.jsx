/**
 * HeroLogoAnimation.jsx — Syncline IT Solutions
 *
 * Animation sequence:
 *   Phase 1 (0.08s)   Ring: opacity 0→1, scale 0.94→1 (filled shape looks best this way)
 *   Phase 2 (0.68s)   Slash: stroke-dashoffset draws the needle bottom-left → top-right
 *   Phase 3 (1.9s)    Slash fill fades in, stroke fades out
 *   Phase 4 (2.1s)    Ambient glow softens in
 *   Phase 5 (2.4s)    Service info panel rises up, idle ring animations begin
 *
 * Logo fidelity:
 *   viewBox 0 0 1600 1600, group translate(-175.55 -43.311)
 *   Ring fill: #0077ff (exact match to PNG)
 *   Slash fill: gradient #0a1a2f → #0077ff (exact match to PNG)
 *   Gradient coords from source — net gradientTransform = 0
 *   vector-effect="non-scaling-stroke" keeps stroke consistent at any size
 *
 * Services shown — honest, solo Victorian MSP, no exaggeration:
 *   Managed IT | Microsoft 365 | Business Security | Backup & Recovery | IT Help
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import './HeroLogoAnimation.css';

const RING_D =
  'M966.49 86.621a600.7 756.78 0 0 0-27.939 1.3516 600.7 756.78 0 0 0-562.55 801.84 600.7 756.78 0 0 0 106.73 386.18 48.261 1013.5 45.498 0 1 93.479-98.332 445.14 756.85 0 0 1-44.953-287.85 445.14 756.85 0 0 1 416.88-801.92 445.14 756.85 0 0 1 18.355-1.2812zm18.137 0a445.14 756.85 0 0 1 361.13 336.41 48.261 1013.5 45.498 0 1 83.256-76.055 600.7 756.78 0 0 0-444.39-260.35zm483.76 324a48.261 1013.5 45.498 0 1-93.476 98.332 445.14 756.85 0 0 1 44.943 287.61 445.14 756.85 0 0 1-416.73 802.14l-0.2773 0.029a445.14 756.85 0 0 1-18.217 1.2657 600.7 756.78 0 0 0 27.75-1.3379l0.3769-0.029a600.7 756.78 0 0 0 562.36-802.06 600.7 756.78 0 0 0-106.72-385.95zm-863.03 852.97a48.261 1013.5 45.498 0 1-83.256 76.055 600.7 756.78 0 0 0 444.39 260.35 445.14 756.85 0 0 1-361.13-336.41z';

const SLASH_D =
  'M353.46 1457.6a22.59 875.89 45.455 0 1 567.92-592.55 22.59 875.89 45.455 0 1 676.26-635.92 22.59 875.89 45.455 0 1-567.71 592.36 22.59 875.89 45.455 0 1-676.44 636.11';

/* Honest services — solo Victorian MSP, no 24/7 claims, no buzzwords */
const SERVICES = [
  {
    id: 'managed',
    label: 'Managed IT Support',
    detail: 'Reliable IT management for your whole business',
    color: '#3b82f6',
    kpis: ['Proactive monitoring', 'Fast remote help', 'Monthly check-ins'],
    log: 'Keeping your systems running smoothly',
  },
  {
    id: 'm365',
    label: 'Microsoft 365',
    detail: 'Setup, migration and ongoing M365 support',
    color: '#06b6d4',
    kpis: ['Email & Teams setup', 'SharePoint & OneDrive', 'User management'],
    log: 'Your M365 environment, properly configured',
  },
  {
    id: 'security',
    label: 'Business Security',
    detail: 'Practical Microsoft-based security for SMBs',
    color: '#8b5cf6',
    kpis: ['MFA & access controls', 'Security baselines', 'Staff guidance'],
    log: 'Sensible security, without the jargon',
  },
  {
    id: 'backup',
    label: 'Backup & Recovery',
    detail: 'Reliable backups so you can recover quickly',
    color: '#f59e0b',
    kpis: ['Automated backups', 'Cloud & local copies', 'Recovery planning'],
    log: 'Your data protected and recoverable',
  },
  {
    id: 'helpdesk',
    label: 'IT Help & Advice',
    detail: 'A real person to call when things go wrong',
    color: '#10b981',
    kpis: ['Remote support', 'Clear explanations', 'Device & network help'],
    log: 'Friendly help from someone who knows your setup',
  },
];

export default function HeroLogoAnimation() {
  const [svcIdx,    setSvcIdx]    = useState(0);
  const [isLive,    setIsLive]    = useState(false);   // true once draw completes
  const [infoReady, setInfoReady] = useState(false);   // true once info should show

  const ringRef    = useRef(null);
  const slashRef   = useRef(null);
  const glowRef    = useRef(null);
  const cycleRef   = useRef(null);

  const svc = SERVICES[svcIdx];

  /* ── DRAW SEQUENCE ── */
  useEffect(() => {
    const ring  = ringRef.current;
    const slash = slashRef.current;
    if (!ring || !slash) return;

    /* ----- Initial state ----- */
    /* Ring: opacity/scale for a filled shape (cleaner than stroke-draw on complex paths) */
    ring.style.opacity          = '0';
    ring.style.transform        = 'scale(0.94)';
    ring.style.transformOrigin  = '50% 50%';
    ring.style.transition       = 'none';

    /* Slash: stroke-dashoffset — thin needle is perfect for stroke-draw */
    const sl = slash.getTotalLength();
    slash.style.strokeDasharray  = sl;
    slash.style.strokeDashoffset = sl;
    slash.style.fillOpacity      = '0';
    slash.style.strokeOpacity    = '0.85';
    slash.style.transition       = 'none';

    if (glowRef.current) {
      glowRef.current.style.opacity    = '0';
      glowRef.current.style.transition = 'none';
    }

    void ring.getBoundingClientRect(); // force reflow before transitions

    /* P1: Ring materialises — ease-out for a smooth landing */
    const t1 = setTimeout(() => {
      ring.style.transition = [
        'opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
        'transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
      ].join(', ');
      ring.style.opacity   = '1';
      ring.style.transform = 'scale(1)';
    }, 80);

    /* P2: Slash strokes in — starts at 60% of ring animation */
    const t2 = setTimeout(() => {
      slash.style.transition      = 'stroke-dashoffset 1300ms cubic-bezier(0.45, 0, 0.55, 1)';
      slash.style.strokeDashoffset = '0';
    }, 680);

    /* P3: Slash fill fades in, guide stroke fades out */
    const t3 = setTimeout(() => {
      slash.style.transition    = 'fill-opacity 700ms ease, stroke-opacity 600ms ease';
      slash.style.fillOpacity   = '1';
      slash.style.strokeOpacity = '0';
    }, 1900);

    /* P4: Glow breathes in */
    const t4 = setTimeout(() => {
      if (glowRef.current) {
        glowRef.current.style.transition = 'opacity 900ms ease';
        glowRef.current.style.opacity    = '1';
      }
    }, 2100);

    /* P5: Info panel + idle animations activate */
    const t5 = setTimeout(() => {
      setIsLive(true);
      setInfoReady(true);
    }, 2400);

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, []);

  /* ── SERVICE CYCLE (starts after draw) ── */
  useEffect(() => {
    if (!isLive) return;
    cycleRef.current = setInterval(() => {
      setSvcIdx(i => (i + 1) % SERVICES.length);
    }, 4200);
    return () => clearInterval(cycleRef.current);
  }, [isLive]);

  /* ── MANUAL NAV ── */
  const goTo = useCallback((idx) => {
    clearInterval(cycleRef.current);
    setSvcIdx(idx);
    cycleRef.current = setInterval(() => {
      setSvcIdx(i => (i + 1) % SERVICES.length);
    }, 4200);
  }, []);

  return (
    <div className="sl-root" aria-label="Syncline IT Solutions services">

      {/* ── SERVICE BADGE ── */}
      <div
        className={`sl-badge${infoReady ? ' sl-badge--vis' : ''}`}
        style={{ borderColor: `${svc.color}40`, background: `${svc.color}0f` }}
      >
        <span className="sl-badge-dot" style={{ background: svc.color }} />
        <span className="sl-badge-label" style={{ color: svc.color }}>
          {svc.label}
        </span>
      </div>

      {/* ── LOGO STAGE ── */}
      <div className="sl-logo-wrap">

        {/* Single soft ambient glow — brand blue, no distractions */}
        <div ref={glowRef} className="sl-glow" />

        {/*
          SVG LOGO — exact source geometry
          ─────────────────────────────────────────────────
          viewBox:   0 0 1600 1600
          <g>:       translate(-175.55 -43.311)
          Ring:      fill #0077ff  →  matches PNG solid blue ring
          Slash:     fill gradient #0a1a2f→#0077ff  →  matches PNG dark-to-blue needle
          Gradient:  no gradientTransform (source had translate(175.55,43.31)
                     which cancels the group translate, net = identity)
          Stroke:    #0077ff during draw only, fades to 0 on slash after fill appears
          Glow filt: gentle, not cartoonish
          ─────────────────────────────────────────────────
        */}
        <svg
          className="sl-svg"
          viewBox="0 0 1600 1600"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            {/* EXACT slash gradient — matches the PNG dark-navy-to-blue look */}
            <linearGradient
              id="sl-slash-fill"
              x1="177"    y1="1399.7"
              x2="1408.5" y2="194.47"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0"    stopColor="#0a1a2f" />
              <stop offset="0.42" stopColor="#0d2a50" />
              <stop offset="1"    stopColor="#0077ff" />
            </linearGradient>

            {/* Stroke gradient matches fill so the draw looks like the shape appearing */}
            <linearGradient
              id="sl-slash-stroke"
              x1="177"    y1="1399.7"
              x2="1408.5" y2="194.47"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#0a1a2f" />
              <stop offset="1" stopColor="#0077ff" />
            </linearGradient>

            {/* Ring glow — very subtle, adds depth without distorting shape */}
            <filter id="sl-ring-glow" x="-6%" y="-6%" width="112%" height="112%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Slash glow — slightly more pronounced for the thin needle */}
            <filter id="sl-slash-glow" x="-18%" y="-18%" width="136%" height="136%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Clip for idle animations */}
            <clipPath id="sl-clip">
              <rect x="0" y="0" width="1600" height="1600" />
            </clipPath>
          </defs>

          {/* GROUP — exact transform from source SVG */}
          <g transform="translate(-175.55 -43.311)" fillRule="evenodd">

            {/*
              RING
              Filled solid #0077ff. Animated by opacity + scale (JS).
              filter adds a faint glow halo that matches the PNG's appearance.
            */}
            <path
              ref={ringRef}
              d={RING_D}
              fill="#0077ff"
              filter="url(#sl-ring-glow)"
              style={{ willChange: 'opacity, transform' }}
            />

            {/*
              SLASH
              Thin needle shape. Stroke draws first (dashoffset), then:
              - fill url(#sl-slash-fill) fades in  → dark navy bottom, blue top
              - stroke opacity → 0
              stroke uses same gradient so the draw animation colour matches final fill.
              vectorEffect keeps stroke width consistent when SVG scales.
            */}
            <path
              ref={slashRef}
              d={SLASH_D}
              fill="url(#sl-slash-fill)"
              fillOpacity="0"
              stroke="url(#sl-slash-stroke)"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              filter="url(#sl-slash-glow)"
              style={{ willChange: 'stroke-dashoffset, fill-opacity, stroke-opacity' }}
            />
          </g>

          {/* IDLE INNER ANIMATIONS — very subtle, only after draw */}
          {isLive && (
            <g clipPath="url(#sl-clip)">
              {/*
                Two faint breath rings emanate from the logo centre.
                These are the only "live" inner elements — subtle, professional.
                cx/cy ≈ logo centre in viewBox space (accounting for group transform).
              */}
              <circle
                cx="800" cy="820"
                fill="none"
                stroke="#0077ff"
                strokeWidth="1.2"
                className="sl-breathe-0"
              />
              <circle
                cx="800" cy="820"
                fill="none"
                stroke="#0077ff"
                strokeWidth="0.8"
                className="sl-breathe-1"
              />
            </g>
          )}
        </svg>
      </div>

      {/* ── INFO PANEL ── */}
      <div className={`sl-info${infoReady ? ' sl-info--vis' : ''}`}>

        {/* Service detail — one line, honest language */}
        <p className="sl-detail" style={{ color: `${svc.color}cc` }}>
          {svc.detail}
        </p>

        {/* Three KPI chips per service */}
        <div className="sl-kpis">
          {svc.kpis.map(k => (
            <span
              key={k}
              className="sl-kpi"
              style={{
                color:       svc.color,
                borderColor: `${svc.color}35`,
                background:  `${svc.color}0d`,
              }}
            >
              {k}
            </span>
          ))}
        </div>

        {/* Status log — one calm line, real language */}
        <div className="sl-log" style={{ borderColor: `${svc.color}28` }}>
          <span className="sl-log-dot" style={{ background: svc.color }} />
          <span className="sl-log-text" style={{ color: `${svc.color}b0` }}>
            {svc.log}
          </span>
        </div>

        {/* Nav dots — manual service selection */}
        <nav className="sl-nav" aria-label="Browse services">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              className={`sl-nav-dot${i === svcIdx ? ' sl-nav-dot--active' : ''}`}
              style={{
                background: i === svcIdx ? s.color : 'rgba(100,116,139,0.3)',
                width:      i === svcIdx ? '20px' : '6px',
              }}
              onClick={() => goTo(i)}
              aria-label={`Show ${s.label}`}
              aria-current={i === svcIdx ? 'true' : undefined}
            />
          ))}
        </nav>

        {/* Brand footer */}
        <p className="sl-brand">Syncline IT Solutions · Victoria, Australia</p>
      </div>

    </div>
  );
}
