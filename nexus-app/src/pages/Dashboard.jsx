import { useEffect, useRef } from "react";
import {
    TrendingUp,
    Receipt,
    Users,
    Package,
    Truck,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

const stats = [
    {
        label: "Chiffre d'affaires",
        value: "3 245 000 FCFA",
        change: "+12.5%",
        up: true,
        icon: DollarSign,
    },
    {
        label: "Factures émises",
        value: "847",
        change: "+8.2%",
        up: true,
        icon: Receipt,
    },
    {
        label: "Clients actifs",
        value: "1 840",
        change: "+5.7%",
        up: true,
        icon: Users,
    },
    {
        label: "Produits en stock",
        value: "247",
        change: "-3.1%",
        up: false,
        icon: Package,
    },
];

const recentInvoices = [
    { id: "INV-0042", client: "Mamadou Diallo", amount: "85 000 FCFA", status: "payé", date: "24/06/2026" },
    { id: "INV-0041", client: "Fatou Ndiaye", amount: "42 500 FCFA", status: "en attente", date: "23/06/2026" },
    { id: "INV-0040", client: "Ousmane Sarr", amount: "120 000 FCFA", status: "en retard", date: "20/06/2026" },
    { id: "INV-0039", client: "Aïcha Ba", amount: "36 000 FCFA", status: "payé", date: "19/06/2026" },
    { id: "INV-0038", client: "Ibrahima Fall", amount: "215 000 FCFA", status: "payé", date: "18/06/2026" },
];

const recentDeliveries = [
    { id: "LIV-0032", client: "Fatou Ndiaye", status: "livré", date: "24/06/2026" },
    { id: "LIV-0031", client: "Ousmane Sarr", status: "en transit", date: "24/06/2026" },
    { id: "LIV-0030", client: "Mamadou Diallo", status: "livré", date: "23/06/2026" },
    { id: "LIV-0029", client: "Aïcha Ba", status: "en transit", date: "22/06/2026" },
];

function formatStatus(status) {
    if (status === "payé") return "paid";
    if (status === "en attente") return "pending";
    if (status === "en retard") return "overdue";
    if (status === "livré") return "delivered";
    if (status === "en transit") return "in-transit";
    return "";
}

export default function Dashboard() {
    const cardsRef = useRef(null);

    useEffect(() => {
        const cards = cardsRef.current?.querySelectorAll(".stat-card");
        if (!cards) return;
        cards.forEach((card, i) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
                card.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 100 + i * 80);
        });
    }, []);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="font-inter font-black text-[#FAF8F5] text-2xl tracking-tight">
                    Tableau de bord
                </h1>
                <p className="font-inter text-[#FAF8F5]/40 text-sm mt-1">
                    Bienvenue sur votre espace de gestion NEXUS.
                </p>
            </div>

            {/* Stats cards */}
            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="stat-card card"
                        style={{ opacity: 0 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-inter text-xs text-[#FAF8F5]/40">{s.label}</span>
                            <div className="w-9 h-9 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center">
                                <s.icon size={16} className="text-[#C9A84C]" />
                            </div>
                        </div>
                        <p className="font-inter font-bold text-[#FAF8F5] text-lg">{s.value}</p>
                        <div className={`flex items-center gap-1 mt-2 ${s.up ? "text-emerald-400" : "text-red-400"}`}>
                            {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            <span className="font-mono text-xs">{s.change}</span>
                            <span className="font-inter text-[10px] text-[#FAF8F5]/25 ml-1">vs mois dernier</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="card lg:col-span-2">
                    <h3 className="font-inter font-semibold text-[#FAF8F5] text-sm mb-4">
                        Évolution du chiffre d'affaires
                    </h3>
                    <div className="h-48 flex items-end gap-2" style={{ paddingTop: "1.5rem" }}>
                        {["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"].map((m, i) => {
                            const h = [40, 55, 45, 65, 60, 80][i];
                            return (
                                <div key={m} className="flex-1 flex flex-col items-center gap-2">
                                    <div
                                        className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                                        style={{
                                            height: `${h}%`,
                                            background: "linear-gradient(180deg, #C9A84C 0%, rgba(201,168,76,0.2) 100%)",
                                            borderRadius: "4px 4px 0 0",
                                        }}
                                    />
                                    <span className="font-mono text-[10px] text-[#FAF8F5]/25">{m}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="card flex flex-col items-center justify-center text-center">
                    <TrendingUp size={32} className="text-[#C9A84C]/40 mb-3" />
                    <p className="font-inter text-xs text-[#FAF8F5]/40">
                        Objectif mensuel
                    </p>
                    <p className="font-inter font-bold text-[#FAF8F5] text-xl mt-1">
                        5 000 000 FCFA
                    </p>
                    <div className="w-full bg-white/5 rounded-full h-2 mt-4">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: "65%",
                                background: "linear-gradient(90deg, #C9A84C, #d4b95a)",
                            }}
                        />
                    </div>
                    <p className="font-mono text-xs text-[#C9A84C] mt-2">65% atteint</p>
                </div>
            </div>

            {/* Recent data tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent invoices */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-inter font-semibold text-[#FAF8F5] text-sm">
                            Dernières factures
                        </h3>
                        <Receipt size={16} className="text-[#C9A84C]/60" />
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Client</th>
                                    <th>Montant</th>
                                    <th>Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentInvoices.map((inv) => (
                                    <tr key={inv.id}>
                                        <td className="font-mono text-xs text-[#C9A84C]">{inv.id}</td>
                                        <td>{inv.client}</td>
                                        <td className="font-mono text-xs">{inv.amount}</td>
                                        <td>
                                            <span className={`status-badge ${formatStatus(inv.status)}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent deliveries */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-inter font-semibold text-[#FAF8F5] text-sm">
                            Livraisons récentes
                        </h3>
                        <Truck size={16} className="text-[#C9A84C]/60" />
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Client</th>
                                    <th>Date</th>
                                    <th>Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentDeliveries.map((d) => (
                                    <tr key={d.id}>
                                        <td className="font-mono text-xs text-[#C9A84C]">{d.id}</td>
                                        <td>{d.client}</td>
                                        <td className="font-mono text-xs">{d.date}</td>
                                        <td>
                                            <span className={`status-badge ${formatStatus(d.status)}`}>
                                                {d.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}