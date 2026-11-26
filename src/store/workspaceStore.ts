import { useState, useEffect, useCallback } from 'react';
import type {
  AppNotification,
  RecentConcept,
  SavedEquation,
  SavedExperiment,
  SavedGraph,
  SavedNote,
} from '@/types/scientific';

export interface WorkspaceState {
  profile: {
    displayName: string;
    role: string;
    preferredMode: 'interactive' | 'reduced-motion';
  };
  notes: SavedNote[];
  savedEquations: SavedEquation[];
  savedGraphs: SavedGraph[];
  savedExperiments: SavedExperiment[];
  bookmarks: string[];
  recentConcepts: RecentConcept[];
  notifications: AppNotification[];
}

/**
 * Repository abstraction so localStorage can be swapped cleanly for Supabase later.
 */
export interface WorkspaceRepository {
  load(): WorkspaceState;
  save(state: WorkspaceState): void;
}

const STORAGE_KEY = 'dimension_x_workspace_v1';

const DEFAULT_STATE: WorkspaceState = {
  profile: {
    displayName: 'Explorer',
    role: 'Scientific Researcher',
    preferredMode: 'interactive',
  },
  notes: [
    {
      id: 'note-welcome',
      title: 'Welcome to DIMENSION X Research Notebook',
      content:
        'Use this workspace to record derivations, simulation parameters, and theoretical vs. simulated comparisons across Mathematics and Physics.',
      tags: ['onboarding', 'research'],
      createdAt: '2026-11-25T10:00:00.000Z',
      updatedAt: '2026-11-25T10:00:00.000Z',
    },
  ],
  savedEquations: [
    {
      id: 'eq-damped-wave',
      label: 'Damped Harmonic Wave',
      expression: 'exp(-0.15 * x) * sin(4 * x)',
      latex: 'f(x) = e^{-0.15x} \\sin(4x)',
      domainMin: 0,
      domainMax: 15,
      notes: 'Models decaying oscillatory amplitude over spatial or temporal axis.',
      createdAt: '2026-11-25T10:05:00.000Z',
    },
  ],
  savedGraphs: [],
  savedExperiments: [],
  bookmarks: ['math-3-trig', 'phys-3-motion-plane', 'phys-13-oscillations'],
  recentConcepts: [],
  notifications: [
    {
      id: 'notif-init',
      title: 'DIMENSION X Core Online',
      message: 'All scientific domain engines and simulation modules are calibrated and online.',
      type: 'success',
      read: false,
      createdAt: '2026-11-25T10:00:00.000Z',
    },
  ],
};

class LocalWorkspaceRepository implements WorkspaceRepository {
  load(): WorkspaceState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_STATE;
      const parsed = JSON.parse(raw) as Partial<WorkspaceState>;
      return {
        ...DEFAULT_STATE,
        ...parsed,
        profile: { ...DEFAULT_STATE.profile, ...parsed.profile },
      };
    } catch {
      return DEFAULT_STATE;
    }
  }

  save(state: WorkspaceState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }
}

const repo = new LocalWorkspaceRepository();

let memoryState: WorkspaceState = typeof window !== 'undefined' ? repo.load() : DEFAULT_STATE;
const listeners = new Set<(state: WorkspaceState) => void>();

function updateGlobalState(updater: (prev: WorkspaceState) => WorkspaceState) {
  memoryState = updater(memoryState);
  repo.save(memoryState);
  listeners.forEach((fn) => fn(memoryState));
}

export function useWorkspace() {
  const [state, setState] = useState<WorkspaceState>(memoryState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  const addNote = useCallback((title: string, content: string, tags: string[] = []) => {
    const now = new Date().toISOString();
    const note: SavedNote = {
      id: `note-${Date.now()}`,
      title: title.trim() || 'Untitled Research Note',
      content,
      tags,
      createdAt: now,
      updatedAt: now,
    };
    updateGlobalState((s) => ({ ...s, notes: [note, ...s.notes] }));
    return note;
  }, []);

  const updateNote = useCallback((id: string, title: string, content: string, tags: string[]) => {
    const now = new Date().toISOString();
    updateGlobalState((s) => ({
      ...s,
      notes: s.notes.map((n) => (n.id === id ? { ...n, title, content, tags, updatedAt: now } : n)),
    }));
  }, []);

  const deleteNote = useCallback((id: string) => {
    updateGlobalState((s) => ({ ...s, notes: s.notes.filter((n) => n.id !== id) }));
  }, []);

  const saveEquation = useCallback(
    (eq: Omit<SavedEquation, 'id' | 'createdAt'>) => {
      const entry: SavedEquation = {
        ...eq,
        id: `eq-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      updateGlobalState((s) => ({
        ...s,
        savedEquations: [entry, ...s.savedEquations],
        notifications: [
          {
            id: `notif-${Date.now()}`,
            title: 'Equation Saved',
            message: `Saved "${entry.label}" to Personal Workspace.`,
            type: 'success',
            read: false,
            createdAt: new Date().toISOString(),
          },
          ...s.notifications.slice(0, 19),
        ],
      }));
    },
    []
  );

  const deleteEquation = useCallback((id: string) => {
    updateGlobalState((s) => ({
      ...s,
      savedEquations: s.savedEquations.filter((e) => e.id !== id),
    }));
  }, []);

  const saveGraph = useCallback((graph: Omit<SavedGraph, 'id' | 'createdAt'>) => {
    const entry: SavedGraph = {
      ...graph,
      id: `graph-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    updateGlobalState((s) => ({
      ...s,
      savedGraphs: [entry, ...s.savedGraphs],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: 'Graph Snapshot Saved',
          message: `"${entry.title}" added to Saved Graphs.`,
          type: 'success',
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...s.notifications.slice(0, 19),
      ],
    }));
  }, []);

  const deleteGraph = useCallback((id: string) => {
    updateGlobalState((s) => ({ ...s, savedGraphs: s.savedGraphs.filter((g) => g.id !== id) }));
  }, []);

  const saveExperiment = useCallback((exp: Omit<SavedExperiment, 'id' | 'createdAt'>) => {
    const entry: SavedExperiment = {
      ...exp,
      id: `exp-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    updateGlobalState((s) => ({
      ...s,
      savedExperiments: [entry, ...s.savedExperiments],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: 'Experiment Recorded',
          message: `Recorded "${entry.title}" (${entry.module}) to Experiment History.`,
          type: 'info',
          read: false,
          createdAt: new Date().toISOString(),
        },
        ...s.notifications.slice(0, 19),
      ],
    }));
  }, []);

  const deleteExperiment = useCallback((id: string) => {
    updateGlobalState((s) => ({
      ...s,
      savedExperiments: s.savedExperiments.filter((e) => e.id !== id),
    }));
  }, []);

  const toggleBookmark = useCallback((formulaOrConceptId: string) => {
    updateGlobalState((s) => {
      const exists = s.bookmarks.includes(formulaOrConceptId);
      return {
        ...s,
        bookmarks: exists
          ? s.bookmarks.filter((b) => b !== formulaOrConceptId)
          : [formulaOrConceptId, ...s.bookmarks],
      };
    });
  }, []);

  const recordConceptVisit = useCallback((concept: Omit<RecentConcept, 'visitedAt'>) => {
    updateGlobalState((s) => {
      const filtered = s.recentConcepts.filter((c) => c.id !== concept.id);
      return {
        ...s,
        recentConcepts: [
          { ...concept, visitedAt: new Date().toISOString() },
          ...filtered,
        ].slice(0, 12),
      };
    });
  }, []);

  const markNotificationsRead = useCallback(() => {
    updateGlobalState((s) => ({
      ...s,
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    }));
  }, []);

  const updateProfile = useCallback((displayName: string, role: string) => {
    updateGlobalState((s) => ({
      ...s,
      profile: { ...s.profile, displayName: displayName.trim() || 'Explorer', role },
    }));
  }, []);

  return {
    state,
    addNote,
    updateNote,
    deleteNote,
    saveEquation,
    deleteEquation,
    saveGraph,
    deleteGraph,
    saveExperiment,
    deleteExperiment,
    toggleBookmark,
    recordConceptVisit,
    markNotificationsRead,
    updateProfile,
  };
}
