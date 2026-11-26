import type { ChapterDefinition } from '@/types/scientific';

export interface ScientificDomainInfo {
  code: string;
  name: string;
  description: string;
}

export const MATHEMATICS_DOMAINS: Record<string, ScientificDomainInfo> = {
  'DOMAIN-A': {
    code: 'DOMAIN A',
    name: 'Foundations of Mathematics',
    description: 'Set theory, formal logic, relations, mappings, and mathematical structures.',
  },
  'DOMAIN-B': {
    code: 'DOMAIN B',
    name: 'Algebra',
    description: 'Polynomials, quadratic equations, complex Argand geometry, inequalities, sequences, and combinatorics.',
  },
  'DOMAIN-C': {
    code: 'DOMAIN C',
    name: 'Trigonometry',
    description: 'Unit circle dynamics, periodic waveforms, trigonometric identities, and angle transformations.',
  },
  'DOMAIN-D': {
    code: 'DOMAIN D',
    name: 'Coordinate Geometry',
    description: 'Cartesian straight lines, conic sections (parabolas, ellipses, hyperbolas), and 3D Euclidean space.',
  },
  'DOMAIN-E': {
    code: 'DOMAIN E',
    name: 'Calculus',
    description: 'Limits, continuity, tangent slopes, differentiation, and instantaneous rates of change.',
  },
  'DOMAIN-F': {
    code: 'DOMAIN F',
    name: 'Statistics and Probability',
    description: 'Descriptive metrics, dispersion, axiomatic probability, and random experiment distributions.',
  },
  'DOMAIN-G': {
    code: 'DOMAIN G',
    name: 'Advanced Exploration',
    description: 'Mathematical modelling, numerical methods, Mandelbrot fractals, and deterministic chaos dynamics.',
  },
};

export const MATH_CHAPTERS: ChapterDefinition[] = [
  {
    id: 'math-1-sets',
    number: 1,
    discipline: 'mathematics',
    domainCode: 'DOMAIN A',
    domainName: 'Foundations of Mathematics',
    title: 'Sets & Set Operations',
    subtitle: 'Foundational Set Theory, Operations & Venn Algebra',
    overview:
      'Sets formalize well-defined collections of distinct mathematical objects, forming the structural foundation of functions, probability, and discrete structures.',
    definitions: [
      { term: 'Set', definition: 'A well-defined collection of distinct objects called elements or members.' },
      { term: 'Subset (A ⊆ B)', definition: 'Every element of set A is also an element of set B.' },
      { term: 'Power Set P(A)', definition: 'The set of all subsets of A, having cardinality 2^n when |A| = n.' },
      { term: 'Complement (A′)', definition: 'Elements in the universal set U that do not belong to A.' },
    ],
    formulas: [
      { name: 'Cardinality of Union', latex: 'n(A \\cup B) = n(A) + n(B) - n(A \\cap B)', variables: 'n(A), n(B): cardinalities' },
      { name: "De Morgan's Law I", latex: "(A \\cup B)' = A' \\cap B'", variables: "A', B': complements in U" },
      { name: "De Morgan's Law II", latex: "(A \\cap B)' = A' \\cup B'", variables: "A', B': complements in U" },
    ],
    workedExamples: [
      {
        title: 'Inclusion-Exclusion Principle',
        problem: 'In a lab of 50 researchers, 32 study Calculus and 26 study Mechanics. Every researcher studies at least one. How many study both?',
        given: ['n(C ∪ M) = 50', 'n(C) = 32', 'n(M) = 26'],
        steps: [
          'Apply n(C ∪ M) = n(C) + n(M) - n(C ∩ M).',
          '50 = 32 + 26 - n(C ∩ M).',
          'n(C ∩ M) = 58 - 50 = 8.',
        ],
        result: '8 researchers study both Calculus and Mechanics.',
      },
    ],
    challenges: [
      {
        id: 'm1-c1',
        prompt: 'If set A has 4 elements, how many elements are in its Power Set P(A)?',
        hint: 'Use |P(A)| = 2^n.',
        expectedNumeric: 16,
        tolerance: 0,
        solutionSteps: ['|P(A)| = 2^4 = 16 subsets (including empty set and A itself).'],
      },
    ],
    aiExplanationFocus: 'Set operations, Venn diagram regions, and De Morgan duality.',
    relatedConcepts: [
      { title: 'Probability Sample Spaces', route: '/mathematics/math-14-probability', discipline: 'mathematics' },
      { title: 'Relations & Functions', route: '/mathematics/math-2-relations', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: 'Chaos & Probability Lab', route: '/lab?module=chaos' }],
    toolId: 'sets',
  },
  {
    id: 'math-2-relations',
    number: 2,
    discipline: 'mathematics',
    domainCode: 'DOMAIN A',
    domainName: 'Foundations of Mathematics',
    title: 'Relations and Functions',
    subtitle: 'Cartesian Products, Mapping Diagrams & Transformations',
    overview:
      'Relations pair elements across sets via Cartesian products, while functions impose uniqueness of output to model deterministic laws across science.',
    definitions: [
      { term: 'Cartesian Product (A × B)', definition: 'Set of all ordered pairs (a, b) where a ∈ A and b ∈ B.' },
      { term: 'Domain & Range', definition: 'Domain is the set of valid inputs; range is the set of actual output values.' },
      { term: 'Function', definition: 'A relation where every element in the domain maps to exactly one element in the codomain.' },
    ],
    formulas: [
      { name: 'Transformed Function', latex: 'g(x) = a \\cdot f(b(x - h)) + k', variables: 'a: vertical scale, b: horizontal scale, (h,k): shift' },
      { name: 'Count of Relations', latex: '|\\text{Rel}(A, B)| = 2^{n(A)\\cdot n(B)}', variables: 'n(A), n(B): set sizes' },
    ],
    workedExamples: [
      {
        title: 'Domain of Square-Root Rational Function',
        problem: 'Find the real domain of f(x) = √(9 - x²).',
        given: ['Radicand 9 - x² ≥ 0 for real outputs'],
        steps: ['9 - x² ≥ 0 ⟹ x² ≤ 9', '-3 ≤ x ≤ 3'],
        result: 'Domain is [-3, 3], Range is [0, 3].',
      },
    ],
    challenges: [
      {
        id: 'm2-c1',
        prompt: 'If n(A) = 2 and n(B) = 3, how many total relations exist from A to B?',
        hint: 'Number of subsets of A × B is 2^(n(A)·n(B)).',
        expectedNumeric: 64,
        tolerance: 0,
        solutionSteps: ['n(A × B) = 2 × 3 = 6, so total relations = 2^6 = 64.'],
      },
    ],
    aiExplanationFocus: 'Injective mappings, domain restrictions, and geometric function transformations.',
    relatedConcepts: [
      { title: 'Limits & Derivatives', route: '/mathematics/math-12-limits', discipline: 'mathematics' },
      { title: 'Kinematics Position Functions', route: '/physics/phys-2-motion-line', discipline: 'physics' },
    ],
    relatedExperiments: [{ title: 'Equation-to-Graph Studio', route: '/lab?module=graph' }],
    toolId: 'relations',
  },
  {
    id: 'math-3-trig',
    number: 3,
    discipline: 'mathematics',
    domainCode: 'DOMAIN C',
    domainName: 'Trigonometry',
    title: 'Trigonometric Functions',
    subtitle: 'Unit Circle, Radian Measure, Waveforms & Identities',
    overview:
      'Trigonometric functions extend right-triangle ratios onto the unit circle, becoming the mathematical language of oscillations, waves, and rotations.',
    definitions: [
      { term: 'Radian', definition: 'Angle subtended at the centre of a unit circle by an arc of length 1.' },
      { term: 'Periodicity', definition: 'sin x and cos x repeat every 2π radians; tan x repeats every π radians.' },
    ],
    formulas: [
      { name: 'Arc & Radian Relation', latex: '\\theta = \\frac{l}{r}, \\quad 180^\\circ = \\pi\\text{ rad}', variables: 'l: arc length, r: radius' },
      { name: 'Pythagorean Identity', latex: '\\sin^2 x + \\cos^2 x = 1', variables: 'x ∈ ℝ' },
      { name: 'Compound Angle Sine', latex: '\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B', variables: 'A, B: angles in rad' },
    ],
    workedExamples: [
      {
        title: 'Unit Circle Coordinates at 150°',
        problem: 'Evaluate cos(150°) and sin(150°).',
        given: ['150° = 180° - 30° (Quadrant II)'],
        steps: [
          'In Quadrant II, cosine is negative and sine is positive.',
          'cos(150°) = -cos(30°) = -√3/2 ≈ -0.8660.',
          'sin(150°) = sin(30°) = 1/2 = 0.5.',
        ],
        result: '(-0.8660, 0.5000)',
      },
    ],
    challenges: [
      {
        id: 'm3-c1',
        prompt: 'What is the value of sin²(37°) + cos²(37°)?',
        hint: 'Use the fundamental Pythagorean identity.',
        expectedNumeric: 1,
        tolerance: 0.001,
        solutionSteps: ['For any real angle θ, sin²θ + cos²θ = 1.'],
      },
    ],
    aiExplanationFocus: 'Unit circle projection, phase shift, and harmonic oscillation coupling.',
    relatedConcepts: [
      { title: 'Simple Harmonic Motion', route: '/physics/phys-13-oscillations', discipline: 'physics' },
      { title: 'Waves & Interference', route: '/physics/phys-14-waves', discipline: 'physics' },
    ],
    relatedExperiments: [{ title: 'Wave & SHM Simulator', route: '/physics/phys-13-oscillations' }],
    toolId: 'trigonometry',
  },
  {
    id: 'math-4-complex',
    number: 4,
    discipline: 'mathematics',
    domainCode: 'DOMAIN B',
    domainName: 'Algebra',
    title: 'Complex Numbers and Quadratic Equations',
    subtitle: 'Argand Plane, Modulus-Argument Form & Complex Roots',
    overview:
      'Complex numbers extend the real line into a two-dimensional Argand plane via i = √(-1), closing algebra so every quadratic equation has solutions.',
    definitions: [
      { term: 'Imaginary Unit (i)', definition: 'Defined by i² = -1.' },
      { term: 'Modulus |z|', definition: 'Euclidean distance √(a² + b²) from origin to z = a + ib.' },
      { term: 'Conjugate (z̄)', definition: 'Reflection across the real axis: a - ib.' },
    ],
    formulas: [
      { name: 'Modulus & Argument', latex: '|z| = \\sqrt{a^2 + b^2}, \\quad \\theta = \\operatorname{atan2}(b, a)', variables: 'z = a + ib' },
      { name: 'Quadratic Formula', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}', variables: 'a ≠ 0' },
    ],
    workedExamples: [
      {
        title: 'Complex Conjugate Roots',
        problem: 'Solve x² + 2x + 5 = 0.',
        given: ['a = 1, b = 2, c = 5'],
        steps: [
          'Discriminant D = 2² - 4(1)(5) = 4 - 20 = -16.',
          'x = (-2 ± √(-16)) / 2 = (-2 ± 4i) / 2 = -1 ± 2i.',
        ],
        result: 'x = -1 + 2i and x = -1 - 2i',
      },
    ],
    challenges: [
      {
        id: 'm4-c1',
        prompt: 'Compute the modulus |z| of z = 3 + 4i.',
        hint: '|z| = √(3² + 4²).',
        expectedNumeric: 5,
        tolerance: 0.001,
        solutionSteps: ['|3 + 4i| = √(9 + 16) = √25 = 5.'],
      },
    ],
    aiExplanationFocus: 'Geometric rotation in the Argand plane and negative discriminants.',
    relatedConcepts: [
      { title: 'Motion in a Plane (Vectors)', route: '/physics/phys-3-motion-plane', discipline: 'physics' },
    ],
    relatedExperiments: [{ title: 'Fractal Explorer (Mandelbrot)', route: '/lab?module=fractal' }],
    toolId: 'complex',
  },
  {
    id: 'math-5-inequalities',
    number: 5,
    discipline: 'mathematics',
    domainCode: 'DOMAIN B',
    domainName: 'Algebra',
    title: 'Linear Inequalities',
    subtitle: 'Number-Line Intervals & 2D Feasible Half-Planes',
    overview:
      'Linear inequalities define continuous constraints, boundary lines, and feasible regions essential to optimization and resource modelling.',
    definitions: [
      { term: 'Half-Plane', definition: 'One side of a dividing line ax + by = c in the Cartesian plane.' },
      { term: 'Slack / Strict Inequality', definition: '≤ or ≥ includes the boundary line; < or > excludes it.' },
    ],
    formulas: [
      { name: '1D Linear Inequality', latex: 'ax + b \\le c \\implies x \\le \\frac{c-b}{a}\\ (a>0)', variables: 'Flip inequality sign if a < 0' },
      { name: '2D Half-Plane', latex: 'ax + by \\le c', variables: 'Feasible region tested with origin (0,0)' },
    ],
    workedExamples: [
      {
        title: 'Solving Negative Coefficient Inequality',
        problem: 'Solve -3x + 6 > 15.',
        given: ['-3x + 6 > 15'],
        steps: [
          'Subtract 6: -3x > 9.',
          'Divide by -3 (flip sign): x < -3.',
        ],
        result: 'x ∈ (-∞, -3)',
      },
    ],
    challenges: [
      {
        id: 'm5-c1',
        prompt: 'What is the maximum integer x satisfying 2x + 3 ≤ 11?',
        hint: 'Solve 2x ≤ 8.',
        expectedNumeric: 4,
        tolerance: 0,
        solutionSteps: ['2x ≤ 8 ⟹ x ≤ 4, so maximum integer is 4.'],
      },
    ],
    aiExplanationFocus: 'Sign-reversal rule and graphical feasible regions.',
    relatedConcepts: [
      { title: 'Straight Lines', route: '/mathematics/math-9-lines', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: 'Equation-to-Graph Studio', route: '/lab?module=graph' }],
    toolId: 'inequalities',
  },
  {
    id: 'math-6-permutations',
    number: 6,
    discipline: 'mathematics',
    domainCode: 'DOMAIN B',
    domainName: 'Algebra',
    title: 'Permutations and Combinations',
    subtitle: 'Counting Principles, Ordered Arrangements & Selections',
    overview:
      'Combinatorics quantifies exact ways to arrange or choose discrete configurations without brute-force enumeration.',
    definitions: [
      { term: 'Permutation (ⁿPᵣ)', definition: 'Ordered arrangement of r distinct objects from n objects.' },
      { term: 'Combination (ⁿCᵣ)', definition: 'Unordered selection of r objects from n distinct objects.' },
    ],
    formulas: [
      { name: 'Permutations', latex: '{}^nP_r = \\frac{n!}{(n-r)!}', variables: '0 ≤ r ≤ n' },
      { name: 'Combinations', latex: '{}^nC_r = \\frac{n!}{r!(n-r)!}', variables: '0 ≤ r ≤ n' },
    ],
    workedExamples: [
      {
        title: 'Committee Selection vs. Officer Ranking',
        problem: 'From 6 scientists, count ways to pick a 3-person committee vs. 3 ranked roles.',
        given: ['n = 6, r = 3'],
        steps: [
          'Committee (order irrelevant): ⁶C₃ = 6! / (3!·3!) = 20.',
          'Ranked roles (order matters): ⁶P₃ = 6! / 3! = 120.',
        ],
        result: '20 combinations, 120 permutations.',
      },
    ],
    challenges: [
      {
        id: 'm6-c1',
        prompt: 'Evaluate ⁵C₂ (number of 2-element subsets from 5 items).',
        hint: '5! / (2! · 3!).',
        expectedNumeric: 10,
        tolerance: 0,
        solutionSteps: ['(5 × 4) / (2 × 1) = 10.'],
      },
    ],
    aiExplanationFocus: 'Distinguishing ordered arrangements from unordered subsets.',
    relatedConcepts: [
      { title: 'Binomial Theorem', route: '/mathematics/math-7-binomial', discipline: 'mathematics' },
      { title: 'Probability', route: '/mathematics/math-14-probability', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: 'Chaos & Probability Lab', route: '/lab?module=chaos' }],
    toolId: 'combinatorics',
  },
  {
    id: 'math-7-binomial',
    number: 7,
    discipline: 'mathematics',
    domainCode: 'DOMAIN B',
    domainName: 'Algebra',
    title: 'Binomial Theorem',
    subtitle: "Pascal's Triangle, Expansions & General Term Analysis",
    overview:
      'The Binomial Theorem expands powers (a + b)ⁿ cleanly into weighted polynomial sums using combinatorial coefficients.',
    definitions: [
      { term: 'Binomial Coefficient', definition: 'The coefficient ⁿCᵣ multiplying aⁿ⁻ʳ bʳ.' },
      { term: 'General Term (Tᵣ₊₁)', definition: 'The (r+1)th term in the expansion of (a+b)ⁿ.' },
    ],
    formulas: [
      { name: 'Binomial Expansion', latex: '(a+b)^n = \\sum_{r=0}^{n} {}^nC_r a^{n-r} b^r', variables: 'n ∈ ℕ₀' },
      { name: 'General Term', latex: 'T_{r+1} = {}^nC_r a^{n-r} b^r', variables: '0 ≤ r ≤ n' },
    ],
    workedExamples: [
      {
        title: 'Expanding (x + 2)³',
        problem: 'Write out all terms of (x + 2)³.',
        given: ['a = x, b = 2, n = 3'],
        steps: [
          'Coefficients from Pascal row 3: 1, 3, 3, 1.',
          '1·x³·2⁰ + 3·x²·2¹ + 3·x¹·2² + 1·x⁰·2³ = x³ + 6x² + 12x + 8.',
        ],
        result: 'x³ + 6x² + 12x + 8',
      },
    ],
    challenges: [
      {
        id: 'm7-c1',
        prompt: 'What is the sum of all binomial coefficients in the expansion of (1 + 1)⁵?',
        hint: 'Set a = 1, b = 1 in (a+b)⁵.',
        expectedNumeric: 32,
        tolerance: 0,
        solutionSteps: ['⁵C₀ + ⁵C₁ + ... + ⁵C₅ = 2⁵ = 32.'],
      },
    ],
    aiExplanationFocus: 'Symmetry of Pascal triangle rows and binomial approximation.',
    relatedConcepts: [
      { title: 'Permutations & Combinations', route: '/mathematics/math-6-permutations', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: '3D Mathematical Universe', route: '/lab?module=3d' }],
    toolId: 'binomial',
  },
  {
    id: 'math-8-sequences',
    number: 8,
    discipline: 'mathematics',
    domainCode: 'DOMAIN B',
    domainName: 'Algebra',
    title: 'Sequences and Series',
    subtitle: 'Arithmetic & Geometric Progressions and Convergence',
    overview:
      'Sequences capture discrete ordered patterns in time and computation, while series accumulate their partial sums.',
    definitions: [
      { term: 'Arithmetic Progression (AP)', definition: 'Successive terms differ by a constant d.' },
      { term: 'Geometric Progression (GP)', definition: 'Successive terms scale by a constant ratio r.' },
    ],
    formulas: [
      { name: 'AP nth Term & Sum', latex: 'a_n = a + (n-1)d, \\quad S_n = \\frac{n}{2}[2a + (n-1)d]', variables: 'd: common difference' },
      { name: 'GP nth Term & Infinite Sum', latex: 'a_n = ar^{n-1}, \\quad S_\\infty = \\frac{a}{1-r}\\ (|r|<1)', variables: 'r: common ratio' },
    ],
    workedExamples: [
      {
        title: 'Convergent Geometric Series',
        problem: 'Find S_∞ for 8 + 4 + 2 + 1 + ...',
        given: ['a = 8, r = 0.5 (|r| < 1)'],
        steps: ['S_∞ = a / (1 - r) = 8 / (1 - 0.5) = 16.'],
        result: 'S_∞ = 16',
      },
    ],
    challenges: [
      {
        id: 'm8-c1',
        prompt: 'Find the 10th term of the AP: 3, 7, 11, 15, ...',
        hint: 'a₁₀ = a + 9d.',
        expectedNumeric: 39,
        tolerance: 0,
        solutionSteps: ['a = 3, d = 4 ⟹ a₁₀ = 3 + 9(4) = 39.'],
      },
    ],
    aiExplanationFocus: 'Linear vs. exponential growth and AM ≥ GM inequality.',
    relatedConcepts: [
      { title: 'Kinematics Uniform Steps', route: '/physics/phys-2-motion-line', discipline: 'physics' },
    ],
    relatedExperiments: [{ title: 'Model Comparison Lab', route: '/lab?module=compare' }],
    toolId: 'sequences',
  },
  {
    id: 'math-9-lines',
    number: 9,
    discipline: 'mathematics',
    domainCode: 'DOMAIN D',
    domainName: 'Coordinate Geometry',
    title: 'Straight Lines',
    subtitle: 'Slopes, Intercepts, Angle Between Lines & Distance',
    overview:
      'Coordinate geometry bridges algebra and Euclidean space, encoding slopes, orthogonality, and shortest distances as exact equations.',
    definitions: [
      { term: 'Slope (m)', definition: 'tan(θ), rate of change of y with respect to x.' },
      { term: 'Perpendicularity', definition: 'Two non-vertical lines are perpendicular iff m₁·m₂ = -1.' },
    ],
    formulas: [
      { name: 'General Form', latex: 'Ax + By + C = 0', variables: 'Slope m = -A/B' },
      { name: 'Point-to-Line Distance', latex: 'd = \\frac{|Ax_1 + By_1 + C|}{\\sqrt{A^2 + B^2}}', variables: '(x₁, y₁): point' },
    ],
    workedExamples: [
      {
        title: 'Perpendicular Distance from Origin',
        problem: 'Find the distance from (0, 0) to 3x + 4y - 10 = 0.',
        given: ['A = 3, B = 4, C = -10, (x₁,y₁) = (0,0)'],
        steps: ['d = |3(0) + 4(0) - 10| / √(3² + 4²) = 10 / 5 = 2.'],
        result: 'd = 2 units',
      },
    ],
    challenges: [
      {
        id: 'm9-c1',
        prompt: 'If line L₁ has slope 2, what is the slope of a line perpendicular to L₁?',
        hint: 'm₁ · m₂ = -1.',
        expectedNumeric: -0.5,
        tolerance: 0.001,
        solutionSteps: ['m₂ = -1 / 2 = -0.5.'],
      },
    ],
    aiExplanationFocus: 'Slope-intercept geometry and normal form projections.',
    relatedConcepts: [
      { title: 'Conic Sections', route: '/mathematics/math-10-conics', discipline: 'mathematics' },
      { title: 'Limits & Tangents', route: '/mathematics/math-12-limits', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: 'Equation-to-Graph Studio', route: '/lab?module=graph' }],
    toolId: 'lines',
  },
  {
    id: 'math-10-conics',
    number: 10,
    discipline: 'mathematics',
    domainCode: 'DOMAIN D',
    domainName: 'Coordinate Geometry',
    title: 'Conic Sections',
    subtitle: 'Circles, Parabolas, Ellipses, Hyperbolas & Eccentricity',
    overview:
      'Slicing a double cone yields the fundamental curves governing planetary orbits, parabolic reflectors, and relativistic trajectories.',
    definitions: [
      { term: 'Eccentricity (e)', definition: 'Ratio of distance to focus over distance to directrix: e=0 circle, e=1 parabola, 0<e<1 ellipse, e>1 hyperbola.' },
      { term: 'Latus Rectum', definition: 'Chord passing through a focus perpendicular to the principal axis.' },
    ],
    formulas: [
      { name: 'Ellipse Standard Form', latex: '\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1, \\quad c = \\sqrt{a^2 - b^2}', variables: 'e = c/a' },
      { name: 'Hyperbola Standard Form', latex: '\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1, \\quad c = \\sqrt{a^2 + b^2}', variables: 'e = c/a' },
    ],
    workedExamples: [
      {
        title: 'Eccentricity of an Ellipse',
        problem: 'Find the eccentricity of x²/25 + y²/9 = 1.',
        given: ['a = 5, b = 3'],
        steps: ['c = √(25 - 9) = √16 = 4.', 'e = c / a = 4 / 5 = 0.8.'],
        result: 'e = 0.8',
      },
    ],
    challenges: [
      {
        id: 'm10-c1',
        prompt: 'What is the latus rectum length of the parabola y² = 12x?',
        hint: 'Compare with y² = 4ax; latus rectum = 4a.',
        expectedNumeric: 12,
        tolerance: 0.001,
        solutionSteps: ['4a = 12 directly gives latus rectum = 12.'],
      },
    ],
    aiExplanationFocus: 'Connecting eccentricity e to orbital trajectories in Gravitation.',
    relatedConcepts: [
      { title: 'Gravitation & Orbits', route: '/physics/phys-7-gravitation', discipline: 'physics' },
    ],
    relatedExperiments: [{ title: 'Orbital Mechanics Simulator', route: '/physics/phys-7-gravitation' }],
    toolId: 'conics',
  },
  {
    id: 'math-11-3d',
    number: 11,
    discipline: 'mathematics',
    domainCode: 'DOMAIN D',
    domainName: 'Coordinate Geometry',
    title: 'Introduction to Three Dimensional Geometry',
    subtitle: '3D Coordinate Axes, Octants, Distance & Section Formula',
    overview:
      'Extending Cartesian coordinates to (x, y, z) establishes the spatial metric needed for 3D vectors, rigid bodies, and field visualization.',
    definitions: [
      { term: 'Octants', definition: 'Eight regions formed by the three mutually perpendicular coordinate planes.' },
      { term: 'Direction Cosines (l, m, n)', definition: 'Cosines of angles made by a line segment with +x, +y, +z axes; l²+m²+n²=1.' },
    ],
    formulas: [
      { name: '3D Euclidean Distance', latex: 'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}', variables: 'P₁, P₂ ∈ ℝ³' },
      { name: 'Internal Section Formula', latex: 'P = \\left(\\frac{mx_2+nx_1}{m+n}, \\frac{my_2+ny_1}{m+n}, \\frac{mz_2+nz_1}{m+n}\\right)', variables: 'Ratio m : n' },
    ],
    workedExamples: [
      {
        title: '3D Vector Magnitude',
        problem: 'Find distance between A(1, 2, 3) and B(4, 6, 3).',
        given: ['Δx = 3, Δy = 4, Δz = 0'],
        steps: ['d = √(3² + 4² + 0²) = √25 = 5.'],
        result: '5 units',
      },
    ],
    challenges: [
      {
        id: 'm11-c1',
        prompt: 'Find the distance from origin (0,0,0) to (2, 3, 6).',
        hint: '√(2² + 3² + 6²).',
        expectedNumeric: 7,
        tolerance: 0.001,
        solutionSteps: ['√(4 + 9 + 36) = √49 = 7.'],
      },
    ],
    aiExplanationFocus: 'Spatial distance metric and coordinate projections in 3D.',
    relatedConcepts: [
      { title: '3D Mathematical Universe', route: '/lab?module=3d', discipline: 'cross' },
      { title: 'Rotational Motion', route: '/physics/phys-6-rotational', discipline: 'physics' },
    ],
    relatedExperiments: [{ title: '3D Mathematical Universe', route: '/lab?module=3d' }],
    toolId: 'geometry3d',
  },
  {
    id: 'math-12-limits',
    number: 12,
    discipline: 'mathematics',
    domainCode: 'DOMAIN E',
    domainName: 'Calculus',
    title: 'Limits and Derivatives',
    subtitle: 'Infinitesimal Approach, Continuity, Tangents & Differentiation',
    overview:
      'Calculus captures instantaneous rates of change and local linear approximations, powering kinematics, optimization, and physical laws.',
    definitions: [
      { term: 'Limit', definition: 'Value approached by f(x) as x gets arbitrarily close to a from left and right.' },
      { term: 'Derivative f′(x)', definition: 'Instantaneous rate of change: lim_{h→0} [f(x+h) - f(x)] / h.' },
    ],
    formulas: [
      { name: 'First Principle', latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}", variables: 'Slope of tangent at x' },
      { name: 'Power & Trig Rules', latex: '\\frac{d}{dx}(x^n) = nx^{n-1}, \\quad \\frac{d}{dx}(\\sin x) = \\cos x', variables: 'x in radians' },
    ],
    workedExamples: [
      {
        title: 'Tangent Slope of x³ at x = 2',
        problem: 'Find f′(2) for f(x) = x³.',
        given: ['f(x) = x³'],
        steps: ['f′(x) = 3x².', 'At x = 2, f′(2) = 3(4) = 12.'],
        result: 'Slope = 12',
      },
    ],
    challenges: [
      {
        id: 'm12-c1',
        prompt: 'What is lim_{x→0} (sin x) / x (for x in radians)?',
        hint: 'Standard fundamental trigonometric limit.',
        expectedNumeric: 1,
        tolerance: 0.001,
        solutionSteps: ['By squeeze theorem on the unit circle, lim_{x→0} sin(x)/x = 1.'],
      },
    ],
    aiExplanationFocus: 'Secant-to-tangent convergence and instantaneous velocity.',
    relatedConcepts: [
      { title: 'Velocity & Acceleration Calculus', route: '/physics/phys-2-motion-line', discipline: 'physics' },
    ],
    relatedExperiments: [{ title: 'Equation-to-Graph Studio', route: '/lab?module=graph' }],
    toolId: 'limits',
  },
  {
    id: 'math-13-statistics',
    number: 13,
    discipline: 'mathematics',
    domainCode: 'DOMAIN F',
    domainName: 'Statistics and Probability',
    title: 'Statistics',
    subtitle: 'Central Tendency, Dispersion, Variance & Standard Deviation',
    overview:
      'Statistics quantifies real-world experimental datasets through center, spread, and dispersion metrics.',
    definitions: [
      { term: 'Variance (σ²)', definition: 'Mean squared deviation of observations from their arithmetic mean.' },
      { term: 'Standard Deviation (σ)', definition: 'Positive square root of variance, sharing the data unit.' },
    ],
    formulas: [
      { name: 'Population Variance', latex: '\\sigma^2 = \\frac{1}{N}\\sum_{i=1}^{N}(x_i - \\bar{x})^2', variables: 'x̄: arithmetic mean' },
      { name: 'Mean Deviation', latex: '\\text{MD}(\\bar{x}) = \\frac{1}{N}\\sum_{i=1}^{N}|x_i - \\bar{x}|', variables: 'Absolute spread' },
    ],
    workedExamples: [
      {
        title: 'Variance of [2, 4, 6, 8]',
        problem: 'Compute mean and variance of {2, 4, 6, 8}.',
        given: ['N = 4'],
        steps: [
          'Mean x̄ = (2+4+6+8)/4 = 5.',
          'Squared deviations: (-3)² + (-1)² + 1² + 3² = 9+1+1+9 = 20.',
          'Variance σ² = 20 / 4 = 5; σ = √5 ≈ 2.236.',
        ],
        result: 'Mean = 5, Variance = 5',
      },
    ],
    challenges: [
      {
        id: 'm13-c1',
        prompt: 'If every value in a dataset has variance 9, what is its standard deviation?',
        hint: 'σ = √(σ²).',
        expectedNumeric: 3,
        tolerance: 0.001,
        solutionSteps: ['σ = √9 = 3.'],
      },
    ],
    aiExplanationFocus: 'Sensitivity of mean vs. median and variance as squared spread.',
    relatedConcepts: [
      { title: 'Data Intelligence Lab', route: '/lab?module=data', discipline: 'cross' },
      { title: 'Measurement Uncertainty', route: '/physics/phys-1-units', discipline: 'physics' },
    ],
    relatedExperiments: [{ title: 'Data Intelligence Lab', route: '/lab?module=data' }],
    toolId: 'statistics',
  },
  {
    id: 'math-14-probability',
    number: 14,
    discipline: 'mathematics',
    domainCode: 'DOMAIN F',
    domainName: 'Statistics and Probability',
    title: 'Probability',
    subtitle: 'Axiomatic Sample Spaces, Events & Conditional Likelihood',
    overview:
      'Axiomatic probability models uncertainty rigorously from sample spaces, complementary events, and union-intersection laws.',
    definitions: [
      { term: 'Sample Space (S)', definition: 'Set of all possible outcomes of a random experiment.' },
      { term: 'Mutually Exclusive Events', definition: 'Events A and B such that A ∩ B = ∅.' },
    ],
    formulas: [
      { name: 'Addition Law', latex: 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)', variables: '0 ≤ P(E) ≤ 1' },
      { name: 'Complement Rule', latex: "P(A') = 1 - P(A)", variables: 'A′: non-occurrence of A' },
    ],
    workedExamples: [
      {
        title: 'Two-Event Union Probability',
        problem: 'If P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.2, find P(A ∪ B).',
        given: ['P(A)=0.5, P(B)=0.4, P(A∩B)=0.2'],
        steps: ['P(A ∪ B) = 0.5 + 0.4 - 0.2 = 0.7.'],
        result: '0.7',
      },
    ],
    challenges: [
      {
        id: 'm14-c1',
        prompt: 'If P(A) = 0.35, what is P(not A)?',
        hint: 'P(A′) = 1 - P(A).',
        expectedNumeric: 0.65,
        tolerance: 0.001,
        solutionSteps: ['1 - 0.35 = 0.65.'],
      },
    ],
    aiExplanationFocus: 'Frequentist trials converging to axiomatic probability.',
    relatedConcepts: [
      { title: 'Sets', route: '/mathematics/math-1-sets', discipline: 'mathematics' },
      { title: 'Kinetic Theory Molecular Speeds', route: '/physics/phys-12-kinetic', discipline: 'physics' },
    ],
    relatedExperiments: [{ title: 'Chaos & Probability Lab', route: '/lab?module=chaos' }],
    toolId: 'probability',
  },
];
