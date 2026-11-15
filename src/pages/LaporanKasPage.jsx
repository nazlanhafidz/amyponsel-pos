import { useState } from "react";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

export default function LaporanKasPage({ orders, pengeluaran, onTambahPengeluaran }) {
  const [keterangan, setKeterangan] = useState("");
  const [nominal, setNominal] = useState("");

  const totalUangMasuk = orders.reduce((sum, o) => sum + o.total, 0);
  const totalUangKeluar = pengeluaran.reduce((sum, p) => sum + p.nominal, 0);
  const saldoKas = totalUangMasuk - totalUangKeluar;

  const handleCatatKeluar = (e) => {
    e.preventDefault();
    if (!keterangan || !nominal) return;
    onTambahPengeluaran({
      id: Date.now(),
      keterangan,
      nominal: Number(nominal),
      waktu: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    });
    setKeterangan("");
    setNominal("");
  };

  return (
    <div className="space-y-6">
      {/* Kartu Ringkasan Kas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
            <ArrowUpCircle size={18} /> Total Uang Masuk (Penjualan)
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            Rp {totalUangMasuk.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <div className="flex items-center gap-2 text-red-600 text-sm font-semibold">
            <ArrowDownCircle size={18} /> Total Uang Keluar (Belanja)
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            Rp {totalUangKeluar.toLocaleString("id-ID")}
          </p>
        </div>

        <div className="bg-blue-600 text-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-blue-100 text-sm font-semibold">
            <Wallet size={18} /> Sisa Kas Bersih
          </div>
          <p className="text-2xl font-bold mt-2">
            Rp {saldoKas.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Form Catat Pengeluaran Kedai (Beli Gas, Mie, Minyak, dll) */}
      <div className="bg-white p-5 rounded-xl border shadow-sm">
        <h3 className="font-bold text-gray-800 mb-3">Catat Pengeluaran Kas (Belanja Bahan)</h3>
        <form onSubmit={handleCatatKeluar} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Keterangan (Misal: Beli Gas LPG / Telur)"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
            required
          />
          <input
            type="number"
            placeholder="Nominal (Rp)"
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
            className="sm:w-48 px-3 py-2 border rounded-lg text-sm"
            required
          />
          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-semibold">
            Catat Keluar
          </button>
        </form>
      </div>

      {/* Riwayat Transaksi */}
      <div className="bg-white p-5 rounded-xl border shadow-sm">
        <h3 className="font-bold text-gray-800 mb-3">Riwayat Transaksi Masuk</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="py-2 px-3">Waktu</th>
                <th className="py-2 px-3">ID Order</th>
                <th className="py-2 px-3">Pelanggan</th>
                <th className="py-2 px-3">Menu</th>
                <th className="py-2 px-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b">
                  <td className="py-2 px-3 text-gray-500">{o.waktu}</td>
                  <td className="py-2 px-3 font-medium">{o.id}</td>
                  <td className="py-2 px-3">{o.pelanggan}</td>
                  <td className="py-2 px-3 text-gray-600">
                    {o.items.map((i) => `${i.qty}x ${i.nama}`).join(", ")}
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-green-600">
                    +Rp {o.total.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}