import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const Loader = () => {
  return (
    <>
      <Link
        href="/"
        className="flex items-center gap-2 py-2 select-none animate-bounce"
        style={{
          fontFamily: "cursive, Comic Sans MS, sans-serif",
          letterSpacing: "1px"
        }}
      >
        <span className="text-2xl font-extrabold tracking-tight text-blue-900">MiniBuy</span>
        <FaShoppingCart className="text-orange-400 text-xl" />
      </Link>
    </>
  );
};

export default Loader;
