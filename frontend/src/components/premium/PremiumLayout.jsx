import { Outlet } from 'react-router';
import Navigation from './Navigation';
export default function PremiumLayout() { return <div className="app"><Navigation /><Outlet /></div>; }
