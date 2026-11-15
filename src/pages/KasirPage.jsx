import { useState } from "react";
import { Plus, Minus, CheckCircle, ShoppingBag } from "lucide-react";

export default function KasirPage({ menuItems, onTambahOrder }) {
  const [keranjang, setKeranjang] = useState([]);
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [catatan, setCatatan] = useState("");

  const tambahItem = (item) => {
    setKeranjang((prev) => {
      const ada = prev.find((i) => i.id === item.id);
      if (ada) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const kurangiItem = (id) => {
    setKeranjang((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const totalHarga = keranjang.reduce((sum, item) => sum + item.harga * item.qty, 0);

  const prosesOrder = (e) => {
    e.preventDefault();
    if (keranjang.length === 0) return alert("Pilih menu terlebih dahulu!");

    const orderBaru = {
      id: "ORD-" + Date.now().toString().slice(-5),
      pelanggan: namaPelanggan || "Pelanggan Umum",
      catatan: catatan,
      items: keranjang,
      total: totalHarga,
      status: "Diproses",
      waktu: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      tanggal: new Date().toLocaleDateString("id-ID"),
    };

    onTambahOrder(orderBaru);
    setKeranjang([]);
    setNamaPelanggan("");
    setCatatan("");
    alert("Pesanan berhasil dikirim ke antrean dapur!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pb-12">
      {/* Kolom Kiri: Pilihan Menu (Lebih Responsif di HP) */}
      <div className="lg:col-span-7 space-y-3">
        <h2 className="text-sm font-bold tracking-wide uppercase text-slate-500">Pilih Menu Makanan & Minuman</h2>
        
        {menuItems.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center text-slate-400 text-sm">
            Belum ada menu tersedia. Tambahkan via tab "Menu".
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => tambahItem(item)}
                className="bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md active:scale-95 transition text-left flex flex-col justify-between min-h-[105px]"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {item.kategori}
                  </span>
                  <h3 className="font-bold text-slate-800 text-sm mt-1.5 leading-snug line-clamp-2">{item.nama}</h3>
                </div>
                <p className="text-slate-900 font-extrabold text-sm mt-2">
                  Rp {item.harga.toLocaleString("id-ID")}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Kolom Kanan: Panel Keranjang & Checkout */}
      <div className="lg:col-span-5">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm sticky top-16">
          <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-3 flex items-center gap-2">
            <ShoppingBag size={18} className="text-blue-600" /> Ringkasan Pesanan
          </h2>

          <form onSubmit={prosesOrder} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-500">Nama Pelanggan / Nomor Meja</label>
              <input
                type="text"
                placeholder="Misal: Meja 03 / Bang Budi"
                value={namaPelanggan}
                onChange={(e) => setNamaPelanggan(e.target.value)}
                className="w-full mt-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:outline-blue-600 transition"
              />
            </div>

            {/* List Item di Keranjang */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {keranjang.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs italic">
                  Keranjang masih kosong. Ketuk menu di sebelah kiri.
                </div>
              ) : (
                keranjang.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-sm">
                    <div className="flex-1 pr-2">
                      <p className="font-bold text-slate-800 text-xs leading-snug">{item.nama}</p>
                      <p className="text-slate-500 text-xs">Rp {(item.harga * item.qty).toLocaleString("id-ID")}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs">
                      <button type="button" onClick={() => kurangiItem(item.id)} className="text-slate-500 hover:text-red-600 p-0.5">
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-xs w-4 text-center">{item.qty}</span>
                      <button type="button" onClick={() => tambahItem(item)} className="text-slate-500 hover:text-blue-600 p-0.5">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500">Catatan Khusus</label>
              <input
                type="text"
                placeholder="Misal: Tidak pakai daun bawang, kuah pisah"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full mt-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-blue-600 transition"
              />
            </div>

            {/* Total Pembayaran */}
            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Tagihan</span>
              <span className="text-lg font-extrabold text-blue-600">Rp {totalHarga.toLocaleString("id-ID")}</span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md shadow-blue-500/20 transition-all"
            >
              <CheckCircle size={18} />
              Proses & Masukkan ke Dapur
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}