import { NavLink, Outlet } from "react-router-dom";
import {
    LayoutDashboard,
    Receipt,
    Users,
    Package,
    Truck,
    Settings,
    LogOut,
    Brain,
} from "lucide-react";

const navItems = [
    { to: "/", label: "Tableau de bord", icon: LayoutDashboard },
    { to: "/factures", label: "Factures", icon: Receipt },
    { to: "/clients", label: "Clients", icon: Users },
    { to: "/stock", label: "Stock", icon: Package },
    { to: "/livraisons", label: "Livraisons", icon: Truck },
    { to: "/ia", label: "Nexus AI", icon: Brain },
    { to: "/parametres", label: "Paramètres", icon: Settings },
];

export default function Layout() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 border-r border-white/5 flex flex-col" style={{ background: "#0A0A0F" }}>
                {/* Logo */}
                <div className="px-6 py-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center">
                            <span className="font-inter font-black text-[#C9A84C] text-sm">N</span>
                        </div>
                        <div>
                            <h1 className="font-inter font-black text-[#FAF8F5] text-sm tracking-tight">NEXUS</h1>
                            <p className="font-mono text-[9px] text-[#FAF8F5]/25 tracking-widest">GESTION COMMERCIALE</p>
                        </div>
                    </div>
                </div>

                {/* Nav links */}
                <nav className="flex-1 py-4 px-3 space-y-1">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-inter transition-all duration-200 ${isActive
                                    ? "nav-link-active"
                                    : "text-[#FAF8F5]/40 hover:text-[#FAF8F5]/70 hover:bg-white/5"
                                }`
                            }
                        >
                            <Icon size={18} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User area */}
                <div className="px-3 py-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-4 py-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#C9A84C]/20 flex items-center justify-center">
                            <span className="font-inter font-bold text-[#C9A84C] text-xs">AK</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-inter text-xs text-[#FAF8F5]/80 truncate">Amadou K.</p>
                            <p className="font-mono text-[9px] text-[#FAF8F5]/25 truncate">Boutique Moderne</p>
                        </div>
                        <button className="text-[#FAF8F5]/25 hover:text-[#FAF8F5]/60 transition-colors">
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                <div className="p-6 md:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}