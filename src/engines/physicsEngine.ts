import { clampNumber } from './mathEngine';

export const PHYSICS_CONSTANTS = {
  g: 9.80665, // m/s^2
  G: 6.6743e-11, // N m^2 / kg^2
  R: 8.314462618, // J / (mol K)
  kB: 1.380649e-23, // J / K
  NA: 6.02214076e23, // mol^-1
  c: 299792458, // m / s
  sigma: 5.670374419e-8, // W / (m^2 K^4)
  earthMass: 5.972e24, // kg
  earthRadius: 6.371e6, // m
};

/* Ch 1: Units & Measurements */
export function countSignificantFigures(raw: string): number {
  const s = raw.trim().toLowerCase().split('e')[0].replace(/^[+-]/, '');
  if (!s || Number.isNaN(Number(s))) return 0;
  if (s.includes('.')) {
    const stripped = s.replace('.', '').replace(/^0+/, '');
    return stripped.length;
  }
  const stripped = s.replace(/^0+/, '').replace(/0+$/, '');
  return stripped.length;
}

export function propagateUncertainty(
  a: number,
  da: number,
  b: number,
  db: number,
  powerA: number,
  powerB: number
) {
  const safeA = Math.abs(a) < 1e-12 ? 1e-12 : Math.abs(a);
  const safeB = Math.abs(b) < 1e-12 ? 1e-12 : Math.abs(b);
  const relA = Math.abs(da) / safeA;
  const relB = Math.abs(db) / safeB;
  const totalRel = Math.abs(powerA) * relA + Math.abs(powerB) * relB;
  const z = Math.pow(a, powerA) * Math.pow(b, powerB);
  const dz = Math.abs(z) * totalRel;
  return { z, dz, relativeErrorPct: totalRel * 100 };
}

/* Ch 2: Motion in a Straight Line */
export function simulateKinematics1D(u: number, a: number, tMax: number) {
  const T = clampNumber(tMax, 0.5, 60);
  const steps = 120;
  const t: number[] = [];
  const x: number[] = [];
  const v: number[] = [];
  const acc: number[] = [];

  for (let i = 0; i <= steps; i++) {
    const ti = (i / steps) * T;
    t.push(ti);
    x.push(u * ti + 0.5 * a * ti * ti);
    v.push(u + a * ti);
    acc.push(a);
  }

  return {
    t,
    x,
    v,
    acc,
    finalVelocity: u + a * T,
    displacement: u * T + 0.5 * a * T * T,
  };
}

/* Ch 3: Motion in a Plane — Projectile */
export function simulateProjectile(v0: number, angleDeg: number, g = PHYSICS_CONSTANTS.g, h0 = 0) {
  const speed = clampNumber(v0, 0.1, 300);
  const theta = (clampNumber(angleDeg, 1, 89) * Math.PI) / 180;
  const vx = speed * Math.cos(theta);
  const vy = speed * Math.sin(theta);
  const gravity = clampNumber(g, 0.5, 50);
  const initialH = clampNumber(h0, 0, 200);

  const timeOfFlight = (vy + Math.sqrt(vy * vy + 2 * gravity * initialH)) / gravity;
  const maxHeight = initialH + (vy * vy) / (2 * gravity);
  const range = vx * timeOfFlight;

  const steps = 120;
  const xs: number[] = [];
  const ys: number[] = [];
  const ts: number[] = [];

  for (let i = 0; i <= steps; i++) {
    const ti = (i / steps) * timeOfFlight;
    ts.push(ti);
    xs.push(vx * ti);
    ys.push(Math.max(0, initialH + vy * ti - 0.5 * gravity * ti * ti));
  }

  return { xs, ys, ts, vx, vy, timeOfFlight, maxHeight, range };
}

/* Ch 4: Laws of Motion — Inclined Plane with Friction */
export function analyzeInclinedPlane(
  massKg: number,
  angleDeg: number,
  muS: number,
  muK: number,
  g = PHYSICS_CONSTANTS.g
) {
  const m = clampNumber(massKg, 0.1, 1000);
  const theta = (clampNumber(angleDeg, 0, 89) * Math.PI) / 180;
  const normal = m * g * Math.cos(theta);
  const gravityParallel = m * g * Math.sin(theta);
  const maxStaticFriction = clampNumber(muS, 0, 2) * normal;
  const kineticFriction = clampNumber(muK, 0, 2) * normal;
  const slips = gravityParallel > maxStaticFriction;
  const netForce = slips ? Math.max(0, gravityParallel - kineticFriction) : 0;
  const acceleration = netForce / m;

  return {
    normal,
    gravityParallel,
    maxStaticFriction,
    kineticFriction,
    slips,
    netForce,
    acceleration,
  };
}

/* Ch 5: Work, Energy, Power */
export function computeWorkEnergyPower(
  massKg: number,
  forceN: number,
  displacementM: number,
  angleDeg: number,
  timeS: number,
  vInitial: number
) {
  const m = clampNumber(massKg, 0.1, 10000);
  const theta = (angleDeg * Math.PI) / 180;
  const work = forceN * displacementM * Math.cos(theta);
  const keInitial = 0.5 * m * vInitial * vInitial;
  const keFinal = Math.max(0, keInitial + work);
  const vFinal = Math.sqrt((2 * keFinal) / m);
  const avgPower = timeS > 1e-6 ? work / timeS : 0;
  return { work, keInitial, keFinal, vFinal, avgPower };
}

/* Ch 6: Rotational Motion */
export type RigidBodyShape = 'solid-sphere' | 'hollow-sphere' | 'solid-cylinder' | 'thin-ring' | 'rod-center';

export function computeRotationalDynamics(
  shape: RigidBodyShape,
  massKg: number,
  radiusOrLengthM: number,
  forceN: number,
  leverArmM: number,
  omegaRadS: number
) {
  const m = clampNumber(massKg, 0.1, 1000);
  const r = clampNumber(radiusOrLengthM, 0.05, 50);
  const factorMap: Record<RigidBodyShape, number> = {
    'solid-sphere': 2 / 5,
    'hollow-sphere': 2 / 3,
    'solid-cylinder': 1 / 2,
    'thin-ring': 1,
    'rod-center': 1 / 12,
  };
  const inertia = factorMap[shape] * m * r * r;
  const torque = forceN * leverArmM;
  const alpha = inertia > 1e-9 ? torque / inertia : 0;
  const angularMomentum = inertia * omegaRadS;
  const rotationalKE = 0.5 * inertia * omegaRadS * omegaRadS;
  return { inertia, torque, alpha, angularMomentum, rotationalKE };
}

/* Ch 7: Gravitation */
export function computeOrbitalMechanics(altitudeKm: number, centralMassKg = PHYSICS_CONSTANTS.earthMass, radiusM = PHYSICS_CONSTANTS.earthRadius) {
  const h = clampNumber(altitudeKm, 0, 100000) * 1000;
  const r = radiusM + h;
  const gLocal = (PHYSICS_CONSTANTS.G * centralMassKg) / (r * r);
  const orbitalVelocity = Math.sqrt((PHYSICS_CONSTANTS.G * centralMassKg) / r);
  const escapeVelocity = Math.sqrt(2) * orbitalVelocity;
  const timePeriodSec = (2 * Math.PI * r) / orbitalVelocity;
  return {
    orbitalRadiusKm: r / 1000,
    gLocal,
    orbitalVelocity,
    escapeVelocity,
    timePeriodMin: timePeriodSec / 60,
  };
}

/* Ch 8: Mechanical Properties of Solids */
export function computeElasticity(forceN: number, areaMm2: number, lengthM: number, youngsGPa: number) {
  const areaM2 = clampNumber(areaMm2, 0.1, 100000) * 1e-6;
  const E = clampNumber(youngsGPa, 0.1, 1200) * 1e9;
  const stress = forceN / areaM2;
  const strain = stress / E;
  const deltaL = strain * lengthM;
  const energyDensity = 0.5 * stress * strain;
  return { stressMPa: stress / 1e6, strain, deltaLMm: deltaL * 1000, energyDensity };
}

/* Ch 9: Mechanical Properties of Fluids */
export function computeFluidDynamics(
  densityKgM3: number,
  depthM: number,
  area1Cm2: number,
  velocity1MS: number,
  area2Cm2: number,
  p1KPa: number
) {
  const rho = clampNumber(densityKgM3, 10, 20000);
  const pAtm = 101325;
  const hydrostaticPressure = pAtm + rho * PHYSICS_CONSTANTS.g * clampNumber(depthM, 0, 500);
  const v2 = (clampNumber(area1Cm2, 0.1, 5000) / clampNumber(area2Cm2, 0.1, 5000)) * velocity1MS;
  const p1 = p1KPa * 1000;
  const p2 = p1 + 0.5 * rho * (velocity1MS * velocity1MS - v2 * v2);
  return {
    hydrostaticKPa: hydrostaticPressure / 1000,
    v2,
    p2KPa: p2 / 1000,
    volumeFlowRateLMin: (area1Cm2 * 1e-4 * velocity1MS) * 60000,
  };
}

/* Ch 10: Thermal Properties */
export function computeThermalProperties(
  massKg: number,
  specificHeatJkgK: number,
  deltaTK: number,
  lengthM: number,
  alphaPerK: number
) {
  const heatQ = massKg * specificHeatJkgK * deltaTK;
  const deltaL = lengthM * alphaPerK * deltaTK;
  return { heatQ, deltaLMm: deltaL * 1000 };
}

/* Ch 11: Thermodynamics */
export function computeThermodynamicProcess(
  process: 'isothermal' | 'adiabatic' | 'isobaric' | 'isochoric',
  nMoles: number,
  tempK: number,
  v1L: number,
  v2L: number,
  gamma = 1.4
) {
  const n = clampNumber(nMoles, 0.1, 50);
  const T = clampNumber(tempK, 50, 3000);
  const V1 = clampNumber(v1L, 0.5, 100) * 1e-3;
  const V2 = clampNumber(v2L, 0.5, 100) * 1e-3;
  const P1 = (n * PHYSICS_CONSTANTS.R * T) / V1;

  const vs: number[] = [];
  const ps: number[] = [];
  const steps = 60;

  let workDone = 0;
  let deltaU = 0;
  let heatQ = 0;

  for (let i = 0; i <= steps; i++) {
    const frac = i / steps;
    const V = V1 + frac * (V2 - V1);
    let P = P1;
    if (process === 'isothermal') P = (P1 * V1) / V;
    else if (process === 'adiabatic') P = P1 * Math.pow(V1 / V, gamma);
    else if (process === 'isobaric') P = P1;
    else if (process === 'isochoric') {
      vs.push(V1 * 1000);
      ps.push((P1 * (1 + frac * (V2 / V1 - 1))) / 1000);
      continue;
    }
    vs.push(V * 1000);
    ps.push(P / 1000);
  }

  if (process === 'isothermal') {
    workDone = n * PHYSICS_CONSTANTS.R * T * Math.log(V2 / V1);
    deltaU = 0;
    heatQ = workDone;
  } else if (process === 'adiabatic') {
    const T2 = T * Math.pow(V1 / V2, gamma - 1);
    const P2 = P1 * Math.pow(V1 / V2, gamma);
    workDone = (P1 * V1 - P2 * V2) / (gamma - 1);
    deltaU = (n * PHYSICS_CONSTANTS.R * (T2 - T)) / (gamma - 1);
    heatQ = 0;
  } else if (process === 'isobaric') {
    workDone = P1 * (V2 - V1);
    const T2 = T * (V2 / V1);
    deltaU = (n * PHYSICS_CONSTANTS.R * (T2 - T)) / (gamma - 1);
    heatQ = deltaU + workDone;
  } else {
    workDone = 0;
    const T2 = T * (V2 / V1);
    deltaU = (n * PHYSICS_CONSTANTS.R * (T2 - T)) / (gamma - 1);
    heatQ = deltaU;
  }

  return { vsLiters: vs, psKPa: ps, workDone, deltaU, heatQ };
}

/* Ch 12: Kinetic Theory */
export function computeKineticTheory(tempK: number, molarMassGPerMol: number) {
  const T = clampNumber(tempK, 10, 5000);
  const M = clampNumber(molarMassGPerMol, 1, 300) * 1e-3;
  const vRms = Math.sqrt((3 * PHYSICS_CONSTANTS.R * T) / M);
  const vAvg = Math.sqrt((8 * PHYSICS_CONSTANTS.R * T) / (Math.PI * M));
  const vMp = Math.sqrt((2 * PHYSICS_CONSTANTS.R * T) / M);
  const avgTranslationalKE = 1.5 * PHYSICS_CONSTANTS.kB * T;
  return { vRms, vAvg, vMp, avgTranslationalKE };
}

/* Ch 13: Oscillations */
export function simulateSHM(
  amplitudeM: number,
  massKg: number,
  kNPerM: number,
  dampingB = 0,
  durationS = 8
) {
  const A = clampNumber(amplitudeM, 0.05, 5);
  const m = clampNumber(massKg, 0.1, 50);
  const k = clampNumber(kNPerM, 0.5, 500);
  const omega0 = Math.sqrt(k / m);
  const gamma = clampNumber(dampingB, 0, 5) / (2 * m);
  const omega = Math.sqrt(Math.max(0.01, omega0 * omega0 - gamma * gamma));
  const period = (2 * Math.PI) / omega0;

  const ts: number[] = [];
  const xs: number[] = [];
  const vs: number[] = [];
  const ke: number[] = [];
  const pe: number[] = [];

  const steps = 200;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * durationS;
    const env = A * Math.exp(-gamma * t);
    const x = env * Math.cos(omega * t);
    const v = -env * (gamma * Math.cos(omega * t) + omega * Math.sin(omega * t));
    ts.push(t);
    xs.push(x);
    vs.push(v);
    ke.push(0.5 * m * v * v);
    pe.push(0.5 * k * x * x);
  }

  return { ts, xs, vs, ke, pe, omega0, period, frequency: 1 / period };
}

/* Ch 14: Waves */
export function simulateWaveSuperposition(
  amp1: number,
  freq1Hz: number,
  amp2: number,
  freq2Hz: number,
  waveSpeedMS: number,
  phaseDiffRad: number,
  timeS: number
) {
  const xs: number[] = [];
  const y1: number[] = [];
  const y2: number[] = [];
  const ySum: number[] = [];
  const v = clampNumber(waveSpeedMS, 1, 1000);
  const w1 = 2 * Math.PI * freq1Hz;
  const k1 = w1 / v;
  const w2 = 2 * Math.PI * freq2Hz;
  const k2 = w2 / v;

  const lengthM = 20;
  const steps = 220;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * lengthM;
    const val1 = amp1 * Math.sin(k1 * x - w1 * timeS);
    const val2 = amp2 * Math.sin(k2 * x - w2 * timeS + phaseDiffRad);
    xs.push(x);
    y1.push(val1);
    y2.push(val2);
    ySum.push(val1 + val2);
  }

  return {
    xs,
    y1,
    y2,
    ySum,
    wavelength1: v / Math.max(0.01, freq1Hz),
    wavelength2: v / Math.max(0.01, freq2Hz),
    beatFrequency: Math.abs(freq1Hz - freq2Hz),
  };
}

/* Collision Lab: 1D Elastic & Inelastic */
export function compute1DCollision(
  m1: number,
  u1: number,
  m2: number,
  u2: number,
  restitutionE: number
) {
  const M1 = clampNumber(m1, 0.1, 1000);
  const M2 = clampNumber(m2, 0.1, 1000);
  const e = clampNumber(restitutionE, 0, 1);

  const v1 = (M1 * u1 + M2 * u2 - M2 * e * (u1 - u2)) / (M1 + M2);
  const v2 = (M1 * u1 + M2 * u2 + M1 * e * (u1 - u2)) / (M1 + M2);

  const pBefore = M1 * u1 + M2 * u2;
  const pAfter = M1 * v1 + M2 * v2;
  const keBefore = 0.5 * M1 * u1 * u1 + 0.5 * M2 * u2 * u2;
  const keAfter = 0.5 * M1 * v1 * v1 + 0.5 * M2 * v2 * v2;

  return {
    v1,
    v2,
    pBefore,
    pAfter,
    keBefore,
    keAfter,
    keLoss: keBefore - keAfter,
    keLossPct: keBefore > 1e-9 ? ((keBefore - keAfter) / keBefore) * 100 : 0,
  };
}
