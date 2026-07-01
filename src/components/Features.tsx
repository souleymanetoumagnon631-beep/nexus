import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function CardBlender() {
    const labels = ['2 sacs de riz, 15 000 F', 'Fatou payé ? ✅', 'Stock riz: 12 sacs', 'Marge: 22%'];
    const [items, setItems] = useState(labels);
    const intervalRef = useRef<number>(0);

    const cycle = useCallback(() => {
        setItems((prev) => {
            const copy = [...prev];
            const last = copy.pop()!;
            copy.unshift(last);
            return copy;
        });
    }, []);

    useEffect(() => {
        intervalRef.current = window.setInterval(cycle, 3000);
        return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
    }, [cycle]);

    return (
        <div className="rounded-[2rem] bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="font-serif text-xl text-gray-900 mb-4">Capture WhatsApp</h3>
            <p className="text-gray-500 text-sm mb-6">
                Chaque message devient une écriture comptable. En continuant d'écrire comme d'habitude.
            </p>
            <div className="space-y-2">
                {items.map((label, i) => (
                    <div
                        key={i}
                        className="rounded-xl bg-gray-50 px-4 py-3 text-gray-700 text-sm font-mono flex items-center gap-3 transition-all duration-500"
                        style={{
                            opacity: i === 0 ? 1 : 1 - i * 0.18,
                            transform: `scale(${1 - i * 0.04})`,
                            marginTop: i > 0 ? '-0.5rem' : '0',
                        }}
                    >
                        <span className="w-2 h-2 rounded-full bg-primary-500/60 flex-shrink-0" />
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
}

function CardTelemetry() {
    const text = "Vente 15/01: 2 sacs riz 15 000F ✓ | Stock: 12 | Créance Fatou: 5 000F";
    const [displayed, setDisplayed] = useState('');
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (idx >= text.length) return;
        const t = setTimeout(() => {
            setDisplayed(text.slice(0, idx + 1));
            setIdx(idx + 1);
        }, 40 + Math.random() * 30);
        return () => clearTimeout(t);
    }, [idx, text]);

    return (
        <div className="rounded-[2rem] bg-white border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                <span className="text-primary-600 font-mono text-xs tracking-widest uppercase">Flux en Direct</span>
            </div>
            <h3 className="font-serif text-xl text-gray-900 mb-4">Rapprochement Mobile Money</h3>
            <p className="text-gray-500 text-sm mb-6">
                Chaque paiement Wave, Orange Money ou MTN est automatiquement associé à la bonne vente.
            </p>
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 min-h-[80px]">
                <code className="font-mono text-sm text-primary-600/90">
                    {displayed}
                    <span className="inline-block w-[2px] h-4 bg-primary-500 ml-1 animate-pulse" />
                </code>
            </div>
        </div>
    );
}

function CardPlanner() {
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const [activeDay, setActiveDay] = useState(2);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveDay((prev) => (prev + 1) % 7);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rounded-[2rem] bg-white border border-gray-200 p-6 shadow-sm">
            <h3 className="font-serif text-xl text-gray-900 mb-4">Suivi de Stock & Créances</h3>
            <p className="text-gray-500 text-sm mb-6">
                Alertes de rupture, calcul de marge, carnet de créances avec relance WhatsApp en un clic.
            </p>

            <div className="flex gap-2 mb-4">
                {days.map((d, i) => (
                    <div
                        key={i}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono transition-all duration-500 cursor-pointer ${i === activeDay
                                ? 'bg-primary-500 text-white scale-110 shadow-md shadow-primary-500/30'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                    >
                        {d}
                    </div>
                ))}
            </div>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 text-center">
                <p className="text-gray-700 text-sm font-mono">
                    <span className="text-primary-500">▼</span> Stock bas : Riz (3 sacs)
                </p>
                <p className="text-gray-500 text-xs mt-1">
                    Relance Fatou &mdash; 5 000 F dû depuis 8 jours
                </p>
            </div>

            <button className="btn-magnetic mt-4 w-full py-3 bg-primary-50 border border-primary-200 text-primary-700 rounded-xl text-sm font-medium">
                <span className="btn-bg bg-primary-100 rounded-xl" />
                Relancer sur WhatsApp →
            </button>
        </div>
    );
}

export default function Features() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from('.feature-card', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="features" ref={sectionRef} className="relative py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-white">
            <div className="max-w-6xl mx-auto mb-16">
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
                    Fonctionnalités
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-light">
                    Ton activité tourne. <br />
                    <span className="text-primary-500">NEXUS écrit l'historique.</span>
                </h2>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="feature-card"><CardBlender /></div>
                <div className="feature-card"><CardTelemetry /></div>
                <div className="feature-card"><CardPlanner /></div>
            </div>
        </section>
    );
}