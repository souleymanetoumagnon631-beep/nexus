import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    ArrowRight, Zap, Package, MessageSquare, FileText, Check,
    ChevronRight, BarChart3, Users, Truck, Brain, Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const h = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
        window.addEventListener("scroll", h, { passive: true });
        return () => window.removeEventListener("scroll", h);
    }, []);
    return (
        <nav className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-5 py-3 rounded-full transition-all duration-500 ${scrolled ? "bg-[#0D0D12]/85 backdrop-blur-xl border border-[#C9A84C]/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" : "bg-transparent border border-transparent"}`}>
            <span className="font-inter font-black text-[#FAF8F5] tracking-tight text-sm">NEXUS AI</span>
            <div className="hidden md:flex items-center gap-5">
                {["Fonctionnalités", "Protocole", "Tarifs"].map((l) => (
                    <a key={l} href={`#${l.toLowerCase()}`} className="text-xs font-inter text-[#FAF8F5]/55 hover:text-[#C9A84C] transition-colors duration-200 hover:-translate-y-px inline-block">{l}</a>
                ))}
            </div>
            <button
                onClick={() => navigate("/app")}
                className="btn-magnetic relative overflow-hidden bg-[#C9A84C] text-[#0D0D12] text-xs font-inter font-semibold px-4 py-2 rounded-full"
            >
                <span className="absolute inset-0 bg-[#FAF8F5] translate-y-full hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">Essai gratuit</span>
            </button>
        </nav>
    );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
    const heroRef = useRef(null);
    const navigate = useNavigate();
    const els = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(els.map(r => r.current), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.3 });
        }, heroRef);
        return () => ctx.revert();
    }, []);
    return (
        <section ref={heroRef} className="relative h-[100dvh] flex flex-col justify-end pb-20 px-6 md:px-16 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80')" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/70 to-[#0D0D12]/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D12]/80 via-transparent to-transparent" />
            <div className="relative z-10 max-w-4xl">
                <div ref={els[0]} className="flex items-center gap-2 mb-6 opacity-0">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                        <span className="font-mono text-[10px] text-[#C9A84C] tracking-widest">GESTION COMMERCIALE INTELLIGENTE</span>
                    </span>
                </div>
                <p ref={els[1]} className="font-inter font-black text-[#FAF8F5]/90 tracking-tight leading-none mb-2 opacity-0" style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.6rem)" }}>
                    La clarté en business
                </p>
                <h1 ref={els[2]} className="font-playfair italic text-[#C9A84C] leading-none mb-8 opacity-0" style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)", lineHeight: "0.9" }}>
                    sans prix.
                </h1>
                <p ref={els[3]} className="font-inter text-[#FAF8F5]/50 max-w-md mb-8 leading-relaxed text-sm md:text-base opacity-0">
                    Factures Mobile Money, relances WhatsApp, stocks, livraisons — tout ce dont votre business a besoin, dans une seule application.
                </p>
                <div ref={els[4]} className="flex flex-wrap items-center gap-4 opacity-0">
                    <button
                        onClick={() => navigate("/app")}
                        className="group relative overflow-hidden inline-flex items-center gap-2 bg-[#C9A84C] text-[#0D0D12] font-inter font-semibold px-6 py-3.5 rounded-full shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:scale-[1.03] transition-transform duration-300"
                    >
                        <span className="absolute inset-0 bg-[#FAF8F5] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
                        <span className="relative z-10 text-sm">Commencer 7 jours gratuits</span>
                        <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="font-mono text-[11px] text-[#FAF8F5]/30 tracking-wide">Puis 5 000 FCFA / mois</span>
                </div>
            </div>
            <div className="absolute bottom-6 right-8 opacity-40">
                <div className="w-4 h-7 rounded-full border border-[#FAF8F5]/30 flex items-start justify-center p-1">
                    <div className="w-0.5 h-2 bg-[#FAF8F5]/60 rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}

// ─── CARD 1: DIAGNOSTIC MIXER ──────────────────────────────────────────────
function DiagnosticMixer() {
    const [items, setItems] = useState([
        { label: "Facture générée", value: "245 000 FCFA", icon: FileText },
        { label: "Paiement reçu", value: "Wave · 3 sec", icon: Zap },
        { label: "Client notifié", value: "WhatsApp ✓", icon: MessageSquare },
    ]);
    useEffect(() => {
        const t = setInterval(() => setItems(p => { const n = [...p]; n.unshift(n.pop()); return n; }), 2800);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="card-surface p-6 h-full flex flex-col gap-4" style={{ background: "rgba(42,42,53,0.4)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "2rem", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center justify-between">
                <h3 className="font-inter font-semibold text-[#FAF8F5] text-sm">Facturation & Paiement</h3>
                <span className="font-mono text-[10px] text-[#C9A84C]/60">Mobile Money</span>
            </div>
            <div className="flex flex-col gap-2">
                {items.map((item, i) => (
                    <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-700"
                        style={{ background: i === 0 ? "rgba(201,168,76,0.12)" : "rgba(42,42,53,0.4)", border: i === 0 ? "1px solid rgba(201,168,76,0.3)" : "1px solid rgba(255,255,255,0.04)", transform: `scale(${1 - i * 0.025})`, opacity: 1 - i * 0.3, transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}>
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg" style={{ background: i === 0 ? "rgba(201,168,76,0.2)" : "rgba(255,255,255,0.04)", color: i === 0 ? "#C9A84C" : "#FAF8F580" }}>
                            <item.icon size={13} />
                        </div>
                        <div className="flex-1">
                            <p className="font-inter text-[10px] text-[#FAF8F5]/40">{item.label}</p>
                            <p className="font-mono text-xs text-[#FAF8F5] font-medium">{item.value}</p>
                        </div>
                        {i === 0 && <ChevronRight size={11} className="text-[#C9A84C]" />}
                    </div>
                ))}
            </div>
            <div className="mt-auto pt-2 border-t border-white/5">
                <div className="flex justify-between">
                    {[["Factures", "847"], ["Encaissé", "3.2M"]].map(([l, v]) => (
                        <div key={l}>
                            <p className="font-mono text-sm font-medium text-[#C9A84C]">{v}</p>
                            <p className="font-inter text-[10px] text-[#FAF8F5]/35 mt-0.5">{l}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── CARD 2: TYPEWRITER ────────────────────────────────────────────────────
function TypewriterTelemetry() {
    const messages = [
        "Rappel envoyé à 127 clients · WhatsApp Business",
        "Taux de réponse : 78% en moins de 2h",
        "Remboursement confirmé · 45 000 FCFA récupérés",
        "Offre promo envoyée · 12 commandes reçues",
        "Stock faible détecté · Fournisseur contacté",
    ];
    const [mi, setMi] = useState(0);
    const [disp, setDisp] = useState("");
    const [ci, setCi] = useState(0);
    useEffect(() => {
        const cur = messages[mi];
        if (ci < cur.length) {
            const t = setTimeout(() => { setDisp(cur.slice(0, ci + 1)); setCi(c => c + 1); }, 38);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => { setMi(i => (i + 1) % messages.length); setDisp(""); setCi(0); }, 2200);
            return () => clearTimeout(t);
        }
    }, [ci, mi]);
    return (
        <div className="p-6 h-full flex flex-col gap-4" style={{ background: "rgba(42,42,53,0.4)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "2rem", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center gap-2">
                <h3 className="font-inter font-semibold text-[#FAF8F5] text-sm flex-1">Relances automatiques</h3>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                    <span className="font-mono text-[10px] text-[#C9A84C]">EN DIRECT</span>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-4">
                <div className="bg-[#0D0D12]/70 rounded-xl p-4 border border-[#C9A84C]/10 min-h-[72px] flex items-center">
                    <p className="font-mono text-xs text-[#FAF8F5]/75 leading-relaxed">
                        {disp}<span className="text-[#C9A84C]" style={{ animation: "blink 1s step-end infinite" }}>|</span>
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {[["Envoyés", "1.2k"], ["Réponses", "78%"], ["Récupéré", "890k"]].map(([l, v]) => (
                        <div key={l} className="bg-[#2A2A35]/60 rounded-lg p-2.5 text-center">
                            <p className="font-mono text-sm font-medium text-[#C9A84C]">{v}</p>
                            <p className="font-inter text-[10px] text-[#FAF8F5]/35 mt-0.5">{l}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── CARD 3: PROTOCOL PLANNER ──────────────────────────────────────────────
function ProtocolPlanner() {
    const days = ["L", "M", "M", "J", "V", "S", "D"];
    const [active, setActive] = useState(null);
    const [saved, setSaved] = useState(false);
    const [phase, setPhase] = useState("idle");
    useEffect(() => {
        let running = true;
        const seq = async () => {
            if (!running) return;
            await new Promise(r => setTimeout(r, 1200));
            setPhase("sel");
            for (let i = 0; i < days.length; i++) {
                if (!running) return;
                setActive(i);
                await new Promise(r => setTimeout(r, 310));
            }
            setPhase("save");
            await new Promise(r => setTimeout(r, 600));
            setSaved(true);
            await new Promise(r => setTimeout(r, 1100));
            if (!running) return;
            setSaved(false); setActive(null); setPhase("idle");
        };
        seq();
        const loop = setInterval(seq, 5000);
        return () => { running = false; clearInterval(loop); };
    }, []);
    return (
        <div className="p-6 h-full flex flex-col gap-4" style={{ background: "rgba(42,42,53,0.4)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "2rem", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center justify-between">
                <h3 className="font-inter font-semibold text-[#FAF8F5] text-sm">Gestion de stock</h3>
                <span className="font-mono text-[10px] text-[#FAF8F5]/30">Hebdomadaire</span>
            </div>
            <div className="grid grid-cols-7 gap-1">
                {days.map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <span className="font-mono text-[9px] text-[#FAF8F5]/25">{d}</span>
                        <div className="w-full aspect-square rounded-md transition-all duration-300 flex items-center justify-center text-[9px] font-mono"
                            style={{ background: active === i ? "rgba(201,168,76,0.25)" : "rgba(42,42,53,0.5)", border: active === i ? "1px solid rgba(201,168,76,0.5)" : "1px solid rgba(255,255,255,0.06)", transform: active === i && phase === "sel" ? "scale(0.92)" : "scale(1)", color: "#C9A84C" }}>
                            {active !== null && i < active ? "✓" : ""}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-2 flex-1">
                {[[Package, "Produits", "247 ref."], [Users, "Clients", "1 840"], [Truck, "Livraisons", "12 en cours"], [BarChart3, "Publicités", "3 actives"]].map(([Icon, l, v]) => (
                    <div key={l} className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: "rgba(42,42,53,0.4)", border: "1px solid rgba(255,255,255,0.04)" }}>
                        <Icon size={11} className="text-[#C9A84C]" />
                        <span className="flex-1 font-inter text-[11px] text-[#FAF8F5]/45">{l}</span>
                        <span className="font-mono text-[11px] text-[#FAF8F5]/70">{v}</span>
                    </div>
                ))}
            </div>
            <button className="w-full py-2.5 rounded-xl font-inter text-xs font-semibold transition-all duration-300 border"
                style={{ background: saved ? "rgba(201,168,76,0.18)" : "rgba(42,42,53,0.7)", borderColor: saved ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.07)", color: saved ? "#C9A84C" : "#FAF8F5", transform: phase === "save" ? "scale(0.96)" : "scale(1)" }}>
                {saved ? "✓ Sauvegardé" : "Sauvegarder le planning"}
            </button>
        </div>
    );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────
function Features() {
    const ref = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".feat-card", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } });
        }, ref);
        return () => ctx.revert();
    }, []);
    return (
        <section id="fonctionnalités" ref={ref} className="py-24 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <span className="font-mono text-[10px] text-[#C9A84C]/60 tracking-widest">FONCTIONNALITÉS</span>
                    <h2 className="font-inter font-black text-[#FAF8F5] mt-2 tracking-tight" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                        Quatre piliers.{" "}<span className="font-playfair italic text-[#C9A84C]">Un seul outil.</span>
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="feat-card opacity-0 h-80"><DiagnosticMixer /></div>
                    <div className="feat-card opacity-0 h-80"><TypewriterTelemetry /></div>
                    <div className="feat-card opacity-0 h-80"><ProtocolPlanner /></div>
                </div>
            </div>
        </section>
    );
}

// ─── AI SECTION ────────────────────────────────────────────────────────────
function AISection() {
    const ref = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".ai-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
        }, ref);
        return () => ctx.revert();
    }, []);
    const aiFeatures = [
        { icon: Brain, title: "Analyse prédictive", desc: "L'IA anticipe vos besoins en stock et vous alerte avant la rupture." },
        { icon: Sparkles, title: "Conseils personnalisés", desc: "Des recommandations basées sur vos données pour optimiser vos ventes." },
        { icon: BarChart3, title: "Détection d'anomalies", desc: "Repérez automatiquement les pics, baisses et comportements inhabituels." },
        { icon: MessageSquare, title: "Relances intelligentes", desc: "L'IA choisit le meilleur moment et le bon message pour chaque client." },
    ];
    return (
        <section ref={ref} className="py-24 px-6 md:px-16" style={{ background: "linear-gradient(180deg, rgba(201,168,76,0.03) 0%, transparent 100%)" }}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <span className="font-mono text-[10px] text-[#C9A84C]/60 tracking-widest">INTELLIGENCE ARTIFICIELLE</span>
                    <h2 className="font-inter font-black text-[#FAF8F5] mt-2 tracking-tight" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                        Vos données deviennent un{" "}
                        <span className="font-playfair italic text-[#C9A84C]">avantage concurrentiel.</span>
                    </h2>
                    <p className="font-inter text-[#FAF8F5]/40 mt-3 text-sm max-w-2xl mx-auto">
                        Nexus AI analyse vos factures, stocks, clients et livraisons pour vous donner des conseils actionnables et faire croître votre business.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {aiFeatures.map((f) => (
                        <div key={f.title} className="ai-card opacity-0 card flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 flex items-center justify-center shrink-0">
                                <f.icon size={20} className="text-[#C9A84C]" />
                            </div>
                            <div>
                                <h3 className="font-inter font-semibold text-[#FAF8F5] text-sm mb-1">{f.title}</h3>
                                <p className="font-inter text-xs text-[#FAF8F5]/45 leading-relaxed">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <button
                        onClick={() => navigate("/app")}
                        className="btn-primary"
                    >
                        <Brain size={16} />
                        Essayer Nexus AI
                    </button>
                </div>
            </div>
        </section>
    );
}

// ─── PHILOSOPHY ────────────────────────────────────────────────────────────
function Philosophy() {
    const ref = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".wd", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.04, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 72%" } });
        }, ref);
        return () => ctx.revert();
    }, []);
    const W = ({ children, accent }) => (
        <span className="wd inline-block mr-[0.3em] opacity-0" style={{ color: accent ? "#C9A84C" : "inherit" }}>{children}</span>
    );
    return (
        <section ref={ref} className="relative py-32 px-6 md:px-16 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-8" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=50')" }} />
            <div className="absolute inset-0" style={{ background: "rgba(42,42,53,0.94)" }} />
            <div className="relative z-10 max-w-4xl mx-auto">
                <p className="font-inter text-[#FAF8F5]/35 mb-5 text-sm md:text-base">
                    {"La plupart des logiciels de gestion se concentrent sur :".split(" ").map((w, i) => <W key={i}>{w}</W>)}
                    <br />
                    {"des fonctionnalités complexes, réservées aux grandes entreprises.".split(" ").map((w, i) => <W key={`b${i}`}>{w}</W>)}
                </p>
                <p className="font-inter font-bold text-[#FAF8F5]/80 text-sm md:text-base mb-4">
                    {"Nous nous concentrons sur :".split(" ").map((w, i) => <W key={i}>{w}</W>)}
                </p>
                <h2 className="font-playfair italic leading-tight" style={{ fontSize: "clamp(2.5rem,8vw,6rem)" }}>
                    {["ce", "qui", "rapporte"].map((w, i) => <W key={i} accent={i === 2}>{w} </W>)}
                    <br />
                    {["à", "votre", "business."].map((w, i) => <W key={i} accent={i === 1}>{w} </W>)}
                </h2>
            </div>
        </section>
    );
}

// ─── SVG ANIMATIONS ────────────────────────────────────────────────────────
function GeomAnim() {
    return (
        <svg viewBox="0 0 200 200" className="w-36 h-36 opacity-25">
            <g style={{ animation: "gspin 20s linear infinite", transformOrigin: "100px 100px" }}>
                <circle cx="100" cy="100" r="82" fill="none" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="8 4" />
                <circle cx="100" cy="100" r="56" fill="none" stroke="#C9A84C" strokeWidth="0.4" />
            </g>
            <g style={{ animation: "gspin 30s linear infinite reverse", transformOrigin: "100px 100px" }}>
                <polygon points="100,22 175,63 175,137 100,178 25,137 25,63" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
            </g>
            <circle cx="100" cy="100" r="4" fill="#C9A84C" opacity="0.7" />
            <style>{`@keyframes gspin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
        </svg>
    );
}

function LaserGrid() {
    const [col, setCol] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setCol(c => (c >= 6 ? 0 : c + 1)), 280);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="grid grid-cols-7 gap-0.5 w-36 h-28 opacity-35">
            {Array.from({ length: 42 }, (_, i) => {
                const c = i % 7, r = Math.floor(i / 7);
                const isBeam = c === col;
                const isPast = c < col;
                return (
                    <div key={i} className="rounded-sm transition-all duration-150"
                        style={{ background: isBeam ? "#C9A84C" : isPast ? "rgba(201,168,76,0.25)" : "rgba(255,255,255,0.04)", boxShadow: isBeam ? "0 0 5px rgba(201,168,76,0.9)" : "none" }} />
                );
            })}
        </div>
    );
}

function ECGLine() {
    return (
        <svg viewBox="0 0 280 90" className="w-44 h-16 opacity-50">
            <defs>
                <style>{`@keyframes ecg { 0%{stroke-dashoffset:560;opacity:0.2} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.2} }`}</style>
            </defs>
            <path d="M0,45 L35,45 L50,45 L55,8 L65,82 L75,45 L95,45 L110,45 L115,18 L125,72 L135,45 L155,45 L170,45 L175,12 L185,78 L195,45 L215,45 L230,45 L235,8 L245,82 L255,45 L280,45"
                fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="560" strokeDashoffset="560"
                style={{ animation: "ecg 2.2s linear infinite" }} />
        </svg>
    );
}

// ─── PROTOCOL ──────────────────────────────────────────────────────────────
function Protocol() {
    const ref = useRef(null);
    const steps = [
        { num: "01", title: "Créez vos factures en 30 secondes", desc: "Générez des factures professionnelles depuis votre mobile. Partagez par WhatsApp, collectez par Mobile Money instantanément.", bg: "#0D0D12", Anim: GeomAnim },
        { num: "02", title: "Relancez sans effort, encaissez plus vite", desc: "Envoyez des rappels de paiement en masse via WhatsApp Business. Suivez chaque réponse, chaque remboursement en temps réel.", bg: "#13121A", Anim: LaserGrid },
        { num: "03", title: "Votre business, sous contrôle total", desc: "Stock, clients, livraisons, fournisseurs, publicités — une vue claire pour prendre les bonnes décisions, toujours.", bg: "#0D0D12", Anim: ECGLine },
    ];
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".step-card", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
        }, ref);
        return () => ctx.revert();
    }, []);
    return (
        <section id="protocole" ref={ref} className="py-24 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
                <div className="mb-14">
                    <span className="font-mono text-[10px] text-[#C9A84C]/60 tracking-widest">PROTOCOLE</span>
                    <h2 className="font-inter font-black text-[#FAF8F5] mt-2 tracking-tight" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                        Comment ça <span className="font-playfair italic text-[#C9A84C]">fonctionne.</span>
                    </h2>
                </div>
                <div className="flex flex-col gap-5">
                    {steps.map((s) => (
                        <div key={s.num} className="step-card opacity-0 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 rounded-[2rem] border border-white/6"
                            style={{ background: s.bg, minHeight: "260px" }}>
                            <div className="flex-1">
                                <span className="font-mono text-[11px] text-[#C9A84C]/45 tracking-widest">{s.num}</span>
                                <h3 className="font-inter font-bold text-[#FAF8F5] mt-3 mb-3 tracking-tight" style={{ fontSize: "clamp(1.2rem,3vw,1.9rem)" }}>{s.title}</h3>
                                <p className="font-inter text-[#FAF8F5]/45 leading-relaxed text-sm max-w-md">{s.desc}</p>
                            </div>
                            <div className="flex items-center justify-center w-44 h-36 shrink-0">
                                <s.Anim />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── PRICING ───────────────────────────────────────────────────────────────
function Pricing() {
    const ref = useRef(null);
    const navigate = useNavigate();
    const plans = [
        { name: "Essentiel", price: "Gratuit", period: "7 jours", desc: "Testez Nexus AI sans engagement ni carte bancaire.", features: ["Facturation mobile", "50 clients max", "Gestion de stock", "1 utilisateur"], cta: "Commencer gratuitement", featured: false },
        { name: "Performance", price: "5 000", period: "FCFA / mois", desc: "La puissance complète pour les commerces actifs.", features: ["Facturation illimitée", "Clients & livraisons illimités", "Relances WhatsApp Business", "Stock avancé + fournisseurs", "Publicités intégrées", "Support prioritaire"], cta: "Choisir Performance", featured: true },
        { name: "Entreprise", price: "40 000", period: "FCFA / an", desc: "Économisez 33% — accès complet toute l'année.", features: ["Tout de Performance", "Multi-utilisateurs", "Analytics avancés", "Export comptable", "Onboarding dédié"], cta: "Choisir Annuel", featured: false },
    ];
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".price-card", { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } });
        }, ref);
        return () => ctx.revert();
    }, []);
    return (
        <section id="tarifs" ref={ref} className="py-24 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <span className="font-mono text-[10px] text-[#C9A84C]/60 tracking-widest">TARIFS</span>
                    <h2 className="font-inter font-black text-[#FAF8F5] mt-2 tracking-tight" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
                        Simple. <span className="font-playfair italic text-[#C9A84C]">Abordable.</span>
                    </h2>
                    <p className="font-inter text-[#FAF8F5]/40 mt-3 text-sm">Commencez gratuitement. Passez au payant quand vous êtes convaincu.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4 items-stretch">
                    {plans.map((p) => (
                        <div key={p.name} className={`price-card opacity-0 rounded-[2rem] p-7 flex flex-col gap-5 ${p.featured ? "border-2 border-[#C9A84C]/40 shadow-[0_0_60px_rgba(201,168,76,0.12)] md:scale-[1.02]" : "border border-white/7"}`}
                            style={{ background: p.featured ? "#0A0A0F" : "rgba(42,42,53,0.25)" }}>
                            {p.featured && <span className="font-mono text-[10px] text-[#C9A84C] tracking-widest bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full px-3 py-1 self-start">RECOMMANDÉ</span>}
                            <div>
                                <h3 className="font-inter font-bold text-[#FAF8F5] text-lg">{p.name}</h3>
                                <p className="font-inter text-[#FAF8F5]/35 text-xs mt-1">{p.desc}</p>
                            </div>
                            <div className="flex items-end gap-1.5">
                                <span className="font-inter font-black text-[#FAF8F5]" style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)" }}>{p.price}</span>
                                <span className="font-mono text-[11px] text-[#FAF8F5]/35 mb-1">{p.period}</span>
                            </div>
                            <ul className="flex flex-col gap-2.5 flex-1">
                                {p.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2">
                                        <Check size={11} className="text-[#C9A84C] shrink-0" />
                                        <span className="font-inter text-xs text-[#FAF8F5]/55">{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => navigate("/app")}
                                className="relative overflow-hidden group w-full py-3.5 rounded-xl font-inter font-semibold text-sm transition-all hover:scale-[1.02]"
                                style={{ background: p.featured ? "#C9A84C" : "rgba(42,42,53,0.8)", color: p.featured ? "#0D0D12" : "#FAF8F5", border: p.featured ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                                <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ background: p.featured ? "#FAF8F5" : "rgba(58,58,72,0.9)" }} />
                                <span className="relative z-10">{p.cta}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────
function Footer() {
    return (
        <footer className="rounded-t-[3rem] mt-8 px-6 md:px-16 pt-16 pb-10" style={{ background: "#07070B" }}>
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-10 mb-12">
                    <div className="md:col-span-2">
                        <span className="font-inter font-black text-[#FAF8F5] text-2xl tracking-tight">NEXUS AI</span>
                        <p className="font-inter text-[#FAF8F5]/30 text-xs mt-3 leading-relaxed max-w-xs">La plateforme de gestion commerciale intelligente pour les entrepreneurs africains.</p>
                        <div className="flex items-center gap-2 mt-5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                            <span className="font-mono text-[10px] text-[#FAF8F5]/25 tracking-wider">SYSTÈME OPÉRATIONNEL</span>
                        </div>
                    </div>
                    <div>
                        <p className="font-mono text-[10px] text-[#C9A84C]/45 tracking-widest mb-4">PRODUIT</p>
                        <ul className="flex flex-col gap-3">
                            {["Fonctionnalités", "Tarifs", "Sécurité", "Mises à jour"].map(l => <li key={l}><a href="#" className="font-inter text-xs text-[#FAF8F5]/35 hover:text-[#FAF8F5] hover:-translate-y-px inline-block transition-all duration-200">{l}</a></li>)}
                        </ul>
                    </div>
                    <div>
                        <p className="font-mono text-[10px] text-[#C9A84C]/45 tracking-widest mb-4">LÉGAL</p>
                        <ul className="flex flex-col gap-3">
                            {["Confidentialité", "Conditions", "Mentions légales"].map(l => <li key={l}><a href="#" className="font-inter text-xs text-[#FAF8F5]/35 hover:text-[#FAF8F5] hover:-translate-y-px inline-block transition-all duration-200">{l}</a></li>)}
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-[10px] text-[#FAF8F5]/18">© 2025 NEXUS AI · Tous droits réservés</p>
                    <p className="font-mono text-[10px] text-[#FAF8F5]/18">Conçu pour les entrepreneurs africains</p>
                </div>
            </div>
        </footer>
    );
}

// ─── LANDING PAGE (PUBLIC) ─────────────────────────────────────────────────
export default function Landing() {
    return (
        <div className="min-h-screen bg-[#0D0D12]">
            <Navbar />
            <Hero />
            <Features />
            <AISection />
            <Philosophy />
            <Protocol />
            <Pricing />
            <Footer />
        </div>
    );
}