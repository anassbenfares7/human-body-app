import { useAppStore } from '@/store/useAppStore';
import { Search, Moon, Sun, Menu } from 'lucide-react';
import { useState } from 'react';
import SearchBar from './SearchBar';

export default function Header() {
  const { theme, setTheme } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <Menu size={24} className="text-gray-700 dark:text-gray-200" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Human Body Explorer
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <SearchBar />
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon size={24} className="text-gray-700 dark:text-gray-200" />
          ) : (
            <Sun size={24} className="text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>
    </header>
  );
}
