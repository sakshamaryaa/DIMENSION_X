import React, { Suspense, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Line, OrbitControls, Html } from '@react-three/drei';
import {
  Bookmark,
  BookOpen,
  Clock,
  Globe2,
  Network,
  Search,
} from 'lucide-react';
import { FORMULA_VAULT } from '@/data/formulaVaultData';
import {
  KNOWLEDGE_NEXUS_EDGES,
  KNOWLEDGE_NEXUS_NODES,
  SCIENTIFIC_TIMELINE,
  SUSTAINABILITY_CASES,
  type NexusNode,
} from '@/data/discoveryData';
import { MathFormula } from '@/components/ui/MathFormula';
import { Badge, Button, MetricTile, ScientificSlider } from '@/components/ui/Primitives';
import { useWorkspace } from '@/store/workspaceStore';

function KnowledgeNexusScene({
  selectedNodeId,
  onSelect,
}: {
  selectedNodeId: string;
  onSelect: (n: NexusNode) => void;
}) {
  const nodeMap = useMemo(
    () => new Map(KNOWLEDGE_NEXUS_NODES.map((n) => [n.id, n])),
    []
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.8} color="#00D9FF" />
      <pointLight position={[-5, -4, -3]} intensity={1.5} color="#7565FF" />

      {KNOWLEDGE_NEXUS_EDGES.map((edge, idx) => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return null;
        return (
          <Line
            key={idx}
            points={[from.position, to.position]}
            color="#91A3BA"
            opacity={0.35}
            transparent
            lineWidth={1.2}
          />
        );
      })}

      {KNOWLEDGE_NEXUS_NODES.map((node) => {
        const isSelected = node.id === selectedNodeId;
        const color =
          node.category === 'math'
            ? '#00D9FF'
            : node.category === 'physics'
              ? '#7565FF'
              : node.category === 'application'
                ? '#34D399'
                : '#EAF4FF';

        return (
          <group key={node.id} position={node.position}>
            <mesh onClick={() => onSelect(node)}>
              <sphereGeometry args={[isSelected ? 0.34 : 0.24, 24, 24]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isSelected ? 0.9 : 0.4}
              />
            </mesh>
            <Html distanceFactor={8} position={[0, 0.38, 0]} center>
              <button
                type="button"
                onClick={() => onSelect(node)}
                className={`whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium backdrop-blur-md transition-colors ${
                  isSelected
                    ? 'bg-[#00D9FF] text-[#080D18] font-bold'
                    : 'bg-[#080D18]/85 text-[#EAF4FF] border border-[#91A3BA]/30'
                }`}
              >
                {node.label}
              </button>
            </Html>
          </group>
        );
      })}

      <OrbitControls enablePan={false} minDistance={4} maxDistance={11} />
    </>
  );
}

export const DiscoveryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'vault';
  const initialQuery = searchParams.get('q') || '';

  const { state, toggleBookmark } = useWorkspace();

  // Formula Vault filters
  const [vaultQuery, setVaultQuery] = useState(initialQuery);
  const [vaultDiscipline, setVaultDiscipline] = useState<'all' | 'mathematics' | 'physics'>('all');

  // Timeline filter
  const [timelineFilter, setTimelineFilter] = useState<'All' | 'Mathematics' | 'Physics'>('All');

  // Knowledge Nexus state
  const [selectedNode, setSelectedNode] = useState<NexusNode>(KNOWLEDGE_NEXUS_NODES[0]);

  // Sustainability model sliders
  const [windSpeed, setWindSpeed] = useState(9);
  const [rotorRadius, setRotorRadius] = useState(25);
  const [canalSpeed, setCanalSpeed] = useState(2.5);
  const [canalArea, setCanalArea] = useState(4);
  const [deltaT, setDeltaT] = useState(12);

  const filteredFormulas = useMemo(() => {
    const q = vaultQuery.trim().toLowerCase();
    return FORMULA_VAULT.filter((f) => {
      if (vaultDiscipline !== 'all' && f.discipline !== vaultDiscipline) return false;
      if (!q) return true;
      return (
        f.name.toLowerCase().includes(q) ||
        f.chapterTitle.toLowerCase().includes(q) ||
        f.topic.toLowerCase().includes(q)
      );
    });
  }, [vaultQuery, vaultDiscipline]);

  const filteredTimeline = useMemo(() => {
    if (timelineFilter === 'All') return SCIENTIFIC_TIMELINE;
    return SCIENTIFIC_TIMELINE.filter((t) => t.discipline === timelineFilter);
  }, [timelineFilter]);

  // Deterministic Sustainability outputs
  const windPowerKW = useMemo(() => {
    const rhoAir = 1.225; // kg/m^3
    const cp = 0.4; // realistic Betz-bounded power coefficient
    const area = Math.PI * rotorRadius * rotorRadius;
    return (0.5 * rhoAir * area * Math.pow(windSpeed, 3) * cp) / 1000;
  }, [windSpeed, rotorRadius]);

  const canalFlowLS = useMemo(() => canalSpeed * canalArea * 1000, [canalSpeed, canalArea]);
  const coolingLoadW = useMemo(() => 1.8 * 25 * deltaT, [deltaT]); // U*A*dT

  const tabs = [
    { id: 'vault', label: 'Formula Vault', icon: BookOpen },
    { id: 'timeline', label: 'Scientific Timeline', icon: Clock },
    { id: 'nexus', label: 'Knowledge Nexus 3D', icon: Network },
    { id: 'sustainability', label: 'Sustainability Models', icon: Globe2 },
  ];

  return (
    <div className="mx-auto max-w-[1440px] space-y-8 px-4 py-8 lg:px-8">
      <div className="space-y-2">
        <Badge tone="cyan">DISCOVERY HUB</Badge>
        <h1 className="dx-editorial-heading text-[#EAF4FF]">
          EXPLORE <span className="text-[#00D9FF]">CONNECTIONS</span>
        </h1>
        <p className="max-w-2xl text-sm text-[#91A3BA]">
          Search foundational mathematical and physical formulas, trace centuries of verified
          scientific milestones, navigate the 3D Knowledge Nexus, and explore sustainability models.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#91A3BA]/15 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSearchParams({ tab: tab.id })}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#00D9FF] text-[#080D18] font-bold'
                  : 'bg-[#101B2D] text-[#91A3BA] hover:text-[#EAF4FF]'
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* FORMULA VAULT */}
      {activeTab === 'vault' && (
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#00D9FF]" />
              <input
                value={vaultQuery}
                onChange={(e) => setVaultQuery(e.target.value)}
                placeholder="Filter formulas by name, chapter, or topic..."
                className="w-full rounded-xl border border-[#91A3BA]/25 bg-[#101B2D] py-2.5 pl-10 pr-4 text-sm text-[#EAF4FF] placeholder-[#91A3BA] focus:border-[#00D9FF] focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'mathematics', 'physics'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setVaultDiscipline(d)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize ${
                    vaultDiscipline === d
                      ? 'bg-[#7565FF] text-white'
                      : 'bg-[#101B2D] text-[#91A3BA] hover:text-[#EAF4FF]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredFormulas.map((entry) => {
              const bookmarked = state.bookmarks.includes(entry.id);
              return (
                <div key={entry.id} className="dx-card p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge tone={entry.discipline === 'mathematics' ? 'cyan' : 'violet'}>
                        {entry.discipline.toUpperCase()} • {entry.topic}
                      </Badge>
                      <h3 className="mt-2 font-display text-lg font-bold text-[#EAF4FF]">
                        {entry.name}
                      </h3>
                      <div className="text-xs text-[#91A3BA]">{entry.chapterTitle}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(entry.id)}
                      className={`rounded-lg border p-2 transition-colors ${
                        bookmarked
                          ? 'border-[#00D9FF]/50 bg-[#00D9FF]/15 text-[#00D9FF]'
                          : 'border-[#91A3BA]/20 text-[#91A3BA] hover:text-[#EAF4FF]'
                      }`}
                      aria-label="Bookmark Formula"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="rounded-xl border border-[#91A3BA]/15 bg-[#080D18]/80 px-4 py-3 overflow-x-auto">
                    <MathFormula latex={entry.latex} displayMode />
                  </div>

                  <div className="space-y-1 text-xs text-[#91A3BA]">
                    <div>
                      <span className="font-semibold text-[#EAF4FF]">Variables:</span>{' '}
                      {entry.variables.map((v) => v.meaning).join(', ')}
                    </div>
                    {entry.siUnit && (
                      <div>
                        <span className="font-semibold text-[#EAF4FF]">Units:</span> {entry.siUnit}
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-[#EAF4FF]">Assumptions:</span>{' '}
                      {entry.assumptions.join(' ')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SCIENTIFIC TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            {(['All', 'Mathematics', 'Physics'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setTimelineFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                  timelineFilter === f
                    ? 'bg-[#00D9FF] text-[#080D18] font-bold'
                    : 'bg-[#101B2D] text-[#91A3BA]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative space-y-6 border-l-2 border-[#00D9FF]/30 pl-6">
            {filteredTimeline.map((item) => (
              <div key={item.id} className="dx-card p-6 space-y-3 relative">
                <div className="absolute -left-[33px] top-6 h-3.5 w-3.5 rounded-full border-2 border-[#080D18] bg-[#00D9FF]" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-sm font-bold text-[#00D9FF]">{item.year}</span>
                  <Badge tone={item.discipline === 'Physics' ? 'violet' : 'cyan'}>
                    {item.discipline}
                  </Badge>
                </div>
                <h3 className="font-display text-xl font-bold text-[#EAF4FF]">{item.title}</h3>
                <div className="text-xs font-semibold text-[#9F94FF]">{item.scientist}</div>
                <p className="text-sm text-[#91A3BA]">{item.summary}</p>
                <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2 text-xs text-[#91A3BA]">
                  <div className="rounded-xl bg-[#080D18]/70 p-3">
                    <span className="font-semibold text-[#EAF4FF]">Historical Context: </span>
                    {item.historicalContext}
                  </div>
                  <div className="rounded-xl bg-[#080D18]/70 p-3">
                    <span className="font-semibold text-[#EAF4FF]">Modern Impact: </span>
                    {item.impact}
                  </div>
                </div>
                <Link to={item.connectedChapterRoute} className="inline-block pt-1">
                  <Button size="sm" variant="secondary">
                    Explore {item.connectedChapterLabel} →
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KNOWLEDGE NEXUS 3D */}
      {activeTab === 'nexus' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 rounded-2xl border border-[#00D9FF]/25 bg-[#080D18] h-[460px] overflow-hidden relative">
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center text-sm text-[#91A3BA]">
                  Loading 3D Knowledge Nexus...
                </div>
              }
            >
              <Canvas camera={{ position: [0, 1.5, 7], fov: 48 }}>
                <KnowledgeNexusScene
                  selectedNodeId={selectedNode.id}
                  onSelect={setSelectedNode}
                />
              </Canvas>
            </Suspense>
            <div className="pointer-events-none absolute bottom-3 left-4 text-[11px] font-mono text-[#91A3BA]">
              Click any node to inspect cross-disciplinary links • Drag to orbit
            </div>
          </div>

          <div className="lg:col-span-4 dx-card p-6 space-y-4">
            <Badge tone="cyan">SELECTED NEXUS NODE</Badge>
            <h3 className="font-display text-2xl font-bold text-[#EAF4FF]">{selectedNode.label}</h3>
            <p className="text-sm text-[#91A3BA]">{selectedNode.summary}</p>
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#91A3BA]">
                Connected Laws &amp; Models
              </div>
              {KNOWLEDGE_NEXUS_EDGES.filter(
                (e) => e.from === selectedNode.id || e.to === selectedNode.id
              ).map((edge, i) => {
                const otherId = edge.from === selectedNode.id ? edge.to : edge.from;
                const other = KNOWLEDGE_NEXUS_NODES.find((n) => n.id === otherId);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => other && setSelectedNode(other)}
                    className="flex w-full items-center justify-between rounded-xl bg-[#080D18]/75 px-3 py-2 text-left text-xs hover:border hover:border-[#00D9FF]/40"
                  >
                    <span className="font-medium text-[#EAF4FF]">{other?.label}</span>
                    <span className="font-mono text-[#00D9FF]">{edge.relation}</span>
                  </button>
                );
              })}
            </div>
            <Link to={selectedNode.route} className="block pt-2">
              <Button className="w-full">Open {selectedNode.label}</Button>
            </Link>
          </div>
        </div>
      )}

      {/* SUSTAINABILITY & REAL-WORLD APPLICATIONS */}
      {activeTab === 'sustainability' && (
        <div className="space-y-6">
          <div className="dx-card p-6 border-[#00D9FF]/25">
            <h2 className="font-display text-2xl font-bold text-[#EAF4FF]">
              Sustainability &amp; Ecological Physics Models
            </h2>
            <p className="mt-1 text-sm text-[#91A3BA]">
              Interactive deterministic models for clean energy, water resource dynamics, and building
              thermal efficiency. Every model provides explicit equations, assumptions, and limitations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Case 1: Wind Energy */}
            <div className="dx-card p-6 space-y-4">
              <Badge tone="cyan">{SUSTAINABILITY_CASES[0].domain}</Badge>
              <h3 className="font-display text-lg font-bold text-[#EAF4FF]">
                {SUSTAINABILITY_CASES[0].title}
              </h3>
              <p className="text-xs text-[#91A3BA]">{SUSTAINABILITY_CASES[0].description}</p>
              <ScientificSlider
                label="Wind Speed v"
                value={windSpeed}
                min={2}
                max={20}
                step={0.5}
                unit="m/s"
                onChange={setWindSpeed}
              />
              <ScientificSlider
                label="Rotor Radius r"
                value={rotorRadius}
                min={5}
                max={60}
                step={1}
                unit="m"
                onChange={setRotorRadius}
              />
              <MetricTile
                label="Estimated Turbine Power (Cp=0.4)"
                value={windPowerKW.toFixed(1)}
                unit="kW"
                accent="cyan"
              />
              <div className="rounded-xl bg-[#080D18]/80 p-3 text-[11px] text-[#91A3BA] space-y-1">
                <div><span className="font-semibold text-[#EAF4FF]">Assumptions:</span> P = 0.5·ρ·A·v³·Cp with ρ=1.225 kg/m³, Cp=0.40 (Betz limit: 0.593).</div>
                <div><span className="font-semibold text-[#EAF4FF]">Limitations:</span> Mechanical drive loss and aerodynamic wake turbulence excluded.</div>
              </div>
              <Link to="/physics/phys-5-work-energy" className="text-xs text-[#00D9FF] hover:underline block">
                Inspect Work, Energy &amp; Power Domain →
              </Link>
            </div>

            {/* Case 2: Water Resource Modelling */}
            <div className="dx-card p-6 space-y-4">
              <Badge tone="violet">{SUSTAINABILITY_CASES[1].domain}</Badge>
              <h3 className="font-display text-lg font-bold text-[#EAF4FF]">
                {SUSTAINABILITY_CASES[1].title}
              </h3>
              <p className="text-xs text-[#91A3BA]">{SUSTAINABILITY_CASES[1].description}</p>
              <ScientificSlider
                label="Flow Speed v"
                value={canalSpeed}
                min={0.5}
                max={8}
                step={0.1}
                unit="m/s"
                onChange={setCanalSpeed}
              />
              <ScientificSlider
                label="Canal Cross-Section A"
                value={canalArea}
                min={0.5}
                max={20}
                step={0.5}
                unit="m²"
                onChange={setCanalArea}
              />
              <MetricTile
                label="Volumetric Discharge Q = A·v"
                value={canalFlowLS.toFixed(0)}
                unit="L/s"
                accent="violet"
              />
              <div className="rounded-xl bg-[#080D18]/80 p-3 text-[11px] text-[#91A3BA] space-y-1">
                <div><span className="font-semibold text-[#EAF4FF]">Assumptions:</span> Steady, incompressible 1D laminar flow (Q = A·v).</div>
                <div><span className="font-semibold text-[#EAF4FF]">Limitations:</span> Friction head loss and variable cross-sectional drag neglected.</div>
              </div>
              <Link to="/physics/phys-9-fluids" className="text-xs text-[#9F94FF] hover:underline block">
                Inspect Mechanical Properties of Fluids Domain →
              </Link>
            </div>

            {/* Case 3: Building Thermal Efficiency */}
            <div className="dx-card p-6 space-y-4">
              <Badge tone="success">{SUSTAINABILITY_CASES[2].domain}</Badge>
              <h3 className="font-display text-lg font-bold text-[#EAF4FF]">
                {SUSTAINABILITY_CASES[2].title}
              </h3>
              <p className="text-xs text-[#91A3BA]">{SUSTAINABILITY_CASES[2].description}</p>
              <ScientificSlider
                label="Ambient-Indoor ΔT"
                value={deltaT}
                min={2}
                max={25}
                step={1}
                unit="K"
                onChange={setDeltaT}
              />
              <MetricTile
                label="Heat Gain (U=1.8 W/m²K, A=25 m²)"
                value={coolingLoadW.toFixed(0)}
                unit="W"
                accent="ice"
              />
              <div className="rounded-xl bg-[#080D18]/80 p-3 text-[11px] text-[#91A3BA] space-y-1">
                <div><span className="font-semibold text-[#EAF4FF]">Assumptions:</span> Steady-state conduction Q/t = U·A·ΔT across insulated facade.</div>
                <div><span className="font-semibold text-[#EAF4FF]">Limitations:</span> Dynamic solar irradiance and ventilation infiltration omitted.</div>
              </div>
              <Link to="/physics/phys-10-thermal" className="text-xs text-[#00D9FF] hover:underline block">
                Inspect Thermal Physics Domain →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
