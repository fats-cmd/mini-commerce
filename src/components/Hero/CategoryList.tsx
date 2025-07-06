import React from "react";
import {
  FaTv,
  FaMobileAlt,
  FaAppleAlt,
  FaTshirt,
  FaGamepad,
  FaBaby,
  FaLaptop,
  FaHome,
  FaHeartbeat,
  FaGuitar,
  FaEllipsisH,
  FaStore,
} from "react-icons/fa";

const categories = [
  { name: "Appliances", icon: <FaStore />, color: "from-blue-500 to-blue-600" },
  {
    name: "Phones & Tablets",
    icon: <FaMobileAlt />,
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Health & Beauty",
    icon: <FaHeartbeat />,
    color: "from-pink-500 to-pink-600",
  },
  {
    name: "Home & Office",
    icon: <FaHome />,
    color: "from-green-500 to-green-600",
  },
  {
    name: "Electronics",
    icon: <FaTv />,
    color: "from-yellow-500 to-yellow-600",
  },
  { name: "Fashion", icon: <FaTshirt />, color: "from-red-500 to-red-600" },
  {
    name: "Supermarket",
    icon: <FaAppleAlt />,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    name: "Computing",
    icon: <FaLaptop />,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    name: "Baby Products",
    icon: <FaBaby />,
    color: "from-cyan-500 to-cyan-600",
  },
  {
    name: "Gaming",
    icon: <FaGamepad />,
    color: "from-violet-500 to-violet-600",
  },
  {
    name: "Musical Instruments",
    icon: <FaGuitar />,
    color: "from-orange-500 to-orange-600",
  },
  {
    name: "Other categories",
    icon: <FaEllipsisH />,
    color: "from-gray-500 to-gray-600",
  },
];

const CategoryList: React.FC = () => (
  <aside className="w-full bg-white h-[25rem] overflow-y-scroll rounded-2xl p-6 shadow-xl border border-gray-100">
    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></span>
      Categories
    </h3>

    <div className="grid grid-cols-1 gap-3">
      {categories.map((cat, index) => (
        <button
          key={cat.name}
          className="group relative overflow-hidden w-full flex items-center gap-4 p-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 border border-transparent hover:border-gray-200"
          style={{
            animationDelay: `${index * 50}ms`,
            animation: "fade-in-up 0.6s ease-out both",
          }}
        >
          {/* Icon container with gradient background */}
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <span className="text-lg">{cat.icon}</span>
          </div>

          {/* Category name */}
          <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300 text-left">
            {cat.name}
          </span>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

          {/* Right arrow indicator */}
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <svg
              className="w-4 h-4 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>
      ))}
    </div>
  </aside>
);

export default CategoryList;
