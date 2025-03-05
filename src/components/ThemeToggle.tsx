import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { ReactComponent as SunIcon } from '../assets/sun.svg';
import { ReactComponent as MoonIcon } from '../assets/moon.svg';

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(TodoContext)!;
  const isDark = theme === 'dark';

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={isDark ? '切换到日间模式' : '切换到夜间模式'}
    >
      {theme === 'dark' ? '🌙' : '☀'}
    </button>
  );
}
