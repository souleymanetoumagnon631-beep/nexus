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
        <footer className="rounded-t-[4rem] bg-surface-900/80 border-t border-surface-700/30 px-6 md:px-16 lg:px-24 py-16">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img src="/logo-icon.svg" alt="NEXUS" className="w-8 h-8" />
                            <span className="font-serif text-xl font-semibold tracking-wider text-primary-400">
                                NEXUS
                            </span>
                        </Link>
                        <p className="text-surface-400 text-sm leading-relaxed max-w-xs">
                            La mémoire qui rend les commerçants ouest-africains finançables — sans changer une seule de leurs habitudes.
                        </p>
                        {/* System status */}
                        <div className="flex items-center gap-2 mt-6">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-surface-500 text-xs font-mono tracking-wider">Système Opérationnel</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-serif text-surface-50 text-sm mb-4 tracking-wider uppercase">Navigation</h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-surface-400 hover:text-primary-400 transition-colors text-sm lift-hover"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-serif text-surface-50 text-sm mb-4 tracking-wider uppercase">Légal</h4>
                        <ul className="space-y-3">
                            {LEGAL_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-surface-400 hover:text-primary-400 transition-colors text-sm lift-hover"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-surface-700/30 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-surface-500 text-xs">
                        &copy; {new Date().getFullYear()} NEXUS. Tous droits réservés.
                    </p>
                    <p className="text-surface-600 text-xs font-mono">
                        NEXUS — Djali v1.0
                    </p>
                </div>
            </div>
        </footer>
    );
}