import { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import BodyViewer from './components/3d/BodyViewer';
import Header from './components/ui/Header';
import Sidebar from './components/ui/Sidebar';
import InfoPanel from './components/ui/InfoPanel';

function App() {
  const { theme, setTheme } = useAppStore();
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, [setTheme]);
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 relative">
            <BodyViewer />
          </main>
          <InfoPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
