import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Edit3, FileText, FlaskConical, LineChart, Plus, Trash2 } from 'lucide-react';
import { FORMULA_VAULT } from '@/data/formulaVaultData';
import { Badge, Button, EmptyState } from '@/components/ui/Primitives';
import { MathFormula } from '@/components/ui/MathFormula';
import { useWorkspace } from '@/store/workspaceStore';

export const WorkspacePage: React.FC = () => {
  const {
    state,
    addNote,
    updateNote,
    deleteNote,
    deleteEquation,
    deleteGraph,
    deleteExperiment,
    toggleBookmark,
  } = useWorkspace();

  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTags, setNoteTags] = useState('physics, notes');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = noteTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (editingId) {
      updateNote(editingId, noteTitle, noteContent, tags);
      setEditingId(null);
    } else {
      addNote(noteTitle, noteContent, tags);
    }
    setNoteTitle('');
    setNoteContent('');
  };

  const bookmarkedFormulas = FORMULA_VAULT.filter((f) => state.bookmarks.includes(f.id));

  return (
    <div className="mx-auto max-w-[1440px] space-y-10 px-4 py-8 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge tone="cyan">PERSONAL WORKSPACE</Badge>
          <h1 className="mt-2 dx-editorial-heading text-[#EAF4FF]">
            RESEARCH <span className="text-[#00D9FF]">NOTEBOOK</span>
          </h1>
          <p className="text-sm text-[#91A3BA]">
            Persistent local research storage for derivations, parameter snapshots, saved equations, and bookmarked scientific concepts.
          </p>
        </div>
        <div className="text-xs font-mono text-[#91A3BA]">
          {state.notes.length} Notes • {state.savedExperiments.length} Experiments •{' '}
          {state.savedEquations.length} Equations
        </div>
      </div>

      {/* Research Notebook Pro */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <form onSubmit={handleSaveNote} className="lg:col-span-5 dx-card p-6 space-y-4">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-[#EAF4FF]">
            <FileText className="h-5 w-5 text-[#00D9FF]" />
            {editingId ? 'Edit Research Note' : 'New Research Note'}
          </div>
          <input
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Note title (e.g., Projectile Range Derivation)"
            className="w-full rounded-xl border border-[#91A3BA]/25 bg-[#080D18] px-3.5 py-2.5 text-sm text-[#EAF4FF]"
            required
          />
          <textarea
            rows={5}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Write observations, derivations, or simulation insights..."
            className="w-full rounded-xl border border-[#91A3BA]/25 bg-[#080D18] px-3.5 py-2.5 text-sm text-[#EAF4FF]"
            required
          />
          <input
            value={noteTags}
            onChange={(e) => setNoteTags(e.target.value)}
            placeholder="Comma-separated tags"
            className="w-full rounded-xl border border-[#91A3BA]/25 bg-[#080D18] px-3.5 py-2 text-xs text-[#91A3BA]"
          />
          <div className="flex gap-2">
            <Button type="submit">
              <Plus className="h-4 w-4" /> {editingId ? 'Update Note' : 'Save Note'}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setEditingId(null);
                  setNoteTitle('');
                  setNoteContent('');
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        <div className="lg:col-span-7 space-y-3">
          {state.notes.length === 0 ? (
            <EmptyState
              title="Notebook Empty"
              description="Create your first scientific research note using the editor."
            />
          ) : (
            state.notes.map((note) => (
              <div key={note.id} className="dx-card p-5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-base font-bold text-[#EAF4FF]">{note.title}</h3>
                    <div className="text-[11px] font-mono text-[#91A3BA]">
                      Updated {new Date(note.updatedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(note.id);
                        setNoteTitle(note.title);
                        setNoteContent(note.content);
                        setNoteTags(note.tags.join(', '));
                      }}
                      className="rounded-lg p-1.5 text-[#91A3BA] hover:bg-white/5 hover:text-[#00D9FF]"
                      aria-label="Edit Note"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete research note "${note.title}"?`)) {
                          deleteNote(note.id);
                        }
                      }}
                      className="rounded-lg p-1.5 text-[#91A3BA] hover:bg-red-500/15 hover:text-red-300"
                      aria-label="Delete Note"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[#91A3BA] whitespace-pre-wrap">{note.content}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags.map((t) => (
                    <Badge key={t} tone="muted">
                      #{t}
                    </Badge>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Saved Equations & Graphs */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="dx-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-[#EAF4FF]">Saved Equations</h2>
            <Link to="/experimentation?module=graph" className="text-xs text-[#00D9FF] hover:underline">
              Open Graph Studio
            </Link>
          </div>
          {state.savedEquations.length === 0 ? (
            <EmptyState
              title="No Saved Equations"
              description="Save any equation from Equation-to-Graph Studio."
            />
          ) : (
            <div className="space-y-2.5">
              {state.savedEquations.map((eq) => (
                <div
                  key={eq.id}
                  className="flex items-center justify-between rounded-xl bg-[#080D18]/80 p-3.5"
                >
                  <div>
                    <div className="text-sm font-semibold text-[#EAF4FF]">{eq.label}</div>
                    <div className="font-mono text-xs text-[#00D9FF]">{eq.expression}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to={`/experimentation?module=graph&expr=${encodeURIComponent(eq.expression)}`}>
                      <Button size="sm" variant="secondary">Plot</Button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete saved equation "${eq.label}"?`)) {
                          deleteEquation(eq.id);
                        }
                      }}
                      className="p-1.5 text-[#91A3BA] hover:text-red-300"
                      aria-label="Delete Equation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dx-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-[#9F94FF]" />
            <h2 className="font-display text-lg font-bold text-[#EAF4FF]">Saved Graphs</h2>
          </div>
          {state.savedGraphs.length === 0 ? (
            <EmptyState
              title="No Saved Graphs"
              description="Plot 2D or 3D curves in Equation-to-Graph Studio and save snapshots."
            />
          ) : (
            <div className="space-y-2.5">
              {state.savedGraphs.map((g) => (
                <div
                  key={g.id}
                  className="flex items-center justify-between rounded-xl bg-[#080D18]/80 p-3.5"
                >
                  <div>
                    <div className="text-sm font-semibold text-[#EAF4FF]">{g.title}</div>
                    <div className="font-mono text-xs text-[#91A3BA]">
                      [{g.mode.toUpperCase()}] {g.expressions.join(' | ')}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteGraph(g.id)}
                    className="p-1.5 text-[#91A3BA] hover:text-red-300"
                    aria-label="Delete Graph"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Experiment History & Bookmarks */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="dx-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-[#00D9FF]" />
            <h2 className="font-display text-lg font-bold text-[#EAF4FF]">
              Saved Experiments &amp; History
            </h2>
          </div>
          {state.savedExperiments.length === 0 ? (
            <EmptyState
              title="No Recorded Experiments"
              description="Save parameter runs in Physics Universe or Experimentation Centre."
            />
          ) : (
            <div className="space-y-3">
              {state.savedExperiments.map((exp) => (
                <div key={exp.id} className="rounded-xl bg-[#080D18]/80 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#EAF4FF]">{exp.title}</span>
                    <button
                      type="button"
                      onClick={() => deleteExperiment(exp.id)}
                      className="text-[#91A3BA] hover:text-red-300"
                      aria-label="Delete Experiment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-xs font-mono text-[#00D9FF]">{exp.module}</div>
                  <div className="text-xs text-[#91A3BA]">
                    Outputs:{' '}
                    {Object.entries(exp.outputs)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dx-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-[#9F94FF]" />
            <h2 className="font-display text-lg font-bold text-[#EAF4FF]">
              Bookmarked Formulas &amp; Concepts
            </h2>
          </div>
          {bookmarkedFormulas.length === 0 && state.bookmarks.length === 0 ? (
            <EmptyState
              title="No Bookmarks Yet"
              description="Bookmark formulas in the Formula Vault for fast revision."
            />
          ) : (
            <div className="space-y-2.5">
              {bookmarkedFormulas.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between rounded-xl bg-[#080D18]/80 p-3.5"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-[#EAF4FF]">{f.name}</div>
                    <MathFormula latex={f.latex} />
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleBookmark(f.id)}
                    className="text-xs text-[#91A3BA] hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
