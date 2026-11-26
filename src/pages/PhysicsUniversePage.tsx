import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Cpu,
  FlaskConical,
  Gauge,
  HelpCircle,
  Orbit,
  Sparkles,
} from 'lucide-react';
import {
  PHYSICS_CHAPTERS,
  PHYSICS_DOMAINS,
} from '@/data/physicsChapters';
import { MathFormula } from '@/components/ui/MathFormula';
import { Badge, Button } from '@/components/ui/Primitives';
import { useWorkspace } from '@/store/workspaceStore';
import {
  GravitationTool,
  Kinematics1DTool,
  LawsMotionTool,
  ProjectileTool,
  RotationalTool,
  UnitsTool,
  WorkEnergyTool,
} from '@/components/physics/PhysicsToolsPart1';
import {
  FluidsTool,
  KineticTool,
  OscillationsTool,
  SolidsTool,
  ThermalTool,
  ThermodynamicsTool,
  WavesTool,
} from '@/components/physics/PhysicsToolsPart2';

const PHYSICS_TOOL_MAP: Record<string, React.FC> = {
  units: UnitsTool,
  kinematics1d: Kinematics1DTool,
  projectile: ProjectileTool,
  lawsMotion: LawsMotionTool,
  workEnergy: WorkEnergyTool,
  rotational: RotationalTool,
  gravitation: GravitationTool,
  solids: SolidsTool,
  fluids: FluidsTool,
  thermal: ThermalTool,
  thermodynamics: ThermodynamicsTool,
  kinetic: KineticTool,
  oscillations: OscillationsTool,
  waves: WavesTool,
};

export const PhysicsUniversePage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { state, toggleBookmark, recordConceptVisit } = useWorkspace();

  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  const chapter = chapterId ? PHYSICS_CHAPTERS.find((c) => c.id === chapterId) : undefined;
  const [challengeInputs, setChallengeInputs] = useState<Record<string, string>>({});
  const [challengeStatus, setChallengeStatus] = useState<Record<string, 'correct' | 'wrong' | null>>({});

  useEffect(() => {
    if (chapter) {
      recordConceptVisit({
        id: chapter.id,
        title: `${chapter.title} (${chapter.domainCode ?? 'Physics'})`,
        route: `/physics/${chapter.id}`,
        category: 'Physics Universe',
      });
    }
  }, [chapter, recordConceptVisit]);

  const filteredTopics = useMemo(() => {
    if (selectedDomain === 'ALL') return PHYSICS_CHAPTERS;
    return PHYSICS_CHAPTERS.filter((c) => c.domainCode === selectedDomain);
  }, [selectedDomain]);

  if (!chapter) {
    return (
      <div className="mx-auto max-w-[1440px] space-y-10 px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="violet">SCIENTIFIC PHYSICS UNIVERSE</Badge>
            <Badge tone="muted">6 DOMAINS • SI TELEMETRY • DETERMINISTIC SIMULATIONS</Badge>
          </div>
          <h1 className="dx-editorial-heading text-[#EAF4FF]">
            PHYSICS <span className="text-[#7565FF]">UNIVERSE</span>
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-[#91A3BA] leading-relaxed">
            Independent topic-based physical simulation environment. Manipulate velocity, force
            vectors, thermodynamic states, and wave frequencies with verifiable SI calculations,
            parameter sliders, and real-time graphs across six comprehensive scientific domains.
          </p>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#91A3BA]/15 pb-4">
          <button
            type="button"
            onClick={() => setSelectedDomain('ALL')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              selectedDomain === 'ALL'
                ? 'bg-[#7565FF] text-white'
                : 'bg-[#101B2D] text-[#91A3BA] hover:text-[#EAF4FF]'
            }`}
          >
            All Scientific Domains
          </button>
          {Object.entries(PHYSICS_DOMAINS).map(([key, domain]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedDomain(domain.code)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                selectedDomain === domain.code
                  ? 'bg-[#7565FF] text-white'
                  : 'bg-[#101B2D] text-[#91A3BA] hover:text-[#EAF4FF]'
              }`}
            >
              {domain.code}: {domain.name}
            </button>
          ))}
        </div>

        {/* Domain F: Computational Physics Callout (when ALL or DOMAIN F selected) */}
        {(selectedDomain === 'ALL' || selectedDomain === 'DOMAIN F') && (
          <section className="rounded-3xl border border-[#7565FF]/30 bg-gradient-to-r from-[#101B2D] via-[#0D1627] to-[#101B2D] p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge tone="violet">DOMAIN F</Badge>
                <h3 className="font-display text-xl font-bold text-[#EAF4FF]">
                  Computational Physics &amp; Numerical Modelling
                </h3>
              </div>
              <span className="font-mono text-xs text-[#7565FF]">Virtual Digital Laboratories</span>
            </div>
            <p className="text-xs sm:text-sm text-[#91A3BA] max-w-3xl">
              Numerical physics sandboxes, multi-body collision dynamics, non-linear trajectories, and
              model comparison environments located in the Experimentation Centre.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <Link
                to="/experimentation?module=collision"
                className="rounded-xl border border-[#7565FF]/20 bg-[#080D18]/70 p-3.5 hover:border-[#7565FF]/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#EAF4FF]">
                  <span>1D / 2D Collision Laboratory</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#7565FF]" />
                </div>
                <div className="mt-1 text-[11px] text-[#91A3BA]">
                  Elastic and inelastic momentum transfers with coefficient of restitution e ∈ [0, 1].
                </div>
              </Link>
              <Link
                to="/experimentation?module=physics"
                className="rounded-xl border border-[#00D9FF]/20 bg-[#080D18]/70 p-3.5 hover:border-[#00D9FF]/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#EAF4FF]">
                  <span>Virtual Physics Laboratory</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#00D9FF]" />
                </div>
                <div className="mt-1 text-[11px] text-[#91A3BA]">
                  Coupled projectile, spring-mass, and gravitational orbital simulation environments.
                </div>
              </Link>
              <Link
                to="/experimentation?module=compare"
                className="rounded-xl border border-[#7565FF]/20 bg-[#080D18]/70 p-3.5 hover:border-[#7565FF]/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#EAF4FF]">
                  <span>Model Comparison Studio</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#7565FF]" />
                </div>
                <div className="mt-1 text-[11px] text-[#91A3BA]">
                  Benchmark theoretical laws against numerical approximations and boundary tolerances.
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Topic Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTopics.map((ch) => (
            <Link
              key={ch.id}
              to={`/physics/${ch.id}`}
              className="dx-card dx-card-interactive p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge tone="violet">{ch.domainCode ?? 'PHYSICS'}</Badge>
                  <span className="font-mono text-xs text-[#91A3BA]">SI Telemetry</span>
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-[#EAF4FF]">{ch.title}</h2>
                  <div className="mt-0.5 text-[11px] font-mono text-[#7565FF]">{ch.domainName}</div>
                </div>
                <p className="text-xs text-[#91A3BA] line-clamp-2">{ch.subtitle}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#91A3BA]/10 text-xs">
                <span className="font-mono text-[#91A3BA]">Validated Model</span>
                <span className="flex items-center font-semibold text-[#7565FF]">
                  Launch Simulation <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const ActiveTool = PHYSICS_TOOL_MAP[chapter.toolId] ?? UnitsTool;
  const bookmarked = state.bookmarks.includes(chapter.id);

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 px-4 py-8 lg:px-8">
      {/* Navigation & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/physics"
          className="inline-flex items-center gap-1.5 text-xs text-[#91A3BA] hover:text-[#00D9FF]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All Physics Domains
        </Link>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => toggleBookmark(chapter.id)}>
            <Bookmark className="h-3.5 w-3.5" /> {bookmarked ? 'Bookmarked' : 'Bookmark Topic'}
          </Button>
          <Link to="/experimentation?module=physics">
            <Button size="sm" variant="violet">
              <FlaskConical className="h-3.5 w-3.5" /> Open Physics Lab
            </Button>
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="violet">{chapter.domainCode ?? 'DOMAIN'}</Badge>
          <Badge tone="muted">{chapter.domainName ?? 'Physics'}</Badge>
        </div>
        <h1 className="dx-editorial-heading text-[#EAF4FF]">{chapter.title}</h1>
        <p className="max-w-3xl text-base text-[#91A3BA]">{chapter.overview}</p>
      </div>

      {/* Interactive Simulation Laboratory */}
      <section className="dx-card p-6 space-y-4 border-[#7565FF]/30">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-[#7565FF]">
            Deterministic Simulation Laboratory
          </h2>
          <Badge tone="muted">SI Verified Physics Engine</Badge>
        </div>
        <ActiveTool />
      </section>

      {/* Physical Laws & Equation References */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="dx-card p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#EAF4FF]">Fundamental Definitions</h2>
          <div className="space-y-3">
            {chapter.definitions.map((d) => (
              <div key={d.term} className="rounded-xl bg-[#080D18]/80 p-3.5">
                <div className="text-sm font-semibold text-[#00D9FF]">{d.term}</div>
                <div className="mt-1 text-xs text-[#91A3BA]">{d.definition}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dx-card p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#EAF4FF]">Governing Equations &amp; SI Units</h2>
          <div className="space-y-3">
            {chapter.formulas.map((f) => (
              <div key={f.name} className="rounded-xl bg-[#080D18]/80 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#7565FF]">
                  <span>{f.name}</span>
                  {f.siUnit && <span className="font-mono text-[#91A3BA]">SI: {f.siUnit}</span>}
                </div>
                <div className="overflow-x-auto">
                  <MathFormula latex={f.latex} displayMode />
                </div>
                <div className="text-xs text-[#91A3BA]">{f.variables}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Worked Numerical Examples & Practice Challenge */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="dx-card p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#EAF4FF]">Worked Numerical Example</h2>
          {chapter.workedExamples.map((ex) => (
            <div key={ex.title} className="space-y-3 rounded-xl bg-[#080D18]/80 p-4 text-xs">
              <div className="font-bold text-sm text-[#00D9FF]">{ex.title}</div>
              <p className="text-[#EAF4FF]">{ex.problem}</p>
              <div className="text-[#91A3BA]">Given: {ex.given.join(' • ')}</div>
              <ol className="list-decimal pl-4 space-y-1 text-[#91A3BA]">
                {ex.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
              <div className="font-mono font-bold text-emerald-300">Result: {ex.result}</div>
            </div>
          ))}
        </div>

        <div className="dx-card p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#EAF4FF]">Practice Challenge</h2>
          {chapter.challenges.map((ch) => {
            const val = challengeInputs[ch.id] ?? '';
            const status = challengeStatus[ch.id];
            return (
              <div key={ch.id} className="space-y-3 rounded-xl bg-[#080D18]/80 p-4 text-xs">
                <p className="text-sm text-[#EAF4FF] font-medium">{ch.prompt}</p>
                <div className="flex items-center gap-1.5 text-[#91A3BA]">
                  <HelpCircle className="h-3.5 w-3.5 text-[#7565FF]" /> Hint: {ch.hint}
                </div>
                <div className="flex gap-2">
                  <input
                    value={val}
                    onChange={(e) =>
                      setChallengeInputs((prev) => ({ ...prev, [ch.id]: e.target.value }))
                    }
                    placeholder={`Enter value ${ch.unit ? `(${ch.unit})` : ''}`}
                    className="flex-1 rounded-lg border border-[#91A3BA]/25 bg-[#101B2D] px-3 py-2 font-mono text-xs text-[#EAF4FF]"
                  />
                  <Button
                    size="sm"
                    variant="violet"
                    onClick={() => {
                      const num = parseFloat(val);
                      const ok =
                        ch.expectedNumeric !== undefined &&
                        Number.isFinite(num) &&
                        Math.abs(num - ch.expectedNumeric) <= (ch.tolerance ?? 0.01);
                      setChallengeStatus((prev) => ({ ...prev, [ch.id]: ok ? 'correct' : 'wrong' }));
                    }}
                  >
                    Verify
                  </Button>
                </div>
                {status === 'correct' && (
                  <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                    <CheckCircle2 className="h-4 w-4" /> Verified! {ch.solutionSteps.join(' ')}
                  </div>
                )}
                {status === 'wrong' && (
                  <div className="text-amber-300">
                    Not quite. Expected ≈ {ch.expectedNumeric} {ch.unit ?? ''}. Solution:{' '}
                    {ch.solutionSteps.join(' ')}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Conceptual Connections & Experiments */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="dx-card p-5 space-y-2">
          <div className="text-xs font-bold uppercase text-[#00D9FF]">Related Mathematical Foundations</div>
          {chapter.relatedConcepts.map((rc) => (
            <Link key={rc.route} to={rc.route} className="block text-xs text-[#EAF4FF] hover:text-[#00D9FF]">
              → {rc.title}
            </Link>
          ))}
        </div>
        <div className="dx-card p-5 space-y-2">
          <div className="text-xs font-bold uppercase text-[#7565FF]">Related Laboratory Simulations</div>
          {chapter.relatedExperiments.map((re) => (
            <Link key={re.route} to={re.route} className="block text-xs text-[#EAF4FF] hover:text-[#7565FF]">
              → {re.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PhysicsUniversePage;
