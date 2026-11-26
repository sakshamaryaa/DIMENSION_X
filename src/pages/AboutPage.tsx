import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Cpu,
  Globe2,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import { ScientificCore3D } from '@/components/three/ScientificCore3D';
import { Badge, Button } from '@/components/ui/Primitives';

const INTERESTS = [
  'Mathematics',
  'Physics',
  'Programming',
  'Robotics',
  'Electronics',
  'Technology',
  'Scientific Computing',
  'Digital Innovation',
];

const PHILOSOPHY = ['THINK.', 'CREATE.', 'EXPERIMENT.', 'INNOVATE.'];

export const AboutPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#080D18]">
      {/* HERO — CREATOR FIRST */}
      <section className="relative min-h-[88vh] flex items-center dx-grid-bg border-b border-[#91A3BA]/15">
        <div className="pointer-events-none absolute inset-0 opacity-65">
          <ScientificCore3D className="h-full w-full" interactive={false} intensity={0.75} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#080D18]/65 via-[#080D18]/75 to-[#080D18]" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-20 lg:px-8 w-full">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-xs sm:text-sm uppercase tracking-[0.28em] text-[#00D9FF]"
              >
                THE MIND BEHIND DIMENSION X.
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="font-display font-extrabold tracking-[-0.04em] leading-[0.88] text-[#EAF4FF]"
                style={{ fontSize: 'clamp(4rem, 11.5vw, 10.75rem)' }}
              >
                SAKSHAM
                <br />
                <span className="text-[#00D9FF]">ARYA.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18 }}
                className="space-y-1.5"
              >
                <div className="font-display text-2xl sm:text-4xl font-extrabold tracking-wide text-[#9F94FF]">
                  AKA MR. VORTEX
                </div>
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.22em] text-[#00D9FF]">
                  <span className="rounded-md bg-[#00D9FF]/15 px-2 py-0.5 text-[#00D9FF] font-bold">
                    ROLE: CREATOR
                  </span>
                  <span className="text-[#91A3BA]">FOUNDER &amp; BUILDER // 2026</span>
                </div>
              </motion.div>
            </div>

            {/* Stylized Abstract Visual Identity (No fabricated photo) */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="dx-glass relative w-full max-w-xs rounded-3xl p-6 text-center border-[#00D9FF]/30">
                <svg
                  viewBox="0 0 220 220"
                  className="mx-auto h-48 w-48"
                  aria-label="Stylised Abstract Vortex Identity Emblem"
                >
                  <defs>
                    <linearGradient id="vortexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D9FF" />
                      <stop offset="100%" stopColor="#7565FF" />
                    </linearGradient>
                  </defs>
                  <circle cx="110" cy="110" r="96" fill="none" stroke="url(#vortexGrad)" strokeWidth="1.5" strokeDasharray="6 6" />
                  <circle cx="110" cy="110" r="72" fill="none" stroke="#00D9FF" strokeOpacity="0.45" strokeWidth="1.5" />
                  <polygon
                    points="110,28 182,110 110,192 38,110"
                    fill="none"
                    stroke="url(#vortexGrad)"
                    strokeWidth="2"
                  />
                  <polygon
                    points="110,56 156,110 110,164 64,110"
                    fill="#7565FF"
                    fillOpacity="0.18"
                    stroke="#00D9FF"
                    strokeWidth="1.5"
                  />
                  <text
                    x="110"
                    y="118"
                    textAnchor="middle"
                    fill="#EAF4FF"
                    fontSize="26"
                    fontWeight="800"
                    fontFamily="Space Grotesk, sans-serif"
                  >
                    VX
                  </text>
                </svg>
                <div className="mt-3 font-display text-sm font-bold tracking-wider text-[#EAF4FF]">
                  MR. VORTEX // 2026
                </div>
                <div className="mt-1 text-xs text-[#91A3BA]">
                  Stylised Abstract Scientific Identity
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY, INTERESTS, PHILOSOPHY, VISION & CONNECTION */}
      <div className="mx-auto max-w-[1440px] space-y-24 px-4 py-24 lg:px-8">
        {/* MY STORY */}
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Badge tone="cyan">MY STORY</Badge>
            <h2 className="mt-4 dx-editorial-heading text-[#EAF4FF]">
              EVERYTHING STARTS WITH{' '}
              <span className="text-[#00D9FF]">CURIOSITY.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 dx-card p-8 space-y-5 text-base sm:text-lg text-[#EAF4FF]/90 leading-relaxed">
            <p>
              I am an aspiring technology enthusiast interested in Mathematics, Physics, Artificial
              Intelligence, programming, electronics, robotics and scientific exploration.
            </p>
            <p className="text-[#91A3BA]">
              I enjoy exploring how things work, experimenting with ideas and turning concepts into
              practical digital experiences.
            </p>
            <p className="text-[#00D9FF] font-medium">
              DIMENSION X represents my vision of bringing these interests together in one
              interactive scientific platform.
            </p>
          </div>
        </section>

        {/* MY INTERESTS */}
        <section className="space-y-8">
          <div className="space-y-2">
            <Badge tone="violet">MY INTERESTS</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#EAF4FF]">
              DISCIPLINES THAT DRIVE THE PLATFORM
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INTERESTS.map((item, idx) => (
              <div
                key={item}
                className="dx-card dx-card-interactive p-5 flex items-center justify-between"
              >
                <span className="font-display text-base font-bold text-[#EAF4FF]">{item}</span>
                <span className="font-mono text-xs text-[#00D9FF]">0{idx + 1}</span>
              </div>
            ))}
          </div>
        </section>

        {/* MY PHILOSOPHY */}
        <section className="rounded-3xl border border-[#00D9FF]/25 bg-[#101B2D]/60 p-8 sm:p-14">
          <Badge tone="cyan">MY PHILOSOPHY</Badge>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {PHILOSOPHY.map((word, idx) => (
              <div
                key={word}
                className={`font-display text-3xl sm:text-5xl font-extrabold tracking-tight ${
                  idx % 2 === 0 ? 'text-[#EAF4FF]' : 'text-[#00D9FF]'
                }`}
              >
                {word}
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-lg text-[#91A3BA]">
            &ldquo;I believe curiosity becomes meaningful when ideas are explored, tested and
            transformed into something real.&rdquo;
          </p>
        </section>

        {/* WHY I CREATED DIMENSION X & MY VISION */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="dx-card p-8 space-y-4">
            <div className="flex items-center gap-2 text-[#00D9FF]">
              <Lightbulb className="h-5 w-5" />
              <span className="font-mono text-xs uppercase tracking-widest">
                WHY I CREATED DIMENSION X
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#EAF4FF]">
              Uniting Theory, Code &amp; 3D Simulation
            </h3>
            <p className="text-sm sm:text-base text-[#91A3BA] leading-relaxed">
              Mathematics and Physics come alive when equations stop being static lines on paper
              and become interactive systems. By combining rigorous mathematical foundations and
              physical laws with 3D visualization, deterministic computation, and interactive
              experimentation, DIMENSION X turns abstract principles into hands-on discovery.
            </p>
          </div>

          <div className="dx-card p-8 space-y-4 border-[#7565FF]/30">
            <div className="flex items-center gap-2 text-[#9F94FF]">
              <Sparkles className="h-5 w-5" />
              <span className="font-mono text-xs uppercase tracking-widest">MY VISION</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#EAF4FF]">
              BUILDING BEYOND THE ORDINARY.
            </h3>
            <p className="text-sm sm:text-base text-[#91A3BA] leading-relaxed">
              DIMENSION X is built to make deep scientific exploration interactive, practical, and
              accessible — empowering learners and builders to test hypotheses, visualize
              relationships in real time, and bridge foundational science with modern computation.
            </p>
          </div>
        </section>

        {/* PROJECT CONNECTION */}
        <section className="space-y-6">
          <Badge tone="violet">PROJECT CONNECTION</Badge>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="dx-card p-6 space-y-2">
              <Cpu className="h-6 w-6 text-[#00D9FF]" />
              <h4 className="font-display text-lg font-bold text-[#EAF4FF]">AI for Better Life</h4>
              <p className="text-sm text-[#91A3BA]">
                Responsible AI that interprets scientific concepts and empowers human problem-solving
                while relying on deterministic engines for numerical truth.
              </p>
            </div>
            <div className="dx-card p-6 space-y-2">
              <Sparkles className="h-6 w-6 text-[#9F94FF]" />
              <h4 className="font-display text-lg font-bold text-[#EAF4FF]">
                Mathematical Modelling &amp; Computational Thinking
              </h4>
              <p className="text-sm text-[#91A3BA]">
                Translating physical phenomena into structured variables, equations, simulations, and
                reproducible computational workflows.
              </p>
            </div>
            <div className="dx-card p-6 space-y-2">
              <Globe2 className="h-6 w-6 text-[#00D9FF]" />
              <h4 className="font-display text-lg font-bold text-[#EAF4FF]">
                Science, Technology &amp; Innovation for a Sustainable and Viksit Bharat
              </h4>
              <p className="text-sm text-[#91A3BA]">
                Applying renewable energy, fluid resource, and thermal efficiency modelling toward
                sustainable national and global progress.
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="rounded-3xl border border-[#00D9FF]/30 bg-gradient-to-r from-[#101B2D] to-[#080D18] p-10 sm:p-16 text-center space-y-5">
          <div className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#EAF4FF]">
            SAKSHAM ARYA
          </div>
          <div className="font-display text-xl sm:text-2xl font-bold text-[#00D9FF]">
            aka MR. VORTEX
          </div>
          <div className="font-mono text-xs tracking-[0.25em] text-[#91A3BA]">
            CREATOR OF DIMENSION X.
          </div>
          <div className="pt-4">
            <Link to="/app">
              <Button size="lg" className="font-display tracking-wide">
                EXPLORE MY CREATION <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
