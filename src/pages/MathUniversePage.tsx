import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Cpu,
  FlaskConical,
  HelpCircle,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  MATH_CHAPTERS,
  MATHEMATICS_DOMAINS,
} from '@/data/mathChapters';
import { MathFormula } from '@/components/ui/MathFormula';
import { Badge, Button } from '@/components/ui/Primitives';
import { useWorkspace } from '@/store/workspaceStore';
import {
  BinomialTool,
  CombinatoricsTool,
  ComplexTool,
  InequalitiesTool,
  RelationsTool,
  SetsTool,
  TrigTool,
} from '@/components/math/MathToolsPart1';
import {
  ConicsTool,
  Geometry3DTool,
  LimitsTool,
  ProbabilityTool,
  SequencesTool,
  StatisticsTool,
  StraightLinesTool,
} from '@/components/math/MathToolsPart2';

const TOOL_MAP: Record<string, React.FC> = {
  sets: SetsTool,
  relations: RelationsTool,
  trigonometry: TrigTool,
  complex: ComplexTool,
  inequalities: InequalitiesTool,
  combinatorics: CombinatoricsTool,
  binomial: BinomialTool,
  sequences: SequencesTool,
  lines: StraightLinesTool,
  conics: ConicsTool,
  geometry3d: Geometry3DTool,
  limits: LimitsTool,
  statistics: StatisticsTool,
  probability: ProbabilityTool,
};

export const MathUniversePage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const { state, toggleBookmark, recordConceptVisit } = useWorkspace();

  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  const chapter = chapterId ? MATH_CHAPTERS.find((c) => c.id === chapterId) : undefined;
  const [challengeInputs, setChallengeInputs] = useState<Record<string, string>>({});
  const [challengeStatus, setChallengeStatus] = useState<Record<string, 'correct' | 'wrong' | null>>({});

  useEffect(() => {
    if (chapter) {
      recordConceptVisit({
        id: chapter.id,
        title: `${chapter.title} (${chapter.domainCode ?? 'Math'})`,
        route: `/mathematics/${chapter.id}`,
        category: 'Mathematics Universe',
      });
    }
  }, [chapter, recordConceptVisit]);

  const filteredTopics = useMemo(() => {
    if (selectedDomain === 'ALL') return MATH_CHAPTERS;
    return MATH_CHAPTERS.filter((c) => c.domainCode === selectedDomain);
  }, [selectedDomain]);

  if (!chapter) {
    return (
      <div className="mx-auto max-w-[1440px] space-y-10 px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="cyan">SCIENTIFIC MATHEMATICS UNIVERSE</Badge>
            <Badge tone="muted">7 DOMAINS • DETERMINISTIC COMPUTATION</Badge>
          </div>
          <h1 className="dx-editorial-heading text-[#EAF4FF]">
            MATHEMATICS <span className="text-[#00D9FF]">UNIVERSE</span>
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-[#91A3BA] leading-relaxed">
            Independent topic-based exploration of pure and applied mathematical structures.
            Manipulate parameters, analyze symbolic formulas, and explore structural relationships
            across seven foundational scientific domains.
          </p>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#91A3BA]/15 pb-4">
          <button
            type="button"
            onClick={() => setSelectedDomain('ALL')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              selectedDomain === 'ALL'
                ? 'bg-[#00D9FF] text-[#080D18]'
                : 'bg-[#101B2D] text-[#91A3BA] hover:text-[#EAF4FF]'
            }`}
          >
            All Scientific Domains
          </button>
          {Object.entries(MATHEMATICS_DOMAINS).map(([key, domain]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedDomain(domain.code)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                selectedDomain === domain.code
                  ? 'bg-[#00D9FF] text-[#080D18]'
                  : 'bg-[#101B2D] text-[#91A3BA] hover:text-[#EAF4FF]'
              }`}
            >
              {domain.code}: {domain.name}
            </button>
          ))}
        </div>

        {/* Domain G: Advanced Exploration Callout (when ALL or DOMAIN G selected) */}
        {(selectedDomain === 'ALL' || selectedDomain === 'DOMAIN G') && (
          <section className="rounded-3xl border border-[#00D9FF]/30 bg-gradient-to-r from-[#101B2D] via-[#0D1627] to-[#101B2D] p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge tone="cyan">DOMAIN G</Badge>
                <h3 className="font-display text-xl font-bold text-[#EAF4FF]">
                  Advanced Mathematical Exploration
                </h3>
              </div>
              <span className="font-mono text-xs text-[#00D9FF]">Digital Research Bench</span>
            </div>
            <p className="text-xs sm:text-sm text-[#91A3BA] max-w-3xl">
              Fractal dynamics, chaotic attractors, non-linear logistic iterations, and multi-variable
              3D surface projections located in the Experimentation Centre.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <Link
                to="/experimentation?module=mandelbrot"
                className="rounded-xl border border-[#00D9FF]/20 bg-[#080D18]/70 p-3.5 hover:border-[#00D9FF]/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#EAF4FF]">
                  <span>Mandelbrot Fractal Explorer</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#00D9FF]" />
                </div>
                <div className="mt-1 text-[11px] text-[#91A3BA]">
                  Escape-time iteration z_{'{n+1}'} = z_n² + c on the complex Argand plane.
                </div>
              </Link>
              <Link
                to="/experimentation?module=chaos"
                className="rounded-xl border border-[#7565FF]/20 bg-[#080D18]/70 p-3.5 hover:border-[#7565FF]/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#EAF4FF]">
                  <span>Chaos &amp; Logistic Map</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#7565FF]" />
                </div>
                <div className="mt-1 text-[11px] text-[#91A3BA]">
                  Non-linear bifurcation x_{'{n+1}'} = r · x_n · (1 - x_n).
                </div>
              </Link>
              <Link
                to="/experimentation?module=3d"
                className="rounded-xl border border-[#00D9FF]/20 bg-[#080D18]/70 p-3.5 hover:border-[#00D9FF]/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#EAF4FF]">
                  <span>3D Mathematical Surface Universe</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#00D9FF]" />
                </div>
                <div className="mt-1 text-[11px] text-[#91A3BA]">
                  Parametric surfaces z = f(x, y) with WebGL dynamic wireframes.
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
              to={`/mathematics/${ch.id}`}
              className="dx-card dx-card-interactive p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge tone="cyan">{ch.domainCode ?? 'MATHEMATICS'}</Badge>
                  <span className="font-mono text-xs text-[#91A3BA]">
                    {ch.formulas.length} Formulas
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-[#EAF4FF]">{ch.title}</h2>
                  <div className="mt-0.5 text-[11px] font-mono text-[#00D9FF]">{ch.domainName}</div>
                </div>
                <p className="text-xs text-[#91A3BA] line-clamp-2">{ch.subtitle}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#91A3BA]/10 text-xs">
                <span className="font-mono text-[#91A3BA]">Deterministic Lab</span>
                <span className="flex items-center font-semibold text-[#00D9FF]">
                  Launch Lab <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  const ActiveTool = TOOL_MAP[chapter.toolId] ?? SetsTool;
  const bookmarked = state.bookmarks.includes(chapter.id);

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 px-4 py-8 lg:px-8">
      {/* Navigation & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/mathematics"
          className="inline-flex items-center gap-1.5 text-xs text-[#91A3BA] hover:text-[#00D9FF]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All Mathematics Domains
        </Link>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => toggleBookmark(chapter.id)}>
            <Bookmark className="h-3.5 w-3.5" /> {bookmarked ? 'Bookmarked' : 'Bookmark Topic'}
          </Button>
          <Link to="/experimentation?module=graph">
            <Button size="sm" variant="secondary">
              <FlaskConical className="h-3.5 w-3.5" /> Open Graph Studio
            </Button>
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="cyan">{chapter.domainCode ?? 'DOMAIN'}</Badge>
          <Badge tone="muted">{chapter.domainName ?? 'Mathematics'}</Badge>
        </div>
        <h1 className="dx-editorial-heading text-[#EAF4FF]">{chapter.title}</h1>
        <p className="max-w-3xl text-base text-[#91A3BA]">{chapter.overview}</p>
      </div>

      {/* Interactive Tool & Visualisation */}
      <section className="dx-card p-6 space-y-4 border-[#00D9FF]/30">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-[#00D9FF]">
            Interactive Topic Laboratory
          </h2>
          <Badge tone="muted">Deterministic Computation Engine</Badge>
        </div>
        <ActiveTool />
      </section>

      {/* Definitions & Formula Reference */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="dx-card p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#EAF4FF]">Key Definitions</h2>
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
          <h2 className="font-display text-lg font-bold text-[#EAF4FF]">Formula Reference</h2>
          <div className="space-y-3">
            {chapter.formulas.map((f) => (
              <div key={f.name} className="rounded-xl bg-[#080D18]/80 p-4 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#9F94FF]">
                  {f.name}
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

      {/* Worked Examples & Practice Challenges */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="dx-card p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[#EAF4FF]">Worked Example</h2>
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
                    placeholder="Enter numeric answer"
                    className="flex-1 rounded-lg border border-[#91A3BA]/25 bg-[#101B2D] px-3 py-2 font-mono text-xs text-[#EAF4FF]"
                  />
                  <Button
                    size="sm"
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
                    Not quite. Expected ≈ {ch.expectedNumeric}. Solution: {ch.solutionSteps.join(' ')}
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
          <div className="text-xs font-bold uppercase text-[#00D9FF]">Related Mathematical Concepts</div>
          {chapter.relatedConcepts.map((rc) => (
            <Link key={rc.route} to={rc.route} className="block text-xs text-[#EAF4FF] hover:text-[#00D9FF]">
              → {rc.title}
            </Link>
          ))}
        </div>
        <div className="dx-card p-5 space-y-2">
          <div className="text-xs font-bold uppercase text-[#7565FF]">Related Laboratory Experiments</div>
          {chapter.relatedExperiments.map((re) => (
            <Link key={re.route} to={re.route} className="block text-xs text-[#EAF4FF] hover:text-[#00D9FF]">
              → {re.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MathUniversePage;
