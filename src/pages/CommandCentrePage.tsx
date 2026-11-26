import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Atom,
  BookMarked,
  Brain,
  Compass,
  FlaskConical,
  FolderKanban,
  Sigma,
  Sparkles,
} from 'lucide-react';
import { ScientificCore3D } from '@/components/three/ScientificCore3D';
import { PlotlyChart } from '@/components/ui/PlotlyChart';
import { Badge, Button, EmptyState, MetricTile, ScientificSlider } from '@/components/ui/Primitives';
import { SCIENTIFIC_TIMELINE } from '@/data/discoveryData';
import { sampleMathExpression } from '@/engines/mathEngine';
import { simulateProjectile } from '@/engines/physicsEngine';
import { useWorkspace } from '@/store/workspaceStore';

export const CommandCentrePage: React.FC = () => {
  const { state } = useWorkspace();

  // Featured interactive math model state
  const [decayRate, setDecayRate] = useState(0.18);
  const [freq, setFreq] = useState(4.0);

  // Featured interactive physics simulation state
  const [launchSpeed, setLaunchSpeed] = useState(28);
  const [launchAngle, setLaunchAngle] = useState(45);

  const mathPreview = useMemo(
    () => sampleMathExpression(`exp(-${decayRate} * x) * sin(${freq} * x)`, 0, 12, 180),
    [decayRate, freq]
  );

  const physicsPreview = useMemo(
    () => simulateProjectile(launchSpeed, launchAngle),
    [launchSpeed, launchAngle]
  );

  const discoveryOfDay = useMemo(() => {
    const dayIndex = new Date().getDate() % SCIENTIFIC_TIMELINE.length;
    return SCIENTIFIC_TIMELINE[dayIndex];
  }, []);

  const environments = [
    { title: 'Mathematics Universe', sub: '7 Scientific Domains', to: '/mathematics', icon: Sigma, tone: 'cyan' as const },
    { title: 'Physics Universe', sub: '6 Scientific Domains', to: '/physics', icon: Atom, tone: 'violet' as const },
    { title: 'AI Intelligence', sub: 'Coming Soon • Under Development', to: '/ai', icon: Brain, tone: 'cyan' as const },
    { title: 'Experimentation Centre', sub: '10 Digital Laboratories', to: '/experimentation', icon: FlaskConical, tone: 'violet' as const },
    { title: 'Discovery Hub', sub: 'Vault • Timeline • 3D Nexus', to: '/discovery', icon: Compass, tone: 'cyan' as const },
    { title: 'Personal Workspace', sub: 'Research Notes & Saved Models', to: '/workspace', icon: FolderKanban, tone: 'violet' as const },
  ];

  return (
    <div className="mx-auto max-w-[1440px] space-y-10 px-4 py-8 lg:px-8">
      {/* Welcome Hero + 3D Core */}
      <section className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-[#91A3BA]/15 bg-[#101B2D]/50 p-6 sm:p-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="cyan">COMMAND CENTRE</Badge>
            <Badge tone="muted">OPERATOR: {state.profile.displayName.toUpperCase()}</Badge>
          </div>
          <h1 className="dx-editorial-heading text-[#EAF4FF]">
            SCIENTIFIC <span className="text-[#00D9FF]">COMMAND</span>
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-[#91A3BA]">
            Central command environment and launchpad across foundational Mathematics, Physics
            simulations, 2D/3D Graph Studio, and personal research experiments.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2">
            <MetricTile label="Math Domains" value="7" unit="Active" accent="cyan" />
            <MetricTile label="Physics Domains" value="6" unit="Active" accent="violet" />
            <MetricTile label="Saved Experiments" value={String(state.savedExperiments.length)} accent="ice" />
            <MetricTile label="Research Notes" value={String(state.notes.length)} accent="cyan" />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/mathematics">
              <Button>
                <Sigma className="h-4 w-4" /> Explore Mathematics
              </Button>
            </Link>
            <Link to="/experimentation?module=graph">
              <Button variant="secondary">Open Graph Studio</Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-[#00D9FF]/20 bg-[#080D18]/70 p-2">
            <ScientificCore3D className="h-[280px] sm:h-[320px] w-full" />
          </div>
        </div>
      </section>

      {/* Quick Access Environments */}
      <section className="space-y-4">
        <h2 className="font-display text-lg font-bold tracking-wide text-[#EAF4FF]">
          MAJOR ENVIRONMENTS
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {environments.map((env) => {
            const Icon = env.icon;
            return (
              <Link
                key={env.to}
                to={env.to}
                className="dx-card dx-card-interactive flex items-center justify-between p-5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                      env.tone === 'cyan'
                        ? 'border-[#00D9FF]/30 bg-[#00D9FF]/10 text-[#00D9FF]'
                        : 'border-[#7565FF]/30 bg-[#7565FF]/15 text-[#9F94FF]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-base font-bold text-[#EAF4FF]">
                      {env.title}
                    </div>
                    <div className="text-xs text-[#91A3BA]">{env.sub}</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-[#91A3BA]" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Interactive Math Model & Featured Physics Simulation */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="dx-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge tone="cyan">FEATURED MATHEMATICAL MODEL</Badge>
              <h3 className="mt-2 font-display text-xl font-bold text-[#EAF4FF]">
                Damped Harmonic Function: e^(-αx)·sin(ωx)
              </h3>
            </div>
            <Link to="/mathematics/math-3-trig" className="text-xs text-[#00D9FF] hover:underline">
              Open Trigonometry Lab →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ScientificSlider
              label="Decay Rate α"
              value={decayRate}
              min={0.02}
              max={0.6}
              step={0.02}
              onChange={setDecayRate}
            />
            <ScientificSlider
              label="Angular Frequency ω"
              value={freq}
              min={1}
              max={10}
              step={0.5}
              unit="rad/u"
              onChange={setFreq}
            />
          </div>
          <PlotlyChart
            height={250}
            data={[
              {
                x: mathPreview.xs,
                y: mathPreview.ys,
                type: 'scatter',
                mode: 'lines',
                line: { color: '#00D9FF', width: 2.5 },
                name: 'f(x)',
              },
            ]}
            layout={{ margin: { t: 18, r: 16, b: 36, l: 44 }, xaxis: { title: { text: 'x' } } }}
          />
        </div>

        <div className="dx-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Badge tone="violet">FEATURED PHYSICS SIMULATION</Badge>
              <h3 className="mt-2 font-display text-xl font-bold text-[#EAF4FF]">
                2D Projectile Trajectory (g = 9.81 m/s²)
              </h3>
            </div>
            <Link to="/physics/phys-3-motion-plane" className="text-xs text-[#9F94FF] hover:underline">
              Open Projectile Lab →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ScientificSlider
              label="Launch Speed u"
              value={launchSpeed}
              min={5}
              max={60}
              step={1}
              unit="m/s"
              onChange={setLaunchSpeed}
            />
            <ScientificSlider
              label="Launch Angle θ"
              value={launchAngle}
              min={10}
              max={80}
              step={1}
              unit="°"
              onChange={setLaunchAngle}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <MetricTile label="Range R" value={physicsPreview.range.toFixed(2)} unit="m" />
            <MetricTile label="Max Height H" value={physicsPreview.maxHeight.toFixed(2)} unit="m" accent="violet" />
            <MetricTile label="Flight T" value={physicsPreview.timeOfFlight.toFixed(2)} unit="s" accent="ice" />
          </div>
          <PlotlyChart
            height={195}
            data={[
              {
                x: physicsPreview.xs,
                y: physicsPreview.ys,
                type: 'scatter',
                mode: 'lines',
                line: { color: '#7565FF', width: 2.5 },
                fill: 'tozeroy',
                fillcolor: 'rgba(117, 101, 255, 0.12)',
                name: 'y(x)',
              },
            ]}
            layout={{ margin: { t: 14, r: 16, b: 34, l: 44 }, xaxis: { title: { text: 'x (m)' } }, yaxis: { title: { text: 'y (m)' } } }}
          />
        </div>
      </section>

      {/* Discovery of the Day & Workspace Activity */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 dx-card p-6 space-y-3 border-[#00D9FF]/25">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00D9FF]">
            <Sparkles className="h-4 w-4" /> SCIENTIFIC DISCOVERY OF THE DAY
          </div>
          <div className="font-mono text-xs text-[#9F94FF]">
            {discoveryOfDay.year} • {discoveryOfDay.scientist}
          </div>
          <h3 className="font-display text-xl font-bold text-[#EAF4FF]">{discoveryOfDay.title}</h3>
          <p className="text-sm text-[#91A3BA]">{discoveryOfDay.summary}</p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link to={discoveryOfDay.connectedChapterRoute}>
              <Button size="sm">{discoveryOfDay.connectedChapterLabel}</Button>
            </Link>
            <Link to="/discovery?tab=timeline">
              <Button size="sm" variant="secondary">Full Timeline</Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="dx-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-[#EAF4FF]">
                Recent Experiments
              </h3>
              <Link to="/workspace" className="text-xs text-[#00D9FF] hover:underline">
                View All
              </Link>
            </div>
            {state.savedExperiments.length === 0 ? (
              <EmptyState
                title="No Saved Experiments Yet"
                description="Run a simulation in Physics Universe or Experimentation Centre and click Save Snapshot."
                action={
                  <Link to="/lab">
                    <Button size="sm">Run First Experiment</Button>
                  </Link>
                }
              />
            ) : (
              <div className="space-y-2">
                {state.savedExperiments.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="rounded-xl bg-[#080D18]/75 p-3 text-xs">
                    <div className="font-semibold text-[#EAF4FF]">{exp.title}</div>
                    <div className="text-[#91A3BA]">{exp.module}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dx-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-[#EAF4FF]">
                Recently Explored &amp; Graphs
              </h3>
              <BookMarked className="h-4 w-4 text-[#00D9FF]" />
            </div>
            {state.recentConcepts.length === 0 && state.savedGraphs.length === 0 ? (
              <EmptyState
                title="Exploration Log Ready"
                description="Visit any Mathematics or Physics chapter or save a plot in Equation-to-Graph Studio."
                action={
                  <Link to="/math">
                    <Button size="sm" variant="secondary">Browse Chapters</Button>
                  </Link>
                }
              />
            ) : (
              <div className="space-y-2">
                {state.recentConcepts.slice(0, 3).map((c) => (
                  <Link
                    key={c.id}
                    to={c.route}
                    className="block rounded-xl bg-[#080D18]/75 p-3 text-xs hover:border hover:border-[#00D9FF]/35"
                  >
                    <div className="font-semibold text-[#EAF4FF]">{c.title}</div>
                    <div className="text-[#91A3BA]">{c.category}</div>
                  </Link>
                ))}
                {state.savedGraphs.slice(0, 2).map((g) => (
                  <div key={g.id} className="rounded-xl bg-[#080D18]/75 p-3 text-xs">
                    <div className="font-semibold text-[#00D9FF]">Graph: {g.title}</div>
                    <div className="font-mono text-[#91A3BA] truncate">{g.expressions.join(', ')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
