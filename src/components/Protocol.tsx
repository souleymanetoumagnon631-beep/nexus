import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        title: '01. Capture',
        subtitle: 'Chaque vente devient une donnée',
        description: 'Le commerçant continue d\'écrire sur WhatsApp comme avant. NEXUS structure chaque message : montant, article, client. Rien à apprendre.',
        accent: 'from-primary-50 to-transparent',
        icon: '◈',
    },
    {
        title: '02. Rapprochement',
        subtitle: 'Les paiements s\'alignent tout seuls',
        description: 'Les notifications Wave, Orange Money et MTN sont automatiquement associées aux ventes et créances correspondantes. Fin de la saisie double.',
        accent: 'from-primary-50 to-transparent',
        icon: '◇',
    },
    {
        title: '03. Scoring',
        subtitle: 'L\'historique devient un dossier de crédit',
        description: 'Après 3 mois d\'activité réelle, NEXUS génère un score de fiabilité partageable avec les banques et IMF partenaires — en un clic.',
        accent: 'from-primary-50 to-transparent',
        icon: '◆',
    },
];

export default function Protocol() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;
        const cards = cardsRef.current.filter(Boolean);
        if (cards.length === 0) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: `+=${cards.length * 100}%`,
                pin: true,
                anticipatePin: 1,
            });

            cards.forEach((card, i) => {
                if (i === 0) return;

                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom',
                        end: 'top center',
                        scrub: 1,
                    },
                    scale: 0.85,
                    opacity: 0.3,
                    filter: 'blur(4px)',
                    ease: 'power2.inOut',
                });

                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top center',
                        end: 'top top',
                        scrub: 1,
                    },
                    y: 60,
                    ease: 'power2.inOut',
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="protocol"
            ref={sectionRef}
            className="relative min-h-screen py-36 md:py-48 px-6 md:px-16 lg:px-24 bg-white"
        >
            <div className="max-w-6xl mx-auto">
                <div className="mb-20">
                    <p className="font-mono text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">
                        Le protocole NEXUS
                    </p>
                    <h2 className="font-serif text-4xl md:text-5xl text-gray-900 font-light max-w-2xl">
                        Trois étapes.
                        <br />
                        <span className="text-primary-500">Aucune habitude à changer.</span>
                    </h2>
                </div>

                <div className="relative space-y-8">
                    {STEPS.map((step, i) => (
                        <div
                            key={i}
                            ref={(el) => { if (el) cardsRef.current[i] = el; }}
                            className={`rounded-[3rem] bg-gradient-to-br ${step.accent} border border-gray-200 p-8 md:p-12 relative overflow-hidden`}
                            style={{ zIndex: STEPS.length - i }}
                        >
                            <div className="absolute -right-8 -top-8 text-[8rem] md:text-[12rem] font-serif text-gray-100 select-none">
                                {step.icon}
                            </div>

                            <div className="relative z-10 max-w-2xl">
                                <p className="font-mono text-sm text-primary-500 tracking-widest mb-2">
                                    {step.title}
                                </p>
                                <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-4 font-light">
                                    {step.subtitle}
                                </h3>
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-500">
                                        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-primary-500">
                                        <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="15s" repeatCount="indefinite" />
                                    </circle>
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}