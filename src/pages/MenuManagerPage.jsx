import { useState } from "react";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";

export default function MenuManagerPage({ menuItems, onTambahMenu, onUpdateMenu, onHapusMenu }) {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("Makanan");
  
  // State untuk mode Edit
  const [editId, setEditId] = useState(null);
  const [editNama, setEditNama] = useState("");
  const [editHarga, setEditHarga] = useState("");
  const [editKategori, setEditKategori] = useState("");

  const handleSimpanBaru = (e) => {
    e.preventDefault();
    if (!nama || !harga) return alert("Nama dan harga wajib diisi!");
    onTambahMenu({ nama, harga: Number(harga), kategori });
    setNama("");
    setHarga("");
  };

  const mulaiEdit = (item) => {
    setEditId(item.id);
    setEditNama(item.nama);
    setEditHarga(item.harga);
    setEditKategori(item.kategori);
  };

  const simpanEdit = (id) => {
    onUpdateMenu(id, { nama: editNama, harga: Number(editHarga), kategori: editKategori });
    setEditId(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Manajemen Menu Kedai</h2>

      {/* Form Tambah Menu Baru */}
      <div className="bg-white p-5 rounded-xl border shadow-sm">
        <h3 className="font-bold text-gray-700 mb-3 text-sm">Tambah Menu Baru (Mie, Nasi Goreng, dll)</h3>
        <form onSubmit={handleSimpanBaru} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Nama Menu"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
            required
          />
          <input
            type="number"
            placeholder="Harga (Rp)"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
            required
          />
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm bg-white"
          >
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
            <option value="Snack">Snack / Lainnya</option>
          </select>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-1">
            <Plus size={16} /> Tambah Menu
          </button>
        </form>
      </div>

      {/* Daftar Menu & Tombol Edit/Hapus */}
      <div className="bg-white p-5 rounded-xl border shadow-sm">
        <h3 className="font-bold text-gray-700 mb-3 text-sm">Daftar Menu Aktif</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="py-2 px-3">Nama Menu</th>
                <th className="py-2 px-3">Kategori</th>
                <th className="py-2 px-3">Harga</th>
                <th className="py-2 px-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} className="border-b">
                  {editId === item.id ? (
                    // Mode Edit
                    <>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={editNama}
                          onChange={(e) => setEditNama(e.target.value)}
                          className="w-full px-2 py-1 border rounded text-sm"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <select
                          value={editKategori}
                          onChange={(e) => setEditKategori(e.target.value)}
                          className="px-2 py-1 border rounded text-sm bg-white"
                        >
                          <option value="Makanan">Makanan</option>
                          <option value="Minuman">Minuman</option>
                          <option value="Snack">Snack / Lainnya</option>
                        </select>
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={editHarga}
                          onChange={(e) => setEditHarga(e.target.value)}
                          className="w-32 px-2 py-1 border rounded text-sm"
                        />
                      </td>
                      <td className="py-2 px-3 text-center flex justify-center gap-1">
                        <button onClick={() => simpanEdit(item.id)} className="bg-green-600 text-white p-1.5 rounded hover:bg-green-700">
                          <Check size={14} />
                        </button>
                        <button onClick={() => setEditId(null)} className="bg-gray-400 text-white p-1.5 rounded hover:bg-gray-500">
                          <X size={14} />
                        </button>
                      </td>
                    </>
                  ) : (
                    // Tampilan Normal
                    <>
                      <td className="py-2 px-3 font-medium text-gray-800">{item.nama}</td>
                      <td className="py-2 px-3">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          {item.kategori}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-semibold text-gray-600">
                        Rp {item.harga.toLocaleString("id-ID")}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => mulaiEdit(item)} className="text-blue-600 hover:text-blue-800 p-1">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => onHapusMenu(item.id)} className="text-red-600 hover:text-red-800 p-1">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}