import React, { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Line, OrbitControls } from '@react-three/drei';
import { PlotlyChart } from '@/components/ui/PlotlyChart';
import { MetricTile, ScientificSlider } from '@/components/ui/Primitives';
import {
  analyze3DPoints,
  analyzeConic,
  analyzeLimitAndDerivative,
  analyzeStraightLine,
  computeProbabilityMetrics,
  computeProgression,
  computeStatistics,
  sampleMathExpression,
} from '@/engines/mathEngine';

/* 8. SEQUENCES & SERIES */
export const SequencesTool: React.FC = () => {
  const [mode, setMode] = useState<'AP' | 'GP'>('AP');
  const [first, setFirst] = useState(2);
  const [stepParam, setStepParam] = useState(3);
  const [count, setCount] = useState(10);

  const res = useMemo(() => computeProgression(mode, first, stepParam, count), [mode, first, stepParam, count]);
  const indices = res.terms.map((_, i) => i + 1);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['AP', 'GP'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setStepParam(m === 'AP' ? 3 : 0.75);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold ${
              mode === m ? 'bg-[#00D9FF] text-[#080D18]' : 'bg-[#080D18] text-[#91A3BA]'
            }`}
          >
            {m === 'AP' ? 'Arithmetic (AP)' : 'Geometric (GP)'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScientificSlider label="First Term a" value={first} min={-10} max={20} step={1} onChange={setFirst} />
        <ScientificSlider
          label={mode === 'AP' ? 'Common Difference d' : 'Common Ratio r'}
          value={stepParam}
          min={mode === 'AP' ? -5 : -2}
          max={mode === 'AP' ? 10 : 2.5}
          step={mode === 'AP' ? 0.5 : 0.05}
          onChange={setStepParam}
        />
        <ScientificSlider label="Terms n" value={count} min={3} max={20} step={1} onChange={setCount} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MetricTile label="nth Term" value={res.nthTerm.toFixed(3)} />
        <MetricTile label="Sum Sn" value={res.totalSum.toFixed(3)} accent="violet" />
        <MetricTile
          label="Infinite Sum S∞"
          value={res.infiniteSum !== null ? res.infiniteSum.toFixed(3) : 'Divergent / N/A'}
          accent="ice"
        />
      </div>
      <PlotlyChart
        height={240}
        data={[
          { x: indices, y: res.terms, type: 'bar', marker: { color: '#00D9FF' }, name: 'aₙ' },
          { x: indices, y: res.partialSums, type: 'scatter', mode: 'lines+markers', line: { color: '#7565FF' }, name: 'Sₙ' },
        ]}
      />
    </div>
  );
};

/* 9. STRAIGHT LINES */
export const StraightLinesTool: React.FC = () => {
  const [A, setA] = useState(3);
  const [B, setB] = useState(4);
  const [C, setC] = useState(-12);
  const [px, setPx] = useState(2);
  const [py, setPy] = useState(3);

  const lineInfo = useMemo(() => analyzeStraightLine(A, B, C, px, py), [A, B, C, px, py]);
  const lineXs = [-10, 10];
  const lineYs =
    Math.abs(B) < 1e-6 ? [-10, 10] : lineXs.map((x) => (-A * x - C) / B);
  const plotXs = Math.abs(B) < 1e-6 ? [-C / A, -C / A] : lineXs;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
        <ScientificSlider label="A" value={A} min={-6} max={6} step={0.5} onChange={setA} />
        <ScientificSlider label="B" value={B} min={-6} max={6} step={0.5} onChange={setB} />
        <ScientificSlider label="C" value={C} min={-20} max={20} step={1} onChange={setC} />
        <ScientificSlider label="Point x₁" value={px} min={-8} max={8} step={0.5} onChange={setPx} />
        <ScientificSlider label="Point y₁" value={py} min={-8} max={8} step={0.5} onChange={setPy} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <MetricTile label="Slope m" value={Number.isFinite(lineInfo.slope) ? lineInfo.slope.toFixed(3) : '∞'} />
        <MetricTile label="Angle θ" value={lineInfo.angleDeg.toFixed(1)} unit="°" accent="violet" />
        <MetricTile label="y-Intercept" value={lineInfo.yIntercept !== null ? lineInfo.yIntercept.toFixed(2) : 'None'} accent="ice" />
        <MetricTile label="Distance d" value={lineInfo.distanceFromPoint.toFixed(3)} unit="u" />
      </div>
      <PlotlyChart
        height={260}
        data={[
          { x: plotXs, y: lineYs, type: 'scatter', mode: 'lines', line: { color: '#00D9FF', width: 2.5 }, name: 'Line' },
          { x: [px], y: [py], type: 'scatter', mode: 'markers', marker: { size: 11, color: '#7565FF' }, name: 'Point P(x₁,y₁)' },
        ]}
        layout={{ xaxis: { range: [-10, 10] }, yaxis: { range: [-10, 10] } }}
      />
    </div>
  );
};

/* 10. CONIC SECTIONS */
export const ConicsTool: React.FC = () => {
  const [kind, setKind] = useState<'circle' | 'parabola' | 'ellipse' | 'hyperbola'>('ellipse');
  const [a, setA] = useState(5);
  const [b, setB] = useState(3);

  const conic = useMemo(() => analyzeConic(kind, a, b), [kind, a, b]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['circle', 'parabola', 'ellipse', 'hyperbola'] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize ${
              kind === k ? 'bg-[#00D9FF] text-[#080D18]' : 'bg-[#080D18] text-[#91A3BA]'
            }`}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ScientificSlider label="Parameter a (or r)" value={a} min={1} max={10} step={0.5} onChange={setA} />
        {(kind === 'ellipse' || kind === 'hyperbola') && (
          <ScientificSlider label="Parameter b" value={b} min={1} max={10} step={0.5} onChange={setB} />
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <MetricTile label="Equation" value={conic.equation} />
        <MetricTile label="Eccentricity e" value={conic.eccentricity.toFixed(3)} accent="violet" />
        <MetricTile label="Focus / Foci" value={conic.foci.join(', ')} accent="ice" />
        <MetricTile label="Latus Rectum" value={conic.latusRectum.toFixed(2)} />
      </div>
      <PlotlyChart
        height={280}
        data={[{ x: conic.xs, y: conic.ys, type: 'scatter', mode: 'lines', line: { color: '#00D9FF', width: 2.5 }, name: kind }]}
        layout={{ yaxis: { scaleanchor: 'x', scaleratio: 1 } }}
      />
    </div>
  );
};

/* 11. 3D GEOMETRY */
export const Geometry3DTool: React.FC = () => {
  const [x2, setX2] = useState(3);
  const [y2, setY2] = useState(4);
  const [z2, setZ2] = useState(2);

  const p1: [number, number, number] = [0, 0, 0];
  const p2: [number, number, number] = [x2, y2, z2];
  const res = useMemo(() => analyze3DPoints(p1, p2, 1, 1), [x2, y2, z2]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScientificSlider label="x₂" value={x2} min={-5} max={5} step={0.5} onChange={setX2} />
        <ScientificSlider label="y₂" value={y2} min={-5} max={5} step={0.5} onChange={setY2} />
        <ScientificSlider label="z₂" value={z2} min={-5} max={5} step={0.5} onChange={setZ2} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7 h-[280px] rounded-xl border border-[#00D9FF]/25 bg-[#080D18] overflow-hidden">
          <Suspense fallback={<div className="p-6 text-xs text-[#91A3BA]">Loading 3D axes...</div>}>
            <Canvas camera={{ position: [6, 5, 6], fov: 46 }}>
              <ambientLight intensity={0.8} />
              <gridHelper args={[10, 10, '#00D9FF', '#1E293B']} />
              <Line points={[[-5, 0, 0], [5, 0, 0]]} color="#ef4444" lineWidth={1} />
              <Line points={[[0, -5, 0], [0, 5, 0]]} color="#22c55e" lineWidth={1} />
              <Line points={[[0, 0, -5], [0, 0, 5]]} color="#3b82f6" lineWidth={1} />
              <Line points={[p1, p2]} color="#00D9FF" lineWidth={3} />
              <mesh position={p2}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="#7565FF" />
              </mesh>
              <OrbitControls />
            </Canvas>
          </Suspense>
        </div>
        <div className="lg:col-span-5 space-y-2.5">
          <MetricTile label="Distance |OP₂|" value={res.distance.toFixed(4)} unit="units" />
          <MetricTile
            label="Midpoint M"
            value={`(${res.sectionPoint.map((v) => v.toFixed(2)).join(', ')})`}
            accent="violet"
          />
          <MetricTile
            label="Direction Cosines (l, m, n)"
            value={res.directionCosines.map((v) => v.toFixed(3)).join(', ')}
            accent="ice"
          />
        </div>
      </div>
    </div>
  );
};

/* 12. LIMITS & DERIVATIVES */
export const LimitsTool: React.FC = () => {
  const [expr, setExpr] = useState('x^3 - 3*x');
  const [x0, setX0] = useState(1.5);

  const calc = useMemo(() => analyzeLimitAndDerivative(expr, x0), [expr, x0]);
  const curve = useMemo(() => sampleMathExpression(expr, -4, 4, 220), [expr]);

  const tangentXs = [x0 - 1.5, x0 + 1.5];
  const tangentYs = Number.isFinite(calc.fAtX0) && Number.isFinite(calc.numericalDerivative)
    ? tangentXs.map((x) => calc.fAtX0 + calc.numericalDerivative * (x - x0))
    : [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="text-xs text-[#91A3BA]">
          Function f(x)
          <input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#91A3BA]/25 bg-[#080D18] px-3 py-2 font-mono text-xs text-[#EAF4FF]"
          />
        </label>
        <ScientificSlider label="Evaluation Point x₀" value={x0} min={-3} max={3} step={0.1} onChange={setX0} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <MetricTile label="Left Limit" value={Number.isFinite(calc.leftLimit) ? calc.leftLimit.toFixed(4) : 'NaN'} />
        <MetricTile label="Right Limit" value={Number.isFinite(calc.rightLimit) ? calc.rightLimit.toFixed(4) : 'NaN'} accent="violet" />
        <MetricTile label="Derivative f′(x₀)" value={Number.isFinite(calc.numericalDerivative) ? calc.numericalDerivative.toFixed(4) : 'NaN'} />
        <MetricTile label="Symbolic f′(x)" value={calc.symbolicDerivative} accent="ice" />
      </div>
      <PlotlyChart
        height={260}
        data={[
          { x: curve.xs, y: curve.ys, type: 'scatter', mode: 'lines', line: { color: '#00D9FF', width: 2.5 }, name: 'f(x)' },
          ...(tangentYs.length === 2
            ? [
                {
                  x: tangentXs,
                  y: tangentYs,
                  type: 'scatter' as const,
                  mode: 'lines' as const,
                  line: { color: '#7565FF', width: 2, dash: 'dash' as const },
                  name: 'Tangent at x₀',
                },
              ]
            : []),
        ]}
      />
    </div>
  );
};

/* 13. STATISTICS */
export const StatisticsTool: React.FC = () => {
  const [rawInput, setRawInput] = useState('12, 15, 18, 22, 22, 25, 29, 31');
  const numbers = useMemo(
    () =>
      rawInput
        .split(/[,\s]+/)
        .map((v) => parseFloat(v))
        .filter((v) => Number.isFinite(v)),
    [rawInput]
  );
  const stats = useMemo(() => computeStatistics(numbers), [numbers]);

  return (
    <div className="space-y-4">
      <label className="block text-xs text-[#91A3BA]">
        Dataset (comma or space separated)
        <input
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[#91A3BA]/25 bg-[#080D18] px-3 py-2 font-mono text-xs text-[#EAF4FF]"
        />
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <MetricTile label="Mean x̄" value={stats.mean.toFixed(3)} />
        <MetricTile label="Median" value={stats.median.toFixed(3)} accent="violet" />
        <MetricTile label="Variance σ²" value={stats.variance.toFixed(3)} accent="ice" />
        <MetricTile label="Std Dev σ" value={stats.stdDev.toFixed(3)} />
      </div>
      <PlotlyChart
        height={240}
        data={[{ x: numbers, type: 'histogram', marker: { color: '#00D9FF' }, name: 'Frequency' }]}
      />
    </div>
  );
};

/* 14. PROBABILITY */
export const ProbabilityTool: React.FC = () => {
  const [pA, setPA] = useState(0.5);
  const [pB, setPB] = useState(0.4);
  const [pAandB, setPAandB] = useState(0.2);

  const res = useMemo(() => computeProbabilityMetrics(pA, pB, pAandB), [pA, pB, pAandB]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScientificSlider label="P(A)" value={pA} min={0} max={1} step={0.02} onChange={setPA} />
        <ScientificSlider label="P(B)" value={pB} min={0} max={1} step={0.02} onChange={setPB} />
        <ScientificSlider
          label={`P(A ∩ B) [${res.minIntersection.toFixed(2)}..${res.maxIntersection.toFixed(2)}]`}
          value={res.pAandB}
          min={res.minIntersection}
          max={Math.max(res.minIntersection + 0.01, res.maxIntersection)}
          step={0.01}
          onChange={setPAandB}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <MetricTile label="P(A ∪ B)" value={res.union.toFixed(3)} />
        <MetricTile label="P(A | B)" value={res.pAGivenB.toFixed(3)} accent="violet" />
        <MetricTile label="P(B | A)" value={res.pBGivenA.toFixed(3)} accent="ice" />
        <MetricTile label="Independent?" value={res.isIndependent ? 'Yes' : 'No'} />
      </div>
      <PlotlyChart
        height={220}
        data={[
          {
            x: ['P(A)', 'P(B)', 'P(A ∩ B)', 'P(A ∪ B)'],
            y: [res.pA, res.pB, res.pAandB, res.union],
            type: 'bar',
            marker: { color: ['#00D9FF', '#7565FF', '#34D399', '#EAF4FF'] },
          },
        ]}
        layout={{ yaxis: { range: [0, 1] } }}
      />
    </div>
  );
};
