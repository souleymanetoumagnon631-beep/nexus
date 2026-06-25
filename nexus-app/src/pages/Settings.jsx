import { useState } from "react";
import { Save, User, Building, Bell, CreditCard, Shield } from "lucide-react";

export default function Settings() {
    const [saved, setSaved] = useState(false);
    const [profile, setProfile] = useState({
        name: "Amadou K.",
        email: "amadou@boutiquemoderne.com",
        phone: "+221 77 000 00 00",
        shop: "Boutique Moderne",
        city: "Dakar",
    });

    function handleSave() {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    const sections = [
        {
            title: "Profil",
            icon: User,
            fields: [
                { key: "name", label: "Nom complet", placeholder: "Votre nom" },
                { key: "email", label: "Email", placeholder: "votre@email.com", type: "email" },
                { key: "phone", label: "Téléphone", placeholder: "+221 77 000 00 00" },
            ],
        },
        {
            title: "Boutique",
            icon: Building,
            fields: [
                { key: "shop", label: "Nom de la boutique", placeholder: "Boutique Moderne" },
                { key: "city", label: "Ville", placeholder: "Dakar" },
            ],
        },
    ];

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Header */}
            <div>
                <h1 className="font-inter font-black text-[#FAF8F5] text-2xl tracking-tight">Paramètres</h1>
                <p className="font-inter text-[#FAF8F5]/40 text-sm mt-1">
                    Gérez les informations de votre compte et de votre boutique.
                </p>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: "Notifications", icon: Bell, desc: "WhatsApp & Email" },
                    { label: "Paiements", icon: CreditCard, desc: "Mobile Money" },
                    { label: "Sécurité", icon: Shield, desc: "Mot de passe" },
                ].map((s) => (
                    <button key={s.label} className="card text-left hover:bg-white/5 transition-all duration-200 cursor-pointer">
                        <div className="flex items-center gap-2 mb-2">
                            <s.icon size={16} className="text-[#C9A84C]" />
                            <span className="font-inter font-medium text-[#FAF8F5] text-sm">{s.label}</span>
                        </div>
                        <p className="font-inter text-xs text-[#FAF8F5]/30">{s.desc}</p>
                    </button>
                ))}
            </div>

            {/* Forms */}
            <div className="space-y-6">
                {sections.map(({ title, icon: Icon, fields }) => (
                    <div key={title} className="card">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center">
                                <Icon size={16} className="text-[#C9A84C]" />
                            </div>
                            <h2 className="font-inter font-semibold text-[#FAF8F5] text-sm">{title}</h2>
                        </div>
                        <div className="space-y-4">
                            {fields.map(({ key, label, placeholder, type }) => (
                                <div key={key}>
                                    <label className="block font-inter text-xs text-[#FAF8F5]/50 mb-1.5">{label}</label>
                                    <input
                                        type={type || "text"}
                                        placeholder={placeholder}
                                        value={profile[key]}
                                        onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Save button */}
            <button
                className="btn-primary"
                onClick={handleSave}
                style={saved ? { background: "#34d399", color: "#0D0D12" } : {}}
            >
                <Save size={16} />
                {saved ? "Modifications enregistrées ✓" : "Enregistrer les modifications"}
            </button>
        </div>
    );
}