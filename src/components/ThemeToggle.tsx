import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(TodoContext)!;

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? (
        <MoonIcon className="icon" />
      ) : (
        <SunIcon className="icon" />
      )}
    </button>
  );
}