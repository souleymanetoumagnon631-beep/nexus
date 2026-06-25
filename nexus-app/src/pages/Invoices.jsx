import { useState } from "react";
import { Plus, Search, FileText, ChevronRight, X } from "lucide-react";

const initialInvoices = [
    { id: "INV-0042", client: "Mamadou Diallo", amount: 85000, status: "payé", date: "24/06/2026", phone: "+221 77 123 45 67", items: [{ desc: "Tissu wax 6 yards", qty: 3, price: 15000 }, { desc: "Fil de coton", qty: 10, price: 4000 }] },
    { id: "INV-0041", client: "Fatou Ndiaye", amount: 42500, status: "en attente", date: "23/06/2026", phone: "+221 76 234 56 78", items: [{ desc: "Savon artisanal", qty: 25, price: 1700 }] },
    { id: "INV-0040", client: "Ousmane Sarr", amount: 120000, status: "en retard", date: "20/06/2026", phone: "+221 70 345 67 89", items: [{ desc: "Huile de palme", qty: 10, price: 8000 }, { desc: "Riz parfumé 5kg", qty: 5, price: 8000 }] },
    { id: "INV-0039", client: "Aïcha Ba", amount: 36000, status: "payé", date: "19/06/2026", phone: "+221 77 456 78 90", items: [{ desc: "Turban brodé", qty: 2, price: 18000 }] },
    { id: "INV-0038", client: "Ibrahima Fall", amount: 215000, status: "payé", date: "18/06/2026", phone: "+221 76 567 89 01", items: [{ desc: "Meuble en rotin", qty: 1, price: 150000 }, { desc: "Coussin décoratif", qty: 4, price: 16250 }] },
    { id: "INV-0037", client: "Aminata Sow", amount: 67000, status: "en attente", date: "17/06/2026", phone: "+221 70 678 90 12", items: [{ desc: "Bijoux fantaisie lot", qty: 2, price: 33500 }] },
    { id: "INV-0036", client: "Cheikh Diop", amount: 95000, status: "payé", date: "15/06/2026", phone: "+221 77 789 01 23", items: [{ desc: "Parfum importé", qty: 2, price: 47500 }] },
];

function formatStatus(status) {
    if (status === "payé" || status === "paid") return "paid";
    if (status === "en attente" || status === "pending") return "pending";
    if (status === "en retard" || status === "overdue") return "overdue";
    return "";
}

function formatAmount(amount) {
    return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export default function Invoices() {
    const [invoices, setInvoices] = useState(initialInvoices);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ client: "", phone: "", items: [{ desc: "", qty: 1, price: 0 }] });

    const filtered = invoices.filter((inv) =>
        inv.client.toLowerCase().includes(search.toLowerCase()) ||
        inv.id.toLowerCase().includes(search.toLowerCase())
    );

    function handleCreate() {
        const total = form.items.reduce((sum, i) => sum + i.qty * i.price, 0);
        const newInv = {
            id: `INV-${String(invoices.length + 1).padStart(4, "0")}`,
            client: form.client,
            phone: form.phone,
            amount: total,
            status: "en attente",
            date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "/"),
            items: [...form.items],
        };
        setInvoices([newInv, ...invoices]);
        setShowModal(false);
        setForm({ client: "", phone: "", items: [{ desc: "", qty: 1, price: 0 }] });
    }

    function addItem() {
        setForm({ ...form, items: [...form.items, { desc: "", qty: 1, price: 0 }] });
    }

    function removeItem(idx) {
        setForm({ ...form, items: form.items.filter((_, i) => i !== idx) });
    }

    function updateItem(idx, field, value) {
        const items = [...form.items];
        items[idx][field] = field === "qty" || field === "price" ? Number(value) : value;
        setForm({ ...form, items });
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-inter font-black text-[#FAF8F5] text-2xl tracking-tight">Factures</h1>
                    <p className="font-inter text-[#FAF8F5]/40 text-sm mt-1">
                        Gérez vos factures et encaissements Mobile Money.
                    </p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} />
                    Nouvelle facture
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-xs">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF8F5]/25" />
                <input
                    type="text"
                    placeholder="Rechercher une facture..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>N° Facture</th>
                            <th>Client</th>
                            <th>Téléphone</th>
                            <th>Montant</th>
                            <th>Date</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((inv) => (
                            <tr key={inv.id} className="cursor-pointer" onClick={() => setSelected(selected?.id === inv.id ? null : inv)}>
                                <td className="font-mono text-xs text-[#C9A84C]">{inv.id}</td>
                                <td className="font-medium text-[#FAF8F5]/85">{inv.client}</td>
                                <td className="font-mono text-xs">{inv.phone}</td>
                                <td className="font-mono text-xs">{formatAmount(inv.amount)}</td>
                                <td className="font-mono text-xs">{inv.date}</td>
                                <td>
                                    <span className={`status-badge ${formatStatus(inv.status)}`}>{inv.status}</span>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-[#FAF8F5]/30">
                                    Aucune facture trouvée
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Invoice detail */}
            {selected && (
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <FileText size={20} className="text-[#C9A84C]" />
                            <h3 className="font-inter font-semibold text-[#FAF8F5]">{selected.id}</h3>
                            <span className={`status-badge ${formatStatus(selected.status)}`}>{selected.status}</span>
                        </div>
                        <button className="btn-secondary text-xs py-1.5 px-3" onClick={() => setSelected(null)}>
                            <X size={14} />
                            Fermer
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                            <p className="font-inter text-[10px] text-[#FAF8F5]/30 uppercase tracking-wider mb-1">Client</p>
                            <p className="font-inter text-[#FAF8F5]/80">{selected.client}</p>
                        </div>
                        <div>
                            <p className="font-inter text-[10px] text-[#FAF8F5]/30 uppercase tracking-wider mb-1">Téléphone</p>
                            <p className="font-mono text-xs text-[#FAF8F5]/80">{selected.phone}</p>
                        </div>
                    </div>
                    <table className="w-full text-sm mb-4">
                        <thead>
                            <tr>
                                <th>Produit / Service</th>
                                <th>Qté</th>
                                <th>Prix unitaire</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selected.items.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.desc}</td>
                                    <td className="font-mono text-xs">{item.qty}</td>
                                    <td className="font-mono text-xs">{formatAmount(item.price)}</td>
                                    <td className="font-mono text-xs">{formatAmount(item.qty * item.price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end border-t border-white/5 pt-3">
                        <div className="text-right">
                            <p className="font-inter text-[10px] text-[#FAF8F5]/30 uppercase tracking-wider mb-1">Total</p>
                            <p className="font-inter font-bold text-[#C9A84C] text-lg">{formatAmount(selected.amount)}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Create modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
                    <div className="card w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-inter font-bold text-[#FAF8F5]">Nouvelle facture</h2>
                            <button onClick={() => setShowModal(false)} className="text-[#FAF8F5]/30 hover:text-[#FAF8F5]/60">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Nom du client</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Mamadou Diallo"
                                    value={form.client}
                                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Téléphone Mobile Money</label>
                                <input
                                    type="text"
                                    placeholder="Ex: +221 77 123 45 67"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="font-inter text-xs text-[#FAF8F5]/50">Articles</label>
                                    <button onClick={addItem} className="text-xs text-[#C9A84C] hover:underline font-inter">
                                        + Ajouter un article
                                    </button>
                                </div>
                                {form.items.map((item, i) => (
                                    <div key={i} className="flex gap-2 mb-2 items-start">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                value={item.desc}
                                                onChange={(e) => updateItem(i, "desc", e.target.value)}
                                            />
                                        </div>
                                        <div className="w-16">
                                            <input
                                                type="number"
                                                placeholder="Qté"
                                                min="1"
                                                value={item.qty}
                                                onChange={(e) => updateItem(i, "qty", e.target.value)}
                                            />
                                        </div>
                                        <div className="w-24">
                                            <input
                                                type="number"
                                                placeholder="Prix"
                                                min="0"
                                                value={item.price}
                                                onChange={(e) => updateItem(i, "price", e.target.value)}
                                            />
                                        </div>
                                        {form.items.length > 1 && (
                                            <button onClick={() => removeItem(i)} className="mt-1.5 text-red-400/50 hover:text-red-400">
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button className="btn-secondary flex-1" onClick={() => setShowModal(false)}>
                                Annuler
                            </button>
                            <button
                                className="btn-primary flex-1"
                                onClick={handleCreate}
                                disabled={!form.client || !form.items[0].desc}
                                style={{ opacity: !form.client || !form.items[0].desc ? 0.5 : 1 }}
                            >
                                <Plus size={16} />
                                Créer la facture
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}