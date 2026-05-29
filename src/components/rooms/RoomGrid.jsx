import RoomCard from './RoomCard'

/**
 * Grid layout untuk daftar room cards
 * @param {Array} rooms - daftar data ruangan
 * @param {boolean} loading
 */
export default function RoomGrid({ rooms, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
            <div className="h-44 bg-slate-200" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
              <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
              <div className="h-10 bg-slate-100 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!rooms || rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium text-lg">Ruangan tidak ditemukan</p>
        <p className="text-slate-400 text-sm mt-1">Coba ubah filter pencarian Anda</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {rooms.map((room) => (
        <RoomCard key={room.ruangId} room={room} />
      ))}
    </div>
  )
}
