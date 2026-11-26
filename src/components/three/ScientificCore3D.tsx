import React, { Component, Suspense, useMemo, useRef, useState, useEffect, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

class WebGLErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function CoreScene({ interactive = true, intensity = 1 }: { interactive?: boolean; intensity?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const particlePositions = useMemo(() => {
    const count = 420;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic golden-angle spherical distribution (no random jitter on re-render)
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.1 + (i % 7) * 0.28;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const nodePositions = useMemo<[number, number, number][]>(() => {
    const pts: [number, number, number][] = [];
    const n = 12;
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2;
      const y = Math.sin(i * 1.3) * 1.15;
      const rad = 1.9;
      pts.push([Math.cos(angle) * rad, y, Math.sin(angle) * rad]);
    }
    return pts;
  }, []);

  const connectionLines = useMemo(() => {
    const verts: number[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      const next = (i + 1) % nodePositions.length;
      const opp = (i + 4) % nodePositions.length;
      verts.push(...nodePositions[i], ...nodePositions[next]);
      verts.push(...nodePositions[i], ...nodePositions[opp]);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, [nodePositions]);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      const targetX = interactive ? pointer.y * 0.25 : 0;
      const targetY = t * 0.14 + (interactive ? pointer.x * 0.35 : 0);
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.22 * intensity;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.18 * intensity;
    if (ring3Ref.current) ring3Ref.current.rotation.y = -t * 0.16 * intensity;
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 4, 5]} intensity={2.4} color="#00D9FF" />
      <pointLight position={[-5, -4, -3]} intensity={2.0} color="#7565FF" />

      <group ref={groupRef}>
        {/* Inner Quantum Core */}
        <mesh>
          <icosahedronGeometry args={[0.92, 1]} />
          <meshStandardMaterial
            color="#101B2D"
            emissive="#00D9FF"
            emissiveIntensity={0.45}
            wireframe
          />
        </mesh>

        <mesh>
          <octahedronGeometry args={[0.56, 0]} />
          <meshStandardMaterial
            color="#7565FF"
            emissive="#7565FF"
            emissiveIntensity={0.85}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Orbital Rings */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0.2, 0]}>
          <torusGeometry args={[1.65, 0.015, 16, 100]} />
          <meshBasicMaterial color="#00D9FF" transparent opacity={0.7} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[-Math.PI / 4, 0.5, 0]}>
          <torusGeometry args={[2.05, 0.014, 16, 100]} />
          <meshBasicMaterial color="#7565FF" transparent opacity={0.65} />
        </mesh>
        <mesh ref={ring3Ref} rotation={[0.4, -Math.PI / 3, 0]}>
          <torusGeometry args={[2.45, 0.01, 16, 100]} />
          <meshBasicMaterial color="#EAF4FF" transparent opacity={0.28} />
        </mesh>

        {/* Interconnected Nodes */}
        {nodePositions.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.055, 12, 12]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#00D9FF' : '#7565FF'} />
          </mesh>
        ))}

        <lineSegments geometry={connectionLines}>
          <lineBasicMaterial color="#00D9FF" transparent opacity={0.22} />
        </lineSegments>

        {/* Particle Cloud */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial size={0.032} color="#EAF4FF" transparent opacity={0.72} sizeAttenuation />
        </points>
      </group>

      {interactive && <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />}
    </>
  );
}

const Core2DFallback: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 320 320" className="h-full w-full max-h-[380px] opacity-90">
      <defs>
        <radialGradient id="dxCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#7565FF" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#080D18" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="140" fill="url(#dxCoreGlow)" />
      <ellipse cx="160" cy="160" rx="115" ry="44" fill="none" stroke="#00D9FF" strokeOpacity="0.55" strokeWidth="1.5" transform="rotate(-24 160 160)" />
      <ellipse cx="160" cy="160" rx="115" ry="44" fill="none" stroke="#7565FF" strokeOpacity="0.55" strokeWidth="1.5" transform="rotate(32 160 160)" />
      <circle cx="160" cy="160" r="56" fill="none" stroke="#EAF4FF" strokeOpacity="0.3" strokeDasharray="4 6" />
      <polygon points="160,118 198,160 160,202 122,160" fill="#7565FF" fillOpacity="0.3" stroke="#00D9FF" strokeWidth="1.5" />
    </svg>
  </div>
);

export const ScientificCore3D: React.FC<{
  className?: string;
  interactive?: boolean;
  intensity?: number;
}> = ({ className = 'h-[420px] w-full', interactive = true, intensity = 1 }) => {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (prefersReduced || !webglSupported) {
    return <Core2DFallback className={className} />;
  }

  return (
    <div className={`relative ${className}`} aria-label="Interactive 3D Scientific Core">
      <WebGLErrorBoundary fallback={<Core2DFallback className="h-full w-full" />}>
        <Suspense fallback={<Core2DFallback className="h-full w-full" />}>
          <Canvas
            dpr={[1, 1.75]}
            camera={{ position: [0, 0, 5.4], fov: 46 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <CoreScene interactive={interactive} intensity={intensity} />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
};
