import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import KasirPage from "./pages/KasirPage";
import OrderanPage from "./pages/OrderanPage";
import LaporanKasPage from "./pages/LaporanKasPage";
import MenuManagerPage from "./pages/MenuManagerPage";
import { MENU_ITEMS as initialMenu } from "./data/menuData";
import { ShoppingCart, ClipboardList, Wallet, UtensilsCrossed } from "lucide-react";

// Komponen Navigasi Bawah khusus Mobile (App-like Experience)
function MobileNav({ jumlahAntrean }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItemClass = (path) =>
    `flex flex-col items-center justify-center flex-1 py-2 text-xs font-medium transition-all ${
      isActive(path) ? "text-blue-600 font-bold scale-105" : "text-gray-400 hover:text-gray-600"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center z-50 md:max-w-md md:mx-auto md:rounded-t-2xl">
      <Link to="/" className={navItemClass("/")}>
        <ShoppingCart size={22} className="mb-0.5" />
        <span>Kasir</span>
      </Link>
      <Link to="/orderan" className={navItemClass("/orderan") + " relative"}>
        <div className="relative">
          <ClipboardList size={22} className="mb-0.5" />
          {jumlahAntrean > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {jumlahAntrean}
            </span>
          )}
        </div>
        <span>Orderan</span>
      </Link>
      <Link to="/kas" className={navItemClass("/kas")}>
        <Wallet size={22} className="mb-0.5" />
        <span>Kas</span>
      </Link>
      <Link to="/menu" className={navItemClass("/menu")}>
        <UtensilsCrossed size={22} className="mb-0.5" />
        <span>Menu</span>
      </Link>
    </div>
  );
}

export default function App() {
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem("amyponsel_menu");
    return saved ? JSON.parse(saved) : initialMenu;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("amyponsel_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const [pengeluaran, setPengeluaran] = useState(() => {
    const saved = localStorage.getItem("amyponsel_pengeluaran");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("amyponsel_menu", JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem("amyponsel_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("amyponsel_pengeluaran", JSON.stringify(pengeluaran));
  }, [pengeluaran]);

  const tambahMenuBaru = (menuBaru) => {
    setMenuItems([...menuItems, { id: Date.now(), ...menuBaru }]);
  };

  const updateMenu = (id, menuUpdate) => {
    setMenuItems(menuItems.map((m) => (m.id === id ? { ...m, ...menuUpdate } : m)));
  };

  const hapusMenu = (id) => {
    if (confirm("Yakin ingin menghapus menu ini?")) {
      setMenuItems(menuItems.filter((m) => m.id !== id));
    }
  };

  const tambahOrder = (orderBaru) => setOrders([orderBaru, ...orders]);
  const selesaikanOrder = (id) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: "Selesai" } : o)));
  };
  const tambahPengeluaran = (data) => setPengeluaran([data, ...pengeluaran]);

  const jumlahAntrean = orders.filter((o) => o.status === "Diproses").length;

  return (
    <BrowserRouter>
      {/* Background container elegan bernuansa iOS / Modern Web App */}
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-10 font-sans antialiased">
        
        {/* Header Minimalis Berkelas */}
        <header className="bg-white border-b border-slate-100 sticky top-0 z-40 px-4 py-3 shadow-xs">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-blue-600 flex items-center gap-1.5">
                AMYPONSEL <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold uppercase">POS System</span>
              </h1>
            </div>
            <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Kedai Aktif 🟢
            </div>
          </div>
        </header>

        {/* Area Konten Utama */}
        <main className="max-w-4xl mx-auto p-4 md:py-6">
          <Routes>
            <Route path="/" element={<KasirPage menuItems={menuItems} onTambahOrder={tambahOrder} />} />
            <Route path="/orderan" element={<OrderanPage orders={orders} onSelesaikanOrder={selesaikanOrder} />} />
            <Route path="/kas" element={<LaporanKasPage orders={orders} pengeluaran={pengeluaran} onTambahPengeluaran={tambahPengeluaran} />} />
            <Route path="/menu" element={<MenuManagerPage menuItems={menuItems} onTambahMenu={tambahMenuBaru} onUpdateMenu={updateMenu} onHapusMenu={hapusMenu} />} />
          </Routes>
        </main>

        {/* Navigasi Bawah Mobile */}
        <MobileNav jumlahAntrean={jumlahAntrean} />
      </div>
    </BrowserRouter>
  );
}