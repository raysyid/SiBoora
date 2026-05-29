import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  CalendarCheck,
  LogOut,
  Plus,
} from 'lucide-react'
import logo from '../../assets/logo.png'

const navItems = [
  { to: '/beranda', label: 'Beranda', icon: LayoutDashboard },
  { to: '/cari-ruangan', label: 'Cari Ruangan', icon: Search },
  { to: '/pesanan-saya', label: 'Pesanan Saya', icon: CalendarCheck },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside style={{
      width: '220px',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      background: '#dde8fb',
      boxShadow: '2px 0 8px rgba(0,0,0,0.06)',
      zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ height: '80px', padding: '0 20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(148,163,184,0.25)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logo} alt="SiBoora Logo" style={{ width: '44px', height: '44px', objectFit: 'contain', flexShrink: 0 }} />
          <div>
            <div style={{ color: '#1e3a8a', fontWeight: '800', fontSize: '18px', lineHeight: '1.2', fontFamily: 'Poppins, sans-serif' }}>
              SiBoora
            </div>
            <div style={{ color: '#3b82f6', fontSize: '11px', fontWeight: '500', opacity: 0.8 }}>
              Manajemen Ruangan
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div style={{ padding: '16px' }}>
        <button
          onClick={() => navigate('/cari-ruangan')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            background: '#f97316',
            color: 'white',
            fontWeight: '700',
            fontSize: '13px',
            padding: '10px 12px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(249,115,22,0.35)',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#ea580c'}
          onMouseOut={e => e.currentTarget.style.background = '#f97316'}
        >
          <Plus size={15} />
          Pesan Ruang Baru
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '4px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: isActive ? '700' : '500',
              textDecoration: 'none',
              color: isActive ? '#ea580c' : '#1e40af',
              background: isActive ? 'white' : 'transparent',
              boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              borderLeft: isActive ? '3px solid #f97316' : '3px solid transparent',
              transition: 'all 0.15s',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  style={{ color: isActive ? '#f97316' : '#3b82f6', flexShrink: 0 }}
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ height: '62px', padding: '0 12px', display: 'flex', alignItems: 'center', borderTop: '1px solid rgba(148,163,184,0.25)', flexShrink: 0 }}>
        <button
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#1e40af',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
            e.currentTarget.style.color = '#ef4444'
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#1e40af'
          }}
        >
          <LogOut size={18} style={{ color: '#3b82f6' }} />
          Keluar
        </button>
      </div>
    </aside>
  )
}
