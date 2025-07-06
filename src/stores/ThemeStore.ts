'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeStore = create<ThemeState>()(persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('data-theme', newTheme);
          }
          return { theme: newTheme };
        }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Initialize theme on client side
if (typeof window !== 'undefined') {
  const theme = ThemeStore.getState().theme;
  document.documentElement.setAttribute('data-theme', theme);
}

export default ThemeStore;
