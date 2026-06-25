import { useState } from "react";
import { Search, Plus, X, Truck, MapPin, Phone, Clock } from "lucide-react";

const initialDeliveries = [
    { id: "LIV-0032", client: "Fatou Ndiaye", address: "Thiès, Quartier Nord", phone: "+221 76 234 56 78", status: "livré", date: "24/06/2026", driver: "Aliou S." },
    { id: "LIV-0031", client: "Ousmane Sarr", address: "Saint-Louis, Centre", phone: "+221 70 345 67 89", status: "en transit", date: "24/06/2026", driver: "Moussa D." },
    { id: "LIV-0030", client: "Mamadou Diallo", address: "Dakar, Médina", phone: "+221 77 123 45 67", status: "livré", date: "23/06/2026", driver: "Aliou S." },
    { id: "LIV-0029", client: "Aïcha Ba", address: "Dakar, Sacré-Cœur", phone: "+221 77 456 78 90", status: "en transit", date: "22/06/2026", driver: "Fatou K." },
    { id: "LIV-0028", client: "Cheikh Diop", address: "Touba, Darou Marnane", phone: "+221 77 789 01 23", status: "livré", date: "21/06/2026", driver: "Moussa D." },
    { id: "LIV-0027", client: "Aminata Sow", address: "Dakar, Almadies", phone: "+221 70 678 90 12", status: "livré", date: "20/06/2026", driver: "Fatou K." },
    { id: "LIV-0026", client: "Ibrahima Fall", address: "Mbour, Station", phone: "+221 76 567 89 01", status: "en transit", date: "19/06/2026", driver: "Aliou S." },
];

function formatStatus(status) {
    if (status === "livré" || status === "delivered") return "delivered";
    if (status === "en transit" || status === "in-transit") return "in-transit";
    return "";
}

export default function Deliveries() {
    const [deliveries, setDeliveries] = useState(initialDeliveries);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ client: "", address: "", phone: "", driver: "" });

    const filtered = deliveries.filter((d) =>
        d.client.toLowerCase().includes(search.toLowerCase()) ||
        d.id.toLowerCase().includes(search.toLowerCase()) ||
        d.driver.toLowerCase().includes(search.toLowerCase())
    );

    const inTransit = deliveries.filter(d => d.status === "en transit").length;
    const delivered = deliveries.filter(d => d.status === "livré").length;

    function handleAdd() {
        const newD = {
            id: `LIV-${String(deliveries.length + 1).padStart(4, "0")}`,
            ...form,
            status: "en transit",
            date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "/"),
        };
        setDeliveries([newD, ...deliveries]);
        setShowModal(false);
        setForm({ client: "", address: "", phone: "", driver: "" });
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-inter font-black text-[#FAF8F5] text-2xl tracking-tight">Livraisons</h1>
                    <p className="font-inter text-[#FAF8F5]/40 text-sm mt-1">
                        {deliveries.length} livraisons
                    </p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} />
                    Nouvelle livraison
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-xs">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF8F5]/25" />
                <input
                    type="text"
                    placeholder="Rechercher une livraison..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: "Total", value: deliveries.length, icon: Truck, color: "text-[#FAF8F5]" },
                    { label: "En transit", value: inTransit, icon: Clock, color: "text-blue-400" },
                    { label: "Livrées", value: delivered, icon: MapPin, color: "text-emerald-400" },
                    { label: "Taux de livraison", value: deliveries.length > 0 ? `${Math.round(delivered / deliveries.length * 100)}%` : "0%", icon: Truck, color: "text-[#C9A84C]" },
                ].map((s) => (
                    <div key={s.label} className="card">
                        <div className="flex items-center justify-between mb-2">
                            <p className="font-inter text-xs text-[#FAF8F5]/40">{s.label}</p>
                            <s.icon size={14} className={s.color} />
                        </div>
                        <p className={`font-inter font-bold text-lg ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>N° Livraison</th>
                            <th>Client</th>
                            <th>Adresse</th>
                            <th>Téléphone</th>
                            <th>Livreur</th>
                            <th>Date</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((d) => (
                            <tr key={d.id}>
                                <td className="font-mono text-xs text-[#C9A84C]">{d.id}</td>
                                <td className="font-medium text-[#FAF8F5]/85">{d.client}</td>
                                <td className="text-xs text-[#FAF8F5]/60">{d.address}</td>
                                <td className="font-mono text-xs">{d.phone}</td>
                                <td>{d.driver}</td>
                                <td className="font-mono text-xs">{d.date}</td>
                                <td>
                                    <span className={`status-badge ${formatStatus(d.status)}`}>{d.status}</span>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-8 text-[#FAF8F5]/30">Aucune livraison trouvée</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
                    <div className="card w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-inter font-bold text-[#FAF8F5]">Nouvelle livraison</h2>
                            <button onClick={() => setShowModal(false)} className="text-[#FAF8F5]/30 hover:text-[#FAF8F5]/60">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Nom du client</label>
                                <input type="text" placeholder="Ex: Fatou Ndiaye" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
                            </div>
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Adresse de livraison</label>
                                <input type="text" placeholder="Ex: Dakar, Médina" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                            </div>
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Téléphone destinataire</label>
                                <input type="text" placeholder="Ex: +221 77 123 45 67" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            </div>
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Livreur</label>
                                <input type="text" placeholder="Ex: Aliou S." value={form.driver} onChange={(e) => setForm({ ...form, driver: e.target.value })} />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button className="btn-secondary flex-1" onClick={() => setShowModal(false)}>Annuler</button>
                            <button className="btn-primary flex-1" onClick={handleAdd} disabled={!form.client} style={{ opacity: !form.client ? 0.5 : 1 }}>
                                <Plus size={16} />
                                Créer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}