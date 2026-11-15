import { Check, Clock } from "lucide-react";

export default function OrderanPage({ orders, onSelesaikanOrder }) {
  const orderAktif = orders.filter((o) => o.status === "Diproses");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800">Antrean Orderan Masuk ({orderAktif.length})</h2>
      
      {orderAktif.length === 0 ? (
        <div className="bg-white p-10 rounded-xl border text-center text-gray-500">
          Tidak ada antrean pesanan saat ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderAktif.map((order) => (
            <div key={order.id} className="bg-white p-5 rounded-xl border-l-4 border-l-amber-500 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start border-b pb-2 mb-3">
                  <div>
                    <span className="text-xs font-bold text-gray-400">{order.id}</span>
                    <h3 className="font-bold text-gray-800 text-lg">{order.pelanggan}</h3>
                  </div>
                  <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                    <Clock size={12} /> {order.waktu}
                  </span>
                </div>

                <ul className="space-y-1.5 mb-3">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-sm flex justify-between">
                      <span className="font-medium text-gray-700">{item.qty}x {item.nama}</span>
                    </li>
                  ))}
                </ul>

                {order.catatan && (
                  <p className="text-xs bg-yellow-50 text-yellow-800 p-2 rounded border border-yellow-200 mb-3">
                    <strong>Catatan:</strong> {order.catatan}
                  </p>
                )}
              </div>

              <button
                onClick={() => onSelesaikanOrder(order.id)}
                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition"
              >
                <Check size={16} /> Pesanan Selesai Disajikan
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}