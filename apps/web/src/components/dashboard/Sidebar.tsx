import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, TrendingUp, BarChart3, Settings, Users,
  MessageCircle, FileText, LogOut, Crown,
} from 'lucide-react';

const NAV = [
  { to: '/dashboard', label: 'Visão Geral', icon: LayoutDashboard, end: true },
  { to: '/dashboard/analytics', label: 'Analytics', icon: TrendingUp },
  { to: '/dashboard/metricas', label: 'Métricas', icon: BarChart3 },
  { to: '/dashboard/leads', label: 'Leads', icon: Users },
  { to: '/dashboard/conteudo', label: 'Conteúdo', icon: FileText },
  { to: '/dashboard/chat', label: 'Chat IA', icon: MessageCircle },
  { to: '/dashboard/config', label: 'Configurações', icon: Settings },
];

export function DashboardSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[rgba(214,168,79,0.12)] bg-[#000000]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 border-b border-[rgba(214,168,79,0.08)] px-6 py-5">
        <Crown className="h-5 w-5 text-[#D6A84F]" />
        <span className="text-sm font-bold tracking-[0.12em]">
          <span className="text-[#D6A84F]">REI</span>{' '}
          <span className="text-white/70">DASH</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navegação do painel">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-200 mb-0.5 ${
                isActive
                  ? 'bg-[rgba(214,168,79,0.12)] text-[#D6A84F] border border-[rgba(214,168,79,0.2)]'
                  : 'text-[#71717A] hover:bg-white/[0.03] hover:text-[#A1A1AA]'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-[rgba(214,168,79,0.08)] px-3 py-4">
        <a
          href="/"
          className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#71717A] transition-all hover:text-[#A1A1AA]"
        >
          <LogOut className="h-4 w-4" />
          Voltar ao Site
        </a>
      </div>
    </aside>
  );
}
