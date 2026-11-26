import type { FormulaEntry } from '@/types/scientific';
import { MATH_CHAPTERS } from './mathChapters';
import { PHYSICS_CHAPTERS } from './physicsChapters';

/**
 * Full searchable Formula Vault covering foundational and advanced scientific domains.
 */
export const FORMULA_VAULT: FormulaEntry[] = [
  ...MATH_CHAPTERS.flatMap((ch) =>
    ch.formulas.map((f, idx) => ({
      id: `${ch.id}-f-${idx}`,
      discipline: 'mathematics' as const,
      chapterNumber: ch.number,
      chapterTitle: ch.title,
      topic: `${ch.domainCode ?? 'Domain'} • ${ch.title}`,
      name: f.name,
      latex: f.latex,
      expression: f.name,
      definition: ch.overview,
      variables: [{ symbol: 'Variables', meaning: f.variables }],
      siUnit: f.siUnit ?? 'Dimensionless / Pure Mathematical Units',
      assumptions: [f.assumptions ?? 'Standard real or complex mathematical domain with deterministic boundary conditions.'],
      relatedFormulaIds: [],
      conceptExplanation: ch.aiExplanationFocus,
    }))
  ),
  ...PHYSICS_CHAPTERS.flatMap((ch) =>
    ch.formulas.map((f, idx) => ({
      id: `${ch.id}-f-${idx}`,
      discipline: 'physics' as const,
      chapterNumber: ch.number,
      chapterTitle: ch.title,
      topic: `${ch.domainCode ?? 'Domain'} • ${ch.title}`,
      name: f.name,
      latex: f.latex,
      expression: f.name,
      definition: ch.overview,
      variables: [{ symbol: 'Variables', meaning: f.variables, unit: f.siUnit }],
      siUnit: f.siUnit ?? 'SI Standard Units',
      assumptions: [f.assumptions ?? 'Classical non-relativistic physical regime; idealized experimental boundary conditions.'],
      relatedFormulaIds: [],
      conceptExplanation: ch.aiExplanationFocus,
    }))
  ),
];
