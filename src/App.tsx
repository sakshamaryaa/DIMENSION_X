import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { LoadingState } from '@/components/ui/Primitives';

const IntroPage = lazy(() =>
  import('@/pages/IntroPage').then((m) => ({ default: m.IntroPage }))
);
const LandingPage = lazy(() =>
  import('@/pages/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const CommandCentrePage = lazy(() =>
  import('@/pages/CommandCentrePage').then((m) => ({ default: m.CommandCentrePage }))
);
const MathUniversePage = lazy(() =>
  import('@/pages/MathUniversePage').then((m) => ({ default: m.MathUniversePage }))
);
const PhysicsUniversePage = lazy(() =>
  import('@/pages/PhysicsUniversePage').then((m) => ({ default: m.PhysicsUniversePage }))
);
const AICentrePage = lazy(() =>
  import('@/pages/AICentrePage').then((m) => ({ default: m.AICentrePage }))
);
const ExperimentationCentrePage = lazy(() =>
  import('@/pages/ExperimentationCentrePage').then((m) => ({
    default: m.ExperimentationCentrePage,
  }))
);
const WorkspacePage = lazy(() =>
  import('@/pages/WorkspacePage').then((m) => ({ default: m.WorkspacePage }))
);
const DiscoveryPage = lazy(() =>
  import('@/pages/DiscoveryPage').then((m) => ({ default: m.DiscoveryPage }))
);
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <ErrorBoundary fallbackTitle="DIMENSION X Route Error">
          <Suspense fallback={<LoadingState />}>
            <Routes>
              {/* Separate Cinematic Intro (session-aware) */}
              <Route path="/" element={<IntroPage />} />
              <Route path="/intro" element={<IntroPage />} />

              {/* Main Landing Experience */}
              <Route path="/home" element={<LandingPage />} />

              {/* Command Centre */}
              <Route path="/app" element={<CommandCentrePage />} />
              <Route path="/command-centre" element={<CommandCentrePage />} />

              {/* Mathematics Universe */}
              <Route path="/mathematics" element={<MathUniversePage />} />
              <Route path="/mathematics/:chapterId" element={<MathUniversePage />} />
              <Route path="/mathematics" element={<MathUniversePage />} />
              <Route path="/mathematics/:chapterId" element={<MathUniversePage />} />

              {/* Physics Universe */}
              <Route path="/physics" element={<PhysicsUniversePage />} />
              <Route path="/physics/:chapterId" element={<PhysicsUniversePage />} />

              {/* AI Intelligence (Coming Soon placeholder) */}
              <Route path="/ai" element={<AICentrePage />} />

              {/* Experimentation Centre */}
              <Route path="/experimentation" element={<ExperimentationCentrePage />} />
              <Route path="/lab" element={<ExperimentationCentrePage />} />

              {/* Personal Workspace */}
              <Route path="/workspace" element={<WorkspacePage />} />

              {/* Discovery Hub */}
              <Route path="/discovery" element={<DiscoveryPage />} />

              {/* Creator About Page */}
              <Route path="/about" element={<AboutPage />} />

              {/* Catch-all */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
