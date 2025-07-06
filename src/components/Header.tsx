import React from "react";
import Navbar from "./Layout/Navbar";
import Topbar from "./Layout/Topbar";
import { useScrollContext } from "@/context/scrollContextProvider";

const Header = () => {
  // Use scroll context to apply sticky or shadow effect
  const { isScrolled } = useScrollContext();
  return (
    <header
      className={`w-full top-0 z-30 transition-all duration-300 ${
        isScrolled ? "sticky shadow-lg bg-white/90 backdrop-blur" : ""
      }`}
    >
      <Topbar />
      <Navbar />
    </header>
  );
};

export default Header;
