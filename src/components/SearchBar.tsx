import React from "react";
import { MdSearch } from "react-icons/md";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center shadow-sm rounded-full">
      <div className="flex w-full max-w-3xl mx-auto items-center gap-2 px-2 md:px-0">
        <div className="relative flex-1 flex ">
          <button
            type="button"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center text-orange-400 hover:text-orange-500 text-2xl p-1 rounded focus:outline-none z-10"
            aria-label="Search"
            tabIndex={0}
          >
            <MdSearch />
          </button>
          <input
            type="text"
            placeholder="Search products, categories, or brands"
            className="w-full pl-10 pr-4 py-3 text-base bg-white border border-gray-700 shadow-sm outline-none text-gray-700 placeholder-gray-400 transition-all duration-200 rounded-full"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
