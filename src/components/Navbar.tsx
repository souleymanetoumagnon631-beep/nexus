import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const NAV_LINKS = [
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Philosophie', href: '#philosophy' },
    { label: 'Protocole', href: '#protocol' },
    { label: 'Tarifs', href: '#pricing' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (!navRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from('.nav-item', {
                y: -20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power3.out',
                delay: 0.2,
            });
        }, navRef);
        return () => ctx.revert();
    }, []);

    return (
        <nav
            ref={navRef}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-[2rem] ${scrolled
                    ? 'bg-surface-900/60 backdrop-blur-xl shadow-lg shadow-black/20'
                    : 'bg-surface-900/30 backdrop-blur-sm'
                }`}
        >
            <div className="flex items-center justify-between px-6 py-3 md:px-8 md:py-3 min-w-[320px] md:min-w-[640px]">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 lift-hover">
                    <img src="/logo-icon.svg" alt="NEXUS" className="w-8 h-8" />
                    <span className="font-serif text-xl font-semibold tracking-wider text-primary-400">
                        NEXUS
                    </span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="nav-item text-sm text-surface-300 hover:text-primary-400 transition-colors lift-hover"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <Link
                    to="/signup"
                    className="btn-magnetic hidden md:inline-flex px-5 py-2 bg-primary-500 text-surface-950 font-semibold text-sm rounded-full"
                >
                    <span className="btn-bg bg-primary-400 rounded-full" />
                    Essayer gratuitement
                </Link>

                {/* Mobile toggle */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-surface-300 p-1"
                    aria-label="Menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-3 border-t border-surface-700/50">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-surface-300 hover:text-primary-400 transition-colors py-1"
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        to="/signup"
                        onClick={() => setMobileOpen(false)}
                        className="btn-magnetic self-start px-5 py-2 bg-primary-500 text-surface-950 font-semibold text-sm rounded-full mt-2"
                    >
                        <span className="btn-bg bg-primary-400 rounded-full" />
                        Essayer gratuitement
                    </Link>
                </div>
            )}
        </nav>
    );
}