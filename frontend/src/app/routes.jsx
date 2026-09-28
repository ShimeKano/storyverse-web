import { createBrowserRouter, Navigate } from 'react-router';
import PremiumLayout from '../components/premium/PremiumLayout';
import LegacyPageShell from '../components/premium/LegacyPageShell';
import ProtectedRoute from '../routes/ProtectedRoute';
import RoleRoute from '../routes/RoleRoute';
import HomePage from '../pages/premium/HomePage';
import StoryDetailPage from '../pages/premium/StoryDetailPage';
import StoryPlayerPage from '../pages/premium/StoryPlayerPage';
import CreatorStudioPage from '../pages/premium/CreatorStudioPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import UploadPage from '../pages/UploadPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import ProfilePage from '../pages/ProfilePage';
import AdminPage from '../pages/AdminPage';
import { storyService } from '../services/storyService';
import RouteErrorPage from '../pages/premium/RouteErrorPage';
import RouteLoadingPage from '../pages/premium/RouteLoadingPage';


export const router = createBrowserRouter([
  {
    Component: PremiumLayout,
    ErrorBoundary: RouteErrorPage,
    HydrateFallback: RouteLoadingPage,
    children: [
      { index: true, loader: () => storyService.list(), Component: HomePage },
      { path: 'stories/:storyId', loader: ({ params }) => storyService.get(params.storyId), Component: StoryDetailPage }
    ]
  },
  {
    path: 'stories/:storyId/play',
    element: <ProtectedRoute><StoryPlayerPage /></ProtectedRoute>,
    ErrorBoundary: RouteErrorPage
  },
  {
    path: 'creator',
    element: <ProtectedRoute><CreatorStudioPage /></ProtectedRoute>,
    ErrorBoundary: RouteErrorPage
  },
  {
    Component: LegacyPageShell,
    ErrorBoundary: RouteErrorPage,
    children: [
      { path: 'login', Component: LoginPage },
      { path: 'register', Component: RegisterPage },
      { path: 'leaderboard', Component: LeaderboardPage },
      { path: 'upload', element: <ProtectedRoute><UploadPage /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: 'player', element: <Navigate to="/profile" replace /> },
      { path: 'play', element: <Navigate to="/" replace /> },
      { path: 'admin', element: <ProtectedRoute><RoleRoute allowedRoles={['ADMIN', 'MANAGER']}><AdminPage /></RoleRoute></ProtectedRoute> }
    ]
  },
  { path: '*', element: <Navigate to="/" replace /> }
]);
