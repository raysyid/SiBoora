import { useState, useCallback } from 'react'
import SearchFilter from '../components/ui/SearchFilter'
import RoomGrid from '../components/rooms/RoomGrid'
import { searchRooms } from '../services/roomService'

/**
 * Halaman Cari Ruangan
 * Fitur: filter pencarian, daftar room cards
 */
export default function CariRuanganPage() {
  const [rooms, setRooms] = useState(() => searchRooms({}))
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = useCallback((filters) => {
    const results = searchRooms(filters)
    setRooms(results)
    setHasSearched(true)
  }, [])

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '32px', fontWeight: '800', color: '#1e293b', lineHeight: '1.2', marginBottom: '10px' }}>
          Cari Ruangan
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          Temukan dan pesan ruang yang sempurna untuk kebutuhan Anda.
        </p>
      </div>

      {/* Search Filter */}
      <div style={{ marginBottom: '28px' }}>
        <SearchFilter onSearch={handleSearch} />
      </div>

      {/* Results Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <p style={{ fontSize: '14px', color: '#64748b' }}>
          {hasSearched ? (
            <>
              Menampilkan{' '}
              <span style={{ fontWeight: '700', color: '#1e293b' }}>{rooms.length}</span> ruangan
            </>
          ) : (
            <>
              Semua ruangan tersedia:{' '}
              <span style={{ fontWeight: '700', color: '#1e293b' }}>{rooms.length}</span> ruang
            </>
          )}
        </p>
      </div>

      {/* Room Grid */}
      <RoomGrid rooms={rooms} />
    </div>
  )
}
