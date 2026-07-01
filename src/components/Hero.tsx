import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!heroRef.current) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.4 });
            tl.from('.hero-subtitle', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' })
                .from('.hero-title-main', { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
                .from('.hero-title-italic', { y: 80, opacity: 0, duration: 1.2, ease: 'power3.out' }, '-=0.6')
                .from('.hero-cta', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
                .from('.hero-indicator', { opacity: 0, duration: 1 }, '-=0.2');
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-white">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2076&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
            </div>

            <div className="relative z-10 h-full flex items-end pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
                <div className="max-w-4xl">
                    <p className="hero-subtitle text-primary-500 font-mono text-sm md:text-base tracking-widest uppercase mb-4">
                        Comptabilité automatique &bull; Scoring de crédit
                    </p>

                    <h1 className="hero-title-main font-serif text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 leading-tight">
                        NEXUS
                    </h1>
                    <h2 className="hero-title-italic font-serif italic text-3xl md:text-5xl lg:text-6xl font-light text-primary-500/80 leading-snug mt-2 max-w-3xl">
                        — La mémoire qui te rend
                        <span className="text-primary-500 font-medium not-italic"> finançable</span>
                    </h2>

                    <p className="hero-subtitle text-gray-600 mt-6 max-w-xl text-base md:text-lg leading-relaxed">
                        Continue de vendre sur WhatsApp comme tu l'as toujours fait.
                        NEXUS transforme chaque message en comptabilité et construit
                        ton dossier de crédit — sans que tu changes une seule habitude.
                    </p>

                    <div className="hero-cta flex flex-wrap gap-4 mt-8">
                        <Link
                            to="/signup"
                            className="btn-magnetic px-8 py-4 bg-primary-500 text-white font-semibold rounded-full text-base"
                        >
                            <span className="btn-bg bg-primary-600 rounded-full" />
                            Essayer gratuitement
                        </Link>
                        <a
                            href="#features"
                            className="btn-magnetic px-8 py-4 border border-gray-300 text-gray-700 font-medium rounded-full text-base"
                        >
                            <span className="btn-bg bg-gray-100 rounded-full" />
                            Découvrir
                        </a>
                    </div>
                </div>
            </div>

            <div className="hero-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
                <span className="text-gray-400 text-xs tracking-widest uppercase">Défiler</span>
                <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center">
                    <div className="w-1 h-2 bg-primary-500 rounded-full mt-2 animate-bounce" />
                </div>
            </div>
        </section>
    );
}