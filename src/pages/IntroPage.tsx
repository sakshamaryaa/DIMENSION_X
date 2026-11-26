import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight, Sparkles } from 'lucide-react';

const INTRO_SESSION_KEY = 'dx_intro_seen';

/* 3D Scientific Orbital Core for Cinematic Intro */
function IntroScientificCore({ isExiting }: { isExiting: boolean }) {
  const outerRingRef = useRef<THREE.Group>(null);
  const midRingRef = useRef<THREE.Group>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // 600 celestial/quantum particles
  const particlePositions = useMemo(() => {
    const coords = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 5.2 + 1.2;
      const sinPhi = Math.sin(phi);
      coords[i * 3] = r * sinPhi * Math.cos(theta);
      coords[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      coords[i * 3 + 2] = r * Math.cos(phi);
    }
    return coords;
  }, []);

  useFrame((_, delta) => {
    const mult = isExiting ? 5 : 1;
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x += delta * 0.22 * mult;
      outerRingRef.current.rotation.y += delta * 0.35 * mult;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.y -= delta * 0.28 * mult;
      midRingRef.current.rotation.z += delta * 0.18 * mult;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x -= delta * 0.45 * mult;
      innerCoreRef.current.rotation.y += delta * 0.6 * mult;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.04 * mult;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 6, 6]} intensity={2.8} color="#00D9FF" />
      <pointLight position={[-6, -6, -4]} intensity={2.4} color="#7565FF" />
      <pointLight position={[0, 0, 4]} intensity={1.2} color="#EAF4FF" />

      {/* Starfield Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#00D9FF"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating Orbital Systems */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Outer Orbital Ring — Cyan */}
        <group ref={outerRingRef}>
          <mesh rotation={[Math.PI / 3.5, 0, 0]}>
            <torusGeometry args={[2.8, 0.02, 16, 96]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={0.9}
              roughness={0.1}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
            <torusGeometry args={[3.2, 0.015, 16, 96]} />
            <meshStandardMaterial
              color="#7565FF"
              emissive="#7565FF"
              emissiveIntensity={0.7}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Mid Geometric Cage — Icosahedron */}
        <group ref={midRingRef}>
          <mesh>
            <icosahedronGeometry args={[1.7, 0]} />
            <meshStandardMaterial
              color="#7565FF"
              wireframe
              transparent
              opacity={0.7}
              emissive="#7565FF"
              emissiveIntensity={0.6}
            />
          </mesh>
        </group>

        {/* Central Luminous Core — Dodecahedron */}
        <mesh ref={innerCoreRef}>
          <dodecahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#EAF4FF"
            emissive="#00D9FF"
            emissiveIntensity={1.4}
            metalness={0.7}
            roughness={0.15}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* Fallback SVG when WebGL is unavailable or during reduced motion */
function IntroFallbackSvg() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="h-72 w-72 sm:h-96 sm:w-96"
        aria-label="Scientific Orbital Fallback"
      >
        <circle cx="200" cy="200" r="160" fill="none" stroke="#00D9FF" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="#7565FF" strokeWidth="1.5" opacity="0.6" />
        <ellipse cx="200" cy="200" rx="140" ry="70" fill="none" stroke="#00D9FF" strokeWidth="1.5" transform="rotate(35 200 200)" opacity="0.7" />
        <ellipse cx="200" cy="200" rx="140" ry="70" fill="none" stroke="#7565FF" strokeWidth="1.5" transform="rotate(-35 200 200)" opacity="0.7" />
        <polygon points="200,120 270,240 130,240" fill="none" stroke="#00D9FF" strokeWidth="2" opacity="0.8" />
        <circle cx="200" cy="200" r="30" fill="#00D9FF" opacity="0.25" />
        <circle cx="200" cy="200" r="12" fill="#EAF4FF" />
      </svg>
    </div>
  );
}

const STATUS_MESSAGES = [
  'INITIALIZING VISUAL ENVIRONMENT',
  'PREPARING SCIENTIFIC UNIVERSE',
  'CALIBRATING VISUAL SYSTEMS',
  'ENVIRONMENT READY',
];

export const IntroPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const isManualReplay = location.pathname === '/intro';

  // Check sessionStorage: if already seen and this is the default root `/`, skip straight to `/home`
  useEffect(() => {
    if (!isManualReplay) {
      const seen = sessionStorage.getItem(INTRO_SESSION_KEY);
      if (seen === 'true') {
        navigate('/home', { replace: true });
      }
    }
  }, [isManualReplay, navigate]);

  const [statusIndex, setStatusIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  // Status message sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setStatusIndex(1), 700),
      setTimeout(() => setStatusIndex(2), 1500),
      setTimeout(() => {
        setStatusIndex(3);
        setIsReady(true);
      }, 2300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    setIsExiting(true);
    setTimeout(() => {
      navigate('/home');
    }, 600);
  };

  const handleSkip = () => {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
    navigate('/home');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#080D18] text-[#EAF4FF] select-none flex flex-col justify-between">
      {/* Subtle background radial glows */}
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-[#00D9FF]/10 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[550px] w-[550px] rounded-full bg-[#7565FF]/14 blur-[150px]" />

      {/* Top bar with Skip and Identity */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 sm:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#00D9FF]/40 bg-[#00D9FF]/10 text-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.25)]">
            <span className="font-display text-sm font-extrabold">X</span>
          </div>
          <div>
            <span className="font-display text-xs font-bold tracking-widest text-[#EAF4FF]">
              DIMENSION X
            </span>
            <span className="block text-[10px] font-mono tracking-widest text-[#91A3BA]">
              SCIENTIFIC UNIVERSE
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="rounded-lg px-3 py-1.5 text-xs font-mono tracking-wider text-[#91A3BA] transition-colors hover:text-[#00D9FF] hover:bg-white/5"
        >
          SKIP INTRO →
        </button>
      </header>

      {/* Center 3D Cinematic Core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isExiting ? { opacity: 0, scale: 1.4 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          {webGlSupported && !prefersReducedMotion ? (
            <Canvas
              camera={{ position: [0, 0, 7.5], fov: 45 }}
              onCreated={({ gl }) => {
                if (!gl) setWebGlSupported(false);
              }}
              className="h-full w-full"
            >
              <Suspense fallback={null}>
                <IntroScientificCore isExiting={isExiting} />
              </Suspense>
            </Canvas>
          ) : (
            <IntroFallbackSvg />
          )}
        </motion.div>
      </div>

      {/* Foreground Hero Branding & Actions */}
      <main className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-8 text-center">
        {/* Creator Branding */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#91A3BA]/20 bg-[#101B2D]/70 px-4 py-1.5 text-[11px] font-mono tracking-widest text-[#91A3BA] backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#00D9FF]" />
          <span>CREATED BY SAKSHAM ARYA • AKA MR. VORTEX</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-6 font-display font-extrabold tracking-[-0.04em] text-[#EAF4FF]"
          style={{ fontSize: 'clamp(3.75rem, 10vw, 7.5rem)', lineHeight: 0.94 }}
        >
          DIMENSION <span className="text-[#00D9FF]">X</span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-4 font-display text-sm font-bold tracking-[0.32em] text-[#91A3BA] sm:text-base"
        >
          <span className="text-[#EAF4FF]">EXPLORE.</span>{' '}
          <span className="text-[#00D9FF]">EXPERIMENT.</span>{' '}
          <span className="text-[#7565FF]">DISCOVER.</span>
        </motion.div>

        {/* Status Sequencer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 flex items-center gap-2.5 font-mono text-xs tracking-widest text-[#00D9FF]"
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isReady ? 'bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]' : 'bg-[#7565FF] animate-ping'
            }`}
          />
          <span>{STATUS_MESSAGES[statusIndex]}</span>
        </motion.div>

        {/* Enter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={handleEnter}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-[#00D9FF]/50 bg-gradient-to-r from-[#00D9FF]/20 via-[#7565FF]/20 to-[#00D9FF]/20 px-8 py-4 font-display text-sm font-extrabold tracking-wider text-[#EAF4FF] shadow-[0_0_30px_rgba(0,217,255,0.25)] transition-all duration-300 hover:border-[#00D9FF] hover:shadow-[0_0_45px_rgba(0,217,255,0.45)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>ENTER THE UNIVERSE</span>
            <ArrowRight className="h-4 w-4 text-[#00D9FF] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </main>

      {/* Bottom Technical Bar */}
      <footer className="relative z-20 flex flex-col items-center justify-between gap-2 px-6 py-6 text-center sm:flex-row sm:text-left sm:px-12">
        <div className="font-mono text-[11px] text-[#91A3BA]">
          INDEPENDENT SCIENTIFIC EXPLORATION PLATFORM • 2026
        </div>
        <div className="font-mono text-[11px] text-[#91A3BA]">
          MATHEMATICS • PHYSICS • COMPUTATION • EXPERIMENTATION
        </div>
      </footer>
    </div>
  );
};

export default IntroPage;
