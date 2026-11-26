import React, { useMemo, useState } from 'react';
import { PlotlyChart } from '@/components/ui/PlotlyChart';
import { AssumptionsBar, MetricTile, ScientificSlider } from '@/components/ui/Primitives';
import {
  computeElasticity,
  computeFluidDynamics,
  computeKineticTheory,
  computeThermalProperties,
  computeThermodynamicProcess,
  simulateSHM,
  simulateWaveSuperposition,
} from '@/engines/physicsEngine';

/* 8. MECHANICAL PROPERTIES OF SOLIDS */
export const SolidsTool: React.FC = () => {
  const [forceN, setForceN] = useState(500);
  const [areaMm2, setAreaMm2] = useState(2);
  const [lengthM, setLengthM] = useState(2);
  const [youngsGPa, setYoungsGPa] = useState(200); // Steel default

  const res = useMemo(
    () => computeElasticity(forceN, areaMm2, lengthM, youngsGPa),
    [forceN, areaMm2, lengthM, youngsGPa]
  );

  const strains = [0, 0.0005, 0.001, 0.0015, 0.002];
  const stressesMPa = strains.map((e) => (e * youngsGPa * 1e9) / 1e6);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <ScientificSlider label="Tensile Force F" value={forceN} min={50} max={5000} step={50} unit="N" onChange={setForceN} />
        <ScientificSlider label="Area A" value={areaMm2} min={0.5} max={20} step={0.5} unit="mm²" onChange={setAreaMm2} />
        <ScientificSlider label="Length L" value={lengthM} min={0.5} max={10} step={0.5} unit="m" onChange={setLengthM} />
        <ScientificSlider label="Young's Modulus Y" value={youngsGPa} min={10} max={400} step={10} unit="GPa" onChange={setYoungsGPa} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricTile label="Stress σ" value={res.stressMPa.toFixed(2)} unit="MPa" />
        <MetricTile label="Strain ε" value={res.strain.toExponential(2)} accent="violet" />
        <MetricTile label="Elongation ΔL" value={res.deltaLMm.toFixed(3)} unit="mm" accent="ice" />
        <MetricTile label="Energy Density" value={res.energyDensity.toFixed(1)} unit="J/m³" />
      </div>
      <PlotlyChart
        height={220}
        data={[{ x: strains, y: stressesMPa, type: 'scatter', mode: 'lines+markers', line: { color: '#00D9FF', width: 2.5 }, name: "Hooke's Linear Region" }]}
        layout={{ xaxis: { title: { text: 'Strain ε' } }, yaxis: { title: { text: 'Stress σ (MPa)' } } }}
      />
      <AssumptionsBar assumptions={["Linear elastic Hooke's Law regime below proportional limit."]} />
    </div>
  );
};

/* 9. MECHANICAL PROPERTIES OF FLUIDS */
export const FluidsTool: React.FC = () => {
  const [density, setDensity] = useState(1000);
  const [depth, setDepth] = useState(5);
  const [a1, setA1] = useState(20);
  const [v1, setV1] = useState(2);
  const [a2, setA2] = useState(10);
  const [p1, setP1] = useState(150);

  const res = useMemo(
    () => computeFluidDynamics(density, depth, a1, v1, a2, p1),
    [density, depth, a1, v1, a2, p1]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScientificSlider label="Fluid Density ρ" value={density} min={500} max={13600} step={50} unit="kg/m³" onChange={setDensity} />
        <ScientificSlider label="Depth h" value={depth} min={0} max={50} step={1} unit="m" onChange={setDepth} />
        <ScientificSlider label="Inlet Speed v₁" value={v1} min={0.5} max={10} step={0.5} unit="m/s" onChange={setV1} />
        <ScientificSlider label="Inlet Area A₁" value={a1} min={5} max={50} step={1} unit="cm²" onChange={setA1} />
        <ScientificSlider label="Outlet Area A₂" value={a2} min={2} max={50} step={1} unit="cm²" onChange={setA2} />
        <ScientificSlider label="Inlet Pressure P₁" value={p1} min={100} max={400} step={5} unit="kPa" onChange={setP1} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricTile label="Hydrostatic P(h)" value={res.hydrostaticKPa.toFixed(2)} unit="kPa" />
        <MetricTile label="Exit Speed v₂" value={res.v2.toFixed(2)} unit="m/s" accent="violet" />
        <MetricTile label="Exit Pressure P₂" value={res.p2KPa.toFixed(2)} unit="kPa" accent="ice" />
        <MetricTile label="Flow Rate Q" value={res.volumeFlowRateLMin.toFixed(1)} unit="L/min" />
      </div>
      <AssumptionsBar assumptions={['Steady, incompressible, non-viscous, irrotational streamline flow (Bernoulli).']} />
    </div>
  );
};

/* 10. THERMAL PROPERTIES OF MATTER */
export const ThermalTool: React.FC = () => {
  const [mass, setMass] = useState(2);
  const [c, setC] = useState(4186);
  const [dT, setDT] = useState(25);
  const [len, setLen] = useState(5);
  const [alphaE6, setAlphaE6] = useState(12); // steel 12e-6 /K

  const res = useMemo(
    () => computeThermalProperties(mass, c, dT, len, alphaE6 * 1e-6),
    [mass, c, dT, len, alphaE6]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScientificSlider label="Mass m" value={mass} min={0.5} max={20} step={0.5} unit="kg" onChange={setMass} />
        <ScientificSlider label="Specific Heat c" value={c} min={100} max={4200} step={50} unit="J/kg·K" onChange={setC} />
        <ScientificSlider label="Temperature Rise ΔT" value={dT} min={1} max={150} step={1} unit="K" onChange={setDT} />
        <ScientificSlider label="Initial Length L₀" value={len} min={1} max={30} step={0.5} unit="m" onChange={setLen} />
        <ScientificSlider label="Expansion Coeff α (×10⁻⁶)" value={alphaE6} min={5} max={30} step={1} unit="K⁻¹" onChange={setAlphaE6} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <MetricTile label="Heat Absorbed Q" value={(res.heatQ / 1000).toFixed(2)} unit="kJ" />
        <MetricTile label="Linear Expansion ΔL" value={res.deltaLMm.toFixed(3)} unit="mm" accent="violet" />
      </div>
      <AssumptionsBar assumptions={['No phase transition within ΔT range', 'Constant specific heat & α.']} />
    </div>
  );
};

/* 11. THERMODYNAMICS */
export const ThermodynamicsTool: React.FC = () => {
  const [proc, setProc] = useState<'isothermal' | 'adiabatic' | 'isobaric' | 'isochoric'>('isothermal');
  const [nMoles, setNMoles] = useState(1);
  const [tempK, setTempK] = useState(300);
  const [v1, setV1] = useState(10);
  const [v2, setV2] = useState(25);

  const thermo = useMemo(
    () => computeThermodynamicProcess(proc, nMoles, tempK, v1, v2),
    [proc, nMoles, tempK, v1, v2]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['isothermal', 'adiabatic', 'isobaric', 'isochoric'] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setProc(p)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize ${
              proc === p ? 'bg-[#00D9FF] text-[#080D18]' : 'bg-[#080D18] text-[#91A3BA]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <ScientificSlider label="Moles n" value={nMoles} min={0.5} max={5} step={0.5} unit="mol" onChange={setNMoles} />
        <ScientificSlider label="Initial Temp T₁" value={tempK} min={200} max={900} step={10} unit="K" onChange={setTempK} />
        <ScientificSlider label="Initial Volume V₁" value={v1} min={2} max={30} step={1} unit="L" onChange={setV1} />
        <ScientificSlider label="Final Volume V₂" value={v2} min={2} max={50} step={1} unit="L" onChange={setV2} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MetricTile label="Work Done W" value={thermo.workDone.toFixed(1)} unit="J" />
        <MetricTile label="Internal Energy ΔU" value={thermo.deltaU.toFixed(1)} unit="J" accent="violet" />
        <MetricTile label="Heat Transfer Q" value={thermo.heatQ.toFixed(1)} unit="J" accent="ice" />
      </div>
      <PlotlyChart
        height={250}
        data={[{ x: thermo.vsLiters, y: thermo.psKPa, type: 'scatter', mode: 'lines', line: { color: '#7565FF', width: 3 }, name: 'PV Curve' }]}
        layout={{ xaxis: { title: { text: 'Volume V (L)' } }, yaxis: { title: { text: 'Pressure P (kPa)' } } }}
      />
      <AssumptionsBar assumptions={['Diatomic ideal gas (γ = 1.4)', 'Quasi-static reversible transformation.']} />
    </div>
  );
};

/* 12. KINETIC THEORY */
export const KineticTool: React.FC = () => {
  const [tempK, setTempK] = useState(300);
  const [molarMass, setMolarMass] = useState(28); // N2

  const kt = useMemo(() => computeKineticTheory(tempK, molarMass), [tempK, molarMass]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ScientificSlider label="Absolute Temp T" value={tempK} min={50} max={2000} step={10} unit="K" onChange={setTempK} />
        <ScientificSlider label="Molar Mass M" value={molarMass} min={2} max={64} step={1} unit="g/mol" onChange={setMolarMass} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <MetricTile label="v_mp (Most Probable)" value={kt.vMp.toFixed(1)} unit="m/s" />
        <MetricTile label="v_avg (Mean Speed)" value={kt.vAvg.toFixed(1)} unit="m/s" accent="violet" />
        <MetricTile label="v_rms (Root Mean Sq)" value={kt.vRms.toFixed(1)} unit="m/s" accent="cyan" />
        <MetricTile label="Avg Transl. KE" value={kt.avgTranslationalKE.toExponential(2)} unit="J" accent="ice" />
      </div>
      <PlotlyChart
        height={220}
        data={[
          {
            x: ['v_mp', 'v_avg', 'v_rms'],
            y: [kt.vMp, kt.vAvg, kt.vRms],
            type: 'bar',
            marker: { color: ['#91A3BA', '#7565FF', '#00D9FF'] },
          },
        ]}
        layout={{ yaxis: { title: { text: 'Speed (m/s)' } } }}
      />
      <AssumptionsBar assumptions={['Maxwell-Boltzmann ideal gas speed distribution; elastic point-particle collisions.']} />
    </div>
  );
};

/* 13. OSCILLATIONS */
export const OscillationsTool: React.FC = () => {
  const [amp, setAmp] = useState(1.2);
  const [mass, setMass] = useState(2);
  const [k, setK] = useState(25);
  const [damping, setDamping] = useState(0.2);

  const shm = useMemo(() => simulateSHM(amp, mass, k, damping), [amp, mass, k, damping]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <ScientificSlider label="Amplitude A" value={amp} min={0.2} max={3} step={0.1} unit="m" onChange={setAmp} />
        <ScientificSlider label="Mass m" value={mass} min={0.5} max={10} step={0.5} unit="kg" onChange={setMass} />
        <ScientificSlider label="Spring Constant k" value={k} min={5} max={100} step={1} unit="N/m" onChange={setK} />
        <ScientificSlider label="Damping b" value={damping} min={0} max={2.5} step={0.05} unit="kg/s" onChange={setDamping} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MetricTile label="Angular Freq ω₀" value={shm.omega0.toFixed(2)} unit="rad/s" />
        <MetricTile label="Period T" value={shm.period.toFixed(3)} unit="s" accent="violet" />
        <MetricTile label="Frequency f" value={shm.frequency.toFixed(3)} unit="Hz" accent="ice" />
      </div>
      <PlotlyChart
        height={260}
        data={[
          { x: shm.ts, y: shm.xs, type: 'scatter', mode: 'lines', line: { color: '#00D9FF', width: 2.5 }, name: 'Displacement x(t)' },
          { x: shm.ts, y: shm.ke, type: 'scatter', mode: 'lines', line: { color: '#7565FF', width: 2 }, name: 'Kinetic Energy [J]' },
          { x: shm.ts, y: shm.pe, type: 'scatter', mode: 'lines', line: { color: '#34D399', width: 2 }, name: 'Potential Energy [J]' },
        ]}
        layout={{ xaxis: { title: { text: 'Time t (s)' } } }}
      />
      <AssumptionsBar assumptions={['Ideal Hookean spring F = -kx', 'Linear viscous damping F_d = -bv.']} />
    </div>
  );
};

/* 14. WAVES */
export const WavesTool: React.FC = () => {
  const [amp1, setAmp1] = useState(1.0);
  const [freq1, setFreq1] = useState(2.0);
  const [amp2, setAmp2] = useState(1.0);
  const [freq2, setFreq2] = useState(2.3);
  const [phase, setPhase] = useState(0);
  const [time, setTime] = useState(0);

  const wave = useMemo(
    () => simulateWaveSuperposition(amp1, freq1, amp2, freq2, 12, phase, time),
    [amp1, freq1, amp2, freq2, phase, time]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScientificSlider label="Wave 1 Freq f₁" value={freq1} min={0.5} max={6} step={0.1} unit="Hz" onChange={setFreq1} />
        <ScientificSlider label="Wave 2 Freq f₂" value={freq2} min={0.5} max={6} step={0.1} unit="Hz" onChange={setFreq2} />
        <ScientificSlider label="Phase Diff φ" value={phase} min={0} max={6.28} step={0.1} unit="rad" onChange={setPhase} />
        <ScientificSlider label="Wave 1 Amp A₁" value={amp1} min={0.2} max={2} step={0.1} unit="m" onChange={setAmp1} />
        <ScientificSlider label="Wave 2 Amp A₂" value={amp2} min={0.2} max={2} step={0.1} unit="m" onChange={setAmp2} />
        <ScientificSlider label="Snapshot Time t" value={time} min={0} max={2} step={0.05} unit="s" onChange={setTime} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <MetricTile label="Wavelength λ₁" value={wave.wavelength1.toFixed(2)} unit="m" />
        <MetricTile label="Wavelength λ₂" value={wave.wavelength2.toFixed(2)} unit="m" accent="violet" />
        <MetricTile label="Beat Freq |f₁-f₂|" value={wave.beatFrequency.toFixed(2)} unit="Hz" accent="ice" />
      </div>
      <PlotlyChart
        height={260}
        data={[
          { x: wave.xs, y: wave.y1, type: 'scatter', mode: 'lines', line: { color: '#91A3BA', dash: 'dot' }, name: 'y₁(x,t)' },
          { x: wave.xs, y: wave.y2, type: 'scatter', mode: 'lines', line: { color: '#7565FF', dash: 'dot' }, name: 'y₂(x,t)' },
          { x: wave.xs, y: wave.ySum, type: 'scatter', mode: 'lines', line: { color: '#00D9FF', width: 3 }, name: 'Superposition y₁+y₂' },
        ]}
        layout={{ xaxis: { title: { text: 'Position x (m)' } }, yaxis: { title: { text: 'Displacement (m)' } } }}
      />
      <AssumptionsBar assumptions={['Linear non-dispersive medium with wave speed v = 12 m/s.']} />
    </div>
  );
};
