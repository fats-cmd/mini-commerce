import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const Logo = () => {
  return (
    <>
      <Link
        href="/"
        className="flex items-center gap-2 text-white py-2 select-none"
        style={{
          fontFamily: "cursive, Comic Sans MS, sans-serif",
          letterSpacing: "1px",
        }}
      >
        <span className="text-2xl font-extrabold tracking-tight">MiniBuy</span>
        <FaShoppingCart className="text-orange-400 text-xl" />
      </Link>
    </>
  );
};

export default Logo;
