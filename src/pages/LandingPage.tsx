import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  Atom,
  Binary,
  Compass,
  Cpu,
  FlaskConical,
  Layers,
  Lightbulb,
  Orbit,
  Sigma,
  Sparkles,
} from 'lucide-react';
import { ScientificCore3D } from '@/components/three/ScientificCore3D';
import { Badge, Button } from '@/components/ui/Primitives';

gsap.registerPlugin(ScrollTrigger);

export const LandingPage: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !storyRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.dx-story-reveal', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#080D18] text-[#EAF4FF]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center dx-grid-bg border-b border-[#91A3BA]/15">
        {/* Subtle radial lighting */}
        <div className="pointer-events-none absolute -top-32 left-1/4 h-[540px] w-[540px] rounded-full bg-[#00D9FF]/10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-[480px] w-[480px] rounded-full bg-[#7565FF]/14 blur-[140px]" />

        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-4 py-16 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7 z-10 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Badge tone="cyan">2026 DIGITAL SCIENTIFIC UNIVERSE</Badge>
              <Badge tone="violet">MATHEMATICS • PHYSICS • EXPERIMENTATION</Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="dx-hero-title text-[#EAF4FF]"
            >
              DIMENSION
              <br />
              <span className="text-[#00D9FF]">X.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="font-display text-xl font-extrabold tracking-[0.24em] text-[#91A3BA] sm:text-3xl"
            >
              <span className="text-[#EAF4FF]">EXPLORE.</span>{' '}
              <span className="text-[#00D9FF]">EXPERIMENT.</span>{' '}
              <span className="text-[#7565FF]">DISCOVER.</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="max-w-xl text-base text-[#91A3BA] sm:text-lg leading-relaxed"
            >
              An interactive scientific universe exploring Mathematics, Physics, computational
              thinking and experimentation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link to="/app">
                <Button size="lg" className="font-display tracking-wider">
                  EXPLORE THE UNIVERSE <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/secret">
                <Button size="lg" className="font-display tracking-wider" variant="secondary">
                  UNLOCK SECRET <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#about-dimension-x">
                <Button variant="secondary" size="lg">
                  DISCOVER THE PROJECT
                </Button>
              </a>
            </motion.div>

            {/* Creator Identity */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.42 }}
              className="pt-4 border-t border-[#91A3BA]/15 flex flex-wrap items-center gap-3 text-xs"
            >
              <span className="uppercase tracking-[0.2em] text-[#91A3BA]">Created by</span>
              <Link
                to="/about"
                className="font-display text-sm font-bold tracking-wide text-[#EAF4FF] hover:text-[#00D9FF] transition-colors"
              >
                SAKSHAM ARYA <span className="text-[#00D9FF]">AKA MR. VORTEX</span>
              </Link>
            </motion.div>
          </div>

          {/* Interactive 3D Scientific Core */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-[#00D9FF]/25 bg-[#101B2D]/40 p-2 shadow-[0_0_60px_rgba(0,217,255,0.08)]">
              <ScientificCore3D className="h-[380px] sm:h-[480px] lg:h-[560px] w-full" />
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#91A3BA]">
                <span>SCIENTIFIC CORE // 3D INTERACTION</span>
                <span className="text-[#00D9FF]">DRAG TO ROTATE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORYTELLING CONTAINER */}
      <div id="about-dimension-x" ref={storyRef} className="mx-auto max-w-[1440px] px-4 py-20 lg:px-8 space-y-32">
        {/* 2. INTRODUCTION TO DIMENSION X */}
        <section className="dx-story-reveal space-y-6 max-w-4xl">
          <Badge tone="cyan">THE DIGITAL UNIVERSE</Badge>
          <h2 className="dx-editorial-heading text-[#EAF4FF]">
            A PLACE WHERE SCIENTIFIC RIGOR MEETS{' '}
            <span className="text-[#00D9FF]">DIGITAL EXPLORATION.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#91A3BA] leading-relaxed">
            DIMENSION X is an independent scientific exploration platform designed for those who
            refuse to treat science as static text on a printed page. It unifies the precision of
            mathematical abstraction with the empirical power of physical simulation, inviting you to
            test hypotheses, perturb parameters, and uncover structural beauty.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="rounded-2xl border border-[#91A3BA]/15 bg-[#101B2D]/60 p-5">
              <Binary className="h-6 w-6 text-[#00D9FF] mb-3" />
              <div className="font-display font-bold text-[#EAF4FF]">Deterministic Math</div>
              <p className="mt-1 text-xs text-[#91A3BA]">
                Pure numerical and symbolic engines generating verified mathematical representations.
              </p>
            </div>
            <div className="rounded-2xl border border-[#91A3BA]/15 bg-[#101B2D]/60 p-5">
              <Orbit className="h-6 w-6 text-[#7565FF] mb-3" />
              <div className="font-display font-bold text-[#EAF4FF]">Physical Simulation</div>
              <p className="mt-1 text-xs text-[#91A3BA]">
                Rigorous kinematics, Newtonian forces, thermodynamics, waves, and orbital mechanics.
              </p>
            </div>
            <div className="rounded-2xl border border-[#91A3BA]/15 bg-[#101B2D]/60 p-5">
              <Cpu className="h-6 w-6 text-[#00D9FF] mb-3" />
              <div className="font-display font-bold text-[#EAF4FF]">Computational Thinking</div>
              <p className="mt-1 text-xs text-[#91A3BA]">
                Iterative fractals, chaos theory, numerical integration, and real-time visualization.
              </p>
            </div>
          </div>
        </section>

        {/* 3. MATHEMATICS UNIVERSE */}
        <section className="dx-story-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00D9FF]/12 border border-[#00D9FF]/30 text-[#00D9FF]">
                <Sigma className="h-5 w-5" />
              </div>
              <Badge tone="cyan">SCIENTIFIC DOMAINS</Badge>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#EAF4FF]">
              MATHEMATICS UNIVERSE
            </h3>
            <p className="text-sm sm:text-base text-[#91A3BA] leading-relaxed">
              Explore mathematical structures organized across seven comprehensive domains: Set
              Theory &amp; Logic, Algebra &amp; Complex Numbers, Trigonometry &amp; Periodic Functions,
              Coordinate &amp; 3D Geometry, Calculus &amp; Derivatives, Statistics &amp; Probability,
              and Advanced Mathematical Modelling.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#91A3BA]">
              <div className="rounded-lg bg-[#101B2D] p-3 border border-[#91A3BA]/10">
                • Interactive Unit Circle
              </div>
              <div className="rounded-lg bg-[#101B2D] p-3 border border-[#91A3BA]/10">
                • Argand Plane &amp; Roots
              </div>
              <div className="rounded-lg bg-[#101B2D] p-3 border border-[#91A3BA]/10">
                • Conic Section Studio
              </div>
              <div className="rounded-lg bg-[#101B2D] p-3 border border-[#91A3BA]/10">
                • Tangent &amp; Derivative Lab
              </div>
            </div>
            <div className="pt-2">
              <Link to="/mathematics">
                <Button>
                  Explore Mathematics <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 dx-card p-6 border-[#00D9FF]/30 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#91A3BA] border-b border-[#91A3BA]/15 pb-3">
              <span>DOMAIN ARCHITECTURE</span>
              <span className="text-[#00D9FF]">7 SCIENTIFIC DOMAINS</span>
            </div>
            <div className="space-y-2.5">
              {[
                { domain: 'Domain A', title: 'Foundations of Mathematics', desc: 'Sets, Relations, Functions, Discrete Logic' },
                { domain: 'Domain B', title: 'Algebra & Number Theory', desc: 'Polynomials, Complex Numbers, Sequences, Combinatorics' },
                { domain: 'Domain C', title: 'Trigonometry & Periodicity', desc: 'Unit Circle, Angle Transformations, Harmonic Waves' },
                { domain: 'Domain D', title: 'Coordinate & 3D Geometry', desc: 'Conic Sections, Space Vectors, 3D Coordinate Systems' },
                { domain: 'Domain E', title: 'Calculus & Rates of Change', desc: 'Limits, Continuity, Instantaneous Derivatives' },
                { domain: 'Domain F', title: 'Statistics & Probability', desc: 'Distributions, Variance, Random Experiments' },
                { domain: 'Domain G', title: 'Advanced Mathematical Exploration', desc: 'Fractals, Chaos Dynamics, Numerical Approximation' },
              ].map((d) => (
                <div key={d.domain} className="flex items-start justify-between rounded-xl bg-[#080D18]/80 p-3 text-xs">
                  <div>
                    <span className="font-mono text-[#00D9FF] mr-2">{d.domain}:</span>
                    <span className="font-bold text-[#EAF4FF]">{d.title}</span>
                    <p className="text-[11px] text-[#91A3BA] mt-0.5">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PHYSICS UNIVERSE */}
        <section className="dx-story-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 dx-card p-6 border-[#7565FF]/30 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#91A3BA] border-b border-[#91A3BA]/15 pb-3">
              <span>PHYSICAL LAWS &amp; SIMULATION</span>
              <span className="text-[#7565FF]">SI VERIFIED COMPUTATION</span>
            </div>
            <div className="space-y-2.5">
              {[
                { domain: 'Domain A', title: 'Classical Mechanics & Dynamics', desc: 'Kinematics, Projectile Trajectories, Newton’s Laws, Energy' },
                { domain: 'Domain B', title: 'Properties of Matter & Fluids', desc: 'Elastic Moduli, Hydrostatic Pressure, Viscous Flow' },
                { domain: 'Domain C', title: 'Thermal Physics & Thermodynamics', desc: 'Calorimetry, Heat Transfer, Carnot Cycles, Kinetic Theory' },
                { domain: 'Domain D', title: 'Oscillations & Wave Mechanics', desc: 'Harmonic Motion, Damping, Resonance, Superposition' },
                { domain: 'Domain E', title: 'Measurement & Foundations', desc: 'SI Base Quantities, Dimensional Analysis, Error Bounds' },
                { domain: 'Domain F', title: 'Computational Physics Sandbox', desc: 'Differential Equation Solvers, Numerical Trajectories' },
              ].map((d) => (
                <div key={d.domain} className="flex items-start justify-between rounded-xl bg-[#080D18]/80 p-3 text-xs">
                  <div>
                    <span className="font-mono text-[#7565FF] mr-2">{d.domain}:</span>
                    <span className="font-bold text-[#EAF4FF]">{d.title}</span>
                    <p className="text-[11px] text-[#91A3BA] mt-0.5">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7565FF]/15 border border-[#7565FF]/35 text-[#7565FF]">
                <Atom className="h-5 w-5" />
              </div>
              <Badge tone="violet">SCIENTIFIC DOMAINS</Badge>
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#EAF4FF]">
              PHYSICS UNIVERSE
            </h3>
            <p className="text-sm sm:text-base text-[#91A3BA] leading-relaxed">
              Experience physics as a living laboratory. Manipulate launch velocity, gravitational
              acceleration, thermal gradients, spring constants, and damping factors with verified SI
              telemetry and immediate visual feedback.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#91A3BA]">
              <div className="rounded-lg bg-[#101B2D] p-3 border border-[#91A3BA]/10">
                • Projectile Vector Engine
              </div>
              <div className="rounded-lg bg-[#101B2D] p-3 border border-[#91A3BA]/10">
                • PV Thermodynamic Cycles
              </div>
              <div className="rounded-lg bg-[#101B2D] p-3 border border-[#91A3BA]/10">
                • Orbital &amp; Escape Velocity
              </div>
              <div className="rounded-lg bg-[#101B2D] p-3 border border-[#91A3BA]/10">
                • Superposition Wave Studio
              </div>
            </div>
            <div className="pt-2">
              <Link to="/physics">
                <Button variant="violet">
                  Explore Physics <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 5. INTERACTIVE EXPERIMENTATION */}
        <section className="dx-story-reveal space-y-8">
          <div className="space-y-3">
            <Badge tone="cyan">THE DIGITAL LABORATORY</Badge>
            <h3 className="dx-editorial-heading text-[#EAF4FF]">
              EXPERIMENTATION <span className="text-[#00D9FF]">CENTRE</span>
            </h3>
            <p className="max-w-2xl text-sm sm:text-base text-[#91A3BA]">
              A complete digital research bench featuring interactive equation plotting, 3D surface
              visualization, fractal exploration, collision analysis, and mathematical sandboxes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="dx-card p-6 space-y-3">
              <FlaskConical className="h-7 w-7 text-[#00D9FF]" />
              <h4 className="font-display text-xl font-bold text-[#EAF4FF]">
                2D &amp; 3D Graph Studio
              </h4>
              <p className="text-sm text-[#91A3BA]">
                Plot multi-parameter functions, visualize symbolic derivatives, and examine dynamic 3D
                surfaces z = f(x, y) in real time.
              </p>
              <Link
                to="/experimentation?module=graph"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#00D9FF] hover:underline"
              >
                Launch Graph Studio <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="dx-card p-6 space-y-3">
              <Layers className="h-7 w-7 text-[#7565FF]" />
              <h4 className="font-display text-xl font-bold text-[#EAF4FF]">
                Fractal &amp; Chaos Dynamics
              </h4>
              <p className="text-sm text-[#91A3BA]">
                Explore the Mandelbrot set and Logistic Map with escape-time iterations, zoom factors,
                and nonlinear bifurcation telemetry.
              </p>
              <Link
                to="/experimentation?module=mandelbrot"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#7565FF] hover:underline"
              >
                Launch Chaos Lab <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="dx-card p-6 space-y-3">
              <Orbit className="h-7 w-7 text-[#00D9FF]" />
              <h4 className="font-display text-xl font-bold text-[#EAF4FF]">
                Collision &amp; Physics Sandbox
              </h4>
              <p className="text-sm text-[#91A3BA]">
                Simulate elastic and inelastic momentum transfers, oscillatory restoring forces, and
                custom parameterized models.
              </p>
              <Link
                to="/experimentation?module=collision"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#00D9FF] hover:underline"
              >
                Launch Physics Lab <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. DISCOVERY HUB */}
        <section className="dx-story-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <Badge tone="cyan">KNOWLEDGE ARCHITECTURE</Badge>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#EAF4FF]">
              DISCOVERY HUB &amp; KNOWLEDGE NEXUS
            </h3>
            <p className="text-sm sm:text-base text-[#91A3BA] leading-relaxed">
              Traverse the interconnected web of scientific history and application. Search hundreds of
              rigorous formulas in the Formula Vault, trace historical breakthroughs across the
              Scientific Timeline, and explore real-world sustainability calculations for wind turbines
              and thermal efficiency.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/discovery?tab=vault">
                <Button>Explore Formula Vault</Button>
              </Link>
              <Link to="/discovery?tab=nexus">
                <Button variant="secondary">View 3D Nexus</Button>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 dx-card p-6 border-[#00D9FF]/30 space-y-4">
            <div className="flex items-center gap-3">
              <Compass className="h-6 w-6 text-[#00D9FF]" />
              <div>
                <div className="font-display text-lg font-bold text-[#EAF4FF]">Curated Formula Vault</div>
                <div className="text-xs text-[#91A3BA]">SI Units, Assumptions &amp; Proofs</div>
              </div>
            </div>
            <div className="rounded-xl bg-[#080D18] p-4 font-mono text-xs text-[#91A3BA] space-y-2">
              <div className="text-[#00D9FF]">Kinematics: v² = u² + 2as</div>
              <div className="text-[#7565FF]">Gravitation: F = G(m₁m₂)/r²</div>
              <div className="text-[#EAF4FF]">De Moivre: (cos θ + i sin θ)ⁿ = cos nθ + i sin nθ</div>
              <div className="text-[#34D399]">Wind Power: P = 0.5 · ρ · A · v³ · C_p</div>
            </div>
          </div>
        </section>

        {/* 7. SCIENTIFIC PHILOSOPHY */}
        <section className="dx-story-reveal rounded-3xl border border-[#00D9FF]/20 bg-[#101B2D]/40 p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D9FF]/40 bg-[#00D9FF]/10 px-4 py-1 text-xs font-mono text-[#00D9FF]">
            <Lightbulb className="h-3.5 w-3.5" /> CORE PHILOSOPHY
          </div>
          <blockquote className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#EAF4FF] max-w-4xl mx-auto leading-tight">
            &ldquo;Don&apos;t just read the equation. Explore what it means.&rdquo;
          </blockquote>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#91A3BA]">
            True comprehension is born not through memorization, but through active perturbation.
            When you adjust a parameter and observe the system reconfigure, the abstract becomes
            intuitive.
          </p>
        </section>

        {/* 8. CREATOR INTRODUCTION */}
        <section className="dx-story-reveal rounded-3xl border border-[#7565FF]/30 bg-gradient-to-br from-[#101B2D] via-[#0D1627] to-[#080D18] p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#00D9FF]">
                <Sparkles className="h-4 w-4" /> THE MIND BEHIND DIMENSION X
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-[#EAF4FF]">
                SAKSHAM ARYA <span className="text-[#00D9FF]">AKA MR. VORTEX</span>
              </h3>
              <p className="text-sm md:text-base text-[#91A3BA] leading-relaxed">
                Founder &amp; Creator of DIMENSION X. A passionate digital innovator and builder
                working across Mathematics, Physics, Programming, Robotics, Electronics, Scientific
                Computing, and Creative Technology.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Mathematics', 'Physics', 'Programming', 'Robotics', 'Electronics', 'Scientific Computing'].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-[#91A3BA]/20 bg-[#080D18]/70 px-3 py-1 text-xs font-mono text-[#91A3BA]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0">
              <Link to="/about">
                <Button variant="violet" size="lg">
                  Read Creator Story <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 9. FINAL CTA */}
        <section className="dx-story-reveal text-center space-y-8 py-12 border-t border-[#91A3BA]/15">
          <h2 className="dx-editorial-heading text-[#EAF4FF]">
            READY TO ENTER <span className="text-[#00D9FF]">DIMENSION X?</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#91A3BA]">
            Step into the scientific command centre and begin experimenting across mathematics,
            physics, and computational models.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/app">
              <Button size="lg" className="font-display tracking-wider">
                ENTER COMMAND CENTRE <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/intro">
              <Button variant="secondary" size="lg">
                Replay Cinematic Intro
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
