import { Outlet } from 'react-router';
import Navigation from './Navigation';
export default function LegacyPageShell() { return <div className="app"><Navigation /><main className="page-shell legacy-page"><Outlet /></main></div>; }
