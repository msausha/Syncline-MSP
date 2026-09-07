// src/components/hero/HeroLogoAnimation.jsx

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import './HeroLogoAnimation.css';

const RING_D =
  'M966.49 86.621a600.7 756.78 0 0 0-27.939 1.3516 600.7 756.78 0 0 0-562.55 801.84 600.7 756.78 0 0 0 106.73 386.18 48.261 1013.5 45.498 0 1 93.479-98.332 445.14 756.85 0 0 1-44.953-287.85 445.14 756.85 0 0 1 416.88-801.92 445.14 756.85 0 0 1 18.355-1.2812zm18.137 0a445.14 756.85 0 0 1 361.13 336.41 48.261 1013.5 45.498 0 1 83.256-76.055 600.7 756.78 0 0 0-444.39-260.35zm483.76 324a48.261 1013.5 45.498 0 1-93.476 98.332 445.14 756.85 0 0 1 44.943 287.61 445.14 756.85 0 0 1-416.73 802.14l-0.2773 0.029a445.14 756.85 0 0 1-18.217 1.2657 600.7 756.78 0 0 0 27.75-1.3379l0.3769-0.029a600.7 756.78 0 0 0 562.36-802.06 600.7 756.78 0 0 0-106.72-385.95zm-863.03 852.97a48.261 1013.5 45.498 0 1-83.256 76.055 600.7 756.78 0 0 0 444.39 260.35 445.14 756.85 0 0 1-361.13-336.41z';

const SLASH_D =
  'M353.46 1457.6a22.59 875.89 45.455 0 1 567.92-592.55 22.59 875.89 45.455 0 1 676.26-635.92 22.59 875.89 45.455 0 1-567.71 592.36 22.59 875.89 45.455 0 1-676.44 636.11';

const SERVICES = [
  {
    id: 'managed',
    label: 'Managed IT Support',
    detail:
      'Always-on IT management built around Microsoft best practices',
    color: '#3b82f6',
    kpis: [
      'Proactive monitoring',
      'Remote & onsite support',
      'Monthly health reviews',
    ],
    log:
      'Keeping your systems stable, secure and predictable',
  },

  {
    id: 'identity',
    label: 'Identity & Access',
    detail:
      'Modern identity-first security for every user and device',
    color: '#06b6d4',
    kpis: [
      'MFA & Conditional Access',
      'Role-based access',
      'Device compliance',
    ],
    log:
      'Your identity layer, locked down and future-ready',
  },

  {
    id: 'm365',
    label: 'Microsoft 365',
    detail:
      'Structured, secure and well-organised Microsoft 365',
    color: '#0ea5e9',
    kpis: [
      'Teams & SharePoint',
      'Email & OneDrive',
      'Permissions management',
    ],
    log:
      'Your Microsoft 365 environment configured properly',
  },

  {
    id: 'security',
    label: 'Business Security',
    detail:
      'Practical Microsoft-based protection for SMBs',
    color: '#8b5cf6',
    kpis: [
      'Security hardening',
      'Threat protection',
      'Staff security guidance',
    ],
    log:
      'Sensible security without unnecessary complexity',
  },

  {
    id: 'backup',
    label: 'Backup & Recovery',
    detail:
      'Reliable protection across cloud, local and hybrid environments',
    color: '#f59e0b',
    kpis: [
      'Automated cloud backups',
      'Local + offsite redundancy',
      'Recovery testing',
    ],
    log:
      'Your data protected and recoverable when it matters',
  },

  {
    id: 'network',
    label: 'Network & Infrastructure',
    detail:
      'Modern, secure and scalable network foundations',
    color: '#10b981',
    kpis: [
      'Secure Wi-Fi & LAN',
      'Firewall & VPN',
      'Multi-site connectivity',
    ],
    log:
      'Your network, stable and built for growth',
  },

  {
    id: 'monitoring',
    label: 'Monitoring & Insights',
    detail:
      'Real-time visibility across devices, cloud and security',
    color: '#6366f1',
    kpis: [
      'Endpoint health',
      'Cloud alerts',
      'Security visibility',
    ],
    log:
      'Know what is happening across your environment',
  },

  {
    id: 'automation',
    label: 'Automation & Workflows',
    detail:
      'AI-powered workflows that remove repetitive tasks',
    color: '#14b8a6',
    kpis: [
      'Power Automate',
      'AI ticket triage',
      'Automated reporting',
    ],
    log:
      'Let automation handle the repetitive work',
  },

  {
    id: 'helpdesk',
    label: 'IT Help & Advice',
    detail:
      'Clear, friendly support from someone who knows your setup',
    color: '#0d9488',
    kpis: [
      'Remote support',
      'Clear explanations',
      'Troubleshooting',
    ],
    log:
      'Friendly help from your dedicated IT partner',
  },
];

export default function HeroLogoAnimation() {
  const [svcIdx, setSvcIdx] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [infoReady, setInfoReady] = useState(false);

  const ringRef = useRef(null);
  const slashRef = useRef(null);
  const glowRef = useRef(null);
  const cycleRef = useRef(null);

  const svc = SERVICES[svcIdx];

  /*
   * Initial logo drawing sequence
   */
  useEffect(() => {
    const ring = ringRef.current;
    const slash = slashRef.current;

    if (!ring || !slash) return;

    ring.style.opacity = '0';
    ring.style.transform = 'scale(0.94)';
    ring.style.transformOrigin = '50% 50%';
    ring.style.transition = 'none';

    const slashLength = slash.getTotalLength();

    slash.style.strokeDasharray = String(slashLength);
    slash.style.strokeDashoffset = String(slashLength);
    slash.style.fillOpacity = '0';
    slash.style.strokeOpacity = '0.85';
    slash.style.transition = 'none';

    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
      glowRef.current.style.transition = 'none';
    }

    void ring.getBoundingClientRect();

    const t1 = setTimeout(() => {
      ring.style.transition = [
        'opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
        'transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
      ].join(', ');

      ring.style.opacity = '1';
      ring.style.transform = 'scale(1)';
    }, 80);

    const t2 = setTimeout(() => {
      slash.style.transition =
        'stroke-dashoffset 1300ms cubic-bezier(0.45, 0, 0.55, 1)';

      slash.style.strokeDashoffset = '0';
    }, 680);

    const t3 = setTimeout(() => {
      slash.style.transition =
        'fill-opacity 700ms ease, stroke-opacity 600ms ease';

      slash.style.fillOpacity = '1';
      slash.style.strokeOpacity = '0';
    }, 1900);

    const t4 = setTimeout(() => {
      if (glowRef.current) {
        glowRef.current.style.transition = 'opacity 900ms ease';
        glowRef.current.style.opacity = '1';
      }
    }, 2100);

    const t5 = setTimeout(() => {
      setIsLive(true);
      setInfoReady(true);
    }, 2400);

    return () => {
      [
        t1,
        t2,
        t3,
        t4,
        t5,
      ].forEach(clearTimeout);
    };
  }, []);

  /*
   * Automatic service rotation
   */
  useEffect(() => {
    if (!isLive) return;

    cycleRef.current = setInterval(() => {
      setSvcIdx((current) => (current + 1) % SERVICES.length);
    }, 4500);

    return () => {
      clearInterval(cycleRef.current);
    };
  }, [isLive]);

  /*
   * Manual service navigation
   */
  const goTo = useCallback(
    (index) => {
      clearInterval(cycleRef.current);

      setSvcIdx(index);

      if (isLive) {
        cycleRef.current = setInterval(() => {
          setSvcIdx(
            (current) => (current + 1) % SERVICES.length
          );
        }, 4500);
      }
    },
    [isLive]
  );

  return (
    <div
      className="sl-root"
      aria-label="Syncline IT Solutions services"
    >
      {/* ========================================================
          SERVICE BADGE
      ========================================================= */}

      <div
        className={`sl-badge${
          infoReady ? ' sl-badge--vis' : ''
        }`}
        style={{
          borderColor: `${svc.color}40`,
          background: `${svc.color}0d`,
        }}
      >
        <span
          className="sl-badge-dot"
          style={{
            background: svc.color,
          }}
        />

        <span
          className="sl-badge-label"
          style={{
            color: svc.color,
          }}
        >
          {svc.label}
        </span>
      </div>

      {/* ========================================================
          LOGO
      ========================================================= */}

      <div className="sl-logo-wrap">
        <div ref={glowRef} className="sl-glow" />

        <svg
          className="sl-svg"
          viewBox="0 0 1600 1600"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient
              id="sl-slash-fill"
              x1="177"
              y1="1399.7"
              x2="1408.5"
              y2="194.47"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0"
                stopColor="#0a1a2f"
              />

              <stop
                offset="0.42"
                stopColor="#0d2a50"
              />

              <stop
                offset="1"
                stopColor="#0077ff"
              />
            </linearGradient>

            <linearGradient
              id="sl-slash-stroke"
              x1="177"
              y1="1399.7"
              x2="1408.5"
              y2="194.47"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0"
                stopColor="#0a1a2f"
              />

              <stop
                offset="1"
                stopColor="#0077ff"
              />
            </linearGradient>

            <filter
              id="sl-ring-glow"
              x="-6%"
              y="-6%"
              width="112%"
              height="112%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3.5"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter
              id="sl-slash-glow"
              x="-18%"
              y="-18%"
              width="136%"
              height="136%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="4"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id="sl-clip">
              <rect
                x="0"
                y="0"
                width="1600"
                height="1600"
              />
            </clipPath>
          </defs>

          <g
            transform="translate(-175.55 -43.311)"
            fillRule="evenodd"
          >
            <path
              ref={ringRef}
              d={RING_D}
              fill="#0077ff"
              filter="url(#sl-ring-glow)"
              style={{
                willChange: 'opacity, transform',
              }}
            />

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
              style={{
                willChange:
                  'stroke-dashoffset, fill-opacity, stroke-opacity',
              }}
            />
          </g>

          {isLive && (
            <g clipPath="url(#sl-clip)">
              <circle
                cx="800"
                cy="820"
                fill="none"
                stroke="#0077ff"
                strokeWidth="1.2"
                className="sl-breathe-0"
              />

              <circle
                cx="800"
                cy="820"
                fill="none"
                stroke="#0077ff"
                strokeWidth="0.8"
                className="sl-breathe-1"
              />
            </g>
          )}
        </svg>
      </div>

      {/* ========================================================
          SERVICE INFORMATION
      ========================================================= */}

      <div
        className={`sl-info${
          infoReady ? ' sl-info--vis' : ''
        }`}
      >
        <div className="sl-detail-wrap">
          <p
            className="sl-detail"
            style={{
              color: `${svc.color}cc`,
            }}
          >
            {svc.detail}
          </p>
        </div>

        <div className="sl-kpis">
          {svc.kpis.map((kpi) => (
            <span
              key={kpi}
              className="sl-kpi"
              style={{
                color: svc.color,
                borderColor: `${svc.color}35`,
                background: `${svc.color}0d`,
              }}
            >
              {kpi}
            </span>
          ))}
        </div>

        <div
          className="sl-log"
          style={{
            borderColor: `${svc.color}28`,
          }}
        >
          <span
            className="sl-log-dot"
            style={{
              background: svc.color,
            }}
          />

          <span
            className="sl-log-text"
            style={{
              color: `${svc.color}b0`,
            }}
          >
            {svc.log}
          </span>
        </div>

        <nav
          className="sl-nav"
          aria-label="Browse services"
        >
          {SERVICES.map((service, index) => (
            <button
              key={service.id}
              type="button"
              className={`sl-nav-dot${
                index === svcIdx
                  ? ' sl-nav-dot--active'
                  : ''
              }`}
              style={{
                background:
                  index === svcIdx
                    ? service.color
                    : 'rgba(100,116,139,0.28)',

                width:
                  index === svcIdx
                    ? '18px'
                    : '5px',
              }}
              onClick={() => goTo(index)}
              aria-label={`Show ${service.label}`}
              aria-current={
                index === svcIdx
                  ? 'true'
                  : undefined
              }
            />
          ))}
        </nav>

        <p className="sl-brand">
          Syncline IT Solutions · Victoria, Australia
        </p>
      </div>
    </div>
  );
}