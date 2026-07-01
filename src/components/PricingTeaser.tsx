import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
    {
        name: 'Cahier',
        price: '0',
        period: 'toujours',
        desc: 'Pour démarrer sans engagement',
        features: ['Capture WhatsApp', 'Stock basique', '100 transactions/mois'],
        cta: 'Essayer gratuitement',
        href: '/signup',
        featured: false,
    },
    {
        name: 'Boutique',
        price: '5 000',
        period: '/mois',
        desc: 'Pour les commerçants qui tournent',
        features: ['Transactions illimitées', 'Rapprochement mobile money', 'Carnet de créances', 'Jusqu\'à 3 utilisateurs', 'Score consultable'],
        cta: 'Commencer',
        href: '/signup',
        featured: true,
    },
    {
        name: 'Grossiste',
        price: '15 000',
        period: '/mois',
        desc: 'Pour les grosses activités',
        features: ['Tout Boutique', 'Score partageable', 'Comptable invité', 'Export fiscal', 'Utilisateurs illimités'],
        cta: 'Nous contacter',
        href: '/signup',
        featured: false,
    },
];

export default function PricingTeaser() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from('.pricing-card', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
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
        <section id="pricing" ref={sectionRef} className="relative py-28 md:py-36 px-6 md:px-16 lg:px-24">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="font-mono text-xs tracking-[0.3em] uppercase text-surface-500 mb-4">
                        Tarifs
                    </p>
                    <h2 className="font-serif text-4xl md:text-5xl text-surface-50 font-light">
                        Un palier pour chaque <span className="text-primary-400">volume</span>.
                    </h2>
                    <p className="text-surface-400 mt-4 max-w-xl mx-auto">
                        Gratuit pour commencer. Tu ne paies que quand NEXUS te prouve sa valeur.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PLANS.map((plan, i) => (
                        <div
                            key={i}
                            className={`pricing-card rounded-[2rem] p-8 flex flex-col ${plan.featured
                                    ? 'bg-gradient-to-b from-primary-500/15 to-surface-900 border border-primary-500/30 scale-105 md:scale-110'
                                    : 'bg-surface-900/50 border border-surface-700/40'
                                }`}
                        >
                            <h3 className="font-serif text-xl text-surface-50 mb-1">{plan.name}</h3>
                            <p className="text-surface-400 text-sm mb-4">{plan.desc}</p>
                            <div className="mb-6">
                                <span className="font-serif text-4xl text-surface-50">{plan.price}</span>
                                <span className="text-surface-400 ml-1">{plan.period}</span>
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm text-surface-300">
                                        <Check size={16} className="text-primary-400 mt-0.5 flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to={plan.href}
                                className={`btn-magnetic w-full py-3 rounded-full text-sm font-semibold text-center ${plan.featured
                                        ? 'bg-primary-500 text-surface-950'
                                        : 'border border-surface-600 text-surface-200'
                                    }`}
                            >
                                <span className={`btn-bg rounded-full ${plan.featured ? 'bg-primary-400' : 'bg-surface-800'}`} />
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/pricing"
                        className="text-surface-400 hover:text-primary-400 transition-colors text-sm lift-hover inline-flex items-center gap-1"
                    >
                        Voir les détails complets →
                    </Link>
                </div>
            </div>
        </section>
    );
}