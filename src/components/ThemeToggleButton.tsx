'use client';

import ThemeStore  from '@/stores/ThemeStore';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = ThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-foreground" />
      ) : (
        <Sun className="w-5 h-5 text-foreground" />
      )}
    </button>
  );
}