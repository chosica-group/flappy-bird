import { ErrorBoundary } from 'components/error-boundary';
import { MainLayout } from 'layout/main';
import { withProviders } from 'providers';
import { LeaderboardPage } from 'pages/leaderboard';

export const App = withProviders(() => (
  <ErrorBoundary>
    <MainLayout>
      <LeaderboardPage />
    </MainLayout>
  </ErrorBoundary>
));
