import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
            });
            tl.from('.phil-label', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' })
                .from('.phil-declaration', { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
                .from('.phil-accent', { opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out' }, '-=0.6');
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="philosophy"
            ref={sectionRef}
            className="relative py-36 md:py-48 px-6 md:px-16 lg:px-24 overflow-hidden bg-gray-50"
        >
            <div className="absolute inset-0 opacity-[0.03]">
                <img
                    src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2020&auto=format&fit=crop"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <p className="phil-label font-mono text-xs tracking-[0.3em] uppercase text-gray-400 mb-8">
                    Notre philosophie
                </p>

                <p className="phil-declaration font-serif text-3xl md:text-5xl lg:text-6xl text-gray-400 font-light leading-tight">
                    La plupart des fintechs construisent des outils pour des comptables.
                </p>

                <p className="phil-accent font-serif italic text-4xl md:text-6xl lg:text-7xl text-gray-900 font-light leading-[1.1] mt-12">
                    Nous construisons une mémoire
                    <br />
                    pour ceux qui n'ont
                    <br />
                    <span className="text-primary-500 font-medium not-italic">jamais eu de dossier</span>.
                </p>
            </div>
        </section>
    );
}