import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { EquationGraphStudio } from '@/components/lab/EquationGraphStudio';
import { PlotlyChart } from '@/components/ui/PlotlyChart';
import { AssumptionsBar, Badge, Button, MetricTile, ScientificSlider } from '@/components/ui/Primitives';
import { ProjectileTool } from '@/components/physics/PhysicsToolsPart1';
import { OscillationsTool, WavesTool } from '@/components/physics/PhysicsToolsPart2';
import { computeStatistics, sampleMathExpression } from '@/engines/mathEngine';
import { compute1DCollision, simulateSHM } from '@/engines/physicsEngine';
import { useWorkspace } from '@/store/workspaceStore';

/* B. 3D Mathematical Surface Mesh */
function MathSurface3DMesh({ freq }: { freq: number }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(5, 5, 44, 44);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const r = Math.hypot(x, y);
      const z = Math.cos(r * freq) * Math.exp(-0.18 * r * r) * 1.1;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, [freq]);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2.3, 0, 0]}>
      <meshStandardMaterial color="#00D9FF" wireframe />
    </mesh>
  );
}

/* E. Mandelbrot Fractal Canvas */
const FractalExplorer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [maxIter, setMaxIter] = useState(48);
  const [zoom, setZoom] = useState(1.0);
  const [centerX, setCenterX] = useState(-0.6);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const img = ctx.createImageData(w, h);
    const scale = 3.0 / (zoom * w);

    for (let py = 0; py < h; py++) {
      for (let px = 0; px < w; px++) {
        const x0 = centerX + (px - w / 2) * scale;
        const y0 = (py - h / 2) * scale;
        let x = 0;
        let y = 0;
        let iter = 0;
        while (x * x + y * y <= 4 && iter < maxIter) {
          const xt = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xt;
          iter++;
        }
        const idx = (py * w + px) * 4;
        if (iter === maxIter) {
          img.data[idx] = 8;
          img.data[idx + 1] = 13;
          img.data[idx + 2] = 24;
          img.data[idx + 3] = 255;
        } else {
          const t = iter / maxIter;
          img.data[idx] = Math.floor(t * 117);
          img.data[idx + 1] = Math.floor(t * 217);
          img.data[idx + 2] = Math.floor(140 + t * 115);
          img.data[idx + 3] = 255;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }, [maxIter, zoom, centerX]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScientificSlider label="Max Iterations" value={maxIter} min={16} max={120} step={4} onChange={setMaxIter} />
        <ScientificSlider label="Zoom Factor" value={zoom} min={0.8} max={8} step={0.2} onChange={setZoom} />
        <ScientificSlider label="Real Center X" value={centerX} min={-1.6} max={0.5} step={0.05} onChange={setCenterX} />
      </div>
      <canvas
        ref={canvasRef}
        width={480}
        height={280}
        className="w-full max-w-2xl rounded-xl border border-[#00D9FF]/30 bg-[#080D18]"
      />
      <AssumptionsBar assumptions={['Deterministic escape-time iteration z_{n+1} = z_n² + c on the complex plane.']} />
    </div>
  );
};

export const ExperimentationCentrePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawModule = searchParams.get('module') || 'graph';
  const activeModule =
    rawModule === 'mandelbrot' ? 'fractal' : rawModule === 'regression' ? 'data' : rawModule;
  const { saveExperiment } = useWorkspace();

  // Module A: Universal Sandbox
  const [sbAmp, setSbAmp] = useState(2);
  const [sbMass, setSbMass] = useState(1.5);
  const [sbK, setSbK] = useState(20);
  const [sbDamp, setSbDamp] = useState(0.25);
  const sandboxData = useMemo(() => simulateSHM(sbAmp, sbMass, sbK, sbDamp, 10), [sbAmp, sbMass, sbK, sbDamp]);

  // Module B: 3D Math Freq
  const [surfFreq, setSurfFreq] = useState(2.2);

  // Module C: Virtual Physics Lab selector
  const [virtTab, setVirtTab] = useState<'projectile' | 'oscillations' | 'waves'>('projectile');

  // Module D: Collision Lab
  const [m1, setM1] = useState(4);
  const [u1, setU1] = useState(8);
  const [m2, setM2] = useState(2);
  const [u2, setU2] = useState(-3);
  const [restE, setRestE] = useState(1.0);
  const collision = useMemo(() => compute1DCollision(m1, u1, m2, u2, restE), [m1, u1, m2, u2, restE]);

  // Module F: Chaos Logistic Map
  const [rParam, setRParam] = useState(3.57);
  const chaosSeries = useMemo(() => {
    const xs: number[] = [];
    const ys: number[] = [];
    let x = 0.4;
    for (let i = 0; i <= 50; i++) {
      xs.push(i);
      ys.push(x);
      x = rParam * x * (1 - x);
    }
    return { xs, ys };
  }, [rParam]);

  // Module G: Data Intelligence Lab
  const [csvData, setCsvData] = useState('1, 2.1\n2, 4.0\n3, 5.8\n4, 8.2\n5, 10.1\n6, 11.9');
  const parsedPairs = useMemo(() => {
    const pts = csvData
      .split('\n')
      .map((line) => line.split(/[,\s]+/).map(Number))
      .filter((arr) => arr.length >= 2 && Number.isFinite(arr[0]) && Number.isFinite(arr[1]));
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const n = pts.length;
    const meanX = n ? xs.reduce((a, b) => a + b, 0) / n : 0;
    const meanY = n ? ys.reduce((a, b) => a + b, 0) / n : 0;
    const num = pts.reduce((acc, p) => acc + (p[0] - meanX) * (p[1] - meanY), 0);
    const den = pts.reduce((acc, p) => acc + (p[0] - meanX) ** 2, 0);
    const slope = den > 1e-12 ? num / den : 0;
    const intercept = meanY - slope * meanX;
    const fitY = xs.map((x) => slope * x + intercept);
    return { xs, ys, slope, intercept, fitY, statsY: computeStatistics(ys) };
  }, [csvData]);

  // Module H: Model Comparison
  const [cmpA, setCmpA] = useState('x^2');
  const [cmpB, setCmpB] = useState('2 * x + 1');
  const cmp1 = useMemo(() => sampleMathExpression(cmpA, -4, 4, 150), [cmpA]);
  const cmp2 = useMemo(() => sampleMathExpression(cmpB, -4, 4, 150), [cmpB]);

  // Module I: Custom Model Creator
  const [customTitle, setCustomTitle] = useState('Population Logistic Growth');
  const [customExpr, setCustomExpr] = useState('100 / (1 + exp(-a * (x - b)))');
  const [customA, setCustomA] = useState(1.2);
  const [customB, setCustomB] = useState(5);
  const customSample = useMemo(
    () => sampleMathExpression(customExpr, 0, 12, 200, { a: customA, b: customB }),
    [customExpr, customA, customB]
  );

  const modules = [
    { id: 'graph', label: 'A. Equation Graph Studio' },
    { id: 'sandbox', label: 'B. Mathematical Sandbox' },
    { id: '3d', label: 'C. 3D Mathematical Universe' },
    { id: 'physics', label: 'D. Virtual Physics Laboratory' },
    { id: 'collision', label: 'E. Collision Laboratory' },
    { id: 'fractal', label: 'F. Fractal Explorer' },
    { id: 'chaos', label: 'G. Chaos Explorer' },
    { id: 'data', label: 'H. Data Regression Studio' },
    { id: 'compare', label: 'I. Model Comparison Studio' },
    { id: 'custom', label: 'J. Custom Model Creator' },
  ];

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 px-4 py-8 lg:px-8">
      <div className="space-y-2">
        <Badge tone="cyan">EXPERIMENTATION CENTRE</Badge>
        <h1 className="dx-editorial-heading text-[#EAF4FF]">
          DIGITAL <span className="text-[#00D9FF]">LABORATORY</span>
        </h1>
        <p className="max-w-3xl text-sm text-[#91A3BA]">
          9 interactive scientific modules plus the 2D/3D Equation-to-Graph Studio. Every slider and
          model executes deterministic mathematics and physics in real time.
        </p>
      </div>

      {/* Module Selector */}
      <div className="flex flex-wrap gap-2">
        {modules.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setSearchParams({ module: m.id })}
            className={`rounded-xl px-3.5 py-2 text-xs font-medium transition-colors ${
              activeModule === m.id
                ? 'bg-[#00D9FF] text-[#080D18] font-bold'
                : 'bg-[#101B2D] text-[#91A3BA] hover:text-[#EAF4FF]'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="dx-card p-6">
        {activeModule === 'graph' && <EquationGraphStudio />}

        {activeModule === 'sandbox' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-[#EAF4FF]">
              B. Mathematical Sandbox (Coupled Damped Oscillator Dynamics)
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <ScientificSlider label="Amplitude A" value={sbAmp} min={0.2} max={5} step={0.1} unit="m" onChange={setSbAmp} />
              <ScientificSlider label="Mass m" value={sbMass} min={0.5} max={10} step={0.5} unit="kg" onChange={setSbMass} />
              <ScientificSlider label="Stiffness k" value={sbK} min={5} max={80} step={1} unit="N/m" onChange={setSbK} />
              <ScientificSlider label="Damping b" value={sbDamp} min={0} max={2} step={0.05} unit="kg/s" onChange={setSbDamp} />
            </div>
            <PlotlyChart
              height={320}
              data={[
                { x: sandboxData.ts, y: sandboxData.xs, type: 'scatter', mode: 'lines', line: { color: '#00D9FF', width: 2.5 }, name: 'Position x(t)' },
                { x: sandboxData.ts, y: sandboxData.vs, type: 'scatter', mode: 'lines', line: { color: '#7565FF', width: 2 }, name: 'Velocity v(t)' },
              ]}
            />
          </div>
        )}

        {activeModule === '3d' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-[#EAF4FF]">
              C. 3D Mathematical Universe
            </h2>
            <ScientificSlider label="Radial Wave Frequency" value={surfFreq} min={0.5} max={6} step={0.2} onChange={setSurfFreq} />
            <div className="h-[380px] rounded-xl border border-[#00D9FF]/25 bg-[#080D18] overflow-hidden">
              <Suspense fallback={<div className="p-6 text-xs text-[#91A3BA]">Loading 3D Surface...</div>}>
                <Canvas camera={{ position: [4, 3.5, 4.5], fov: 48 }}>
                  <ambientLight intensity={0.7} />
                  <pointLight position={[5, 5, 5]} intensity={1.8} color="#00D9FF" />
                  <MathSurface3DMesh freq={surfFreq} />
                  <OrbitControls />
                </Canvas>
              </Suspense>
            </div>
          </div>
        )}

        {activeModule === 'physics' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-[#EAF4FF]">D. Virtual Physics Laboratory</h2>
              <div className="flex gap-2">
                <Button size="sm" variant={virtTab === 'projectile' ? 'primary' : 'secondary'} onClick={() => setVirtTab('projectile')}>
                  Projectile
                </Button>
                <Button size="sm" variant={virtTab === 'oscillations' ? 'primary' : 'secondary'} onClick={() => setVirtTab('oscillations')}>
                  SHM Oscillations
                </Button>
                <Button size="sm" variant={virtTab === 'waves' ? 'primary' : 'secondary'} onClick={() => setVirtTab('waves')}>
                  Wave Interference
                </Button>
              </div>
            </div>
            {virtTab === 'projectile' ? <ProjectileTool /> : virtTab === 'oscillations' ? <OscillationsTool /> : <WavesTool />}
          </div>
        )}

        {activeModule === 'collision' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-[#EAF4FF]">E. Collision Laboratory</h2>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  saveExperiment({
                    title: `Collision (e=${restE})`,
                    module: 'Collision Laboratory',
                    parameters: { m1, u1, m2, u2, restE },
                    outputs: { v1: collision.v1.toFixed(2), v2: collision.v2.toFixed(2), keLossPct: `${collision.keLossPct.toFixed(1)}%` },
                    assumptions: ['1D head-on collision', 'Isolated system (momentum conserved)'],
                  })
                }
              >
                Save Experiment
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
              <ScientificSlider label="Mass m₁" value={m1} min={1} max={20} step={0.5} unit="kg" onChange={setM1} />
              <ScientificSlider label="Initial u₁" value={u1} min={-15} max={15} step={0.5} unit="m/s" onChange={setU1} />
              <ScientificSlider label="Mass m₂" value={m2} min={1} max={20} step={0.5} unit="kg" onChange={setM2} />
              <ScientificSlider label="Initial u₂" value={u2} min={-15} max={15} step={0.5} unit="m/s" onChange={setU2} />
              <ScientificSlider label="Restitution e" value={restE} min={0} max={1} step={0.05} onChange={setRestE} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <MetricTile label="Final v₁" value={collision.v1.toFixed(2)} unit="m/s" />
              <MetricTile label="Final v₂" value={collision.v2.toFixed(2)} unit="m/s" accent="violet" />
              <MetricTile label="Momentum p" value={`${collision.pBefore.toFixed(2)} → ${collision.pAfter.toFixed(2)}`} unit="kg·m/s" accent="ice" />
              <MetricTile label="KE Loss" value={collision.keLossPct.toFixed(1)} unit="%" />
            </div>
            <AssumptionsBar assumptions={['No external impulse; linear momentum conserved for all e ∈ [0, 1].']} />
          </div>
        )}

        {activeModule === 'fractal' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-[#EAF4FF]">F. Fractal Explorer (Mandelbrot Set)</h2>
            <FractalExplorer />
          </div>
        )}

        {activeModule === 'chaos' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-[#EAF4FF]">
              G. Chaos Explorer (Logistic Map xₙ₊₁ = r·xₙ·(1-xₙ))
            </h2>
            <ScientificSlider label="Growth Parameter r" value={rParam} min={1.0} max={4.0} step={0.01} onChange={setRParam} />
            <PlotlyChart
              height={280}
              data={[{ x: chaosSeries.xs, y: chaosSeries.ys, type: 'scatter', mode: 'lines+markers', line: { color: '#00D9FF' }, name: 'xₙ' }]}
              layout={{ xaxis: { title: { text: 'Iteration n' } }, yaxis: { title: { text: 'State xₙ' }, range: [0, 1] } }}
            />
          </div>
        )}

        {activeModule === 'data' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-[#EAF4FF]">H. Data Regression Studio</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              <textarea
                rows={6}
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                className="lg:col-span-4 rounded-xl border border-[#91A3BA]/25 bg-[#080D18] p-3 font-mono text-xs text-[#EAF4FF]"
                placeholder="Enter x, y pairs one per line"
              />
              <div className="lg:col-span-8 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <MetricTile label="Best-Fit Slope" value={parsedPairs.slope.toFixed(3)} />
                  <MetricTile label="Intercept" value={parsedPairs.intercept.toFixed(3)} accent="violet" />
                  <MetricTile label="Std Dev (y)" value={parsedPairs.statsY.stdDev.toFixed(3)} accent="ice" />
                </div>
                <PlotlyChart
                  height={230}
                  data={[
                    { x: parsedPairs.xs, y: parsedPairs.ys, type: 'scatter', mode: 'markers', marker: { size: 9, color: '#00D9FF' }, name: 'Observations' },
                    { x: parsedPairs.xs, y: parsedPairs.fitY, type: 'scatter', mode: 'lines', line: { color: '#7565FF', width: 2 }, name: 'Least-Squares Fit' },
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {activeModule === 'compare' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-[#EAF4FF]">I. Model Comparison Studio</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input value={cmpA} onChange={(e) => setCmpA(e.target.value)} className="rounded-xl border border-[#91A3BA]/25 bg-[#080D18] px-3 py-2 font-mono text-sm text-[#00D9FF]" />
              <input value={cmpB} onChange={(e) => setCmpB(e.target.value)} className="rounded-xl border border-[#91A3BA]/25 bg-[#080D18] px-3 py-2 font-mono text-sm text-[#9F94FF]" />
            </div>
            <PlotlyChart
              height={300}
              data={[
                { x: cmp1.xs, y: cmp1.ys, type: 'scatter', mode: 'lines', line: { color: '#00D9FF', width: 2.5 }, name: `Model A: ${cmpA}` },
                { x: cmp2.xs, y: cmp2.ys, type: 'scatter', mode: 'lines', line: { color: '#7565FF', width: 2.5 }, name: `Model B: ${cmpB}` },
              ]}
            />
          </div>
        )}

        {activeModule === 'custom' && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-[#EAF4FF]">J. Custom Model Creator</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} className="rounded-xl border border-[#91A3BA]/25 bg-[#080D18] px-3 py-2 text-sm text-[#EAF4FF]" />
              <input value={customExpr} onChange={(e) => setCustomExpr(e.target.value)} className="rounded-xl border border-[#91A3BA]/25 bg-[#080D18] px-3 py-2 font-mono text-sm text-[#00D9FF]" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <ScientificSlider label="Parameter a" value={customA} min={0.1} max={5} step={0.1} onChange={setCustomA} />
              <ScientificSlider label="Parameter b" value={customB} min={0} max={10} step={0.5} onChange={setCustomB} />
            </div>
            <PlotlyChart
              height={260}
              data={[{ x: customSample.xs, y: customSample.ys, type: 'scatter', mode: 'lines', line: { color: '#00D9FF', width: 2.5 }, name: customTitle }]}
            />
            <Button
              size="sm"
              onClick={() =>
                saveExperiment({
                  title: customTitle,
                  module: 'Custom Model Creator',
                  parameters: { expr: customExpr, a: customA, b: customB },
                  outputs: { validPoints: customSample.validPoints },
                  assumptions: ['User-defined analytical expression evaluated over [0, 12].'],
                })
              }
            >
              Save Custom Model to Workspace
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
