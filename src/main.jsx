import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LeaderboardProvider } from './context/LeaderboardContext';

createRoot(document.getElementById('root')).render(
  <LeaderboardProvider>
  <App />
</LeaderboardProvider>,
)

