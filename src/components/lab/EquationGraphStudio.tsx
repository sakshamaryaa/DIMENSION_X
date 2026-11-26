import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download, Save } from 'lucide-react';
import { PlotlyChart } from '@/components/ui/PlotlyChart';
import { Badge, Button, ErrorState, MetricTile, ScientificSlider } from '@/components/ui/Primitives';
import {
  computeSymbolicDerivative,
  sampleMathExpression,
  sampleSurface3D,
} from '@/engines/mathEngine';
import { useWorkspace } from '@/store/workspaceStore';

export const EquationGraphStudio: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { saveEquation, saveGraph } = useWorkspace();

  const [mode, setMode] = useState<'2d' | '3d'>('2d');
  const [expr1, setExpr1] = useState(searchParams.get('expr') || 'a * sin(b * x)');
  const [expr2, setExpr2] = useState('0.2 * x^2 - 1');
  const [expr3d, setExpr3d] = useState('sin(sqrt(x^2 + y^2) * a) * exp(-0.15 * (x^2 + y^2))');
  const [paramA, setParamA] = useState(1.5);
  const [paramB, setParamB] = useState(2.0);
  const [xMin, setXMin] = useState(-6);
  const [xMax, setXMax] = useState(6);
  const [probeX, setProbeX] = useState(1.0);

  const sample1 = useMemo(
    () => sampleMathExpression(expr1, xMin, xMax, 320, { a: paramA, b: paramB }),
    [expr1, xMin, xMax, paramA, paramB]
  );
  const sample2 = useMemo(
    () => (expr2.trim() ? sampleMathExpression(expr2, xMin, xMax, 320, { a: paramA, b: paramB }) : null),
    [expr2, xMin, xMax, paramA, paramB]
  );
  const surface3d = useMemo(
    () => (mode === '3d' ? sampleSurface3D(expr3d, -4, 4, 34, { a: paramA, b: paramB }) : null),
    [mode, expr3d, paramA, paramB]
  );

  const derivative1 = useMemo(() => computeSymbolicDerivative(expr1, 'x'), [expr1]);
  const probeVal = useMemo(() => {
    const res = sampleMathExpression(expr1, probeX - 0.01, probeX + 0.01, 20, { a: paramA, b: paramB });
    return res.ys[Math.floor(res.ys.length / 2)] ?? Number.NaN;
  }, [expr1, probeX, paramA, paramB]);

  const handleExportJson = () => {
    const payload =
      mode === '2d'
        ? { mode: '2d', expr1, expr2, params: { a: paramA, b: paramB }, x: sample1.xs, y1: sample1.ys }
        : { mode: '3d', expr3d, params: { a: paramA, b: paramB }, surface: surface3d };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dimension-x-graph-${mode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode('2d')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold ${
              mode === '2d' ? 'bg-[#00D9FF] text-[#080D18]' : 'bg-[#080D18] text-[#91A3BA]'
            }`}
          >
            2D Equations
          </button>
          <button
            type="button"
            onClick={() => setMode('3d')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-bold ${
              mode === '3d' ? 'bg-[#7565FF] text-white' : 'bg-[#080D18] text-[#91A3BA]'
            }`}
          >
            3D Surface z = f(x, y)
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              saveEquation({
                label: mode === '2d' ? expr1 : expr3d,
                expression: mode === '2d' ? expr1 : expr3d,
                domainMin: xMin,
                domainMax: xMax,
              })
            }
          >
            <Save className="h-3.5 w-3.5" /> Save Equation
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              saveGraph({
                title: mode === '2d' ? `2D: ${expr1}` : `3D: ${expr3d}`,
                expressions: mode === '2d' ? [expr1, expr2].filter(Boolean) : [expr3d],
                mode,
                params: { a: paramA, b: paramB },
              })
            }
          >
            Save Graph
          </Button>
          <Button size="sm" variant="ghost" onClick={handleExportJson}>
            <Download className="h-3.5 w-3.5" /> Export Data
          </Button>
        </div>
      </div>

      {mode === '2d' ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="text-xs text-[#91A3BA]">
            Primary Equation f₁(x) (variables: x, a, b)
            <input
              value={expr1}
              onChange={(e) => setExpr1(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#91A3BA]/25 bg-[#080D18] px-3 py-2 font-mono text-sm text-[#00D9FF]"
            />
          </label>
          <label className="text-xs text-[#91A3BA]">
            Secondary Equation f₂(x) (optional)
            <input
              value={expr2}
              onChange={(e) => setExpr2(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[#91A3BA]/25 bg-[#080D18] px-3 py-2 font-mono text-sm text-[#9F94FF]"
            />
          </label>
        </div>
      ) : (
        <label className="block text-xs text-[#91A3BA]">
          3D Surface Expression z = f(x, y) (variables: x, y, a, b)
          <input
            value={expr3d}
            onChange={(e) => setExpr3d(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[#91A3BA]/25 bg-[#080D18] px-3 py-2 font-mono text-sm text-[#00D9FF]"
          />
        </label>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <ScientificSlider label="Parameter a" value={paramA} min={-5} max={5} step={0.1} onChange={setParamA} />
        <ScientificSlider label="Parameter b" value={paramB} min={-5} max={5} step={0.1} onChange={setParamB} />
        <ScientificSlider label="Domain Min" value={xMin} min={-20} max={-1} step={1} onChange={setXMin} />
        <ScientificSlider label="Domain Max" value={xMax} min={1} max={20} step={1} onChange={setXMax} />
      </div>

      {mode === '2d' && sample1.error && <ErrorState message={sample1.error} />}
      {mode === '3d' && surface3d?.error && <ErrorState message={surface3d.error} />}

      {mode === '2d' ? (
        <PlotlyChart
          height={390}
          data={[
            {
              x: sample1.xs,
              y: sample1.ys,
              type: 'scatter',
              mode: 'lines',
              line: { color: '#00D9FF', width: 2.5 },
              name: `f₁(x) = ${expr1}`,
            },
            ...(sample2 && !sample2.error
              ? [
                  {
                    x: sample2.xs,
                    y: sample2.ys,
                    type: 'scatter' as const,
                    mode: 'lines' as const,
                    line: { color: '#7565FF', width: 2.5 },
                    name: `f₂(x) = ${expr2}`,
                  },
                ]
              : []),
          ]}
        />
      ) : (
        surface3d &&
        !surface3d.error && (
          <PlotlyChart
            height={420}
            data={[
              {
                x: surface3d.x,
                y: surface3d.y,
                z: surface3d.z,
                type: 'surface',
                colorscale: [
                  [0, '#080D18'],
                  [0.45, '#7565FF'],
                  [1, '#00D9FF'],
                ],
              },
            ]}
            layout={{
              scene: {
                xaxis: { color: '#91A3BA', gridcolor: '#1E293B' },
                yaxis: { color: '#91A3BA', gridcolor: '#1E293B' },
                zaxis: { color: '#91A3BA', gridcolor: '#1E293B' },
              },
            }}
          />
        )
      )}

      {/* Coordinate Inspector & Interpretation */}
      {mode === '2d' && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 items-center rounded-xl bg-[#080D18]/80 p-4">
          <ScientificSlider label="Coordinate Probe x₀" value={probeX} min={xMin} max={xMax} step={0.1} onChange={setProbeX} />
          <MetricTile
            label={`f₁(${probeX.toFixed(1)})`}
            value={Number.isFinite(probeVal) ? probeVal.toFixed(4) : 'Undefined'}
          />
          <div className="rounded-xl border border-[#91A3BA]/15 p-3 text-xs">
            <Badge tone="violet">Symbolic ∂/∂x</Badge>
            <div className="mt-1 font-mono text-[#EAF4FF] break-all">{derivative1}</div>
          </div>
        </div>
      )}
    </div>
  );
};
