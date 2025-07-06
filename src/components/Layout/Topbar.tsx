import Link from "next/link";
import React from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { create } from "zustand";

type LangDropdownState = {
  langOpen: boolean;
  selected: string;
  setLangOpen: (open: boolean) => void;
  setSelected: (code: string) => void;
};

const useLangDropdownStore = create<LangDropdownState>((set) => ({
  langOpen: false,
  selected: "en",
  setLangOpen: (open) => set({ langOpen: open }),
  setSelected: (code) => set({ selected: code, langOpen: false }),
}));

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

const LanguageDropdownButton: React.FC = () => {
  const langOpen = useLangDropdownStore((state) => state.langOpen);
  const setLangOpen = useLangDropdownStore((state) => state.setLangOpen);
  const selected = useLangDropdownStore((state) => state.selected);
  const setSelected = useLangDropdownStore((state) => state.setSelected);
  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium focus:outline-none"
        aria-haspopup="listbox"
        aria-expanded={langOpen}
        tabIndex={0}
        onClick={() => setLangOpen(!langOpen)}
      >
        {languages.find((l) => l.code === selected)?.label || "Language"}
        {langOpen ? (
          <FaChevronUp className="ml-1 transition-transform duration-200" />
        ) : (
          <FaChevronDown className="ml-1 transition-transform duration-200" />
        )}
      </button>
      {langOpen && (
        <div
          className="absolute top-full mt-1 bg-card border border-border rounded-lg shadow-lg py-1 w-32 z-50"
          role="listbox"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="w-full text-left px-4 py-2 text-foreground hover:bg-primary/10 transition-colors"
              onClick={() => setSelected(lang.code)}
              role="option"
              aria-selected={selected === lang.code}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Topbar = () => {
  return (
    <div className="bg-card border-b border-border h-12 w-full text-xs md:text-sm">
      <div className="max-w-6xl mx-auto px-2 md:px-4 h-full flex items-center justify-between">
        {/* Left: Quick Help */}
        <div className="flex items-center gap-4 md:gap-6 text-foreground">
          <button className="hover:text-primary transition-colors font-medium focus:outline-none">
            Quick Help
          </button>
          <LanguageDropdownButton />
        </div>
        {/* Right: Social Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-foreground hover:text-primary transition-colors"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-foreground hover:text-primary transition-colors"
          >
            <FaTwitter />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-foreground hover:text-primary transition-colors"
          >
            <FaInstagram />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
