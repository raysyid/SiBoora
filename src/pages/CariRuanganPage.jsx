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
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1
          className="text-3xl font-bold text-slate-800 leading-tight"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Cari Ruangan
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Temukan dan pesan ruang yang sempurna untuk kebutuhan Anda.
        </p>
      </div>

      {/* Search Filter */}
      <div className="mb-7">
        <SearchFilter onSearch={handleSearch} />
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-500">
          {hasSearched ? (
            <>
              Menampilkan{' '}
              <span className="font-semibold text-slate-700">{rooms.length}</span> ruangan
            </>
          ) : (
            <>
              Semua ruangan tersedia:{' '}
              <span className="font-semibold text-slate-700">{rooms.length}</span> ruang
            </>
          )}
        </p>
      </div>

      {/* Room Grid */}
      <RoomGrid rooms={rooms} />
    </div>
  )
}
