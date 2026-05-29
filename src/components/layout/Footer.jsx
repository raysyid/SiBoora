export default function Footer() {
  return (
    <footer style={{
      background: 'rgba(255,255,255,0.75)',
      borderTop: '1px solid rgba(226,232,240,0.7)',
      padding: '0 24px',
      height: '62px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        © 2026 SiBoora Room Booking System
      </span>
      <div style={{ display: 'flex', gap: '20px' }}>
        {['Privacy Policy', 'Terms of Service', 'Help Center'].map((link) => (
          <a
            key={link}
            href="#"
            style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseOver={e => e.currentTarget.style.color = '#2563eb'}
            onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
          >
            {link}
          </a>
        ))}
      </div>
    </footer>
  )
}
