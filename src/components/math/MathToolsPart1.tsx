import React, { useMemo, useState } from 'react';
import { PlotlyChart } from '@/components/ui/PlotlyChart';
import { AssumptionsBar, MetricTile, ScientificSlider } from '@/components/ui/Primitives';
import {
  analyzeAngle,
  analyzeComplexAndQuadratic,
  binomialExpansionTerms,
  computeCombinatorics,
  computeSetOperations,
  generatePascalTriangle,
  sampleMathExpression,
  solveQuadratic,
} from '@/engines/mathEngine';

/* 1. SETS */
export const SetsTool: React.FC = () => {
  const [setAInput, setSetAInput] = useState('1, 2, 3, 4, 5');
  const [setBInput, setSetBInput] = useState('4, 5, 6, 7');
  const [universeInput, setUniverseInput] = useState('1, 2, 3, 4, 5, 6, 7, 8, 9');

  const res = useMemo(
    () =>
      computeSetOperations(
        setAInput.split(','),
        setBInput.split(','),
        universeInput.split(',')
      ),
    [setAInput, setBInput, universeInput]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <label className="text-xs text-[#91A3BA]">
          Set A (comma-separated)
          <input
            value={setAInput}
            onChange={(e) => setSetAInput(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#91A3BA]/25 bg-[#080D18] px-3 py-2 font-mono text-xs text-[#EAF4FF]"
          />
        </label>
        <label className="text-xs text-[#91A3BA]">
          Set B (comma-separated)
          <input
            value={setBInput}
            onChange={(e) => setSetBInput(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#91A3BA]/25 bg-[#080D18] px-3 py-2 font-mono text-xs text-[#EAF4FF]"
          />
        </label>
        <label className="text-xs text-[#91A3BA]">
          Universal Set U
          <input
            value={universeInput}
            onChange={(e) => setUniverseInput(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[#91A3BA]/25 bg-[#080D18] px-3 py-2 font-mono text-xs text-[#EAF4FF]"
          />
        </label>
      </div>

      {/* Venn Diagram SVG */}
      <div className="rounded-xl border border-[#91A3BA]/15 bg-[#080D18]/80 p-4 flex flex-col items-center">
        <svg viewBox="0 0 420 210" className="w-full max-w-md">
          <rect x="8" y="8" width="404" height="194" rx="14" fill="#101B2D" stroke="#91A3BA" strokeOpacity="0.3" />
          <text x="20" y="28" fill="#91A3BA" fontSize="11" fontFamily="JetBrains Mono">
            U ({res.U.length})
          </text>
          <circle cx="165" cy="110" r="68" fill="#00D9FF" fillOpacity="0.16" stroke="#00D9FF" strokeWidth="2" />
          <circle cx="255" cy="110" r="68" fill="#7565FF" fillOpacity="0.18" stroke="#7565FF" strokeWidth="2" />
          <text x="122" y="70" fill="#00D9FF" fontSize="12" fontWeight="700">A \ B</text>
          <text x="115" y="114" fill="#EAF4FF" fontSize="11" fontFamily="JetBrains Mono">
            {res.aMinusB.slice(0, 4).join(', ') || '∅'}
          </text>
          <text x="195" y="70" fill="#EAF4FF" fontSize="11" fontWeight="700">A ∩ B</text>
          <text x="192" y="114" fill="#00D9FF" fontSize="11" fontFamily="JetBrains Mono">
            {res.intersection.slice(0, 4).join(', ') || '∅'}
          </text>
          <text x="275" y="70" fill="#9F94FF" fontSize="12" fontWeight="700">B \ A</text>
          <text x="266" y="114" fill="#EAF4FF" fontSize="11" fontFamily="JetBrains Mono">
            {res.bMinusA.slice(0, 4).join(', ') || '∅'}
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 text-xs font-mono">
        <div className="rounded-lg bg-[#080D18]/80 p-3">
          <span className="text-[#00D9FF]">A ∪ B = </span>
          {`{${res.union.join(', ')}}`}
        </div>
        <div className="rounded-lg bg-[#080D18]/80 p-3">
          <span className="text-[#00D9FF]">A ∩ B = </span>
          {`{${res.intersection.join(', ')}}`}
        </div>
        <div className="rounded-lg bg-[#080D18]/80 p-3">
          <span className="text-[#9F94FF]">A′ = </span>
          {`{${res.aComplement.join(', ')}}`}
        </div>
        <div className="rounded-lg bg-[#080D18]/80 p-3">
          <span className="text-[#9F94FF]">A △ B = </span>
          {`{${res.symmetricDiff.join(', ')}}`}
        </div>
        <div className="rounded-lg bg-[#080D18]/80 p-3">
          <span className="text-[#EAF4FF]">A ⊆ B: </span>
          {res.isASubsetOfB ? 'True' : 'False'}
        </div>
        <div className="rounded-lg bg-[#080D18]/80 p-3">
          <span className="text-[#EAF4FF]">|P(A)|: </span>
          {String(res.powerSetSizeA)}
        </div>
      </div>
    </div>
  );
};

/* 2. RELATIONS & FUNCTIONS */
export const RelationsTool: React.FC = () => {
  const [baseFn, setBaseFn] = useState<'x^2' | 'sin(x)' | 'abs(x)' | 'sqrt(abs(x))'>('x^2');
  const [scaleA, setScaleA] = useState(1);
  const [shiftH, setShiftH] = useState(0);
  const [shiftK, setShiftK] = useState(0);

  const baseSample = useMemo(() => sampleMathExpression(baseFn, -6, 6, 200), [baseFn]);
  const transformedExpr = useMemo(() => {
    const inner = `(x - (${shiftH}))`;
    const core =
      baseFn === 'x^2'
        ? `(${inner})^2`
        : baseFn === 'sin(x)'
          ? `sin(${inner})`
          : baseFn === 'abs(x)'
            ? `abs(${inner})`
            : `sqrt(abs(${inner}))`;
    return `${scaleA} * ${core} + (${shiftK})`;
  }, [baseFn, scaleA, shiftH, shiftK]);

  const transSample = useMemo(() => sampleMathExpression(transformedExpr, -6, 6, 200), [transformedExpr]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['x^2', 'sin(x)', 'abs(x)', 'sqrt(abs(x))'] as const).map((fn) => (
          <button
            key={fn}
            type="button"
            onClick={() => setBaseFn(fn)}
            className={`rounded-lg px-3 py-1.5 font-mono text-xs ${
              baseFn === fn ? 'bg-[#00D9FF] text-[#080D18] font-bold' : 'bg-[#080D18] text-[#91A3BA]'
            }`}
          >
            f(x) = {fn}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScientificSlider label="Vertical Scale a" value={scaleA} min={-3} max={3} step={0.25} onChange={setScaleA} />
        <ScientificSlider label="Horizontal Shift h" value={shiftH} min={-4} max={4} step={0.5} onChange={setShiftH} />
        <ScientificSlider label="Vertical Shift k" value={shiftK} min={-4} max={4} step={0.5} onChange={setShiftK} />
      </div>
      <PlotlyChart
        height={300}
        data={[
          { x: baseSample.xs, y: baseSample.ys, type: 'scatter', mode: 'lines', line: { color: '#91A3BA', dash: 'dot' }, name: `Base f(x)` },
          { x: transSample.xs, y: transSample.ys, type: 'scatter', mode: 'lines', line: { color: '#00D9FF', width: 2.5 }, name: 'Transformed g(x)' },
        ]}
      />
    </div>
  );
};

/* 3. TRIGONOMETRIC FUNCTIONS */
export const TrigTool: React.FC = () => {
  const [angleDeg, setAngleDeg] = useState(45);
  const info = useMemo(() => analyzeAngle(angleDeg), [angleDeg]);
  const waveSin = useMemo(() => sampleMathExpression('sin(x)', -6.28, 6.28, 220), []);
  const waveCos = useMemo(() => sampleMathExpression('cos(x)', -6.28, 6.28, 220), []);

  const cx = 110 + 80 * info.cos;
  const cy = 110 - 80 * info.sin;

  return (
    <div className="space-y-4">
      <ScientificSlider label="Angle θ" value={angleDeg} min={-360} max={360} step={1} unit="°" onChange={setAngleDeg} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-center">
        <div className="lg:col-span-4 flex justify-center rounded-xl border border-[#91A3BA]/15 bg-[#080D18]/80 p-4">
          <svg viewBox="0 0 220 220" className="h-52 w-52">
            <line x1="15" y1="110" x2="205" y2="110" stroke="#91A3BA" strokeOpacity="0.35" />
            <line x1="110" y1="15" x2="110" y2="205" stroke="#91A3BA" strokeOpacity="0.35" />
            <circle cx="110" cy="110" r="80" fill="none" stroke="#00D9FF" strokeOpacity="0.5" strokeWidth="1.5" />
            <line x1="110" y1="110" x2={cx} y2={cy} stroke="#EAF4FF" strokeWidth="2" />
            <line x1={cx} y1="110" x2={cx} y2={cy} stroke="#7565FF" strokeWidth="2" />
            <line x1="110" y1="110" x2={cx} y2="110" stroke="#00D9FF" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="5" fill="#00D9FF" />
          </svg>
        </div>
        <div className="lg:col-span-8 space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <MetricTile label="Radians" value={info.radians.toFixed(4)} unit="rad" />
            <MetricTile label="sin(θ)" value={info.sin.toFixed(4)} accent="violet" />
            <MetricTile label="cos(θ)" value={info.cos.toFixed(4)} accent="cyan" />
            <MetricTile label="sin²+cos²" value={info.pythagoreanSum.toFixed(4)} accent="ice" />
          </div>
          <div className="text-xs font-mono text-[#91A3BA]">
            Location: <span className="text-[#00D9FF]">{info.quadrant}</span> • tan(θ) ={' '}
            {Number.isFinite(info.tan) ? info.tan.toFixed(4) : 'Undefined (cos θ = 0)'}
          </div>
          <PlotlyChart
            height={210}
            data={[
              { x: waveSin.xs, y: waveSin.ys, type: 'scatter', mode: 'lines', line: { color: '#7565FF', width: 2 }, name: 'sin(x)' },
              { x: waveCos.xs, y: waveCos.ys, type: 'scatter', mode: 'lines', line: { color: '#00D9FF', width: 2 }, name: 'cos(x)' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

/* 4. COMPLEX NUMBERS & QUADRATICS */
export const ComplexTool: React.FC = () => {
  const [re1, setRe1] = useState(3);
  const [im1, setIm1] = useState(4);
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [c, setC] = useState(5);

  const cx = useMemo(() => analyzeComplexAndQuadratic(re1, im1, 1, -2), [re1, im1]);
  const quad = useMemo(() => solveQuadratic(a, b, c), [a, b, c]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-[#91A3BA]/15 bg-[#080D18]/60 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#00D9FF]">
            Argand Plane Explorer: z₁ = {re1} + ({im1})i
          </div>
          <ScientificSlider label="Re(z₁)" value={re1} min={-8} max={8} step={0.5} onChange={setRe1} />
          <ScientificSlider label="Im(z₁)" value={im1} min={-8} max={8} step={0.5} onChange={setIm1} />
          <div className="grid grid-cols-2 gap-2">
            <MetricTile label="Modulus |z₁|" value={cx.mod1.toFixed(3)} />
            <MetricTile label="Argument θ" value={cx.arg1Deg.toFixed(1)} unit="°" accent="violet" />
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-[#91A3BA]/15 bg-[#080D18]/60 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#9F94FF]">
            Quadratic Solver: {a}x² + {b}x + {c} = 0
          </div>
          <div className="grid grid-cols-3 gap-2">
            <ScientificSlider label="a" value={a} min={-5} max={5} step={0.5} onChange={setA} />
            <ScientificSlider label="b" value={b} min={-10} max={10} step={0.5} onChange={setB} />
            <ScientificSlider label="c" value={c} min={-10} max={10} step={0.5} onChange={setC} />
          </div>
          <div className="text-xs font-mono text-[#EAF4FF] space-y-1">
            <div>Discriminant Δ = {quad.discriminant.toFixed(2)} ({quad.type})</div>
            {quad.roots.map((r, i) => (
              <div key={i} className="text-[#00D9FF]">
                Root {i + 1}: {r.re.toFixed(3)} {r.im >= 0 ? '+' : '-'} {Math.abs(r.im).toFixed(3)}i
              </div>
            ))}
          </div>
        </div>
      </div>

      <PlotlyChart
        height={260}
        data={[
          {
            x: [0, re1],
            y: [0, im1],
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: '#00D9FF', width: 3 },
            marker: { size: 9, color: '#00D9FF' },
            name: 'z₁ vector',
          },
          {
            x: quad.roots.map((r) => r.re),
            y: quad.roots.map((r) => r.im),
            type: 'scatter',
            mode: 'markers',
            marker: { size: 11, color: '#7565FF', symbol: 'diamond' },
            name: 'Quadratic Roots',
          },
        ]}
        layout={{ xaxis: { title: { text: 'Real Axis' }, range: [-10, 10] }, yaxis: { title: { text: 'Imaginary Axis' }, range: [-10, 10] } }}
      />
    </div>
  );
};

/* 5. LINEAR INEQUALITIES */
export const InequalitiesTool: React.FC = () => {
  const [a, setA] = useState(2);
  const [b, setB] = useState(-3);
  const [c, setC] = useState(5);

  const boundary = Math.abs(a) < 1e-6 ? 0 : (c - b) / a;
  const direction = a > 0 ? '≤' : '≥';

  return (
    <div className="space-y-4">
      <div className="font-mono text-sm text-[#00D9FF]">
        Solving: {a}x + ({b}) ≤ {c}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScientificSlider label="Coefficient a" value={a} min={-5} max={5} step={0.5} onChange={setA} />
        <ScientificSlider label="Constant b" value={b} min={-10} max={10} step={1} onChange={setB} />
        <ScientificSlider label="Bound c" value={c} min={-10} max={10} step={1} onChange={setC} />
      </div>
      {Math.abs(a) < 1e-6 ? (
        <div className="rounded-xl bg-[#080D18] p-4 font-mono text-sm text-[#EAF4FF]">
          a = 0 ⟹ Inequality reduces to {b} ≤ {c} ({b <= c ? 'True for all x ∈ ℝ' : 'No solution (∅)'}).
        </div>
      ) : (
        <div className="space-y-3">
          <MetricTile
            label="Solution Interval"
            value={`x ${direction} ${boundary.toFixed(2)}`}
            accent="cyan"
          />
          <svg viewBox="0 0 420 70" className="w-full rounded-xl border border-[#91A3BA]/15 bg-[#080D18]">
            <line x1="20" y1="35" x2="400" y2="35" stroke="#91A3BA" strokeOpacity="0.4" strokeWidth="2" />
            {(() => {
              const clamped = Math.max(-10, Math.min(10, boundary));
              const px = 210 + clamped * 17;
              const shadeLeft = a > 0;
              return (
                <>
                  <line
                    x1={shadeLeft ? 20 : px}
                    y1="35"
                    x2={shadeLeft ? px : 400}
                    y2="35"
                    stroke="#00D9FF"
                    strokeWidth="5"
                  />
                  <circle cx={px} cy="35" r="6" fill="#00D9FF" />
                  <text x={px} y="58" textAnchor="middle" fill="#EAF4FF" fontSize="11" fontFamily="JetBrains Mono">
                    {boundary.toFixed(2)}
                  </text>
                </>
              );
            })()}
          </svg>
        </div>
      )}
    </div>
  );
};

/* 6. PERMUTATIONS & COMBINATIONS */
export const CombinatoricsTool: React.FC = () => {
  const [n, setN] = useState(5);
  const [r, setR] = useState(3);
  const res = useMemo(() => computeCombinatorics(n, r), [n, r]);

  const sampleList = useMemo(() => {
    const items = Array.from({ length: Math.min(res.n, 6) }, (_, i) => String.fromCharCode(65 + i));
    const combos: string[] = [];
    const build = (start: number, cur: string[]) => {
      if (combos.length >= 15) return;
      if (cur.length === res.r) {
        combos.push(cur.join(''));
        return;
      }
      for (let i = start; i < items.length; i++) {
        build(i + 1, [...cur, items[i]]);
      }
    };
    if (res.r <= items.length) build(0, []);
    return combos;
  }, [res.n, res.r]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ScientificSlider label="Total Items n" value={n} min={1} max={12} step={1} onChange={setN} />
        <ScientificSlider label="Chosen Items r" value={r} min={0} max={n} step={1} onChange={setR} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MetricTile label="n!" value={res.nFact} accent="ice" />
        <MetricTile label="Permutations nPr" value={res.nPr} accent="cyan" />
        <MetricTile label="Combinations nCr" value={res.nCr} accent="violet" />
      </div>
      <div className="rounded-xl bg-[#080D18]/80 p-4 text-xs font-mono text-[#91A3BA]">
        Sample Combinations ({sampleList.length} shown):{' '}
        <span className="text-[#00D9FF]">{sampleList.join(', ') || '∅'}</span>
      </div>
    </div>
  );
};

/* 7. BINOMIAL THEOREM */
export const BinomialTool: React.FC = () => {
  const [n, setN] = useState(4);
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);

  const triangle = useMemo(() => generatePascalTriangle(n + 1), [n]);
  const expansion = useMemo(() => binomialExpansionTerms(a, b, n), [a, b, n]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScientificSlider label="Power n" value={n} min={0} max={8} step={1} onChange={setN} />
        <ScientificSlider label="Coeff a" value={a} min={1} max={5} step={1} onChange={setA} />
        <ScientificSlider label="Coeff b" value={b} min={-4} max={4} step={1} onChange={setB} />
      </div>

      <div className="rounded-xl border border-[#91A3BA]/15 bg-[#080D18]/80 p-4 space-y-1.5 text-center overflow-x-auto">
        <div className="text-xs font-mono text-[#91A3BA] mb-2">Pascal&apos;s Triangle (Rows 0..{n})</div>
        {triangle.map((row, idx) => (
          <div key={idx} className="flex justify-center gap-2 font-mono text-xs">
            {row.map((val, j) => (
              <span
                key={j}
                className={`rounded px-2 py-0.5 ${
                  idx === n ? 'bg-[#00D9FF]/20 text-[#00D9FF] font-bold' : 'text-[#91A3BA]'
                }`}
              >
                {val}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-[#080D18]/80 p-4 font-mono text-xs text-[#EAF4FF]">
        <span className="text-[#9F94FF]">({a}x + {b}y)^{n} = </span>
        {expansion.terms
          .map(
            (t) =>
              `${t.numericWeight >= 0 && t.k > 0 ? '+ ' : ''}${t.numericWeight}${t.xPower > 0 ? `x^${t.xPower}` : ''}${t.yPower > 0 ? `y^${t.yPower}` : ''}`
          )
          .join(' ')}
      </div>
      <AssumptionsBar assumptions={['Exact integer/real expansion for non-negative integer exponent n.']} />
    </div>
  );
};
