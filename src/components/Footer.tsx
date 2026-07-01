import { Link } from 'react-router-dom';

const FOOTER_LINKS = [
    { label: 'Fonctionnalités', href: '#features' },
    { label: 'Philosophie', href: '#philosophy' },
    { label: 'Protocole', href: '#protocol' },
    { label: 'Tarifs', href: '#pricing' },
];

const LEGAL_LINKS = [
    { label: 'Confidentialité', href: '#' },
    { label: 'Conditions', href: '#' },
    { label: 'Mentions légales', href: '#' },
];

export default function Footer() {
    return (
        <footer className="rounded-t-[4rem] bg-gray-100 border-t border-gray-200 px-6 md:px-16 lg:px-24 py-16">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img src="/logo-icon.svg" alt="NEXUS" className="w-8 h-8" />
                            <span className="font-serif text-xl font-semibold tracking-wider text-gray-900">
                                NEXUS
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            La mémoire qui rend les commerçants ouest-africains finançables — sans changer une seule de leurs habitudes.
                        </p>
                        <div className="flex items-center gap-2 mt-6">
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                            <span className="text-gray-400 text-xs font-mono tracking-wider">Système Opérationnel</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-serif text-gray-900 text-sm mb-4 tracking-wider uppercase">Navigation</h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-gray-500 hover:text-primary-500 transition-colors text-sm lift-hover"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif text-gray-900 text-sm mb-4 tracking-wider uppercase">Légal</h4>
                        <ul className="space-y-3">
                            {LEGAL_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-gray-500 hover:text-primary-500 transition-colors text-sm lift-hover"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-xs">
                        &copy; {new Date().getFullYear()} NEXUS. Tous droits réservés.
                    </p>
                    <p className="text-gray-400 text-xs font-mono">
                        NEXUS — Djali v1.0
                    </p>
                </div>
            </div>
        </footer>
    );
}