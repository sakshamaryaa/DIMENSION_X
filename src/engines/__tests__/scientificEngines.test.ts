import { describe, expect, it } from 'vitest';
import {
  analyze3DPoints,
  analyzeAngle,
  analyzeConic,
  analyzeLimitAndDerivative,
  computeCombinatorics,
  computeProbabilityMetrics,
  computeProgression,
  computeSetOperations,
  computeStatistics,
  generatePascalTriangle,
  sampleMathExpression,
  solveQuadratic,
} from '@/engines/mathEngine';
import {
  analyzeInclinedPlane,
  compute1DCollision,
  computeOrbitalMechanics,
  computeThermodynamicProcess,
  countSignificantFigures,
  simulateKinematics1D,
  simulateProjectile,
  simulateSHM,
} from '@/engines/physicsEngine';
import { MATH_CHAPTERS } from '@/data/mathChapters';
import { PHYSICS_CHAPTERS } from '@/data/physicsChapters';

describe('DIMENSION X Curriculum Completeness', () => {
  it('covers all 14 NCERT Class XI Mathematics chapters', () => {
    expect(MATH_CHAPTERS).toHaveLength(14);
  });

  it('covers all 14 NCERT Class XI Physics chapters', () => {
    expect(PHYSICS_CHAPTERS).toHaveLength(14);
  });
});

describe('Deterministic Mathematics Engine', () => {
  it('computes exact set union, intersection, and power set size', () => {
    const res = computeSetOperations(['1', '2', '3'], ['3', '4'], ['1', '2', '3', '4', '5']);
    expect(res.union).toEqual(['1', '2', '3', '4']);
    expect(res.intersection).toEqual(['3']);
    expect(res.powerSetSizeA).toBe(8);
  });

  it('evaluates unit circle trigonometry and Pythagorean identity', () => {
    const res = analyzeAngle(30);
    expect(res.sin).toBeCloseTo(0.5, 5);
    expect(res.cos).toBeCloseTo(Math.sqrt(3) / 2, 5);
    expect(res.pythagoreanSum).toBeCloseTo(1, 8);
  });

  it('solves complex conjugate quadratic roots', () => {
    const q = solveQuadratic(1, 2, 5);
    expect(q.type).toBe('complex-conjugate');
    expect(q.roots[0]).toEqual({ re: -1, im: 2 });
    expect(q.roots[1]).toEqual({ re: -1, im: -2 });
  });

  it('computes nPr, nCr, Pascal triangle, and AP/GP sums', () => {
    const c = computeCombinatorics(6, 3);
    expect(c.nPr).toBe('120');
    expect(c.nCr).toBe('20');
    expect(generatePascalTriangle(4)[3]).toEqual([1, 3, 3, 1]);
    const gp = computeProgression('GP', 8, 0.5, 5);
    expect(gp.infiniteSum).toBeCloseTo(16, 6);
  });

  it('computes ellipse eccentricity, 3D distance, derivatives, statistics, and probability', () => {
    const ellipse = analyzeConic('ellipse', 5, 3);
    expect(ellipse.eccentricity).toBeCloseTo(0.8, 5);
    expect(analyze3DPoints([0, 0, 0], [2, 3, 6]).distance).toBeCloseTo(7, 6);
    const lim = analyzeLimitAndDerivative('x^3', 2);
    expect(lim.numericalDerivative).toBeCloseTo(12, 3);
    const stats = computeStatistics([2, 4, 6, 8]);
    expect(stats.mean).toBe(5);
    expect(stats.variance).toBe(5);
    const prob = computeProbabilityMetrics(0.5, 0.4, 0.2);
    expect(prob.union).toBeCloseTo(0.7, 6);
    expect(prob.isIndependent).toBe(true);
  });

  it('rejects invalid expressions safely', () => {
    const bad = sampleMathExpression('sin(((', -2, 2);
    expect(bad.error).toBeDefined();
  });
});

describe('Deterministic Physics Engine', () => {
  it('counts significant figures accurately', () => {
    expect(countSignificantFigures('0.00450')).toBe(3);
    expect(countSignificantFigures('1200')).toBe(2);
  });

  it('simulates 1D kinematics and projectile range', () => {
    const k = simulateKinematics1D(0, 3, 4);
    expect(k.finalVelocity).toBeCloseTo(12, 6);
    expect(k.displacement).toBeCloseTo(24, 6);
    const p = simulateProjectile(20, 45, 9.8);
    expect(p.range).toBeCloseTo(400 / 9.8, 2);
  });

  it('computes incline static vs slip, orbital speeds, thermo, SHM, and collisions', () => {
    const fbd = analyzeInclinedPlane(10, 10, 0.8, 0.5);
    expect(fbd.slips).toBe(false);
    expect(fbd.acceleration).toBe(0);

    const orb = computeOrbitalMechanics(400);
    expect(orb.escapeVelocity / orb.orbitalVelocity).toBeCloseTo(Math.SQRT2, 6);

    const iso = computeThermodynamicProcess('isothermal', 1, 300, 10, 20);
    expect(iso.deltaU).toBe(0);
    expect(iso.workDone).toBeGreaterThan(0);

    const shm = simulateSHM(1, 1, 36);
    expect(shm.omega0).toBeCloseTo(6, 6);

    const col = compute1DCollision(4, 5, 4, 0, 1);
    expect(col.pBefore).toBeCloseTo(col.pAfter, 6);
    expect(col.keLoss).toBeCloseTo(0, 6);
  });
});
