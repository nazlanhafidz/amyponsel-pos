import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, ClipboardList, Wallet, UtensilsCrossed } from "lucide-react";

export default function Navbar({ jumlahAntrean }) {
  const location = useLocation();

  const navClass = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition ${
      location.pathname === path
        ? "bg-blue-600 text-white shadow"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-2">
        <div className="font-bold text-xl text-blue-700 tracking-tight">
          POS <span className="text-gray-800">Amyponsel</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Link to="/" className={navClass("/")}>
            <ShoppingCart size={16} />
            <span>Kasir</span>
          </Link>
          <Link to="/orderan" className={navClass("/orderan")}>
            <ClipboardList size={16} />
            <span>Orderan</span>
            {jumlahAntrean > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {jumlahAntrean}
              </span>
            )}
          </Link>
          <Link to="/kas" className={navClass("/kas")}>
            <Wallet size={16} />
            <span>Kas</span>
          </Link>
          <Link to="/menu" className={navClass("/menu")}>
            <UtensilsCrossed size={16} />
            <span>Atur Menu</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}