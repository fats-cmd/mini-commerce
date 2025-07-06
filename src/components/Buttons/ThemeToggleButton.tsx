// "use client";
// import { FaSun, FaMoon } from "react-icons/fa";
// // If ThemeStore is located at src/store/ThemeStore.ts, use the following relative import:
// import ThemeStore from "@/stores/ThemeStore";

// interface ThemeToggleButtonProps {
//   className?: string;
//   onClick?: () => void;
//   ariaLabel?: string;
//   type: string;
//   disabled?: boolean;
// }

// const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
//   className = "",
//   onClick,
//   ariaLabel = "Toggle theme",
//   type = "button",
//   disabled = false,
// }) => {
//   const theme = ThemeStore((state) => state.theme);
//   const toggleTheme = ThemeStore((state) => state.toggleTheme);

//   // Use the passed onClick if provided, otherwise use the store's toggleTheme
//   const handleClick = onClick || toggleTheme;

//   return (
//     <button
//       type={type as "button" | "submit" | "reset"}
//       onClick={handleClick}
//       aria-label={ariaLabel}
//       disabled={disabled}
//       className={`relative w-12 h-6 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none ${className}`}
//     >
//       <span
//         className="absolute left-1 top-1 w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-300 bg-white dark:bg-gray-900 shadow-md"
//         style={{
//           transform: theme === "light" ? "translateX(24px)" : "translateX(0px)",
//         }}
//       >
//         {theme === "light" ? (
//           <FaSun className="text-yellow-500 transition-colors duration-300" />
//         ) : (
//           <FaMoon className="text-blue-900 transition-colors duration-300" />
//         )}
//       </span>
//       <span className="sr-only">
//         {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
//       </span>
//     </button>
//   );
// };

// export default ThemeToggleButton;
