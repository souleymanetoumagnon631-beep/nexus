import { useState } from "react";
import { Search, Plus, X, Package, AlertTriangle, TrendingDown } from "lucide-react";

const initialProducts = [
    { id: "PR-001", name: "Tissu wax 6 yards", category: "Textile", qty: 45, minQty: 10, price: 15000, supplier: "Mamadou & Fils" },
    { id: "PR-002", name: "Savon artisanal", category: "Hygiène", qty: 120, minQty: 30, price: 1700, supplier: "Coopérative de Thiès" },
    { id: "PR-003", name: "Huile de palme", category: "Alimentation", qty: 8, minQty: 15, price: 8000, supplier: "Fournisseur Sarr" },
    { id: "PR-004", name: "Riz parfumé 5kg", category: "Alimentation", qty: 22, minQty: 10, price: 8000, supplier: "Grands Moulins" },
    { id: "PR-005", name: "Turban brodé", category: "Accessoires", qty: 15, minQty: 5, price: 18000, supplier: "Artisans de Saint-Louis" },
    { id: "PR-006", name: "Meuble en rotin", category: "Maison", qty: 3, minQty: 2, price: 150000, supplier: "Ébénisterie Diop" },
    { id: "PR-007", name: "Coussin décoratif", category: "Maison", qty: 18, minQty: 6, price: 16250, supplier: "Textile Sénégal" },
    { id: "PR-008", name: "Bijoux fantaisie lot", category: "Accessoires", qty: 7, minQty: 10, price: 33500, supplier: "Import Export Ba" },
    { id: "PR-009", name: "Parfum importé", category: "Beauté", qty: 4, minQty: 5, price: 47500, supplier: "Distrib Express" },
    { id: "PR-010", name: "Fil de coton", category: "Textile", qty: 200, minQty: 50, price: 4000, supplier: "Mamadou & Fils" },
];

function formatAmount(amount) {
    return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export default function Stock() {
    const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: "", category: "", qty: 1, minQty: 5, price: 0, supplier: "" });

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.supplier.toLowerCase().includes(search.toLowerCase())
    );

    const lowStock = products.filter((p) => p.qty <= p.minQty);
    const totalValue = products.reduce((s, p) => s + p.qty * p.price, 0);
    const totalItems = products.reduce((s, p) => s + p.qty, 0);

    function handleAdd() {
        const newP = {
            id: `PR-${String(products.length + 1).padStart(3, "0")}`,
            ...form,
            qty: Number(form.qty),
            minQty: Number(form.minQty),
            price: Number(form.price),
        };
        setProducts([newP, ...products]);
        setShowModal(false);
        setForm({ name: "", category: "", qty: 1, minQty: 5, price: 0, supplier: "" });
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-inter font-black text-[#FAF8F5] text-2xl tracking-tight">Stock</h1>
                    <p className="font-inter text-[#FAF8F5]/40 text-sm mt-1">
                        {products.length} produits · {totalItems} unités en stock
                    </p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={16} />
                    Nouveau produit
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-xs">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF8F5]/25" />
                <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: "Produits", value: products.length, icon: Package, color: "text-[#C9A84C]" },
                    { label: "Unités en stock", value: totalItems, icon: Package, color: "text-[#FAF8F5]" },
                    { label: "Valeur totale", value: formatAmount(totalValue), icon: Package, color: "text-emerald-400" },
                    { label: "Stock faible", value: lowStock.length, icon: AlertTriangle, color: "text-red-400" },
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

            {/* Low stock alert */}
            {lowStock.length > 0 && (
                <div className="card border-red-400/20" style={{ background: "rgba(239,68,68,0.05)" }}>
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle size={16} className="text-red-400" />
                        <h3 className="font-inter font-semibold text-sm text-red-400">Stock faible détecté</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {lowStock.map((p) => (
                            <span key={p.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-400/10 border border-red-400/20 text-xs font-inter text-red-300">
                                <TrendingDown size={12} />
                                {p.name} ({p.qty}/{p.minQty})
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Catégorie</th>
                            <th>Quantité</th>
                            <th>Seuil min.</th>
                            <th>Prix unitaire</th>
                            <th>Fournisseur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((p) => (
                            <tr key={p.id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center">
                                            <Package size={14} className="text-[#C9A84C]" />
                                        </div>
                                        <div>
                                            <p className="font-inter text-sm text-[#FAF8F5]/85">{p.name}</p>
                                            <p className="font-mono text-[10px] text-[#FAF8F5]/25">{p.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{p.category}</td>
                                <td>
                                    <span className={`font-mono text-xs ${p.qty <= p.minQty ? "text-red-400" : "text-[#FAF8F5]/70"}`}>
                                        {p.qty}
                                    </span>
                                </td>
                                <td className="font-mono text-xs text-[#FAF8F5]/40">{p.minQty}</td>
                                <td className="font-mono text-xs">{formatAmount(p.price)}</td>
                                <td className="text-[#FAF8F5]/60">{p.supplier}</td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-[#FAF8F5]/30">Aucun produit trouvé</td>
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
                            <h2 className="font-inter font-bold text-[#FAF8F5]">Nouveau produit</h2>
                            <button onClick={() => setShowModal(false)} className="text-[#FAF8F5]/30 hover:text-[#FAF8F5]/60">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Nom du produit</label>
                                <input type="text" placeholder="Ex: Tissu wax" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Catégorie</label>
                                <input type="text" placeholder="Ex: Textile" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Quantité</label>
                                    <input type="number" min="0" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Seuil minimum</label>
                                    <input type="number" min="0" value={form.minQty} onChange={(e) => setForm({ ...form, minQty: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Prix unitaire (FCFA)</label>
                                <input type="number" min="0" placeholder="Ex: 15000" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                            </div>
                            <div>
                                <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">Fournisseur</label>
                                <input type="text" placeholder="Ex: Mamadou & Fils" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} />
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