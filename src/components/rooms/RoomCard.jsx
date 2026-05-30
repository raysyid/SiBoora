import { useNavigate } from 'react-router-dom'
import { Users, Monitor, Tv } from 'lucide-react'
import Badge from '../ui/Badge'

/**
 * Card untuk menampilkan preview ruangan
 * @param {Object} room - data ruangan
 */
export default function RoomCard({ room }) {
  const navigate = useNavigate()
  const { ruangId, nama, kapasitas, fasilitas, status, image } = room

  const fasilitasSingkat = fasilitas.slice(0, 2)

  return (
    <div
      className="interactive interactive-scale"
      style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        border: '1px solid #f1f5f9',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={image || `https://placehold.co/400x220/e2e8f0/94a3b8?text=${encodeURIComponent(nama)}`}
          alt={`Foto ${nama}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          onError={(e) => {
            e.target.src = `https://placehold.co/400x220/e2e8f0/94a3b8?text=${encodeURIComponent(nama)}`
          }}
        />
        {/* Status badge overlay */}
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <Badge status={status} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontWeight: '700', color: '#1e293b', fontSize: '20px', lineHeight: '1.3', marginBottom: '12px', fontFamily: 'Poppins, sans-serif' }}>
          {nama}
        </h3>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #f1f5f9', marginBottom: '12px' }} />

        {/* Info row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Users size={14} style={{ color: '#94a3b8', flexShrink: 0 }} />
            Cap: {kapasitas}
          </span>
          {fasilitasSingkat.map((f) => (
            <span key={f} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {f.toLowerCase() === 'tv' ? <Tv size={14} style={{ color: '#94a3b8', flexShrink: 0 }} /> : <Monitor size={14} style={{ color: '#94a3b8', flexShrink: 0 }} />}
              {f}
            </span>
          ))}
        </div>

        {/* Button */}
        <div style={{ marginTop: 'auto' }}>
          <button
            id={`btn-detail-${ruangId}`}
            onClick={() => navigate(`/ruangan/${ruangId}`)}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #f97316',
              borderRadius: '10px',
              background: 'transparent',
              color: '#f97316',
              fontWeight: '700',
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#fff7ed'
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  )
}
