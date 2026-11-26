import React, { useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Atom,
  Bell,
  Bookmark,
  Brain,
  ChevronRight,
  Compass,
  FlaskConical,
  FolderKanban,
  Home,
  LayoutDashboard,
  Menu,
  Search,
  Sigma,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { MATH_CHAPTERS } from '@/data/mathChapters';
import { PHYSICS_CHAPTERS } from '@/data/physicsChapters';
import { FORMULA_VAULT } from '@/data/formulaVaultData';
import { useWorkspace } from '@/store/workspaceStore';
import { Badge, Button } from '@/components/ui/Primitives';

const NAV_ITEMS = [
  { label: 'Command Centre', to: '/app', icon: LayoutDashboard },
  { label: 'Mathematics', to: '/mathematics', icon: Sigma },
  { label: 'Physics', to: '/physics', icon: Atom },
  { label: 'AI Intelligence', to: '/ai', icon: Brain },
  { label: 'Experimentation', to: '/experimentation', icon: FlaskConical },
  { label: 'Discovery', to: '/discovery', icon: Compass },
  { label: 'Workspace', to: '/workspace', icon: FolderKanban },
  { label: 'About', to: '/about', icon: Sparkles },
];

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, markNotificationsRead, updateProfile } = useWorkspace();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [nameInput, setNameInput] = useState(state.profile.displayName);
  const [roleInput, setRoleInput] = useState(state.profile.role);

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  const breadcrumbs = useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length === 0) return [];
    const crumbs: Array<{ label: string; to: string }> = [{ label: 'Universe', to: '/home' }];
    let acc = '';
    for (const seg of segments) {
      acc += `/${seg}`;
      const mathCh = MATH_CHAPTERS.find((c) => c.id === seg);
      const physCh = PHYSICS_CHAPTERS.find((c) => c.id === seg);
      const label =
        seg === 'ai'
          ? 'AI Intelligence'
          : seg === 'mathematics' || seg === 'math'
            ? 'Mathematics Universe'
            : seg === 'physics'
              ? 'Physics Universe'
              : seg === 'experimentation' || seg === 'lab'
                ? 'Experimentation Centre'
                : mathCh
                  ? mathCh.title
                  : physCh
                    ? physCh.title
                    : seg
                        .split('-')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ');
      crumbs.push({ label, to: acc });
    }
    return crumbs;
  }, [location.pathname]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const mathHits = MATH_CHAPTERS.filter(
      (c) => c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q)
    ).map((c) => ({
      title: c.title,
      subtitle: c.subtitle,
      to: `/mathematics/${c.id}`,
      tag: 'Mathematics',
    }));
    const physHits = PHYSICS_CHAPTERS.filter(
      (c) => c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q)
    ).map((c) => ({
      title: c.title,
      subtitle: c.subtitle,
      to: `/physics/${c.id}`,
      tag: 'Physics',
    }));
    const formulaHits = FORMULA_VAULT.filter(
      (f) => f.name.toLowerCase().includes(q) || f.chapterTitle.toLowerCase().includes(q)
    )
      .slice(0, 6)
      .map((f) => ({
        title: f.name,
        subtitle: `${f.discipline.toUpperCase()} • ${f.chapterTitle}`,
        to: `/discovery?tab=vault&q=${encodeURIComponent(f.name)}`,
        tag: 'Formula',
      }));
    return [...mathHits, ...physHits, ...formulaHits].slice(0, 12);
  }, [searchQuery]);

  const isImmersiveLanding = location.pathname === '/' || location.pathname === '/intro';

  return (
    <div className="min-h-screen flex flex-col bg-[#080D18] text-[#EAF4FF]">
      {/* Top Global Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#91A3BA]/15 bg-[#080D18]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-6">
            <Link to="/home" className="group flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#00D9FF]/45 bg-[#00D9FF]/10 text-[#00D9FF] shadow-[0_0_16px_rgba(0,217,255,0.2)]">
                <span className="font-display text-sm font-extrabold">X</span>
              </div>
              <div className="leading-none">
                <div className="font-display text-sm font-extrabold tracking-tight text-[#EAF4FF] group-hover:text-[#00D9FF] transition-colors">
                  DIMENSION X
                </div>
                <div className="text-[10px] tracking-[0.2em] text-[#91A3BA]">MR. VORTEX</div>
              </div>
            </Link>

            <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-[#00D9FF]/12 text-[#00D9FF] border border-[#00D9FF]/30'
                          : 'text-[#91A3BA] hover:text-[#EAF4FF] hover:bg-white/5'
                      }`
                    }
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Right Global Utility Bar */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-[#91A3BA]/20 bg-[#101B2D]/80 px-3 py-1.5 text-xs text-[#91A3BA] hover:border-[#00D9FF]/45 hover:text-[#EAF4FF] transition-colors"
              aria-label="Global Search"
            >
              <Search className="h-3.5 w-3.5 text-[#00D9FF]" />
              <span className="hidden sm:inline">Search Universe...</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((v) => !v);
                  setProfileOpen(false);
                  markNotificationsRead();
                }}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#91A3BA]/20 bg-[#101B2D]/80 text-[#91A3BA] hover:text-[#EAF4FF]"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#00D9FF] text-[10px] font-bold text-[#080D18]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="dx-glass absolute right-0 mt-2 w-80 rounded-2xl p-4 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-[#91A3BA]/15">
                    <span className="font-display text-xs font-bold uppercase tracking-wider text-[#EAF4FF]">
                      Lab Notifications
                    </span>
                    <button
                      type="button"
                      onClick={() => setNotifOpen(false)}
                      className="text-xs text-[#91A3BA] hover:text-[#EAF4FF]"
                    >
                      Close
                    </button>
                  </div>
                  <div className="mt-2 max-h-64 space-y-2 overflow-y-auto">
                    {state.notifications.map((n) => (
                      <div key={n.id} className="rounded-xl bg-[#080D18]/70 p-2.5 text-xs">
                        <div className="font-semibold text-[#00D9FF]">{n.title}</div>
                        <div className="mt-0.5 text-[#91A3BA]">{n.message}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((v) => !v);
                  setNotifOpen(false);
                }}
                className="flex h-9 items-center gap-2 rounded-xl border border-[#91A3BA]/20 bg-[#101B2D]/80 px-2.5 text-xs text-[#EAF4FF] hover:border-[#00D9FF]/45"
                aria-label="User Profile"
              >
                <User className="h-4 w-4 text-[#00D9FF]" />
                <span className="hidden md:inline max-w-[90px] truncate">
                  {state.profile.displayName}
                </span>
              </button>

              {profileOpen && (
                <div className="dx-glass absolute right-0 mt-2 w-72 rounded-2xl p-4 z-50 space-y-3">
                  <div className="font-display text-xs font-bold uppercase tracking-wider text-[#00D9FF]">
                    Researcher Profile
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs text-[#91A3BA]">
                      Display Name
                      <input
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-[#91A3BA]/25 bg-[#080D18] px-2.5 py-1.5 text-xs text-[#EAF4FF]"
                      />
                    </label>
                    <label className="block text-xs text-[#91A3BA]">
                      Focus Role
                      <input
                        value={roleInput}
                        onChange={(e) => setRoleInput(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-[#91A3BA]/25 bg-[#080D18] px-2.5 py-1.5 text-xs text-[#EAF4FF]"
                      />
                    </label>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <Link
                      to="/workspace"
                      onClick={() => setProfileOpen(false)}
                      className="inline-flex items-center gap-1 text-xs text-[#00D9FF] hover:underline"
                    >
                      <Bookmark className="h-3 w-3" /> {state.bookmarks.length} Bookmarks
                    </Link>
                    <Button
                      size="sm"
                      onClick={() => {
                        updateProfile(nameInput, roleInput);
                        setProfileOpen(false);
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="xl:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-[#91A3BA]/20 bg-[#101B2D]/80 text-[#EAF4FF]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-[#91A3BA]/15 bg-[#080D18]/95 px-4 py-4 space-y-1">
            <Link
              to="/home"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#91A3BA] hover:bg-white/5 hover:text-[#EAF4FF]"
            >
              <Home className="h-4 w-4" /> Main Landing Page
            </Link>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#EAF4FF] hover:bg-[#00D9FF]/10"
                >
                  <Icon className="h-4 w-4 text-[#00D9FF]" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/intro"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#91A3BA] hover:bg-white/5 hover:text-[#00D9FF]"
            >
              <Sparkles className="h-4 w-4 text-[#00D9FF]" /> Replay Cinematic Intro
            </Link>
          </div>
        )}
      </header>

      {/* Breadcrumbs */}
      {!isImmersiveLanding && breadcrumbs.length > 0 && (
        <div className="border-b border-[#91A3BA]/10 bg-[#080D18]/60">
          <div className="mx-auto flex max-w-[1440px] items-center gap-1.5 overflow-x-auto px-4 py-2 text-xs text-[#91A3BA] lg:px-8">
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={b.to}>
                {idx > 0 && <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />}
                <Link
                  to={b.to}
                  className={`whitespace-nowrap hover:text-[#00D9FF] ${
                    idx === breadcrumbs.length - 1 ? 'text-[#EAF4FF] font-medium' : ''
                  }`}
                >
                  {b.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Global Footer */}
      <footer className="border-t border-[#91A3BA]/15 bg-[#080D18]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <div className="font-display text-lg font-extrabold tracking-tight text-[#EAF4FF]">
              DIMENSION <span className="text-[#00D9FF]">X</span>
            </div>
            <p className="mt-1 text-xs text-[#91A3BA]">
              EXPLORE. EXPERIMENT. DISCOVER. — Interactive Scientific Exploration Platform (2026).
            </p>
            <p className="mt-1 text-xs text-[#91A3BA]">
              &ldquo;Don&apos;t just read the equation. Explore what it means.&rdquo;
            </p>
            <p className="mt-1 text-xs text-[#91A3BA]">
              Created by <Link to="/about" className="font-semibold text-[#EAF4FF] hover:text-[#00D9FF]">SAKSHAM ARYA (AKA MR. VORTEX)</Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-[#91A3BA]">
            <Link to="/app" className="hover:text-[#00D9FF]">Command Centre</Link>
            <Link to="/mathematics" className="hover:text-[#00D9FF]">Mathematics Universe</Link>
            <Link to="/physics" className="hover:text-[#00D9FF]">Physics Universe</Link>
            <Link to="/experimentation" className="hover:text-[#00D9FF]">Experimentation Centre</Link>
            <Link to="/discovery" className="hover:text-[#00D9FF]">Discovery Hub</Link>
            <Link to="/workspace" className="hover:text-[#00D9FF]">Personal Workspace</Link>
            <Link to="/about" className="text-[#C8C2FF] hover:text-[#00D9FF]">Creator About</Link>
            <Link to="/intro" className="text-[#00D9FF] hover:underline">Replay Intro</Link>
          </div>
        </div>
      </footer>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-20 backdrop-blur-sm">
          <div className="dx-glass w-full max-w-2xl rounded-2xl p-4">
            <div className="flex items-center gap-3 border-b border-[#91A3BA]/20 pb-3">
              <Search className="h-4 w-4 text-[#00D9FF]" />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mathematics, physics, scientific domains, formulas, or simulations..."
                className="w-full bg-transparent text-sm text-[#EAF4FF] placeholder-[#91A3BA] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-lg p-1 text-[#91A3BA] hover:text-[#EAF4FF]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 max-h-80 space-y-1.5 overflow-y-auto">
              {searchQuery.trim() === '' ? (
                <div className="p-4 text-center text-xs text-[#91A3BA]">
                  Try searching: <span className="text-[#00D9FF]">Trigonometry</span>,{' '}
                  <span className="text-[#00D9FF]">Projectile</span>,{' '}
                  <span className="text-[#00D9FF]">Calculus</span>,{' '}
                  <span className="text-[#00D9FF]">Conic Sections</span>, or{' '}
                  <span className="text-[#00D9FF]">Thermodynamics</span>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#91A3BA]">
                  No matching scientific modules found for &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                searchResults.map((hit, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                      navigate(hit.to);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-[#00D9FF]/10"
                  >
                    <div>
                      <div className="text-sm font-medium text-[#EAF4FF]">{hit.title}</div>
                      <div className="text-xs text-[#91A3BA]">{hit.subtitle}</div>
                    </div>
                    <Badge tone={hit.tag === 'Physics' ? 'violet' : 'cyan'}>{hit.tag}</Badge>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
