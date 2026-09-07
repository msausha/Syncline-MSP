
// src/components/hero/HeroCTASection.jsx

import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Phone,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  ChevronDown,
  Server,
  Cloud,
  Database,
  AlertTriangle,
  TrendingUp,
  Activity,
  Zap,
  Cpu,
  Lock,
  Workflow,
} from 'lucide-react';

import HeroLogoAnimation from './HeroLogoAnimation';

const PROBLEMS = [
  {
    problem: 'IT issues slowing down work',
    solution: 'Steady, proactive maintenance',
  },
  {
    problem: 'Confusing cloud setup',
    solution: 'Clear Microsoft 365 & cloud support',
  },
  {
    problem: 'Risk of losing important files',
    solution: 'Reliable backup and recovery options',
  },
  {
    problem: 'Unclear security basics',
    solution: 'Simple, practical protection for everyday use',
  },
];

const TECH = [
  { Icon: Server, label: 'Systems & Devices' },
  { Icon: Cloud, label: 'Cloud Services' },
  { Icon: Database, label: 'Backup & Recovery' },
  { Icon: Lock, label: 'Security' },
  { Icon: Cpu, label: 'Health Monitoring' },
  { Icon: Workflow, label: 'Smart Workflows' },
];

const BENEFITS = [
  {
    Icon: CheckCircle,
    text: 'Fewer interruptions with proactive system care',
    c: 'green',
  },
  {
    Icon: Activity,
    text: 'Smooth and reliable day-to-day performance',
    c: 'blue',
  },
  {
    Icon: Cloud,
    text: 'Simple Microsoft 365 and cloud management',
    c: 'cyan',
  },
  {
    Icon: Database,
    text: 'Backups designed for dependable recovery',
    c: 'purple',
  },
  {
    Icon: TrendingUp,
    text: 'Technology that grows with your business',
    c: 'orange',
  },
];

const TERMINAL_LINES = [
  {
    text: '> Checking device health...',
    cls: 'text-cyan-400',
  },
  {
    text: '> Reviewing Microsoft 365 configuration...',
    cls: 'text-blue-400',
  },
  {
    text: '> Confirming backup availability...',
    cls: 'text-purple-400',
  },
  {
    text: '> Routine checks completed ✓',
    cls: 'text-green-400',
  },
];

const JOURNEY = [
  {
    Icon: AlertTriangle,
    label: 'Before: Frequent IT issues',
    c: 'red',
  },
  {
    Icon: Phone,
    label: 'Step 1: Quick conversation',
    c: 'blue',
  },
  {
    Icon: Activity,
    label: 'Step 2: Steady support',
    c: 'cyan',
  },
  {
    Icon: TrendingUp,
    label: 'Step 3: Confident growth',
    c: 'green',
  },
];

const FALLBACK_NEWS = [
  'Microsoft 365 security updates continue to strengthen SMB protection',
  'Azure improves cloud resilience and recovery capabilities',
  'AI-powered threat detection is changing modern email security',
  'Cloud backup improvements strengthen business continuity',
  'Microsoft Teams continues to improve hybrid-work performance',
];

const ICON_COLOR = {
  green: 'text-green-400',
  blue: 'text-blue-400',
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400',
  red: 'text-red-400',
};

const BOX_COLOR = {
  red: 'bg-red-500/10 border-red-500/30',
  blue: 'bg-blue-500/10 border-blue-500/30',
  cyan: 'bg-cyan-500/10 border-cyan-500/30',
  green: 'bg-green-500/10 border-green-500/30',
};

const BAR_COLOR = {
  cyan: 'from-cyan-500 to-cyan-400',
  blue: 'from-blue-500 to-blue-400',
  green: 'from-green-500 to-green-400',
};

const LABEL_COLOR = {
  cyan: 'text-cyan-400',
  blue: 'text-blue-400',
  green: 'text-green-400',
};

const HeroCTASection = () => {
  const [problemIdx, setProblemIdx] = useState(0);
  const [terminalStep, setTerminalStep] = useState(0);

  const [techNews, setTechNews] = useState(FALLBACK_NEWS);
  const [newsIndex, setNewsIndex] = useState(0);

  const timelineRef = React.useRef(null);
  const terminalRef = React.useRef(null);
  const techRef = React.useRef(null);

  const isTimelineInView = useInView(timelineRef, {
    once: true,
    margin: '-50px',
  });

  const isTerminalInView = useInView(terminalRef, {
    once: true,
    margin: '-50px',
  });

  const isTechInView = useInView(techRef, {
    once: true,
    margin: '-50px',
  });

  /*
   * Problem / solution rotation
   */
  useEffect(() => {
    const id = setInterval(() => {
      setProblemIdx((current) => (current + 1) % PROBLEMS.length);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  /*
   * Terminal animation
   */
  useEffect(() => {
    if (!isTerminalInView) return;

    setTerminalStep(0);

    const id = setInterval(() => {
      setTerminalStep((current) =>
        Math.min(current + 1, TERMINAL_LINES.length)
      );
    }, 1000);

    return () => clearInterval(id);
  }, [isTerminalInView]);

  /*
   * Fetch live news
   */
  useEffect(() => {
    let mounted = true;

    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://syncline-news-backend.onrender.com/api/news'
        );

        if (!response.ok) {
          throw new Error(`News API returned ${response.status}`);
        }

        const data = await response.json();

        if (
          mounted &&
          data?.success &&
          Array.isArray(data.items) &&
          data.items.length > 0
        ) {
          setTechNews(data.items);
          setNewsIndex(0);
        }
      } catch (error) {
        console.warn(
          'Could not fetch live news. Using fallback news.',
          error
        );
      }
    };

    fetchNews();

    const refreshId = setInterval(fetchNews, 10 * 60 * 1000);

    return () => {
      mounted = false;
      clearInterval(refreshId);
    };
  }, []);

  /*
   * News rotation
   *
   * IMPORTANT:
   * React owns the text.
   * We do not manually manipulate textContent.
   */
  useEffect(() => {
    if (techNews.length <= 1) return;

    const id = setInterval(() => {
      setNewsIndex((current) => (current + 1) % techNews.length);
    }, 5500);

    return () => clearInterval(id);
  }, [techNews]);

  const currentNews = techNews[newsIndex] || FALLBACK_NEWS[0];

  return (
    <section
      id="hero"
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-slate-950
        via-blue-950/95
        to-cyan-950/80
      "
    >
      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -35, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            -top-48
            -left-48
            h-[420px]
            w-[420px]
            rounded-full
            bg-blue-600/10
            blur-3xl
          "
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 35, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="
            absolute
            -bottom-48
            -right-48
            h-[420px]
            w-[420px]
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-cyan-400/30
            to-transparent
          "
        />
      </div>

      {/* =========================================================
          HERO
      ========================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
          pt-6
          sm:pt-8
          lg:pt-10
          pb-10
          sm:pb-12
          lg:pb-14
        "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            items-center
            gap-8
            lg:gap-5
            xl:gap-8
          "
        >
          {/* =====================================================
              LEFT SIDE
          ====================================================== */}

          <div
            className="
              order-1
              lg:col-span-7
              flex
              min-w-0
              flex-col
              gap-4
              sm:gap-5
            "
          >
            {/* ---------------------------------------------------
                LIVE TECH INTELLIGENCE
            ---------------------------------------------------- */}

            <div
              className="
                flex
                min-w-0
                items-center
                gap-3
                rounded-xl
                border
                border-cyan-400/25
                bg-slate-900/70
                px-3.5
                py-2.5
                shadow-lg
                shadow-cyan-950/20
                backdrop-blur-md
              "
            >
              <div
                className="
                  flex
                  flex-shrink-0
                  items-center
                  gap-2
                  text-[10px]
                  sm:text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-cyan-300
                "
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-cyan-400
                      opacity-60
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2
                      w-2
                      rounded-full
                      bg-cyan-400
                    "
                  />
                </span>

                <span className="hidden sm:inline">
                  Live Tech Intelligence
                </span>

                <span className="sm:hidden">
                  Live Update
                </span>
              </div>

              <div className="h-4 w-px flex-shrink-0 bg-white/10" />

              <div className="min-w-0 flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${newsIndex}-${currentNews}`}
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      m-0
                      line-clamp-2
                      text-[11px]
                      sm:text-xs
                      font-medium
                      leading-[1.35]
                      text-slate-300
                    "
                  >
                    {currentNews}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* ---------------------------------------------------
                HEADLINE
            ---------------------------------------------------- */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
            >
              <h1
                className="
                  m-0
                  max-w-3xl
                  font-black
                  tracking-[-0.035em]
                  leading-[1.02]
                "
              >
                <span
                  className="
                    block
                    text-[2rem]
                    sm:text-[2.65rem]
                    lg:text-[3rem]
                    xl:text-[3.25rem]
                    text-white
                  "
                >
                  Reliable IT Support
                </span>

                <span
                  className="
                    mt-1
                    block
                    bg-gradient-to-r
                    from-cyan-300
                    via-blue-400
                    to-purple-400
                    bg-clip-text
                    text-[2rem]
                    sm:text-[2.65rem]
                    lg:text-[3rem]
                    xl:text-[3.25rem]
                    text-transparent
                  "
                >
                  for Victorian SMBs
                </span>
              </h1>
            </motion.div>

            {/* ---------------------------------------------------
                SUBTITLE
            ---------------------------------------------------- */}

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.2,
              }}
              className="
                m-0
                max-w-2xl
                text-[13px]
                sm:text-sm
                lg:text-[15px]
                leading-relaxed
                text-slate-300
              "
            >
              Proactive support for Microsoft 365, cloud, networks,
              security and backups — helping Victorian businesses
              stay productive, protected and ready to grow.
            </motion.p>

            {/* ---------------------------------------------------
                PROBLEM / SOLUTION
            ---------------------------------------------------- */}

            <div className="w-full max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={problemIdx}
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-[1fr_auto_1fr]
                    items-stretch
                    gap-2.5
                  "
                >
                  {/* Problem */}

                  <div
                    className="
                      min-w-0
                      rounded-xl
                      border
                      border-red-500/25
                      bg-red-500/[0.07]
                      px-3.5
                      py-3
                    "
                  >
                    <p
                      className="
                        m-0
                        mb-1
                        flex
                        items-center
                        gap-1.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-red-400
                      "
                    >
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Problem
                    </p>

                    <p
                      className="
                        m-0
                        text-xs
                        font-semibold
                        leading-snug
                        text-white
                      "
                    >
                      {PROBLEMS[problemIdx].problem}
                    </p>
                  </div>

                  {/* Arrow */}

                  <div
                    className="
                      hidden
                      sm:flex
                      items-center
                      justify-center
                    "
                  >
                    <ArrowRight className="h-4 w-4 text-cyan-400/80" />
                  </div>

                  {/* Solution */}

                  <div
                    className="
                      min-w-0
                      rounded-xl
                      border
                      border-green-500/25
                      bg-green-500/[0.07]
                      px-3.5
                      py-3
                    "
                  >
                    <p
                      className="
                        m-0
                        mb-1
                        flex
                        items-center
                        gap-1.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-green-400
                      "
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      Solution
                    </p>

                    <p
                      className="
                        m-0
                        text-xs
                        font-semibold
                        leading-snug
                        text-white
                      "
                    >
                      {PROBLEMS[problemIdx].solution}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ---------------------------------------------------
                CTA
            ---------------------------------------------------- */}

            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <RouterLink
                  to="/contact"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-500
                    via-blue-500
                    to-indigo-500
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                    transition
                    hover:shadow-blue-500/40
                    sm:px-6
                  "
                >
                  Book Free Health Check

                  <ArrowRight className="h-4 w-4" />
                </RouterLink>
              </motion.div>

              <motion.a
                href="tel:0406001444"
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-cyan-400/40
                  bg-slate-900/50
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-cyan-300
                  backdrop-blur-sm
                  transition
                  hover:border-cyan-300/70
                  hover:bg-cyan-500/5
                  sm:px-6
                "
              >
                <Phone className="h-4 w-4" />
                0406 001 444
              </motion.a>
            </div>

            {/* ---------------------------------------------------
                TRUST
            ---------------------------------------------------- */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-2
                text-[11px]
                sm:text-xs
                text-slate-400
              "
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                Stable performance
              </span>

              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-blue-400" />
                &lt;2hr response
              </span>

              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-cyan-400" />
                Victorian SMBs
              </span>
            </div>

            {/* ---------------------------------------------------
                TECHNOLOGY
            ---------------------------------------------------- */}

            <div ref={techRef} className="pt-1">
              <p
                className="
                  m-0
                  mb-2
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-slate-500
                "
              >
                Technology & capabilities
              </p>

              <div className="flex flex-wrap gap-1.5">
                {TECH.map((tech, index) => {
                  const Icon = tech.Icon;

                  return (
                    <motion.span
                      key={tech.label}
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      animate={
                        isTechInView
                          ? {
                              opacity: 1,
                              scale: 1,
                            }
                          : {}
                      }
                      transition={{
                        delay: index * 0.06,
                        duration: 0.25,
                      }}
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-cyan-500/20
                        bg-cyan-500/[0.07]
                        px-2.5
                        py-1.5
                        text-[10px]
                        font-semibold
                        text-cyan-300
                      "
                    >
                      <Icon className="h-3 w-3" />
                      {tech.label}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE — LOGO
          ====================================================== */}

          <div
            className="
              order-2
              lg:col-span-5
              flex
              w-full
              min-w-0
              items-center
              justify-center
              lg:justify-end
            "
          >
            <div
              className="
                w-full
                max-w-[520px]
                lg:max-w-[560px]
                xl:max-w-[600px]
              "
            >
              <HeroLogoAnimation />
            </div>
          </div>
        </div>

        {/* =======================================================
            SCROLL INDICATOR
        ======================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.8,
          }}
          className="flex justify-center pt-6 sm:pt-8"
        >
          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              p-1.5
            "
          >
            <ChevronDown className="h-4 w-4 text-blue-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* =========================================================
          BELOW HERO
      ========================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =======================================================
            BENEFITS
        ======================================================== */}

        <div className="border-t border-white/[0.05] py-14 lg:py-16">
          <h2
            className="
              mb-8
              text-center
              text-2xl
              sm:text-3xl
              font-bold
              tracking-tight
              text-white
            "
          >
            How We Support Victorian SMBs
          </h2>

          <div
            className="
              mx-auto
              grid
              max-w-5xl
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.Icon;

              return (
                <motion.div
                  key={benefit.text}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.06,
                  }}
                  className="
                    flex
                    items-start
                    gap-3
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-slate-900/50
                    p-4
                  "
                >
                  <Icon
                    className={`
                      mt-0.5
                      h-5
                      w-5
                      flex-shrink-0
                      ${ICON_COLOR[benefit.c]}
                    `}
                  />

                  <span className="text-sm leading-relaxed text-slate-300">
                    {benefit.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =======================================================
            JOURNEY
        ======================================================== */}

        <div
          ref={timelineRef}
          className="border-t border-white/[0.05] py-14 lg:py-16"
        >
          <h2
            className="
              mb-10
              text-center
              text-2xl
              sm:text-3xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Your IT Journey
          </h2>

          <div
            className="
              relative
              mx-auto
              flex
              max-w-4xl
              flex-col
              items-center
              justify-between
              gap-7
              sm:flex-row
            "
          >
            <svg
              className="
                pointer-events-none
                absolute
                inset-0
                hidden
                h-full
                w-full
                sm:block
              "
              viewBox="0 0 1000 160"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 130,80 Q 330,30 500,80 T 870,80"
                fill="none"
                stroke="rgb(6,182,212)"
                strokeWidth="2"
                strokeOpacity="0.35"
                strokeLinecap="round"
                initial={{
                  pathLength: 0,
                }}
                animate={
                  isTimelineInView
                    ? {
                        pathLength: 1,
                      }
                    : {}
                }
                transition={{
                  duration: 2.2,
                }}
              />
            </svg>

            {JOURNEY.map((step, index) => {
              const Icon = step.Icon;

              return (
                <motion.div
                  key={step.label}
                  initial={{
                    opacity: 0,
                    y: 25,
                    scale: 0.9,
                  }}
                  animate={
                    isTimelineInView
                      ? {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }
                      : {}
                  }
                  transition={{
                    delay: index * 0.2,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  className="
                    relative
                    z-10
                    flex
                    w-full
                    flex-col
                    items-center
                    gap-2.5
                    sm:w-auto
                  "
                >
                  <div
                    className={`
                      rounded-2xl
                      border
                      p-4
                      ${BOX_COLOR[step.c]}
                    `}
                  >
                    <Icon
                      className={`
                        h-8
                        w-8
                        ${ICON_COLOR[step.c]}
                      `}
                    />
                  </div>

                  <p
                    className="
                      m-0
                      max-w-[180px]
                      text-center
                      text-xs
                      font-semibold
                      leading-snug
                      text-white
                    "
                  >
                    {step.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =======================================================
            TERMINAL
        ======================================================== */}

        <div
          ref={terminalRef}
          className="border-t border-white/[0.05] py-14 lg:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-cyan-500/20
                bg-slate-950/80
                p-5
                shadow-2xl
                shadow-cyan-950/20
                backdrop-blur-xl
              "
            >
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />

                <span className="ml-2 text-xs text-slate-500">
                  monitoring@syncline.com.au
                </span>
              </div>

              <motion.div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-400/50
                  to-transparent
                "
                animate={{
                  y: ['0%', '7000%'],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {TERMINAL_LINES.map((line, index) => (
                <motion.p
                  key={line.text}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: index < terminalStep ? 1 : 0,
                  }}
                  className={`
                    m-0
                    mb-2
                    font-mono
                    text-xs
                    sm:text-sm
                    ${line.cls}
                  `}
                >
                  {line.text}
                </motion.p>
              ))}

              <motion.span
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                }}
                className="
                  inline-block
                  h-4
                  w-1.5
                  bg-green-400
                  align-middle
                "
              />
            </div>
          </div>
        </div>

        {/* =======================================================
            METRICS
        ======================================================== */}

        <div className="border-t border-white/[0.05] py-14 lg:py-16">
          <div
            className="
              mx-auto
              grid
              max-w-4xl
              grid-cols-1
              gap-4
              sm:grid-cols-3
            "
          >
            {[
              {
                label: 'Revenue Protected',
                value: 85,
                c: 'cyan',
              },
              {
                label: 'Uptime SLA',
                value: 99.9,
                c: 'blue',
              },
              {
                label: 'Risk Reduction',
                value: 95,
                c: 'green',
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-slate-900/50
                  p-5
                "
              >
                <p
                  className={`
                    m-0
                    mb-3
                    text-xs
                    font-semibold
                    ${LABEL_COLOR[metric.c]}
                  `}
                >
                  {metric.label}
                </p>

                <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: `${metric.value}%`,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1.6,
                      delay: 0.2 + index * 0.1,
                    }}
                    className={`
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      ${BAR_COLOR[metric.c]}
                    `}
                  />
                </div>

                <p className="m-0 text-3xl font-black text-white">
                  {metric.value}%
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* =======================================================
            FINAL CTA
        ======================================================== */}

        <div
          className="
            border-t
            border-white/[0.05]
            py-14
            text-center
            lg:py-16
          "
        >
          <div className="mb-8 flex flex-wrap justify-center gap-2.5">
            {[
              {
                Icon: CheckCircle,
                text: 'Free assessment',
                c: 'green',
              },
              {
                Icon: Clock,
                text: '48-hour report',
                c: 'blue',
              },
              {
                Icon: Zap,
                text: 'No obligation',
                c: 'cyan',
              },
            ].map((item) => {
              const Icon = item.Icon;

              return (
                <motion.div
                  key={item.text}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-white/[0.07]
                    bg-white/[0.03]
                    px-4
                    py-2.5
                    text-xs
                    text-white
                  "
                >
                  <Icon
                    className={`
                      h-4
                      w-4
                      ${ICON_COLOR[item.c]}
                    `}
                  />

                  {item.text}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="mb-5 inline-block"
          >
            <RouterLink
              to="/contact"
              className="
                inline-flex
                items-center
                gap-2.5
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                via-blue-500
                to-indigo-500
                px-8
                py-3.5
                text-base
                font-bold
                text-white
                shadow-xl
                shadow-blue-500/20
                transition
                hover:shadow-blue-500/40
              "
            >
              Get Started Today

              <ArrowRight className="h-5 w-5" />
            </RouterLink>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className="
              m-0
              text-sm
              text-slate-500
            "
          >
            ⭐ Trusted by 150+ Victorian businesses
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroCTASection;