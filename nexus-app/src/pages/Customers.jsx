import { useState } from "react";
import { Search, Plus, X, Phone, Mail, MapPin } from "lucide-react";

const initialCustomers = [
    { id: "CL-001", name: "Mamadou Diallo", phone: "+221 77 123 45 67", email: "m.diallo@email.com", city: "Dakar", orders: 24, total: 520000, status: "actif" },
    { id: "CL-002", name: "Fatou Ndiaye", phone: "+221 76 234 56 78", email: "f.ndiaye@email.com", city: "Thiès", orders: 18, total: 385000, status: "actif" },
    { id: "CL-003", name: "Ousmane Sarr", phone: "+221 70 345 67 89", email: "o.sarr@email.com", city: "Saint-Louis", orders: 7, total: 210000, status: "actif" },
    { id: "CL-004", name: "Aïcha Ba", phone: "+221 77 456 78 90", email: "a.ba@email.com", city: "Dakar", orders: 31, total: 890000, status: "actif" },
    { id: "CL-005", name: "Ibrahima Fall", phone: "+221 76 567 89 01", email: "i.fall@email.com", city: "Mbour", orders: 5, total: 340000, status: "inactif" },
    { id: "CL-006", name: "Aminata Sow", phone: "+221 70 678 90 12", email: "a.sow@email.com", city: "Dakar", orders: 12, total: 295000, status: "actif" },
    { id: "CL-007", name: "Cheikh Diop", phone: "+221 77 789 01 23", email: "c.diop@email.com", city: "Touba", orders: 9, total: 175000, status: "actif" },
    { id: "CL-008", name: "Ndèye Guèye", phone: "+221 76 890 12 34", email: "n.gueye@email.com", city: "Dakar", orders: 15, total: 445000, status: "actif" },
];

function formatAmount(amount) {
    return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export default function Customers() {
    const [customers, setCustomers] = useState(initialCustomers);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: "", phone: "", email: "", city: "" });

    const filtered = customers.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.city.toLowerCase().includes(search.toLowerCase())
    );

    function handleAdd() {
        const newC = {
            id: `CL-${String(customers.length + 1).padStart(3, "0")}`,
            ...form,
            orders: 0,
            total: 0,
            status: "actif",
        };
        setCustomers([newC, ...customers]);
        setShowModal(false);
        setForm({ name: "", phone: "", email: "", city: "" });
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-inter font-black text-[#FAF8F5] text-2xl tracking-tight">Clients</h1>
                    <p className="font-inter text-[#FAF8F5]/40 text-sm mt-1">
                        {customers.length} clients enregistrés
                    </p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} />
                    Nouveau client
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-xs">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF8F5]/25" />
                <input
                    type="text"
                    placeholder="Rechercher un client..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total clients", value: customers.length },
                    { label: "Actifs", value: customers.filter(c => c.status === "actif").length, color: "text-emerald-400" },
                    { label: "Chiffre d'affaires", value: formatAmount(customers.reduce((s, c) => s + c.total, 0)), color: "text-[#C9A84C]" },
                ].map((s) => (
                    <div key={s.label} className="card">
                        <p className="font-inter text-xs text-[#FAF8F5]/40">{s.label}</p>
                        <p className={`font-inter font-bold text-lg mt-1 ${s.color || "text-[#FAF8F5]"}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Téléphone</th>
                            <th>Ville</th>
                            <th>Commandes</th>
                            <th>Total dépensé</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((c) => (
                            <tr key={c.id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#C9A84C]/15 flex items-center justify-center">
                                            <span className="font-inter font-bold text-[#C9A84C] text-xs">
                                                {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-inter text-sm text-[#FAF8F5]/85">{c.name}</p>
                                            <p className="font-mono text-[10px] text-[#FAF8F5]/25">{c.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-mono text-xs">{c.phone}</td>
                                <td>{c.city}</td>
                                <td className="font-mono text-xs">{c.orders}</td>
                                <td className="font-mono text-xs">{formatAmount(c.total)}</td>
                                <td>
                                    <span className={`status-badge ${c.status === "actif" ? "delivered" : "overdue"}`}>
                                        {c.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-[#FAF8F5]/30">Aucun client trouvé</td>
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
                            <h2 className="font-inter font-bold text-[#FAF8F5]">Nouveau client</h2>
                            <button onClick={() => setShowModal(false)} className="text-[#FAF8F5]/30 hover:text-[#FAF8F5]/60">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Nom complet</label>
                                <input type="text" placeholder="Ex: Mamadou Diallo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Téléphone</label>
                                <input type="text" placeholder="Ex: +221 77 123 45 67" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            </div>
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Email</label>
                                <input type="email" placeholder="client@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Ville</label>
                                <input type="text" placeholder="Ex: Dakar" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button className="btn-secondary flex-1" onClick={() => setShowModal(false)}>Annuler</button>
                            <button className="btn-primary flex-1" onClick={handleAdd} disabled={!form.name} style={{ opacity: !form.name ? 0.5 : 1 }}>
                                <Plus size={16} />
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}