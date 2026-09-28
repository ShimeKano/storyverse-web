import { createRoot } from 'react-dom/client';
import App from './app/App';
import AuthProvider from './context/AuthProvider';
import './index.css';

createRoot(document.getElementById('root')).render(<AuthProvider><App /></AuthProvider>);
