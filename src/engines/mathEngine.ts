import { compile, derivative } from 'mathjs';

export interface ExpressionSampleResult {
  xs: number[];
  ys: number[];
  validPoints: number;
  error?: string;
}

export function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

/**
 * Deterministically evaluates a single-variable mathematical expression y = f(x) over [xMin, xMax].
 */
export function sampleMathExpression(
  expression: string,
  xMin: number,
  xMax: number,
  steps = 300,
  params: Record<string, number> = {}
): ExpressionSampleResult {
  const cleanExpr = expression.trim();
  if (!cleanExpr) {
    return { xs: [], ys: [], validPoints: 0, error: 'Expression cannot be empty.' };
  }
  if (xMin >= xMax) {
    return { xs: [], ys: [], validPoints: 0, error: 'Domain minimum must be less than maximum.' };
  }

  try {
    const compiled = compile(cleanExpr);
    const xs: number[] = [];
    const ys: number[] = [];
    const n = clampNumber(Math.floor(steps), 20, 1200);
    const dx = (xMax - xMin) / (n - 1);
    let validPoints = 0;

    for (let i = 0; i < n; i++) {
      const x = xMin + i * dx;
      xs.push(Number(x.toFixed(6)));
      try {
        const val = compiled.evaluate({ x, pi: Math.PI, e: Math.E, ...params });
        if (typeof val === 'number' && Number.isFinite(val) && Math.abs(val) < 1e7) {
          ys.push(val);
          validPoints++;
        } else {
          ys.push(Number.NaN);
        }
      } catch {
        ys.push(Number.NaN);
      }
    }

    return { xs, ys, validPoints };
  } catch (err) {
    return {
      xs: [],
      ys: [],
      validPoints: 0,
      error: err instanceof Error ? err.message : 'Invalid mathematical syntax.',
    };
  }
}

/**
 * Evaluates a 3D surface z = f(x, y) on a regular grid.
 */
export function sampleSurface3D(
  expression: string,
  minVal: number,
  maxVal: number,
  gridSize = 36,
  params: Record<string, number> = {}
): { x: number[]; y: number[]; z: number[][]; error?: string } {
  try {
    const compiled = compile(expression.trim());
    const n = clampNumber(Math.floor(gridSize), 10, 70);
    const step = (maxVal - minVal) / (n - 1);
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i < n; i++) {
      const v = Number((minVal + i * step).toFixed(4));
      x.push(v);
      y.push(v);
    }

    const z: number[][] = [];
    for (let j = 0; j < n; j++) {
      const row: number[] = [];
      for (let i = 0; i < n; i++) {
        try {
          const val = compiled.evaluate({ x: x[i], y: y[j], pi: Math.PI, e: Math.E, ...params });
          row.push(typeof val === 'number' && Number.isFinite(val) && Math.abs(val) < 1e5 ? val : Number.NaN);
        } catch {
          row.push(Number.NaN);
        }
      }
      z.push(row);
    }
    return { x, y, z };
  } catch (err) {
    return {
      x: [],
      y: [],
      z: [],
      error: err instanceof Error ? err.message : 'Invalid 3D surface expression.',
    };
  }
}

/**
 * Symbolic derivative using mathjs with numeric fallback.
 */
export function computeSymbolicDerivative(expression: string, variable = 'x'): string {
  try {
    return derivative(expression, variable).toString();
  } catch {
    return 'Symbolic derivative unavailable for this form (numerical tangent active).';
  }
}

/* Ch 1: Sets */
export function computeSetOperations(aInput: string[], bInput: string[], universeInput?: string[]) {
  const A = Array.from(new Set(aInput.map((s) => s.trim()).filter(Boolean)));
  const B = Array.from(new Set(bInput.map((s) => s.trim()).filter(Boolean)));
  const setA = new Set(A);
  const setB = new Set(B);
  const U = universeInput
    ? Array.from(new Set([...universeInput.map((s) => s.trim()).filter(Boolean), ...A, ...B]))
    : Array.from(new Set([...A, ...B]));

  const union = Array.from(new Set([...A, ...B]));
  const intersection = A.filter((x) => setB.has(x));
  const aMinusB = A.filter((x) => !setB.has(x));
  const bMinusA = B.filter((x) => !setA.has(x));
  const symmetricDiff = [...aMinusB, ...bMinusA];
  const aComplement = U.filter((x) => !setA.has(x));
  const bComplement = U.filter((x) => !setB.has(x));

  return {
    A,
    B,
    U,
    union,
    intersection,
    aMinusB,
    bMinusA,
    symmetricDiff,
    aComplement,
    bComplement,
    isASubsetOfB: A.every((x) => setB.has(x)),
    isBSubsetOfA: B.every((x) => setA.has(x)),
    powerSetSizeA: A.length <= 30 ? Math.pow(2, A.length) : Infinity,
    powerSetSizeB: B.length <= 30 ? Math.pow(2, B.length) : Infinity,
  };
}

/* Ch 3: Trigonometric Functions */
export function analyzeAngle(degrees: number) {
  const rad = (degrees * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const tan = Math.abs(cos) < 1e-10 ? Number.NaN : sin / cos;
  const normDeg = ((degrees % 360) + 360) % 360;
  const quadrant =
    normDeg === 0 || normDeg === 90 || normDeg === 180 || normDeg === 270
      ? 'Quadrantal Axis'
      : normDeg < 90
        ? 'Quadrant I (All +)'
        : normDeg < 180
          ? 'Quadrant II (sin, csc +)'
          : normDeg < 270
            ? 'Quadrant III (tan, cot +)'
            : 'Quadrant IV (cos, sec +)';
  return {
    degrees,
    radians: rad,
    sin,
    cos,
    tan,
    quadrant,
    pythagoreanSum: sin * sin + cos * cos,
  };
}

/* Ch 4: Complex Numbers & Quadratics */
export function analyzeComplexAndQuadratic(re1: number, im1: number, re2: number, im2: number) {
  const sum = { re: re1 + re2, im: im1 + im2 };
  const diff = { re: re1 - re2, im: im1 - im2 };
  const prod = { re: re1 * re2 - im1 * im2, im: re1 * im2 + im1 * re2 };
  const denom = re2 * re2 + im2 * im2;
  const quot =
    denom > 1e-12
      ? { re: (re1 * re2 + im1 * im2) / denom, im: (im1 * re2 - re1 * im2) / denom }
      : null;
  const mod1 = Math.hypot(re1, im1);
  const arg1Rad = Math.atan2(im1, re1);
  const arg1Deg = (arg1Rad * 180) / Math.PI;
  return { sum, diff, prod, quot, mod1, arg1Rad, arg1Deg };
}

export function solveQuadratic(a: number, b: number, c: number) {
  if (Math.abs(a) < 1e-12) {
    if (Math.abs(b) < 1e-12) return { type: 'degenerate', discriminant: 0, roots: [] };
    return {
      type: 'linear',
      discriminant: 0,
      roots: [{ re: -c / b, im: 0 }],
    };
  }
  const D = b * b - 4 * a * c;
  if (D >= 0) {
    const sqrtD = Math.sqrt(D);
    return {
      type: D === 0 ? 'equal-real' : 'distinct-real',
      discriminant: D,
      roots: [
        { re: (-b + sqrtD) / (2 * a), im: 0 },
        { re: (-b - sqrtD) / (2 * a), im: 0 },
      ],
    };
  }
  const sqrtNegD = Math.sqrt(-D);
  return {
    type: 'complex-conjugate',
    discriminant: D,
    roots: [
      { re: -b / (2 * a), im: sqrtNegD / (2 * a) },
      { re: -b / (2 * a), im: -sqrtNegD / (2 * a) },
    ],
  };
}

/* Ch 6: Permutations & Combinations */
export function factorialBigInt(n: number): bigint {
  if (n < 0 || !Number.isInteger(n)) throw new Error('n must be a non-negative integer');
  let res = 1n;
  for (let i = 2n; i <= BigInt(n); i++) res *= i;
  return res;
}

export function computeCombinatorics(n: number, r: number) {
  const ni = clampNumber(Math.floor(n), 0, 20);
  const ri = clampNumber(Math.floor(r), 0, ni);
  const nFact = factorialBigInt(ni);
  const rFact = factorialBigInt(ri);
  const nrFact = factorialBigInt(ni - ri);
  const nPr = nFact / nrFact;
  const nCr = nPr / rFact;
  return { n: ni, r: ri, nPr: nPr.toString(), nCr: nCr.toString(), nFact: nFact.toString() };
}

/* Ch 7: Binomial Theorem */
export function generatePascalTriangle(rows: number): number[][] {
  const count = clampNumber(Math.floor(rows), 1, 12);
  const triangle: number[][] = [];
  for (let i = 0; i < count; i++) {
    const row: number[] = [1];
    for (let j = 1; j < i; j++) {
      row.push(triangle[i - 1][j - 1] + triangle[i - 1][j]);
    }
    if (i > 0) row.push(1);
    triangle.push(row);
  }
  return triangle;
}

export function binomialExpansionTerms(a: number, b: number, n: number) {
  const ni = clampNumber(Math.floor(n), 0, 10);
  const row = generatePascalTriangle(ni + 1)[ni];
  const terms = row.map((coeff, k) => {
    const numericWeight = coeff * Math.pow(a, ni - k) * Math.pow(b, k);
    return {
      k,
      binomialCoeff: coeff,
      xPower: ni - k,
      yPower: k,
      numericWeight,
    };
  });
  return {
    n: ni,
    terms,
    sumAtUnitXY: Math.pow(a + b, ni),
  };
}

/* Ch 8: Sequences and Series */
export function computeProgression(
  mode: 'AP' | 'GP',
  firstTerm: number,
  stepParam: number,
  count: number
) {
  const n = clampNumber(Math.floor(count), 1, 30);
  const terms: number[] = [];
  const partialSums: number[] = [];
  let running = 0;

  for (let i = 0; i < n; i++) {
    const term = mode === 'AP' ? firstTerm + i * stepParam : firstTerm * Math.pow(stepParam, i);
    terms.push(term);
    running += term;
    partialSums.push(running);
  }

  const nthTerm = terms[n - 1];
  const totalSum = partialSums[n - 1];
  const infiniteSum =
    mode === 'GP' && Math.abs(stepParam) < 1 ? firstTerm / (1 - stepParam) : null;

  return { terms, partialSums, nthTerm, totalSum, infiniteSum };
}

/* Ch 9: Straight Lines */
export function analyzeStraightLine(A: number, B: number, C: number, px: number, py: number) {
  // Ax + By + C = 0
  const norm = Math.hypot(A, B);
  const slope = Math.abs(B) < 1e-12 ? Number.POSITIVE_INFINITY : -A / B;
  const yIntercept = Math.abs(B) < 1e-12 ? null : -C / B;
  const xIntercept = Math.abs(A) < 1e-12 ? null : -C / A;
  const distanceFromPoint = norm > 1e-12 ? Math.abs(A * px + B * py + C) / norm : 0;
  const angleDeg = Math.abs(B) < 1e-12 ? 90 : (Math.atan(slope) * 180) / Math.PI;
  return { slope, yIntercept, xIntercept, distanceFromPoint, angleDeg };
}

/* Ch 10: Conic Sections */
export function analyzeConic(
  kind: 'circle' | 'parabola' | 'ellipse' | 'hyperbola',
  a: number,
  b: number
) {
  const safeA = Math.max(0.2, Math.abs(a));
  const safeB = Math.max(0.2, Math.abs(b));
  const xs: number[] = [];
  const ys: number[] = [];

  if (kind === 'circle') {
    for (let i = 0; i <= 180; i++) {
      const t = (i / 180) * 2 * Math.PI;
      xs.push(safeA * Math.cos(t));
      ys.push(safeA * Math.sin(t));
    }
    return {
      xs,
      ys,
      eccentricity: 0,
      foci: ['(0, 0)'],
      latusRectum: 2 * safeA,
      equation: `x² + y² = ${(safeA * safeA).toFixed(2)}`,
    };
  }

  if (kind === 'parabola') {
    for (let i = -100; i <= 100; i++) {
      const y = (i / 100) * 4 * safeA;
      xs.push((y * y) / (4 * safeA));
      ys.push(y);
    }
    return {
      xs,
      ys,
      eccentricity: 1,
      foci: [`(${safeA.toFixed(2)}, 0)`],
      latusRectum: 4 * safeA,
      equation: `y² = ${(4 * safeA).toFixed(2)}x`,
    };
  }

  if (kind === 'ellipse') {
    const major = Math.max(safeA, safeB);
    const minor = Math.min(safeA, safeB);
    const c = Math.sqrt(major * major - minor * minor);
    const e = c / major;
    for (let i = 0; i <= 180; i++) {
      const t = (i / 180) * 2 * Math.PI;
      xs.push(safeA * Math.cos(t));
      ys.push(safeB * Math.sin(t));
    }
    return {
      xs,
      ys,
      eccentricity: e,
      foci:
        safeA >= safeB
          ? [`(±${c.toFixed(2)}, 0)`]
          : [`(0, ±${c.toFixed(2)})`],
      latusRectum: (2 * minor * minor) / major,
      equation: `x²/${(safeA * safeA).toFixed(2)} + y²/${(safeB * safeB).toFixed(2)} = 1`,
    };
  }

  // Hyperbola: x^2/a^2 - y^2/b^2 = 1
  const c = Math.sqrt(safeA * safeA + safeB * safeB);
  const e = c / safeA;
  // Right branch then NaN break then left branch
  for (let i = -60; i <= 60; i++) {
    const t = (i / 60) * 1.8;
    xs.push(safeA * Math.cosh(t));
    ys.push(safeB * Math.sinh(t));
  }
  xs.push(Number.NaN);
  ys.push(Number.NaN);
  for (let i = -60; i <= 60; i++) {
    const t = (i / 60) * 1.8;
    xs.push(-safeA * Math.cosh(t));
    ys.push(safeB * Math.sinh(t));
  }
  return {
    xs,
    ys,
    eccentricity: e,
    foci: [`(±${c.toFixed(2)}, 0)`],
    latusRectum: (2 * safeB * safeB) / safeA,
    equation: `x²/${(safeA * safeA).toFixed(2)} - y²/${(safeB * safeB).toFixed(2)} = 1`,
  };
}

/* Ch 11: 3D Geometry */
export function analyze3DPoints(
  p1: [number, number, number],
  p2: [number, number, number],
  m = 1,
  n = 1
) {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const dz = p2[2] - p1[2];
  const distance = Math.hypot(dx, dy, dz);
  const denom = m + n === 0 ? 1 : m + n;
  const sectionPoint: [number, number, number] = [
    (m * p2[0] + n * p1[0]) / denom,
    (m * p2[1] + n * p1[1]) / denom,
    (m * p2[2] + n * p1[2]) / denom,
  ];
  const directionCosines: [number, number, number] =
    distance > 1e-12 ? [dx / distance, dy / distance, dz / distance] : [0, 0, 0];
  return { distance, sectionPoint, directionCosines };
}

/* Ch 12: Limits & Derivatives */
export function analyzeLimitAndDerivative(expression: string, x0: number, h = 1e-4) {
  try {
    const compiled = compile(expression);
    const evalAt = (x: number) => {
      const v = compiled.evaluate({ x, pi: Math.PI, e: Math.E });
      return typeof v === 'number' && Number.isFinite(v) ? v : Number.NaN;
    };
    const leftLimit = evalAt(x0 - h);
    const rightLimit = evalAt(x0 + h);
    const fAtX0 = evalAt(x0);
    const limitExists =
      Number.isFinite(leftLimit) &&
      Number.isFinite(rightLimit) &&
      Math.abs(leftLimit - rightLimit) < 1e-2;
    const approxLimit = limitExists ? (leftLimit + rightLimit) / 2 : Number.NaN;
    const numericalDerivative = (evalAt(x0 + h) - evalAt(x0 - h)) / (2 * h);
    const symbolic = computeSymbolicDerivative(expression, 'x');

    return {
      leftLimit,
      rightLimit,
      fAtX0,
      limitExists,
      approxLimit,
      numericalDerivative,
      symbolicDerivative: symbolic,
    };
  } catch (err) {
    return {
      leftLimit: Number.NaN,
      rightLimit: Number.NaN,
      fAtX0: Number.NaN,
      limitExists: false,
      approxLimit: Number.NaN,
      numericalDerivative: Number.NaN,
      symbolicDerivative: 'Error',
      error: err instanceof Error ? err.message : 'Invalid expression',
    };
  }
}

/* Ch 13: Statistics */
export function computeStatistics(values: number[]) {
  const clean = values.filter((v) => Number.isFinite(v));
  if (clean.length === 0) {
    return {
      count: 0,
      mean: 0,
      median: 0,
      modes: [] as number[],
      variance: 0,
      stdDev: 0,
      meanDeviationMean: 0,
      min: 0,
      max: 0,
    };
  }
  const sorted = [...clean].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((acc, v) => acc + v, 0) / n;
  const median =
    n % 2 === 1 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;

  const freq = new Map<number, number>();
  let maxFreq = 0;
  for (const v of sorted) {
    const c = (freq.get(v) ?? 0) + 1;
    freq.set(v, c);
    if (c > maxFreq) maxFreq = c;
  }
  const modes = maxFreq > 1 ? Array.from(freq.entries()).filter(([, c]) => c === maxFreq).map(([k]) => k) : [];

  const variance = sorted.reduce((acc, v) => acc + (v - mean) ** 2, 0) / n;
  const stdDev = Math.sqrt(variance);
  const meanDeviationMean = sorted.reduce((acc, v) => acc + Math.abs(v - mean), 0) / n;

  return {
    count: n,
    mean,
    median,
    modes,
    variance,
    stdDev,
    meanDeviationMean,
    min: sorted[0],
    max: sorted[n - 1],
  };
}

/* Ch 14: Probability */
export function computeProbabilityMetrics(pA: number, pB: number, pAandB: number) {
  const a = clampNumber(pA, 0, 1);
  const b = clampNumber(pB, 0, 1);
  const maxIntersection = Math.min(a, b);
  const minIntersection = Math.max(0, a + b - 1);
  const inter = clampNumber(pAandB, minIntersection, maxIntersection);
  const union = a + b - inter;
  const pAGivenB = b > 0 ? inter / b : 0;
  const pBGivenA = a > 0 ? inter / a : 0;
  const isIndependent = Math.abs(inter - a * b) < 1e-4;
  const isMutuallyExclusive = inter < 1e-9;
  return {
    pA: a,
    pB: b,
    pAandB: inter,
    minIntersection,
    maxIntersection,
    union,
    pAGivenB,
    pBGivenA,
    isIndependent,
    isMutuallyExclusive,
  };
}
