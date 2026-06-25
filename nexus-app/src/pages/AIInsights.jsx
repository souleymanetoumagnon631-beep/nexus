import { useState } from "react";
import { Brain, Sparkles, TrendingUp, AlertTriangle, MessageSquare, Lightbulb, ChevronRight, Zap } from "lucide-react";

const insights = [
    {
        id: 1,
        type: "prediction",
        icon: TrendingUp,
        title: "Risque de rupture de stock",
        message: "Le produit 'Huile de palme' (8 unités restantes) sera épuisé dans 3-4 jours selon votre rythme de vente actuel. Nous recommandons de commander 25 unités auprès de 'Fournisseur Sarr'.",
        confidence: 92,
        action: "Créer un bon de commande",
    },
    {
        id: 2,
        type: "opportunity",
        icon: Sparkles,
        title: "Opportunité de vente",
        message: "Les clients qui ont acheté 'Tissu wax' ont également acheté 'Fil de coton' dans 68% des cas. Nous vous suggérons de créer un bundle promotionnel.",
        confidence: 87,
        action: "Créer une offre groupée",
    },
    {
        id: 3,
        type: "alert",
        icon: AlertTriangle,
        title: "Baisse anormale détectée",
        message: "Votre chiffre d'affaires a baissé de 23% cette semaine par rapport à la moyenne. Les ventes de 'Parfum importé' sont particulièrement affectées (-45%).",
        confidence: 95,
        action: "Voir le rapport détaillé",
    },
    {
        id: 4,
        type: "suggestion",
        icon: MessageSquare,
        title: "Relance optimisée",
        message: "12 clients n'ont pas payé leurs factures depuis plus de 7 jours. L'IA recommande d'envoyer un rappel WhatsApp personnalisé entre 14h et 16h pour un taux de réponse optimal.",
        confidence: 78,
        action: "Envoyer les relances",
    },
    {
        id: 5,
        type: "prediction",
        icon: Lightbulb,
        title: "Conseil de croissance",
        message: "Dakar représente 62% de votre chiffre d'affaires. Élargir votre présence à Thiès et Saint-Louis pourrait augmenter vos revenus de 35% selon les données du marché local.",
        confidence: 81,
        action: "Voir l'analyse de marché",
    },
];

const stats = [
    { label: "Analyses aujourd'hui", value: "24", icon: Brain, color: "text-[#C9A84C]" },
    { label: "Précision IA", value: "94%", icon: Zap, color: "text-emerald-400" },
    { label: "Actions recommandées", value: "8", icon: ChevronRight, color: "text-blue-400" },
    { label: "Économies estimées", value: "145k FCFA", icon: TrendingUp, color: "text-[#C9A84C]" },
];

function getTypeColor(type) {
    switch (type) {
        case "prediction": return "border-blue-400/20 bg-blue-400/5";
        case "opportunity": return "border-emerald-400/20 bg-emerald-400/5";
        case "alert": return "border-red-400/20 bg-red-400/5";
        case "suggestion": return "border-[#C9A84C]/20 bg-[#C9A84C]/5";
        default: return "border-white/5 bg-white/5";
    }
}

function getConfidenceColor(confidence) {
    if (confidence >= 90) return "text-emerald-400";
    if (confidence >= 75) return "text-[#C9A84C]";
    return "text-blue-400";
}

export default function AIInsights() {
    const [activeFilter, setActiveFilter] = useState("all");

    const filtered = activeFilter === "all"
        ? insights
        : insights.filter(i => i.type === activeFilter);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                        <Brain size={20} className="text-[#C9A84C]" />
                    </div>
                    <div>
                        <h1 className="font-inter font-black text-[#FAF8F5] text-2xl tracking-tight">Nexus AI</h1>
                        <p className="font-inter text-[#FAF8F5]/40 text-xs">Conseils intelligents basés sur vos données</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((s) => (
                    <div key={s.label} className="card">
                        <div className="flex items-center justify-between mb-2">
                            <p className="font-inter text-[10px] text-[#FAF8F5]/40 uppercase tracking-wider">{s.label}</p>
                            <s.icon size={14} className={s.color} />
                        </div>
                        <p className={`font-inter font-bold text-xl ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
                {[
                    { key: "all", label: "Tout" },
                    { key: "prediction", label: "Prédictions" },
                    { key: "opportunity", label: "Opportunités" },
                    { key: "alert", label: "Alertes" },
                    { key: "suggestion", label: "Suggestions" },
                ].map((f) => (
                    <button
                        key={f.key}
                        onClick={() => setActiveFilter(f.key)}
                        className={`px-4 py-2 rounded-full text-xs font-inter transition-all duration-200 ${activeFilter === f.key
                                ? "bg-[#C9A84C] text-[#0D0D12] font-semibold"
                                : "bg-white/5 text-[#FAF8F5]/50 hover:bg-white/10 hover:text-[#FAF8F5]/70"
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Insights list */}
            <div className="space-y-4">
                {filtered.map((insight) => (
                    <div
                        key={insight.id}
                        className={`card border ${getTypeColor(insight.type)}`}
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                                <insight.icon size={18} className="text-[#C9A84C]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-inter font-semibold text-[#FAF8F5] text-sm">{insight.title}</h3>
                                    <span className={`font-mono text-[10px] ${getConfidenceColor(insight.confidence)}`}>
                                        {insight.confidence}% confiance
                                    </span>
                                </div>
                                <p className="font-inter text-xs text-[#FAF8F5]/55 leading-relaxed mb-4">
                                    {insight.message}
                                </p>
                                <button className="btn-secondary text-xs py-1.5 px-3">
                                    {insight.action}
                                    <ChevronRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="card text-center py-12">
                    <Brain size={32} className="text-[#C9A84C]/30 mx-auto mb-3" />
                    <p className="font-inter text-sm text-[#FAF8F5]/40">Aucune analyse disponible pour ce filtre</p>
                </div>
            )}
        </div>
    );
}