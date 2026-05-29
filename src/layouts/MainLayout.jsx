import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  CalendarCheck,
  Bell,
  User,
  LogOut,
  Plus,
  BookOpen,
} from 'lucide-react'

const navItems = [
  { to: '/beranda', label: 'Beranda', icon: LayoutDashboard },
  { to: '/cari-ruangan', label: 'Cari Ruangan', icon: Search },
  { to: '/pesanan-saya', label: 'Pesanan Saya', icon: CalendarCheck },
]

export default function MainLayout() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen overflow-hidden bg-[#eef2ff]">
      {/* Sidebar */}
      <aside className="w-56 flex flex-col bg-[#dde8fb] shadow-md z-10 flex-shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-blue-200/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md">
              <BookOpen className="w-4.5 h-4.5 text-white" size={18} />
            </div>
            <div>
              <div className="text-blue-900 font-bold text-lg leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                SiBoora
              </div>
              <div className="text-blue-600/70 text-[10px] font-medium leading-none">
                Manajemen Ruangan
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-4 py-4">
          <button
            onClick={() => navigate('/cari-ruangan')}
            className="w-full flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          >
            <Plus size={16} />
            Pesan Ruang Baru
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-white text-orange-500 shadow-sm border-l-4 border-orange-400 pl-2'
                    : 'text-blue-800/70 hover:bg-blue-100/60 hover:text-blue-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    className={isActive ? 'text-orange-500' : 'text-blue-500/70 group-hover:text-blue-700'}
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-blue-200/60">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-blue-800/70 hover:bg-blue-100/60 hover:text-red-500 transition-all duration-200 group">
            <LogOut size={18} className="text-blue-500/70 group-hover:text-red-400" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white/80 backdrop-blur-sm border-b border-slate-200/60 flex items-center justify-end px-6 gap-3 flex-shrink-0 shadow-sm">
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors duration-200">
            <Bell size={18} className="text-slate-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white"></span>
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors duration-200">
            <User size={18} className="text-slate-500" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white/70 border-t border-slate-200/60 py-3 px-6 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">
            © 2026 SiBoora Room Booking System
          </span>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Help Center'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-slate-400 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {link}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  )
}
