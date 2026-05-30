import { useState, useRef, useEffect } from 'react'
import { Users, Layers, Search } from 'lucide-react'

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
  paddingLeft: '32px',
  paddingRight: '10px',
  paddingTop: '8px',
  paddingBottom: '8px',
  fontSize: '13px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  outline: 'none',
  color: '#334155',
  background: 'white',
  boxSizing: 'border-box',
}

const selectStyle = {
  ...inputStyle,
  paddingRight: '28px',
  appearance: 'none',
  cursor: 'pointer',
  userSelect: 'none',
}

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: '600',
  color: '#64748b',
  marginBottom: '4px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

const iconStyle = {
  position: 'absolute',
  left: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#94a3b8',
  pointerEvents: 'none',
}

const chevron = (
  <div style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#94a3b8">
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
    fasilitas: [],
  })

  const [isFasilitisOpen, setIsFasilitisOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFasilitisOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleFasilitas = (value) => {
    setFilters((prev) => {
      const current = prev.fasilitas
      if (current.includes(value)) {
        return { ...prev, fasilitas: current.filter(item => item !== value) }
      } else {
        return { ...prev, fasilitas: [...current, value] }
      }
    })
  }

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
          borderRadius: '12px',
          border: '2px solid #f97316',
          padding: '16px 20px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
          display: 'inline-block',
          width: 'fit-content',
        }}
      >
        {/* Baris 1: semua input berjajar, masing-masing auto-width */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>

          {/* Tanggal */}
          <div>
            <label style={labelStyle}>Tanggal</label>
            <div style={{ position: 'relative' }}>
              <input
                id="filter-tanggal"
                type="date"
                value={filters.tanggal}
                onChange={(e) => handleChange('tanggal', e.target.value)}
                style={{ ...inputStyle, paddingLeft: '10px', width: 'auto' }}
              />
            </div>
          </div>

          {/* Waktu */}
          <div>
            <label style={labelStyle}>Waktu</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  id="filter-jam-mulai"
                  type="time"
                  value={filters.jamMulai}
                  onChange={(e) => handleChange('jamMulai', e.target.value)}
                  style={{ ...inputStyle, paddingLeft: '10px', width: 'auto' }}
                />
              </div>
              <span style={{ color: '#94a3b8', fontWeight: '500' }}>-</span>
              <div style={{ position: 'relative' }}>
                <input
                  id="filter-jam-selesai"
                  type="time"
                  value={filters.jamSelesai}
                  onChange={(e) => handleChange('jamSelesai', e.target.value)}
                  style={{ ...inputStyle, paddingLeft: '10px', width: 'auto' }}
                />
              </div>
            </div>
          </div>

          {/* Kapasitas */}
          <div>
            <label style={labelStyle}>Kapasitas</label>
            <div style={{ position: 'relative' }}>
              <Users size={14} style={iconStyle} />
              <select
                id="filter-kapasitas"
                value={filters.kapasitas}
                onChange={(e) => handleChange('kapasitas', e.target.value)}
                style={{ ...selectStyle, width: 'auto', minWidth: '150px' }}
              >
                {kapasitasOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {chevron}
            </div>
          </div>

          {/* Fasilitas */}
          <div ref={dropdownRef}>
            <label style={labelStyle}>Fasilitas</label>
            <div style={{ position: 'relative' }}>
              <div
                style={{ ...selectStyle, display: 'flex', alignItems: 'center', minWidth: '150px', boxSizing: 'border-box' }}
                onClick={() => setIsFasilitisOpen(!isFasilitisOpen)}
              >
                <Layers size={14} style={iconStyle} />
                <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', paddingLeft: '18px', flex: 1 }}>
                  {filters.fasilitas.length === 0
                    ? 'Semua Fasilitas'
                    : `${filters.fasilitas.length} Dipilih`}
                </span>
                {chevron}
              </div>

              {isFasilitisOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '4px',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {fasilitasOptions.filter(opt => opt.value !== 'semua').map((opt) => (
                    <label
                      key={opt.value}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 10px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#334155',
                        borderBottom: '1px solid #f1f5f9',
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <input
                        type="checkbox"
                        checked={filters.fasilitas.includes(opt.value)}
                        onChange={() => toggleFasilitas(opt.value)}
                        style={{ marginRight: '8px', cursor: 'pointer', width: '14px', height: '14px', accentColor: '#f97316' }}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Baris 2: tombol rata kanan (di bawah Fasilitas) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button
            className="interactive interactive-bounce"
            type="submit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#f97316',
              color: 'white',
              fontWeight: '700',
              fontSize: '13px',
              padding: '8px 20px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseOver={e => e.currentTarget.style.background = '#ea580c'}
            onMouseOut={e => e.currentTarget.style.background = '#f97316'}
          >
            <Search size={14} />
            Cari Ruangan
          </button>
        </div>
      </form>
  )
}
