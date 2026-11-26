import React, { useMemo, useState } from 'react';
import { PlotlyChart } from '@/components/ui/PlotlyChart';
import { AssumptionsBar, Button, MetricTile, ScientificSlider } from '@/components/ui/Primitives';
import {
  analyzeInclinedPlane,
  computeOrbitalMechanics,
  computeRotationalDynamics,
  computeWorkEnergyPower,
  countSignificantFigures,
  PHYSICS_CONSTANTS,
  propagateUncertainty,
  simulateKinematics1D,
  simulateProjectile,
  type RigidBodyShape,
} from '@/engines/physicsEngine';
import { useWorkspace } from '@/store/workspaceStore';

/* 1. UNITS AND MEASUREMENTS */
export const UnitsTool: React.FC = () => {
  const [sigInput, setSigInput] = useState('0.00450');
  const [valA, setValA] = useState(10);
  const [errA, setErrA] = useState(0.2);
  const [powA, setPowA] = useState(2);
  const [valB, setValB] = useState(5);
  const [errB, setErrB] = useState(0.1);
  const [powB, setPowB] = useState(1);

  const sigFigs = useMemo(() => countSignificantFigures(sigInput), [sigInput]);
  const prop = useMemo(
    () => propagateUncertainty(valA, errA, valB, errB, powA, powB),
    [valA, errA, powA, valB, errB, powB]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-[#080D18]/80 p-4 space-y-2">
          <label className="block text-xs text-[#91A3BA]">
            Significant Figures Analyzer
            <input
              value={sigInput}
              onChange={(e) => setSigInput(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#91A3BA]/25 bg-[#101B2D] px-3 py-2 font-mono text-sm text-[#EAF4FF]"
            />
          </label>
          <MetricTile label="Significant Figures" value={String(sigFigs)} accent="cyan" />
        </div>
        <div className="rounded-xl bg-[#080D18]/80 p-4 space-y-2">
          <div className="text-xs font-bold text-[#9F94FF]">
            Power-Law Propagation: Z = A^p · B^q
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ScientificSlider label="A" value={valA} min={1} max={50} step={0.5} onChange={setValA} />
            <ScientificSlider label="ΔA" value={errA} min={0.05} max={2} step={0.05} onChange={setErrA} />
            <ScientificSlider label="Power p" value={powA} min={-3} max={3} step={1} onChange={setPowA} />
            <ScientificSlider label="Power q" value={powB} min={-3} max={3} step={1} onChange={setPowB} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MetricTile label="Computed Z" value={prop.z.toFixed(3)} />
        <MetricTile label="Absolute ΔZ" value={`±${prop.dz.toFixed(3)}`} accent="violet" />
        <MetricTile label="Relative Uncertainty" value={prop.relativeErrorPct.toFixed(2)} unit="%" accent="ice" />
      </div>
      <AssumptionsBar assumptions={['Independent first-order fractional uncertainties; random measurement errors bounded linearly.']} />
    </div>
  );
};

/* 2. MOTION IN A STRAIGHT LINE */
export const Kinematics1DTool: React.FC = () => {
  const { saveExperiment } = useWorkspace();
  const [u, setU] = useState(12);
  const [a, setA] = useState(-2);
  const [tMax, setTMax] = useState(10);

  const sim = useMemo(() => simulateKinematics1D(u, a, tMax), [u, a, tMax]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScientificSlider label="Initial Velocity u" value={u} min={-30} max={30} step={1} unit="m/s" onChange={setU} />
        <ScientificSlider label="Acceleration a" value={a} min={-10} max={10} step={0.5} unit="m/s²" onChange={setA} />
        <ScientificSlider label="Duration T" value={tMax} min={2} max={20} step={1} unit="s" onChange={setTMax} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <MetricTile label="Final Velocity v(T)" value={sim.finalVelocity.toFixed(2)} unit="m/s" />
        <MetricTile label="Displacement s(T)" value={sim.displacement.toFixed(2)} unit="m" accent="violet" />
        <div className="flex items-center">
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              saveExperiment({
                title: `1D Kinematics (u=${u}, a=${a})`,
                module: 'Physics Ch 2',
                parameters: { u, a, tMax },
                outputs: { vFinal: `${sim.finalVelocity.toFixed(2)} m/s`, s: `${sim.displacement.toFixed(2)} m` },
                assumptions: ['Constant acceleration', '1D rectilinear frame'],
              })
            }
          >
            Save Snapshot
          </Button>
        </div>
      </div>
      <PlotlyChart
        height={280}
        data={[
          { x: sim.t, y: sim.x, type: 'scatter', mode: 'lines', line: { color: '#00D9FF', width: 2.5 }, name: 'x(t) [m]' },
          { x: sim.t, y: sim.v, type: 'scatter', mode: 'lines', line: { color: '#7565FF', width: 2.5 }, name: 'v(t) [m/s]' },
          { x: sim.t, y: sim.acc, type: 'scatter', mode: 'lines', line: { color: '#EAF4FF', dash: 'dot' }, name: 'a(t) [m/s²]' },
        ]}
        layout={{ xaxis: { title: { text: 'Time t (s)' } } }}
      />
      <AssumptionsBar assumptions={['Uniform constant acceleration along straight line; no aerodynamic drag.']} />
    </div>
  );
};

/* 3. MOTION IN A PLANE */
export const ProjectileTool: React.FC = () => {
  const { saveExperiment } = useWorkspace();
  const [v0, setV0] = useState(30);
  const [angle, setAngle] = useState(45);
  const [h0, setH0] = useState(0);
  const [g, setG] = useState(PHYSICS_CONSTANTS.g);

  const sim = useMemo(() => simulateProjectile(v0, angle, g, h0), [v0, angle, g, h0]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <ScientificSlider label="Launch Speed v₀" value={v0} min={5} max={80} step={1} unit="m/s" onChange={setV0} />
        <ScientificSlider label="Angle θ" value={angle} min={5} max={85} step={1} unit="°" onChange={setAngle} />
        <ScientificSlider label="Initial Height h₀" value={h0} min={0} max={50} step={1} unit="m" onChange={setH0} />
        <ScientificSlider label="Gravity g" value={g} min={1.6} max={20} step={0.1} unit="m/s²" onChange={setG} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricTile label="Range R" value={sim.range.toFixed(2)} unit="m" />
        <MetricTile label="Max Height H" value={sim.maxHeight.toFixed(2)} unit="m" accent="violet" />
        <MetricTile label="Time of Flight T" value={sim.timeOfFlight.toFixed(2)} unit="s" accent="ice" />
        <div className="flex items-center">
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              saveExperiment({
                title: `Projectile (${v0} m/s @ ${angle}°)`,
                module: 'Physics Ch 3',
                parameters: { v0, angle, h0, g },
                outputs: { range: `${sim.range.toFixed(2)} m`, maxH: `${sim.maxHeight.toFixed(2)} m` },
                assumptions: ['Flat ground', 'Zero air resistance', 'Constant g'],
              })
            }
          >
            Save Snapshot
          </Button>
        </div>
      </div>
      <PlotlyChart
        height={280}
        data={[
          {
            x: sim.xs,
            y: sim.ys,
            type: 'scatter',
            mode: 'lines',
            line: { color: '#00D9FF', width: 3 },
            fill: 'tozeroy',
            fillcolor: 'rgba(0, 217, 255, 0.12)',
            name: 'Trajectory y(x)',
          },
        ]}
        layout={{ xaxis: { title: { text: 'Horizontal Distance x (m)' } }, yaxis: { title: { text: 'Altitude y (m)' } } }}
      />
      <AssumptionsBar assumptions={['Point mass projectile', 'Uniform vertical gravity', 'Air resistance neglected.']} />
    </div>
  );
};

/* 4. LAWS OF MOTION */
export const LawsMotionTool: React.FC = () => {
  const [mass, setMass] = useState(10);
  const [angle, setAngle] = useState(30);
  const [muS, setMuS] = useState(0.4);
  const [muK, setMuK] = useState(0.25);

  const fbd = useMemo(() => analyzeInclinedPlane(mass, angle, muS, muK), [mass, angle, muS, muK]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <ScientificSlider label="Block Mass m" value={mass} min={1} max={50} step={1} unit="kg" onChange={setMass} />
        <ScientificSlider label="Incline Angle θ" value={angle} min={0} max={75} step={1} unit="°" onChange={setAngle} />
        <ScientificSlider label="Static μ_s" value={muS} min={0} max={1.2} step={0.05} onChange={setMuS} />
        <ScientificSlider label="Kinetic μ_k" value={muK} min={0} max={1.0} step={0.05} onChange={setMuK} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricTile label="Normal N" value={fbd.normal.toFixed(2)} unit="N" />
        <MetricTile label="mg sin θ" value={fbd.gravityParallel.toFixed(2)} unit="N" accent="violet" />
        <MetricTile label="State" value={fbd.slips ? 'SLIDING' : 'STATIC HOLD'} accent="ice" />
        <MetricTile label="Acceleration a" value={fbd.acceleration.toFixed(3)} unit="m/s²" />
      </div>
      <AssumptionsBar assumptions={['Rigid block on flat incline', 'Coulomb dry friction model (μ_k ≤ μ_s).']} />
    </div>
  );
};

/* 5. WORK, ENERGY & POWER */
export const WorkEnergyTool: React.FC = () => {
  const [mass, setMass] = useState(4);
  const [force, setForce] = useState(25);
  const [dist, setDist] = useState(10);
  const [angle, setAngle] = useState(30);
  const [time, setTime] = useState(4);
  const [vi, setVi] = useState(2);

  const res = useMemo(
    () => computeWorkEnergyPower(mass, force, dist, angle, time, vi),
    [mass, force, dist, angle, time, vi]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScientificSlider label="Mass m" value={mass} min={1} max={50} step={1} unit="kg" onChange={setMass} />
        <ScientificSlider label="Applied Force F" value={force} min={0} max={100} step={1} unit="N" onChange={setForce} />
        <ScientificSlider label="Displacement d" value={dist} min={0} max={50} step={1} unit="m" onChange={setDist} />
        <ScientificSlider label="Force Angle θ" value={angle} min={0} max={180} step={5} unit="°" onChange={setAngle} />
        <ScientificSlider label="Duration t" value={time} min={0.5} max={20} step={0.5} unit="s" onChange={setTime} />
        <ScientificSlider label="Initial Speed vᵢ" value={vi} min={0} max={20} step={0.5} unit="m/s" onChange={setVi} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricTile label="Work Done W" value={res.work.toFixed(2)} unit="J" />
        <MetricTile label="Final KE" value={res.keFinal.toFixed(2)} unit="J" accent="violet" />
        <MetricTile label="Final Speed v_f" value={res.vFinal.toFixed(2)} unit="m/s" accent="ice" />
        <MetricTile label="Avg Power P" value={res.avgPower.toFixed(2)} unit="W" />
      </div>
      <AssumptionsBar assumptions={['Constant force along straight displacement', 'No dissipative drag losses.']} />
    </div>
  );
};

/* 6. ROTATIONAL MOTION */
export const RotationalTool: React.FC = () => {
  const [shape, setShape] = useState<RigidBodyShape>('solid-sphere');
  const [mass, setMass] = useState(5);
  const [radius, setRadius] = useState(0.5);
  const [force, setForce] = useState(20);
  const [omega, setOmega] = useState(6);

  const rot = useMemo(
    () => computeRotationalDynamics(shape, mass, radius, force, radius, omega),
    [shape, mass, radius, force, omega]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ['solid-sphere', 'Solid Sphere (2/5 MR²)'],
            ['hollow-sphere', 'Hollow Sphere (2/3 MR²)'],
            ['solid-cylinder', 'Solid Disc/Cylinder (1/2 MR²)'],
            ['thin-ring', 'Thin Ring (MR²)'],
            ['rod-center', 'Rod Center (1/12 ML²)'],
          ] as Array<[RigidBodyShape, string]>
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setShape(id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
              shape === id ? 'bg-[#00D9FF] text-[#080D18] font-bold' : 'bg-[#080D18] text-[#91A3BA]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <ScientificSlider label="Mass M" value={mass} min={1} max={30} step={0.5} unit="kg" onChange={setMass} />
        <ScientificSlider label="Radius / Length R" value={radius} min={0.1} max={3} step={0.05} unit="m" onChange={setRadius} />
        <ScientificSlider label="Tangential Force" value={force} min={0} max={100} step={1} unit="N" onChange={setForce} />
        <ScientificSlider label="Angular Speed ω" value={omega} min={0} max={30} step={0.5} unit="rad/s" onChange={setOmega} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricTile label="Moment of Inertia I" value={rot.inertia.toFixed(3)} unit="kg·m²" />
        <MetricTile label="Torque τ" value={rot.torque.toFixed(2)} unit="N·m" accent="violet" />
        <MetricTile label="Angular Accel α" value={rot.alpha.toFixed(2)} unit="rad/s²" accent="ice" />
        <MetricTile label="Rotational KE" value={rot.rotationalKE.toFixed(2)} unit="J" />
      </div>
      <AssumptionsBar assumptions={['Uniform mass distribution', 'Fixed principal symmetry axis.']} />
    </div>
  );
};

/* 7. GRAVITATION */
export const GravitationTool: React.FC = () => {
  const [altitudeKm, setAltitudeKm] = useState(400);
  const orb = useMemo(() => computeOrbitalMechanics(altitudeKm), [altitudeKm]);

  const altProfile = useMemo(() => {
    const alts: number[] = [];
    const gs: number[] = [];
    for (let h = 0; h <= 20000; h += 500) {
      alts.push(h);
      gs.push(computeOrbitalMechanics(h).gLocal);
    }
    return { alts, gs };
  }, []);

  return (
    <div className="space-y-4">
      <ScientificSlider
        label="Orbital Altitude above Earth Surface h"
        value={altitudeKm}
        min={0}
        max={36000}
        step={100}
        unit="km"
        onChange={setAltitudeKm}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricTile label="Local g(h)" value={orb.gLocal.toFixed(3)} unit="m/s²" />
        <MetricTile label="Orbital Speed v₀" value={(orb.orbitalVelocity / 1000).toFixed(2)} unit="km/s" accent="violet" />
        <MetricTile label="Escape Speed vₑ" value={(orb.escapeVelocity / 1000).toFixed(2)} unit="km/s" accent="ice" />
        <MetricTile label="Orbital Period T" value={orb.timePeriodMin.toFixed(1)} unit="min" />
      </div>
      <PlotlyChart
        height={240}
        data={[
          {
            x: altProfile.alts,
            y: altProfile.gs,
            type: 'scatter',
            mode: 'lines',
            line: { color: '#00D9FF', width: 2.5 },
            name: 'g(h) [m/s²]',
          },
        ]}
        layout={{ xaxis: { title: { text: 'Altitude h (km)' } }, yaxis: { title: { text: 'g (m/s²)' } } }}
      />
      <AssumptionsBar assumptions={['Spherical symmetric Earth (M = 5.972×10²⁴ kg, R = 6371 km)', 'Two-body circular orbit.']} />
    </div>
  );
};
