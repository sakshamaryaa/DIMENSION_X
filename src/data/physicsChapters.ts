import type { ChapterDefinition } from '@/types/scientific';

export interface ScientificDomainInfo {
  code: string;
  name: string;
  description: string;
}

export const PHYSICS_DOMAINS: Record<string, ScientificDomainInfo> = {
  'DOMAIN-A': {
    code: 'DOMAIN A',
    name: 'Mechanics',
    description: 'Kinematics, Newtonian dynamics, work-energy theorem, rotational mechanics, and universal gravitation.',
  },
  'DOMAIN-B': {
    code: 'DOMAIN B',
    name: 'Properties of Matter',
    description: 'Elasticity, stress-strain relations, hydrostatics, Pascal’s law, buoyancy, and fluid flow.',
  },
  'DOMAIN-C': {
    code: 'DOMAIN C',
    name: 'Thermal Physics',
    description: 'Heat capacity, thermal expansion, thermodynamic laws, PV cycles, and kinetic molecular theory.',
  },
  'DOMAIN-D': {
    code: 'DOMAIN D',
    name: 'Oscillations and Waves',
    description: 'Periodic restoring forces, simple harmonic oscillators, wave kinematics, and acoustic superposition.',
  },
  'DOMAIN-E': {
    code: 'DOMAIN E',
    name: 'Measurement and Scientific Foundations',
    description: 'SI base quantities, dimensional homogeneity, significant figures, and experimental error analysis.',
  },
  'DOMAIN-F': {
    code: 'DOMAIN F',
    name: 'Computational Physics',
    description: 'Numerical ODE trajectory solving, collision momentum laboratory, and parameter perturbation modeling.',
  },
};

export const PHYSICS_CHAPTERS: ChapterDefinition[] = [
  {
    id: 'phys-1-units',
    number: 1,
    discipline: 'physics',
    domainCode: 'DOMAIN E',
    domainName: 'Measurement and Scientific Foundations',
    title: 'Units and Measurements',
    subtitle: 'SI Base Quantities, Dimensional Analysis & Error Propagation',
    overview:
      'Every quantitative scientific law rests on reproducible SI standards, dimensional consistency, significant figures, and bounded experimental uncertainty.',
    definitions: [
      { term: 'SI Base Units', definition: 'Seven fundamental units including metre (m), kilogram (kg), second (s), kelvin (K), ampere (A), mole (mol), candela (cd).' },
      { term: 'Dimensional Formula', definition: 'Expression showing powers of [M], [L], [T] representing a physical quantity.' },
    ],
    formulas: [
      { name: 'Power-Law Error Propagation', latex: '\\frac{\\Delta Z}{Z} = |p|\\frac{\\Delta A}{A} + |q|\\frac{\\Delta B}{B}', variables: 'Z = A^p B^q', siUnit: 'Dimensionless ratio' },
    ],
    siUnits: [
      { quantity: 'Length', unit: 'metre', symbol: 'm' },
      { quantity: 'Mass', unit: 'kilogram', symbol: 'kg' },
      { quantity: 'Time', unit: 'second', symbol: 's' },
    ],
    workedExamples: [
      {
        title: 'Relative Error in Sphere Volume',
        problem: 'Radius measurement has 2% uncertainty. What is the maximum percentage error in Volume V = (4/3)πr³?',
        given: ['Δr/r = 2%', 'Exponent of r = 3'],
        steps: ['ΔV/V = 3 × (Δr/r) = 3 × 2% = 6%.'],
        result: '6% uncertainty in volume.',
      },
    ],
    challenges: [
      {
        id: 'p1-c1',
        prompt: 'How many significant figures are in 0.00450 m?',
        hint: 'Leading zeros are not significant; trailing zeros after a decimal point are.',
        expectedNumeric: 3,
        tolerance: 0,
        solutionSteps: ['Digits 4, 5, and trailing 0 are significant ⟹ 3 significant figures.'],
      },
    ],
    aiExplanationFocus: 'Dimensional homogeneity checks and fractional uncertainty propagation.',
    relatedConcepts: [
      { title: 'Statistics & Variance', route: '/mathematics/math-13-statistics', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: 'Data Intelligence Lab', route: '/lab?module=data' }],
    toolId: 'units',
  },
  {
    id: 'phys-2-motion-line',
    number: 2,
    discipline: 'physics',
    domainCode: 'DOMAIN A',
    domainName: 'Mechanics',
    title: 'Motion in a Straight Line',
    subtitle: 'Kinematics, Instantaneous Velocity & Motion Graphs',
    overview:
      'One-dimensional kinematics relates displacement, velocity, and acceleration via calculus and uniform-acceleration equations.',
    definitions: [
      { term: 'Instantaneous Velocity', definition: 'v = dx/dt, slope of the position-time tangent.' },
      { term: 'Acceleration', definition: 'a = dv/dt, rate of change of velocity.' },
    ],
    formulas: [
      { name: 'Velocity-Time', latex: 'v = u + at', variables: 'u: initial velocity, a: constant acceleration', siUnit: 'm/s' },
      { name: 'Position-Time', latex: 's = ut + \\frac{1}{2}at^2', variables: 's: displacement', siUnit: 'm' },
      { name: 'Velocity-Displacement', latex: 'v^2 = u^2 + 2as', variables: 'Time-independent kinematic equation', siUnit: 'm²/s²' },
    ],
    siUnits: [
      { quantity: 'Displacement', unit: 'metre', symbol: 'm' },
      { quantity: 'Velocity', unit: 'metre per second', symbol: 'm/s' },
      { quantity: 'Acceleration', unit: 'metre per second squared', symbol: 'm/s²' },
    ],
    workedExamples: [
      {
        title: 'Uniform Braking Distance',
        problem: 'A vehicle at 20 m/s decelerates at -4 m/s² until stopping. Find stopping distance.',
        given: ['u = 20 m/s, v = 0, a = -4 m/s²'],
        steps: ['0² = 20² + 2(-4)s', '8s = 400 ⟹ s = 50 m.'],
        result: '50 m',
      },
    ],
    challenges: [
      {
        id: 'p2-c1',
        prompt: 'Starting from rest (u=0) with a = 3 m/s², what is the velocity after 4 s (in m/s)?',
        hint: 'v = u + at.',
        expectedNumeric: 12,
        tolerance: 0.01,
        unit: 'm/s',
        solutionSteps: ['v = 0 + 3 × 4 = 12 m/s.'],
      },
    ],
    aiExplanationFocus: 'Area under v-t curve as displacement and slope as acceleration.',
    relatedConcepts: [
      { title: 'Limits & Derivatives', route: '/mathematics/math-12-limits', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: 'Universal Simulation Sandbox', route: '/lab?module=sandbox' }],
    toolId: 'kinematics1d',
  },
  {
    id: 'phys-3-motion-plane',
    number: 3,
    discipline: 'physics',
    domainCode: 'DOMAIN A',
    domainName: 'Mechanics',
    title: 'Motion in a Plane (Vectors & Projectiles)',
    subtitle: '2D Vectors, Projectile Trajectory & Relative Velocity',
    overview:
      'Independence of perpendicular components transforms 2D projectile motion into coupled horizontal uniform motion and vertical free fall.',
    definitions: [
      { term: 'Projectile', definition: 'Object launched into space moving under gravity alone (air resistance neglected).' },
      { term: 'Range (R)', definition: 'Horizontal distance covered when returning to launch elevation.' },
    ],
    formulas: [
      { name: 'Time of Flight (h₀=0)', latex: 'T = \\frac{2u\\sin\\theta}{g}', variables: 'u: launch speed, θ: launch angle', siUnit: 's' },
      { name: 'Horizontal Range', latex: 'R = \\frac{u^2\\sin(2\\theta)}{g}', variables: 'Maximum at θ = 45°', siUnit: 'm' },
      { name: 'Maximum Height', latex: 'H = \\frac{u^2\\sin^2\\theta}{2g}', variables: 'Vertical peak', siUnit: 'm' },
    ],
    siUnits: [
      { quantity: 'Speed', unit: 'metre per second', symbol: 'm/s' },
      { quantity: 'Angle', unit: 'radian / degree', symbol: 'rad' },
    ],
    workedExamples: [
      {
        title: 'Optimal 45° Launch',
        problem: 'Find range for u = 20 m/s at θ = 45° (g = 9.8 m/s²).',
        given: ['u = 20 m/s, θ = 45°, g = 9.8 m/s²'],
        steps: ['R = (400 × sin 90°) / 9.8 = 400 / 9.8 ≈ 40.82 m.'],
        result: '40.82 m',
      },
    ],
    challenges: [
      {
        id: 'p3-c1',
        prompt: 'At what launch angle (in degrees, between 0 and 90) is horizontal range maximized on level ground?',
        hint: 'sin(2θ) reaches maximum 1 when 2θ = 90°.',
        expectedNumeric: 45,
        tolerance: 0.1,
        unit: '°',
        solutionSteps: ['2θ = 90° ⟹ θ = 45°.'],
      },
    ],
    aiExplanationFocus: 'Parabolic trajectory equation y(x) and orthogonal velocity decoupling.',
    relatedConcepts: [
      { title: 'Trigonometric Functions', route: '/mathematics/math-3-trig', discipline: 'mathematics' },
      { title: 'Conic Sections (Parabola)', route: '/mathematics/math-10-conics', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: 'Virtual Physics Lab', route: '/lab?module=physics' }],
    toolId: 'projectile',
  },
  {
    id: 'phys-4-laws-motion',
    number: 4,
    discipline: 'physics',
    domainCode: 'DOMAIN A',
    domainName: 'Mechanics',
    title: 'Laws of Motion & Friction',
    subtitle: "Newton's Laws, Free-Body Diagrams & Friction Dynamics",
    overview:
      'Newtonian mechanics connects forces to momentum change, governing static equilibrium, friction thresholds, and constrained motion on inclines.',
    definitions: [
      { term: "Newton's Second Law", definition: 'F_net = dp/dt = ma for constant mass in an inertial frame.' },
      { term: 'Limiting Static Friction', definition: 'f_s,max = μ_s · N, maximum resistive force before slip occurs.' },
    ],
    formulas: [
      { name: 'Second Law', latex: '\\vec{F}_{\\text{net}} = m\\vec{a}', variables: 'm: inertial mass', siUnit: 'N (kg·m/s²)' },
      { name: 'Incline Acceleration', latex: 'a = g(\\sin\\theta - \\mu_k \\cos\\theta)', variables: 'When mg sinθ > μ_s mg cosθ', siUnit: 'm/s²' },
    ],
    siUnits: [
      { quantity: 'Force', unit: 'newton', symbol: 'N' },
      { quantity: 'Coefficient of Friction', unit: 'dimensionless', symbol: 'μ' },
    ],
    workedExamples: [
      {
        title: 'Slip Threshold on Incline',
        problem: 'A block sits on a ramp with μ_s = 0.5. Find the critical angle θ_c.',
        given: ['tan(θ_c) = μ_s = 0.5'],
        steps: ['θ_c = arctan(0.5) ≈ 26.57°.'],
        result: '26.57°',
      },
    ],
    challenges: [
      {
        id: 'p4-c1',
        prompt: 'A 5 kg mass accelerates at 3 m/s². What is the net force in newtons?',
        hint: 'F = ma.',
        expectedNumeric: 15,
        tolerance: 0.01,
        unit: 'N',
        solutionSteps: ['F = 5 × 3 = 15 N.'],
      },
    ],
    aiExplanationFocus: 'Normal force resolution and static vs. kinetic friction transition.',
    relatedConcepts: [
      { title: 'Straight Lines & Slopes', route: '/mathematics/math-9-lines', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: 'Collision Lab', route: '/lab?module=collision' }],
    toolId: 'lawsMotion',
  },
  {
    id: 'phys-5-work-energy',
    number: 5,
    discipline: 'physics',
    domainCode: 'DOMAIN A',
    domainName: 'Mechanics',
    title: 'Work, Energy and Power',
    subtitle: 'Work-Energy Theorem, Conservative Forces & Power',
    overview:
      'Energy conservation provides a scalar invariant across mechanical transformations, linking force-displacement integrals to kinetic and potential energy.',
    definitions: [
      { term: 'Mechanical Work', definition: 'W = F · d · cos(θ), energy transferred by a force over displacement.' },
      { term: 'Instantaneous Power', definition: 'P = dW/dt = F · v.' },
    ],
    formulas: [
      { name: 'Work-Energy Theorem', latex: 'W_{\\text{net}} = \\Delta K = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2', variables: 'K: kinetic energy', siUnit: 'J' },
      { name: 'Power', latex: 'P = \\frac{W}{t} = \\vec{F}\\cdot\\vec{v}', variables: 'Rate of work', siUnit: 'W (J/s)' },
    ],
    siUnits: [
      { quantity: 'Work / Energy', unit: 'joule', symbol: 'J' },
      { quantity: 'Power', unit: 'watt', symbol: 'W' },
    ],
    workedExamples: [
      {
        title: 'Work by Angled Force',
        problem: 'A 10 N force pulls a crate 5 m at 60° above horizontal. Find work done.',
        given: ['F=10 N, d=5 m, θ=60°'],
        steps: ['W = 10 × 5 × cos(60°) = 50 × 0.5 = 25 J.'],
        result: '25 J',
      },
    ],
    challenges: [
      {
        id: 'p5-c1',
        prompt: 'What is the kinetic energy (in J) of a 4 kg object moving at 3 m/s?',
        hint: 'KE = 0.5 * m * v².',
        expectedNumeric: 18,
        tolerance: 0.01,
        unit: 'J',
        solutionSteps: ['0.5 × 4 × 3² = 18 J.'],
      },
    ],
    aiExplanationFocus: 'Scalar dot-product work and mechanical energy conservation.',
    relatedConcepts: [
      { title: 'Collision Lab', route: '/lab?module=collision', discipline: 'cross' },
    ],
    relatedExperiments: [{ title: 'Collision Lab', route: '/lab?module=collision' }],
    toolId: 'workEnergy',
  },
  {
    id: 'phys-6-rotational',
    number: 6,
    discipline: 'physics',
    domainCode: 'DOMAIN A',
    domainName: 'Mechanics',
    title: 'System of Particles and Rotational Motion',
    subtitle: 'Torque, Moment of Inertia & Angular Momentum',
    overview:
      'Rotational dynamics extends linear mechanics to extended rigid bodies, replacing mass with moment of inertia and force with torque.',
    definitions: [
      { term: 'Torque (τ)', definition: 'τ = r × F, rotational analogue of force.' },
      { term: 'Moment of Inertia (I)', definition: 'I = ∑ mᵢ rᵢ², resistance to angular acceleration about an axis.' },
    ],
    formulas: [
      { name: 'Rotational Dynamics', latex: '\\tau = I\\alpha, \\quad L = I\\omega', variables: 'α: angular acceleration, ω: angular velocity', siUnit: 'N·m / kg·m²/s' },
      { name: 'Rotational KE', latex: 'K_{\\text{rot}} = \\frac{1}{2}I\\omega^2', variables: 'I: moment of inertia', siUnit: 'J' },
    ],
    siUnits: [
      { quantity: 'Torque', unit: 'newton-metre', symbol: 'N·m' },
      { quantity: 'Moment of Inertia', unit: 'kilogram metre squared', symbol: 'kg·m²' },
    ],
    workedExamples: [
      {
        title: 'Solid Sphere Moment of Inertia',
        problem: 'Compute I for a 5 kg solid sphere of radius 0.4 m.',
        given: ['I = (2/5)MR²'],
        steps: ['I = 0.4 × 5 × (0.4)² = 2 × 0.16 = 0.32 kg·m².'],
        result: '0.32 kg·m²',
      },
    ],
    challenges: [
      {
        id: 'p6-c1',
        prompt: 'If I = 2 kg·m² and ω = 5 rad/s, what is the angular momentum L (in kg·m²/s)?',
        hint: 'L = Iω.',
        expectedNumeric: 10,
        tolerance: 0.01,
        unit: 'kg·m²/s',
        solutionSteps: ['L = 2 × 5 = 10 kg·m²/s.'],
      },
    ],
    aiExplanationFocus: 'Parallel/perpendicular axis theorems and conservation of angular momentum.',
    relatedConcepts: [
      { title: '3D Coordinate Systems', route: '/mathematics/math-11-3d', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: '3D Mathematical Universe', route: '/lab?module=3d' }],
    toolId: 'rotational',
  },
  {
    id: 'phys-7-gravitation',
    number: 7,
    discipline: 'physics',
    domainCode: 'DOMAIN A',
    domainName: 'Mechanics',
    title: 'Gravitation & Orbital Dynamics',
    subtitle: "Newton's Law, Orbital Velocity, Escape Speed & Kepler Orbits",
    overview:
      'Universal gravitation binds planets, satellites, and galaxies through an inverse-square central potential.',
    definitions: [
      { term: 'Orbital Velocity (v₀)', definition: 'Tangential speed needed for a circular orbit at radius r.' },
      { term: 'Escape Velocity (vₑ)', definition: 'Minimum launch speed to reach infinity with zero residual kinetic energy.' },
    ],
    formulas: [
      { name: 'Orbital & Escape Speed', latex: 'v_o = \\sqrt{\\frac{GM}{r}}, \\quad v_e = \\sqrt{2}\\,v_o', variables: 'G = 6.674×10⁻¹¹ N·m²/kg²', siUnit: 'm/s' },
      { name: "Kepler's Third Law", latex: 'T^2 = \\frac{4\\pi^2}{GM}r^3', variables: 'T: orbital period', siUnit: 's²' },
    ],
    siUnits: [
      { quantity: 'Gravitational Field', unit: 'N/kg (m/s²)', symbol: 'g' },
      { quantity: 'Velocity', unit: 'metre per second', symbol: 'm/s' },
    ],
    workedExamples: [
      {
        title: 'Earth Escape Speed Ratio',
        problem: 'If low-Earth orbital speed is ~7.91 km/s, find escape speed.',
        given: ['v_e = √2 · v_o'],
        steps: ['v_e ≈ 1.4142 × 7.91 ≈ 11.18 km/s.'],
        result: '11.18 km/s',
      },
    ],
    challenges: [
      {
        id: 'p7-c1',
        prompt: 'What is the exact ratio v_escape / v_orbital for a circular orbit at radius r (to 2 decimals)?',
        hint: '√2.',
        expectedNumeric: 1.41,
        tolerance: 0.02,
        solutionSteps: ['v_e / v_o = √2 ≈ 1.414.'],
      },
    ],
    aiExplanationFocus: 'Inverse-square gravity decay and total mechanical energy of bound orbits.',
    relatedConcepts: [
      { title: 'Conic Sections (Ellipses)', route: '/mathematics/math-10-conics', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: 'Virtual Physics Lab', route: '/lab?module=physics' }],
    toolId: 'gravitation',
  },
  {
    id: 'phys-8-solids',
    number: 8,
    discipline: 'physics',
    domainCode: 'DOMAIN B',
    domainName: 'Properties of Matter',
    title: 'Mechanical Properties of Solids',
    subtitle: "Stress, Strain, Hooke's Law & Young's Modulus",
    overview:
      'Continuum elasticity characterizes how engineering materials deform reversibly under tensile, compressive, and shear loads.',
    definitions: [
      { term: 'Tensile Stress (σ)', definition: 'Internal restoring force per unit cross-sectional area (F/A).' },
      { term: "Young's Modulus (Y)", definition: 'Ratio of longitudinal stress to longitudinal strain within elastic limit.' },
    ],
    formulas: [
      { name: "Hooke's Law", latex: 'Y = \\frac{\\sigma}{\\varepsilon} = \\frac{F L}{A \\Delta L}', variables: 'σ: stress, ε: strain', siUnit: 'Pa (N/m²)' },
      { name: 'Elastic Energy Density', latex: 'u = \\frac{1}{2}\\sigma\\varepsilon', variables: 'Energy per unit volume', siUnit: 'J/m³' },
    ],
    siUnits: [
      { quantity: 'Stress / Modulus', unit: 'pascal', symbol: 'Pa' },
      { quantity: 'Strain', unit: 'dimensionless', symbol: 'ε' },
    ],
    workedExamples: [
      {
        title: 'Steel Wire Elongation',
        problem: 'A 2 m steel wire (A = 1 mm², Y = 200 GPa) carries 200 N. Find ΔL.',
        given: ['F=200 N, L=2 m, A=10⁻⁶ m², Y=2×10¹¹ Pa'],
        steps: ['ΔL = FL/(AY) = (200×2)/(10⁻⁶×2×10¹¹) = 400 / 2×10⁵ = 0.002 m = 2 mm.'],
        result: '2 mm',
      },
    ],
    challenges: [
      {
        id: 'p8-c1',
        prompt: 'If a force of 500 N acts on an area of 0.5 m², what is the stress in Pa?',
        hint: 'σ = F / A.',
        expectedNumeric: 1000,
        tolerance: 0.1,
        unit: 'Pa',
        solutionSteps: ['σ = 500 / 0.5 = 1000 Pa.'],
      },
    ],
    aiExplanationFocus: 'Elastic proportionality limit, yield point, and structural safety factors.',
    relatedConcepts: [
      { title: 'Linear Functions & Slope', route: '/mathematics/math-9-lines', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: 'Model Comparison Lab', route: '/lab?module=compare' }],
    toolId: 'solids',
  },
  {
    id: 'phys-9-fluids',
    number: 9,
    discipline: 'physics',
    domainCode: 'DOMAIN B',
    domainName: 'Properties of Matter',
    title: 'Mechanical Properties of Fluids',
    subtitle: "Hydrostatic Pressure, Continuity & Bernoulli's Principle",
    overview:
      'Fluid mechanics describes pressure variation with depth and energy conservation along steady incompressible streamlines.',
    definitions: [
      { term: 'Hydrostatic Pressure', definition: 'P = P₀ + ρgh at depth h in an incompressible fluid.' },
      { term: 'Continuity Equation', definition: 'A₁v₁ = A₂v₂ for steady incompressible flow.' },
    ],
    formulas: [
      { name: "Bernoulli's Equation", latex: 'P + \\frac{1}{2}\\rho v^2 + \\rho gh = \\text{constant}', variables: 'ρ: fluid density', siUnit: 'Pa' },
      { name: 'Continuity', latex: 'A_1 v_1 = A_2 v_2', variables: 'Volume flow rate Q', siUnit: 'm³/s' },
    ],
    siUnits: [
      { quantity: 'Pressure', unit: 'pascal', symbol: 'Pa' },
      { quantity: 'Density', unit: 'kg/m³', symbol: 'ρ' },
    ],
    workedExamples: [
      {
        title: 'Pipe Constriction Speedup',
        problem: 'Water enters a pipe at 2 m/s through area 10 cm² and exits at 5 cm². Find exit speed.',
        given: ['A₁=10, v₁=2, A₂=5'],
        steps: ['v₂ = (A₁/A₂)v₁ = (10/5)×2 = 4 m/s.'],
        result: '4 m/s',
      },
    ],
    challenges: [
      {
        id: 'p9-c1',
        prompt: 'In steady incompressible flow, if cross-sectional area halves, by what factor does fluid speed multiply?',
        hint: 'A₁v₁ = A₂v₂.',
        expectedNumeric: 2,
        tolerance: 0.001,
        solutionSteps: ['v₂ = (A₁ / (0.5 A₁)) v₁ = 2 v₁.'],
      },
    ],
    aiExplanationFocus: 'Venturi pressure drop and conservation of energy density.',
    relatedConcepts: [
      { title: 'Water Resource Modelling', route: '/discovery?tab=sustainability', discipline: 'cross' },
    ],
    relatedExperiments: [{ title: 'Universal Simulation Sandbox', route: '/lab?module=sandbox' }],
    toolId: 'fluids',
  },
  {
    id: 'phys-10-thermal',
    number: 10,
    discipline: 'physics',
    domainCode: 'DOMAIN C',
    domainName: 'Thermal Physics',
    title: 'Thermal Properties of Matter',
    subtitle: 'Thermal Expansion, Calorimetry & Heat Transfer',
    overview:
      'Thermal physics tracks dimensional expansion with temperature and quantitative heat exchange across solids, liquids, and radiation.',
    definitions: [
      { term: 'Specific Heat Capacity (c)', definition: 'Heat required to raise 1 kg of a substance by 1 K.' },
      { term: 'Linear Expansion (α)', definition: 'Fractional change in length per kelvin temperature rise.' },
    ],
    formulas: [
      { name: 'Calorimetry', latex: 'Q = mc\\Delta T', variables: 'm: mass, c: specific heat', siUnit: 'J' },
      { name: 'Linear Expansion', latex: '\\Delta L = L_0 \\alpha \\Delta T', variables: 'α: linear coefficient (K⁻¹)', siUnit: 'm' },
    ],
    siUnits: [
      { quantity: 'Temperature', unit: 'kelvin', symbol: 'K' },
      { quantity: 'Specific Heat', unit: 'J/(kg·K)', symbol: 'c' },
    ],
    workedExamples: [
      {
        title: 'Heating Water',
        problem: 'Heat 2 kg of water (c = 4186 J/kg·K) by 10 K.',
        given: ['m=2 kg, c=4186, ΔT=10 K'],
        steps: ['Q = 2 × 4186 × 10 = 83,720 J.'],
        result: '83.72 kJ',
      },
    ],
    challenges: [
      {
        id: 'p10-c1',
        prompt: 'How much heat (in J) raises 1 kg of a substance with c = 500 J/(kg·K) by 4 K?',
        hint: 'Q = mcΔT.',
        expectedNumeric: 2000,
        tolerance: 0.1,
        unit: 'J',
        solutionSteps: ['Q = 1 × 500 × 4 = 2000 J.'],
      },
    ],
    aiExplanationFocus: 'Thermal expansion coefficients and calorimetry energy balance.',
    relatedConcepts: [
      { title: 'Thermodynamics', route: '/physics/phys-11-thermodynamics', discipline: 'physics' },
    ],
    relatedExperiments: [{ title: 'Renewable Energy Modelling', route: '/discovery?tab=sustainability' }],
    toolId: 'thermal',
  },
  {
    id: 'phys-11-thermodynamics',
    number: 11,
    discipline: 'physics',
    domainCode: 'DOMAIN C',
    domainName: 'Thermal Physics',
    title: 'Thermodynamics',
    subtitle: 'PV Diagrams, First Law, Adiabatic Processes & Carnot Cycles',
    overview:
      'Thermodynamics governs macroscopic energy conversion between heat, work, and internal energy through state variables (P, V, T).',
    definitions: [
      { term: 'First Law', definition: 'ΔQ = ΔU + ΔW, conservation of thermal and mechanical energy.' },
      { term: 'Adiabatic Process', definition: 'Thermodynamic transformation with zero heat exchange (ΔQ = 0).' },
    ],
    formulas: [
      { name: 'First Law', latex: '\\Delta Q = \\Delta U + \\Delta W', variables: 'ΔW = ∫ P dV', siUnit: 'J' },
      { name: 'Isothermal Work', latex: 'W = nRT\\ln\\left(\\frac{V_2}{V_1}\\right)', variables: 'Constant T', siUnit: 'J' },
    ],
    siUnits: [
      { quantity: 'Heat / Work / ΔU', unit: 'joule', symbol: 'J' },
      { quantity: 'Gas Constant R', unit: '8.314 J/(mol·K)', symbol: 'R' },
    ],
    workedExamples: [
      {
        title: 'Isochoric Heating',
        problem: 'If 400 J of heat enters a rigid sealed gas container (ΔV = 0), find ΔU.',
        given: ['ΔQ = 400 J, ΔW = PΔV = 0'],
        steps: ['ΔU = ΔQ - ΔW = 400 - 0 = 400 J.'],
        result: '400 J',
      },
    ],
    challenges: [
      {
        id: 'p11-c1',
        prompt: 'In an adiabatic expansion, ΔQ = 0 and the gas does 150 J of work (ΔW = +150 J). What is ΔU (in J)?',
        hint: 'ΔU = ΔQ - ΔW.',
        expectedNumeric: -150,
        tolerance: 0.1,
        unit: 'J',
        solutionSteps: ['ΔU = 0 - 150 = -150 J.'],
      },
    ],
    aiExplanationFocus: 'Area under PV curves and thermodynamic path dependence.',
    relatedConcepts: [
      { title: 'Kinetic Theory', route: '/physics/phys-12-kinetic', discipline: 'physics' },
    ],
    relatedExperiments: [{ title: 'Equation-to-Graph Studio', route: '/lab?module=graph' }],
    toolId: 'thermodynamics',
  },
  {
    id: 'phys-12-kinetic',
    number: 12,
    discipline: 'physics',
    domainCode: 'DOMAIN C',
    domainName: 'Thermal Physics',
    title: 'Kinetic Theory of Gases',
    subtitle: 'Molecular Speeds, Ideal Gas Pressure & Equipartition',
    overview:
      'Kinetic theory bridges microscopic particle collisions with macroscopic temperature, pressure, and heat capacities.',
    definitions: [
      { term: 'RMS Speed (v_rms)', definition: 'Square root of mean squared molecular speeds: √(3RT/M).' },
      { term: 'Equipartition Theorem', definition: 'Each quadratic degree of freedom contributes (1/2)k_B T average energy per molecule.' },
    ],
    formulas: [
      { name: 'Ideal Gas Law', latex: 'PV = nRT = Nk_BT', variables: 'R = 8.314 J/(mol·K)', siUnit: 'Pa·m³ = J' },
      { name: 'RMS Speed', latex: 'v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}', variables: 'M: molar mass in kg/mol', siUnit: 'm/s' },
    ],
    siUnits: [
      { quantity: 'RMS Speed', unit: 'metre per second', symbol: 'm/s' },
      { quantity: 'Translational KE', unit: 'joule', symbol: 'J' },
    ],
    workedExamples: [
      {
        title: 'Temperature Scaling of v_rms',
        problem: 'If absolute temperature T quadruples from 300 K to 1200 K, how does v_rms change?',
        given: ['v_rms ∝ √T'],
        steps: ['√(1200 / 300) = √4 = 2. Speed doubles.'],
        result: 'v_rms doubles (×2).',
      },
    ],
    challenges: [
      {
        id: 'p12-c1',
        prompt: 'A monoatomic ideal gas molecule has how many translational degrees of freedom?',
        hint: 'Motion along x, y, and z axes.',
        expectedNumeric: 3,
        tolerance: 0,
        solutionSteps: ['3 translational degrees of freedom (x, y, z).'],
      },
    ],
    aiExplanationFocus: 'Maxwell-Boltzmann speed hierarchy v_mp < v_avg < v_rms.',
    relatedConcepts: [
      { title: 'Statistics & RMS', route: '/mathematics/math-13-statistics', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: 'Chaos & Probability Lab', route: '/lab?module=chaos' }],
    toolId: 'kinetic',
  },
  {
    id: 'phys-13-oscillations',
    number: 13,
    discipline: 'physics',
    domainCode: 'DOMAIN D',
    domainName: 'Oscillations and Waves',
    title: 'Oscillations & Harmonic Motion',
    subtitle: 'Simple Harmonic Motion, Spring-Mass Systems & Pendulums',
    overview:
      'Whenever restoring force is proportional to negative displacement (F = -kx), systems undergo sinusoidal Simple Harmonic Motion.',
    definitions: [
      { term: 'Simple Harmonic Motion (SHM)', definition: 'Periodic motion with acceleration a = -ω²x directed toward equilibrium.' },
      { term: 'Angular Frequency (ω)', definition: 'ω = √(k/m) = 2πf.' },
    ],
    formulas: [
      { name: 'SHM Displacement', latex: 'x(t) = A\\cos(\\omega t + \\phi)', variables: 'A: amplitude, φ: phase', siUnit: 'm' },
      { name: 'Spring-Mass Period', latex: 'T = 2\\pi\\sqrt{\\frac{m}{k}}', variables: 'm: mass, k: spring constant', siUnit: 's' },
    ],
    siUnits: [
      { quantity: 'Frequency', unit: 'hertz', symbol: 'Hz (s⁻¹)' },
      { quantity: 'Spring Constant', unit: 'N/m', symbol: 'k' },
    ],
    workedExamples: [
      {
        title: 'Spring Oscillator Period',
        problem: 'Find T for m = 1 kg on a spring of k = 100 N/m.',
        given: ['m=1 kg, k=100 N/m'],
        steps: ['ω = √(100/1) = 10 rad/s.', 'T = 2π / 10 ≈ 0.628 s.'],
        result: '0.628 s',
      },
    ],
    challenges: [
      {
        id: 'p13-c1',
        prompt: 'If spring constant k = 36 N/m and mass m = 1 kg, what is angular frequency ω (in rad/s)?',
        hint: 'ω = √(k/m).',
        expectedNumeric: 6,
        tolerance: 0.01,
        unit: 'rad/s',
        solutionSteps: ['ω = √(36/1) = 6 rad/s.'],
      },
    ],
    aiExplanationFocus: 'Continuous KE ↔ PE energy exchange in undamped and damped SHM.',
    relatedConcepts: [
      { title: 'Trigonometric Functions', route: '/mathematics/math-3-trig', discipline: 'mathematics' },
    ],
    relatedExperiments: [{ title: 'Virtual Physics Lab', route: '/lab?module=physics' }],
    toolId: 'oscillations',
  },
  {
    id: 'phys-14-waves',
    number: 14,
    discipline: 'physics',
    domainCode: 'DOMAIN D',
    domainName: 'Oscillations and Waves',
    title: 'Waves & Superposition',
    subtitle: 'Travelling Waves, Superposition, Interference & Beats',
    overview:
      'Waves transport energy and momentum without net matter transport, exhibiting constructive/destructive interference and beat modulation.',
    definitions: [
      { term: 'Wavelength (λ)', definition: 'Spatial distance between two consecutive in-phase crests.' },
      { term: 'Principle of Superposition', definition: 'Resultant displacement equals the algebraic sum of individual wave displacements.' },
    ],
    formulas: [
      { name: 'Wave Relation', latex: 'v = f\\lambda = \\frac{\\omega}{k}', variables: 'f: frequency, λ: wavelength', siUnit: 'm/s' },
      { name: 'Beat Frequency', latex: 'f_{\\text{beat}} = |f_1 - f_2|', variables: 'Superposition of close frequencies', siUnit: 'Hz' },
    ],
    siUnits: [
      { quantity: 'Wavelength', unit: 'metre', symbol: 'm' },
      { quantity: 'Wave Number k', unit: 'rad/m', symbol: 'k' },
    ],
    workedExamples: [
      {
        title: 'Calculating Wavelength',
        problem: 'A wave travels at 340 m/s with frequency 170 Hz. Find wavelength λ.',
        given: ['v=340 m/s, f=170 Hz'],
        steps: ['λ = v / f = 340 / 170 = 2 m.'],
        result: '2 m',
      },
    ],
    challenges: [
      {
        id: 'p14-c1',
        prompt: 'Two sound waves of 256 Hz and 260 Hz interfere. What is the beat frequency (in Hz)?',
        hint: '|f₁ - f₂|.',
        expectedNumeric: 4,
        tolerance: 0.001,
        unit: 'Hz',
        solutionSteps: ['|256 - 260| = 4 Hz.'],
      },
    ],
    aiExplanationFocus: 'Phase difference constructive/destructive interference and beats.',
    relatedConcepts: [
      { title: 'Trigonometric Graphs', route: '/mathematics/math-3-trig', discipline: 'mathematics' },
      { title: 'Oscillations', route: '/physics/phys-13-oscillations', discipline: 'physics' },
    ],
    relatedExperiments: [{ title: 'Wave Interference Lab', route: '/physics/phys-14-waves' }],
    toolId: 'waves',
  },
];
