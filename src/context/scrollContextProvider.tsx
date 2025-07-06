'use client'

// implementing a scroll context for state of navbar when scrolled it sticks to the top
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface ScrollContextType {
  isScrolled: boolean;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollContextProvider = ({ children }: { children: ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ isScrolled }}>
      {children}
    </ScrollContext.Provider>
  );
};

// This a custom hook for consuming scroll context
export function useScrollContext() {
  const ctx = useContext(ScrollContext);
  if (!ctx)
    throw new Error(
      "useScrollContext must be used within ScrollContextProvider"
    );
  return ctx;
}
