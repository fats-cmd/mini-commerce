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

// Zustand store for dropdowns
type DropdownState = {
  langOpen: boolean;
  setLangOpen: (open: boolean) => void;
};
const useDropdownStore = create<DropdownState>((set) => ({
  langOpen: false,
  setLangOpen: (open) => set({ langOpen: open }),
}));

//languages array
const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
];

//type for language dropdown state
type LangDropdownState = {
  langOpen: boolean;
  selected: string;
  setLangOpen: (open: boolean) => void;
  setSelected: (code: string) => void;
};

// Zustand store to manage the state of the dropdown
const useLangDropdownStore = create<LangDropdownState>((set) => ({
  langOpen: false,
  selected: "en",
  setLangOpen: (open) => set({ langOpen: open }),
  setSelected: (code) => set({ selected: code, langOpen: false }),
}));

// Language dropdown button component
const LanguageDropdownButton: React.FC = () => {
  const langOpen = useLangDropdownStore((state) => state.langOpen);
  const setLangOpen = useLangDropdownStore((state) => state.setLangOpen);
  const selected = useLangDropdownStore((state) => state.selected);
  const setSelected = useLangDropdownStore((state) => state.setSelected);
  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 text-gray-800 transition-colors font-medium focus:outline-none"
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
        <ul className="absolute left-0 mt-2 w-28 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-10">
          {languages.map((l) => (
            <li
              key={l.code}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                selected === l.code
                  ? "font-semibold text-blue-600 dark:text-yellow-400"
                  : ""
              }`}
              onClick={() => setSelected(l.code)}
              role="option"
              aria-selected={selected === l.code}
            >
              {l.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Topbar component: contains the quick help button, language dropdown, and social icons
const Topbar = () => {
  return (
    <div className="bg-orange-400 shadow-md h-12 w-full text-xs md:text-sm">
      <div className="max-w-6xl mx-auto px-2 md:px-4 h-full flex items-center justify-between">
        {/* Left: Quick Help */}
        <div className="flex items-center gap-4 md:gap-6 text-gray-800 dark:text-gray-300">
          <button className=" hover:text-white transition-colors font-medium focus:outline-none">
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
            className="text-gray-600 hover:text-white transition-colors"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-600 hover:text-white transition-colors"
          >
            <FaTwitter />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-600 hover:text-white transition-colors"
          >
            <FaInstagram />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
