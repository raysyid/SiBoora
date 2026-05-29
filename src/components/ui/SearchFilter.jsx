import { useState } from 'react'
import { Calendar, Clock, Users, Layers, Search } from 'lucide-react'

const kapasitasOptions = [
  { value: 'semua', label: 'Semua Kapasitas' },
  { value: '1-20', label: '1 - 20 Orang' },
  { value: '21-50', label: '21 - 50 Orang' },
  { value: '51-100', label: '51 - 100 Orang' },
  { value: '101-999', label: '> 100 Orang' },
]

const fasilitasOptions = [
  { value: 'semua', label: 'Semua Fasilitas' },
  { value: 'proyektor', label: 'Proyektor' },
  { value: 'tv', label: 'TV' },
  { value: 'ac', label: 'AC' },
  { value: 'wi-fi', label: 'Wi-Fi' },
  { value: 'komputer', label: 'Komputer' },
  { value: 'sistem audio', label: 'Sistem Audio' },
]

const inputStyle = {
  width: '100%',
  paddingLeft: '36px',
  paddingRight: '12px',
  paddingTop: '10px',
  paddingBottom: '10px',
  fontSize: '14px',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  outline: 'none',
  color: '#334155',
  background: 'white',
}

const selectStyle = {
  ...inputStyle,
  paddingRight: '32px',
  appearance: 'none',
  cursor: 'pointer',
}

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  color: '#64748b',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

const iconStyle = {
  position: 'absolute',
  left: '11px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#94a3b8',
  pointerEvents: 'none',
}

const chevron = (
  <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#94a3b8">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
)

/**
 * Filter panel untuk pencarian ruangan
 * @param {Function} onSearch - callback dengan filter values
 */
export default function SearchFilter({ onSearch }) {
  const [filters, setFilters] = useState({
    tanggal: '',
    jamMulai: '',
    jamSelesai: '',
    kapasitas: 'semua',
    fasilitas: 'semua',
  })

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(filters)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'white',
        borderRadius: '16px',
        border: '2px solid #f97316',
        padding: '24px 28px',
        boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
      }}
    >
      {/* Filter Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr 1fr 1fr',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        {/* Tanggal */}
        <div>
          <label style={labelStyle}>Tanggal</label>
          <div style={{ position: 'relative' }}>
            <Calendar size={15} style={iconStyle} />
            <input
              id="filter-tanggal"
              type="date"
              value={filters.tanggal}
              onChange={(e) => handleChange('tanggal', e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Waktu */}
        <div>
          <label style={labelStyle}>Waktu</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Clock size={15} style={iconStyle} />
              <input
                id="filter-jam-mulai"
                type="time"
                value={filters.jamMulai}
                onChange={(e) => handleChange('jamMulai', e.target.value)}
                style={inputStyle}
              />
            </div>
            <span style={{ color: '#94a3b8', fontWeight: '500', flexShrink: 0 }}>-</span>
            <div style={{ position: 'relative', flex: 1 }}>
              <Clock size={15} style={iconStyle} />
              <input
                id="filter-jam-selesai"
                type="time"
                value={filters.jamSelesai}
                onChange={(e) => handleChange('jamSelesai', e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* Kapasitas */}
        <div>
          <label style={labelStyle}>Kapasitas</label>
          <div style={{ position: 'relative' }}>
            <Users size={15} style={iconStyle} />
            <select
              id="filter-kapasitas"
              value={filters.kapasitas}
              onChange={(e) => handleChange('kapasitas', e.target.value)}
              style={selectStyle}
            >
              {kapasitasOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {chevron}
          </div>
        </div>

        {/* Fasilitas */}
        <div>
          <label style={labelStyle}>Fasilitas</label>
          <div style={{ position: 'relative' }}>
            <Layers size={15} style={iconStyle} />
            <select
              id="filter-fasilitas"
              value={filters.fasilitas}
              onChange={(e) => handleChange('fasilitas', e.target.value)}
              style={selectStyle}
            >
              {fasilitasOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {chevron}
          </div>
        </div>
      </div>

      {/* Button Row */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="submit"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f97316',
            color: 'white',
            fontWeight: '700',
            fontSize: '14px',
            padding: '11px 28px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}
          onMouseOver={e => e.currentTarget.style.background = '#ea580c'}
          onMouseOut={e => e.currentTarget.style.background = '#f97316'}
        >
          <Search size={15} />
          Cari Ruangan
        </button>
      </div>
    </form>
  )
}
