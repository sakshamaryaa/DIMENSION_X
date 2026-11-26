import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export const AICentrePage: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });

  const ringY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [48, -72]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-10, 16]);
  const glowY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [24, -36]);

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section
      ref={stageRef}
      aria-labelledby="ai-coming-soon"
      className="relative overflow-hidden bg-[#080D18]"
    >
      <div className="pointer-events-none absolute inset-0 dx-grid-bg opacity-70" aria-hidden="true" />

      <motion.div style={{ y: glowY }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="dx-ai-aurora absolute -left-24 top-[-10%] h-[420px] w-[420px] rounded-full bg-[#00D9FF]/14 blur-[120px] sm:h-[560px] sm:w-[560px]" />
        <div className="dx-ai-aurora dx-ai-aurora-delay absolute -right-16 bottom-[-8%] h-[380px] w-[380px] rounded-full bg-[#7565FF]/16 blur-[120px] sm:h-[520px] sm:w-[520px]" />
      </motion.div>

      <motion.div
        style={{ y: ringY, rotate: ringRotate }}
        className="pointer-events-none absolute right-[-18%] top-1/2 hidden w-[min(58vw,720px)] -translate-y-1/2 opacity-80 lg:block"
        aria-hidden="true"
      >
        <AiField />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-x-0 top-8 flex justify-center opacity-40 lg:hidden"
        aria-hidden="true"
      >
        <div className="w-[min(92vw,420px)]">
          <AiField />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-9.5rem)] max-w-[1440px] flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <motion.p
          {...rise(0.05)}
          className="font-display text-[0.7rem] font-extrabold tracking-[0.38em] text-[#00D9FF] sm:text-sm sm:tracking-[0.46em]"
        >
          AI INTELLIGENCE
        </motion.p>

        <div className="mt-6 h-px w-16 bg-gradient-to-r from-[#00D9FF] to-transparent sm:mt-8 sm:w-24" />

        <h1 id="ai-coming-soon" className="mt-8 sm:mt-10">
          <motion.span
            {...rise(0.16)}
            className="dx-soon-title block text-[#EAF4FF]"
          >
            COMING
          </motion.span>
          <motion.span
            {...rise(0.28)}
            className="dx-soon-title dx-soon-glow mt-1 block text-[#00D9FF] sm:mt-2"
          >
            SOON.
          </motion.span>
        </h1>

        <motion.p
          {...rise(0.42)}
          className="dx-soon-sub mt-8 max-w-4xl text-[#C6BEFF] sm:mt-12"
        >
          TO BE ADDED.
        </motion.p>

        <motion.p
          {...rise(0.54)}
          className="mt-8 max-w-lg text-base leading-relaxed text-[#91A3BA] sm:mt-10 sm:text-lg"
        >
          An intelligent layer is being imagined for a future dimension of scientific exploration.
        </motion.p>

        <motion.p
          {...rise(0.66)}
          className="mt-10 flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.28em] text-[#EAF4FF] sm:mt-12 sm:text-xs sm:tracking-[0.34em]"
        >
          <span className="dx-ai-beacon" aria-hidden="true" />
          UNDER DEVELOPMENT
        </motion.p>
      </div>
    </section>
  );
};

const AiField: React.FC = () => (
  <svg viewBox="0 0 640 640" className="h-auto w-full" fill="none">
    <circle cx="320" cy="320" r="250" stroke="rgba(0,217,255,0.22)" strokeWidth="1" />
    <circle cx="320" cy="320" r="186" stroke="rgba(117,101,255,0.35)" strokeWidth="1" />
    <circle cx="320" cy="320" r="112" stroke="rgba(0,217,255,0.45)" strokeWidth="1.25" />
    <circle cx="320" cy="320" r="6" fill="#00D9FF" />
    <path
      d="M320 70 A250 250 0 0 1 548 430"
      stroke="#00D9FF"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M132 214 A186 186 0 0 0 470 470"
      stroke="#7565FF"
      strokeWidth="1.25"
      strokeLinecap="round"
      opacity="0.8"
    />
    <circle cx="548" cy="430" r="4" fill="#00D9FF" />
    <circle cx="132" cy="214" r="3.5" fill="#9F94FF" />
    <circle cx="470" cy="470" r="3" fill="#7565FF" />
  </svg>
);
