export type Discipline = 'mathematics' | 'physics';

export interface FormulaEntry {
  id: string;
  discipline: Discipline;
  chapterNumber: number;
  chapterTitle: string;
  topic: string;
  name: string;
  latex: string;
  expression: string;
  definition: string;
  variables: Array<{ symbol: string; meaning: string; unit?: string }>;
  siUnit?: string;
  assumptions: string[];
  relatedFormulaIds: string[];
  conceptExplanation: string;
}

export interface WorkedExample {
  title: string;
  problem: string;
  given: string[];
  steps: string[];
  result: string;
}

export interface PracticeChallenge {
  id: string;
  prompt: string;
  hint: string;
  expectedNumeric?: number;
  expectedText?: string;
  tolerance?: number;
  unit?: string;
  solutionSteps: string[];
}

export interface ChapterDefinition {
  id: string;
  number: number;
  discipline: Discipline;
  domainCode?: string; // e.g. 'DOMAIN A'
  domainName?: string; // e.g. 'Foundations of Mathematics'
  title: string;
  subtitle: string;
  overview: string;
  definitions: Array<{ term: string; definition: string }>;
  formulas: Array<{
    name: string;
    latex: string;
    variables: string;
    siUnit?: string;
    assumptions?: string;
  }>;
  siUnits?: Array<{ quantity: string; unit: string; symbol: string }>;
  workedExamples: WorkedExample[];
  challenges: PracticeChallenge[];
  aiExplanationFocus: string;
  relatedConcepts: Array<{ title: string; route: string; discipline: Discipline | 'cross' }>;
  relatedExperiments: Array<{ title: string; route: string }>;
  toolId: string;
}

export interface SavedNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SavedEquation {
  id: string;
  label: string;
  expression: string;
  latex?: string;
  domainMin: number;
  domainMax: number;
  notes?: string;
  createdAt: string;
}

export interface SavedGraph {
  id: string;
  title: string;
  expressions: string[];
  mode: '2d' | '3d';
  params: Record<string, number>;
  createdAt: string;
}

export interface SavedExperiment {
  id: string;
  title: string;
  module: string;
  parameters: Record<string, number | string>;
  outputs: Record<string, number | string>;
  assumptions: string[];
  createdAt: string;
}

export interface RecentConcept {
  id: string;
  title: string;
  route: string;
  category: string;
  visitedAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  createdAt: string;
}
