import { Bell, Search, Crown } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[rgba(214,168,79,0.08)] bg-[rgba(0,0,0,0.85)] backdrop-blur-xl px-6">
      {/* Search */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]" />
        <input
          type="text"
          placeholder="Buscar métricas, projetos, clientes..."
          className="w-full rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] py-2 pl-10 pr-4 text-sm text-[#F5F5F5] placeholder:text-[#71717A] outline-none transition-all focus:border-[rgba(214,168,79,0.3)] focus:bg-[rgba(214,168,79,0.03)]"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(214,168,79,0.12)] text-[#A1A1AA] transition-all hover:border-[rgba(214,168,79,0.3)] hover:text-[#D6A84F]" aria-label="Notificações">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#D6A84F] text-[8px] font-bold text-[#000000]">
            3
          </span>
        </button>

        {/* Plan badge */}
        <div className="flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.2)] bg-[rgba(214,168,79,0.06)] px-4 py-1.5">
          <Crown className="h-3.5 w-3.5 text-[#D6A84F]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#D6A84F]">
            Soberania
          </span>
        </div>
      </div>
    </header>
  );
}
