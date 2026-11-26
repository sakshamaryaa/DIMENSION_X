export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  scientist: string;
  discipline: 'Mathematics' | 'Physics' | 'Computation';
  summary: string;
  historicalContext: string;
  impact: string;
  connectedChapterRoute: string;
  connectedChapterLabel: string;
}

export const SCIENTIFIC_TIMELINE: TimelineMilestone[] = [
  {
    id: 'tl-euclid',
    year: '~300 BCE',
    title: 'Axiomatic Geometry & Conic Foundations',
    scientist: 'Euclid & Apollonius of Perga',
    discipline: 'Mathematics',
    summary: 'Formalized deductive geometry and named the ellipse, parabola, and hyperbola from cone slices.',
    historicalContext: 'Alexandrian scholarship unified geometric proof from a compact set of axioms.',
    impact: 'Provided the exact curves later discovered to describe planetary and projectile trajectories.',
    connectedChapterRoute: '/mathematics/math-10-conics',
    connectedChapterLabel: 'Conic Sections Studio',
  },
  {
    id: 'tl-aryabhata',
    year: '499 CE',
    title: 'Trigonometric Sine Tables & Astronomical Models',
    scientist: 'Aryabhata',
    discipline: 'Mathematics',
    summary: 'Introduced half-chord (ardha-jya) trigonometric tables and accurate planetary period approximations.',
    historicalContext: 'Classical Indian mathematics linked geometric chords to computational astronomy.',
    impact: 'Laid essential foundations for modern trigonometry and periodic waveform analysis.',
    connectedChapterRoute: '/mathematics/math-3-trig',
    connectedChapterLabel: 'Trigonometric Functions',
  },
  {
    id: 'tl-galileo',
    year: '1638',
    title: 'Parabolic Projectile Motion & Kinematics',
    scientist: 'Galileo Galilei',
    discipline: 'Physics',
    summary: 'Demonstrated uniform acceleration under gravity and parabolic trajectories from orthogonal motion components.',
    historicalContext: 'Pioneered quantitative controlled experiments using inclined planes and timing.',
    impact: 'Established experimental physics and paved the way for Newtonian mechanics.',
    connectedChapterRoute: '/physics/phys-3-motion-plane',
    connectedChapterLabel: 'Motion in a Plane (Vectors & Projectiles)',
  },
  {
    id: 'tl-newton',
    year: '1687',
    title: 'Principia: Laws of Motion, Universal Gravitation & Calculus',
    scientist: 'Isaac Newton',
    discipline: 'Physics',
    summary: 'Unified terrestrial mechanics and celestial orbits under three laws of motion, inverse-square gravity, and fluxions.',
    historicalContext: 'Linked Keplerian orbital data to universal mathematical laws.',
    impact: 'Formed the core of classical mechanics and differential calculus.',
    connectedChapterRoute: '/physics/phys-7-gravitation',
    connectedChapterLabel: 'Gravitation & Orbital Dynamics',
  },
  {
    id: 'tl-euler-gauss',
    year: '1748–1831',
    title: 'Complex Plane & Exponential-Trigonometric Unification',
    scientist: 'Leonhard Euler & Carl Friedrich Gauss',
    discipline: 'Mathematics',
    summary: 'Established e^(iθ) = cosθ + i sinθ and the geometric Argand/Gaussian interpretation of complex numbers.',
    historicalContext: 'Transformed imaginary numbers from algebraic curiosities into geometric operators.',
    impact: 'Indispensable to AC circuits, quantum mechanics, signal processing, and fractals.',
    connectedChapterRoute: '/mathematics/math-4-complex',
    connectedChapterLabel: 'Complex Numbers & Argand Geometry',
  },
  {
    id: 'tl-carnot-clausius',
    year: '1824–1865',
    title: 'Thermodynamics & Kinetic Molecular Theory',
    scientist: 'Sadi Carnot, James Prescott Joule & Rudolf Clausius',
    discipline: 'Physics',
    summary: 'Quantified heat-to-work equivalence, energy conservation (First Law), and molecular temperature.',
    historicalContext: 'Industrial-era heat engines motivated fundamental laws of energy efficiency.',
    impact: 'Underpins power generation, climate physics, and modern statistical mechanics.',
    connectedChapterRoute: '/physics/phys-11-thermodynamics',
    connectedChapterLabel: 'Thermodynamics & PV Cycles',
  },
  {
    id: 'tl-cantor-kolmogorov',
    year: '1874–1933',
    title: 'Set Theory & Axiomatic Probability',
    scientist: 'Georg Cantor & Andrey Kolmogorov',
    discipline: 'Mathematics',
    summary: 'Built rigorous set theory and grounded probability on measure-theoretic sample-space axioms.',
    historicalContext: 'Resolved paradoxes of infinity and unified statistical inference.',
    impact: 'Drives modern computer science, machine learning, and stochastic modelling.',
    connectedChapterRoute: '/mathematics/math-14-probability',
    connectedChapterLabel: 'Probability Theory',
  },
];

export interface NexusNode {
  id: string;
  label: string;
  category: 'math' | 'physics' | 'application' | 'tool';
  position: [number, number, number];
  route: string;
  summary: string;
}

export interface NexusEdge {
  from: string;
  to: string;
  relation: string;
}

export const KNOWLEDGE_NEXUS_NODES: NexusNode[] = [
  {
    id: 'trig',
    label: 'Trigonometry',
    category: 'math',
    position: [-3.2, 1.4, 0.5],
    route: '/mathematics/math-3-trig',
    summary: 'Unit circle projections, radians, and periodic functions.',
  },
  {
    id: 'calculus',
    label: 'Limits & Derivatives',
    category: 'math',
    position: [0, 2.2, -0.8],
    route: '/mathematics/math-12-limits',
    summary: 'Instantaneous rates of change and tangent linearizations.',
  },
  {
    id: 'conics',
    label: 'Conic Sections',
    category: 'math',
    position: [3.1, 1.2, 0.6],
    route: '/mathematics/math-10-conics',
    summary: 'Parabolas, ellipses, hyperbolas, and eccentricity.',
  },
  {
    id: 'kinematics',
    label: 'Kinematics & Projectile',
    category: 'physics',
    position: [-1.5, -0.2, 2.1],
    route: '/physics/phys-3-motion-plane',
    summary: '2D vector decomposition and gravitational trajectories.',
  },
  {
    id: 'shm',
    label: 'Oscillations & Waves',
    category: 'physics',
    position: [-2.8, -1.6, -1.2],
    route: '/physics/phys-13-oscillations',
    summary: 'Simple harmonic restoring forces and wave interference.',
  },
  {
    id: 'gravitation',
    label: 'Gravitation & Orbits',
    category: 'physics',
    position: [2.6, -0.8, 1.6],
    route: '/physics/phys-7-gravitation',
    summary: 'Orbital mechanics, Kepler laws, and escape speed.',
  },
  {
    id: 'thermo',
    label: 'Thermodynamics',
    category: 'physics',
    position: [1.4, -2.0, -1.8],
    route: '/physics/phys-11-thermodynamics',
    summary: 'PV cycles, First Law, and thermal energy efficiency.',
  },
  {
    id: 'sustainability',
    label: 'Sustainable Energy Models',
    category: 'application',
    position: [0, -2.6, 0.4],
    route: '/discovery?tab=sustainability',
    summary: 'Solar irradiance, wind power curves, and grid efficiency.',
  },
  {
    id: 'graph-studio',
    label: 'Equation-to-Graph Studio',
    category: 'tool',
    position: [0, 0.2, 0],
    route: '/lab?module=graph',
    summary: 'Central 2D/3D symbolic and numerical plotting engine.',
  },
];

export const KNOWLEDGE_NEXUS_EDGES: NexusEdge[] = [
  { from: 'trig', to: 'shm', relation: 'Sinusoidal Solution' },
  { from: 'trig', to: 'kinematics', relation: 'Vector Projection' },
  { from: 'calculus', to: 'kinematics', relation: 'v = dx/dt, a = dv/dt' },
  { from: 'conics', to: 'kinematics', relation: 'Parabolic Path' },
  { from: 'conics', to: 'gravitation', relation: 'Keplerian Ellipses' },
  { from: 'thermo', to: 'sustainability', relation: 'Carnot & Efficiency' },
  { from: 'shm', to: 'graph-studio', relation: 'Waveform Plot' },
  { from: 'calculus', to: 'graph-studio', relation: 'Tangent Analysis' },
  { from: 'gravitation', to: 'graph-studio', relation: 'Potential Curves' },
];

export interface SustainabilityCase {
  id: string;
  title: string;
  domain: string;
  description: string;
  mathConnection: string;
  physicsConnection: string;
  route: string;
  defaultParams: {
    labelA: string;
    minA: number;
    maxA: number;
    defaultA: number;
    unitA: string;
    labelB: string;
    minB: number;
    maxB: number;
    defaultB: number;
    unitB: string;
  };
}

export const SUSTAINABILITY_CASES: SustainabilityCase[] = [
  {
    id: 'solar-wind',
    title: 'Renewable Energy Modelling (Solar & Wind Power)',
    domain: 'AI for Better Life • Clean Energy',
    description:
      'Model solar photovoltaic output as a function of panel area, irradiance, and angle of incidence, or wind turbine power P = 0.5 · ρ · A · v³ · Cp.',
    mathConnection: 'Trigonometric projection cos(θ) & cubic power functions',
    physicsConnection: 'Work, Energy & Power + Fluid Kinetic Energy',
    route: '/physics/phys-5-work-energy',
    defaultParams: {
      labelA: 'Wind Speed v',
      minA: 2,
      maxA: 20,
      defaultA: 9,
      unitA: 'm/s',
      labelB: 'Rotor Swept Radius r',
      minB: 5,
      maxB: 60,
      defaultB: 25,
      unitB: 'm',
    },
  },
  {
    id: 'water-flow',
    title: 'Water Resource & Canal Distribution Modelling',
    domain: 'Viksit Bharat • Water Infrastructure',
    description:
      'Use continuity (A₁v₁ = A₂v₂) and Bernoulli pressure conservation to optimize irrigation canals and reduce pumping losses.',
    mathConnection: 'Linear inequalities & inverse proportionality',
    physicsConnection: 'Ch 9: Mechanical Properties of Fluids',
    route: '/physics/phys-9-fluids',
    defaultParams: {
      labelA: 'Channel Flow Speed',
      minA: 0.5,
      maxA: 8,
      defaultA: 2.5,
      unitA: 'm/s',
      labelB: 'Cross-Section Area',
      minB: 0.5,
      maxB: 20,
      defaultB: 4,
      unitB: 'm²',
    },
  },
  {
    id: 'building-efficiency',
    title: 'Thermal Efficiency & Passive Cooling Design',
    domain: 'Sustainable Infrastructure',
    description:
      'Quantify conductive heat flux through building envelopes to cut cooling energy demand using thermal conductivity and temperature gradients.',
    mathConnection: 'Rates of change & linear thermal gradients',
    physicsConnection: 'Ch 10 & 11: Thermal Properties & Thermodynamics',
    route: '/physics/phys-10-thermal',
    defaultParams: {
      labelA: 'Outside-Inside ΔT',
      minA: 2,
      maxA: 25,
      defaultA: 12,
      unitA: 'K',
      labelB: 'Wall Thermal Mass',
      minB: 100,
      maxB: 2000,
      defaultB: 800,
      unitB: 'kg',
    },
  },
];
