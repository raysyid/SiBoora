import { Bell, User } from 'lucide-react'

export default function Header() {
  return (
    <header style={{
      height: '80px',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(226,232,240,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 24px',
      gap: '8px',
      flexShrink: 0,
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>
      <button style={{
        position: 'relative', width: '36px', height: '36px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '10px', border: 'none', background: 'transparent', cursor: 'pointer',
      }}
        onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'}
        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
      >
        <Bell size={18} style={{ color: '#64748b' }} />
        <span style={{
          position: 'absolute', top: '6px', right: '6px',
          width: '8px', height: '8px', background: '#f97316',
          borderRadius: '50%', border: '2px solid white',
        }} />
      </button>
      <button style={{
        width: '36px', height: '36px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '10px', border: 'none', background: 'transparent', cursor: 'pointer',
      }}
        onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'}
        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
      >
        <User size={18} style={{ color: '#64748b' }} />
      </button>
    </header>
  )
}
