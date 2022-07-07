import { MainLayout } from 'layout/main';
import { PublicLayout } from 'layout/public-layout';
import { ForumPage } from 'pages/forum';
import { LeaderboardPage } from 'pages/leaderboard';
import { SignInPage } from 'pages/signin';
import { SignUpPage } from 'pages/signup';
import { StartGamePage } from 'pages/start-game';
import { UserPage } from 'pages/user';
import { WelcomePage } from 'pages/welcome-page';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { isLoggedInIfoSelector } from 'store/auth-reducer';

export const AppRouter = () => {
  const authState = useSelector(isLoggedInIfoSelector);

  if (authState.isLoggedIn) {
    return (
      <MainLayout>
        <Routes>
          <Route path="/game" element={<StartGamePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="*" element={<Navigate to="/game" />} />
        </Routes>
      </MainLayout>
    );
  }
  return (
    <PublicLayout>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="*" element={<Navigate to="/welcome" />} />
      </Routes>
    </PublicLayout>
  );
};
