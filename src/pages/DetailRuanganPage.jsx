import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Users,
  LayoutGrid,
  AlertCircle,
} from 'lucide-react'
import Button from '../components/ui/Button'
import ScheduleRow from '../components/rooms/ScheduleRow'
import FacilityItem from '../components/rooms/FacilityItem'
import { getRoomDetail } from '../services/roomService'

/**
 * Halaman Detail Ruangan
 * Menampilkan info lengkap ruangan + jadwal + form booking
 */
export default function DetailRuanganPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const room = getRoomDetail(id)

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-center px-6">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">Ruangan Tidak Ditemukan</h2>
        <p className="text-slate-400 text-sm mb-6">
          Ruangan dengan ID <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{id}</code> tidak ada.
        </p>
        <Button variant="outline" onClick={() => navigate('/cari-ruangan')}>
          <ArrowLeft size={15} />
          Kembali ke Daftar Ruang
        </Button>
      </div>
    )
  }

  const { nama, gedung, lantai, kapasitas, tipe, fasilitas, image, deskripsi, jadwal } = room

  // Split facilities into 2 columns
  const col1 = fasilitas.slice(0, Math.ceil(fasilitas.length / 2))
  const col2 = fasilitas.slice(Math.ceil(fasilitas.length / 2))

  return (
    <div style={{ paddingBottom: '2rem' }}>
      {/* Back Navigation */}
      <button
        onClick={() => navigate('/cari-ruangan')}
        className="flex items-center text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors hover-slide-right"
        style={{ gap: '0.5rem', marginBottom: '1.5rem' }}
      >
        <ArrowLeft size={16} />
        Kembali ke Daftar Ruang
      </button>

      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          className="text-3xl font-bold text-blue-700"
          style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.5rem', lineHeight: '1.2' }}
        >
          {nama}
        </h1>
        <p className="text-slate-500 text-sm">
          {gedung} • {lantai}
        </p>
      </div>

      {/* Main Content: 2 columns */}
      <div className="flex flex-col lg:flex-row" style={{ gap: '2rem' }}>
        {/* LEFT COLUMN */}
        <div className="flex-1 min-w-0">
          {/* Hero Image */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100" style={{ marginBottom: '1.5rem', aspectRatio: '16/9' }}>
            <img
              src={image || `https://placehold.co/800x400/e2e8f0/94a3b8?text=${encodeURIComponent(nama)}`}
              alt={`Foto ${nama}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://placehold.co/800x400/e2e8f0/94a3b8?text=${encodeURIComponent(nama)}`
              }}
            />
          </div>

          {/* Info Bar */}
          <div className="bg-white rounded-xl flex flex-wrap items-center justify-around" style={{ border: '1px solid #f97316', padding: '1.25rem', marginBottom: '2rem', gap: '1rem' }}>
            {/* Lokasi */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-lg flex items-center justify-center text-white" style={{ width: '2.5rem', height: '2.5rem' }}>
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lokasi</div>
                <div className="text-sm font-bold text-slate-800">{gedung}</div>
              </div>
            </div>

            {/* Kapasitas */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-lg flex items-center justify-center text-white" style={{ width: '2.5rem', height: '2.5rem' }}>
                <Users size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kapasitas</div>
                <div className="text-sm font-bold text-slate-800">{kapasitas} Kursi</div>
              </div>
            </div>

            {/* Tipe */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-lg flex items-center justify-center text-white" style={{ width: '2.5rem', height: '2.5rem' }}>
                <LayoutGrid size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tipe</div>
                <div className="text-sm font-bold text-slate-800">{tipe}</div>
              </div>
            </div>
          </div>

          {/* Description + Facilities */}
          <div className="flex flex-col sm:flex-row" style={{ gap: '2rem' }}>
            {/* Deskripsi */}
            <div className="flex-1">
              <h2 className="font-bold text-slate-800 text-lg mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Deskripsi
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">{deskripsi}</p>
            </div>

            {/* Fasilitas */}
            <div className="flex-1">
              <h2 className="font-bold text-slate-800 text-lg mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Fasilitas
              </h2>
              <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                {col1.map((f) => (
                  <FacilityItem key={f} name={f} />
                ))}
                {col2.map((f) => (
                  <FacilityItem key={f} name={f} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Booking Panel */}
        <div className="flex-shrink-0" style={{ width: '100%', maxWidth: '360px' }}>
          <div className="rounded-xl overflow-hidden sticky top-6 shadow-md" style={{ border: '1px solid #bfdbfe' }}>
            {/* Header */}
            <div style={{ backgroundColor: '#1d4ed8', padding: '1.25rem' }}>
              <h2 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Pesan Ruangan Ini
              </h2>
              <p className="text-blue-100 text-xs leading-relaxed">
                Cek ketersediaan dan amankan jadwal Anda.
              </p>
            </div>

            {/* White card body */}
            <div className="bg-white" style={{ padding: '1.25rem' }}>
              {/* Pilih Tanggal */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  Pilih Tanggal
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                    style={{ padding: '0.625rem 0.75rem' }}
                  />
                </div>
              </div>

              {/* Jadwal Ketersediaan */}
              <div>
                <label className="block text-sm font-medium text-slate-800 mb-2">
                  Jadwal Ketersediaan
                </label>
                <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                  {jadwal.map((slot, i) => (
                    <ScheduleRow
                      key={i}
                      waktu={slot.waktu}
                      status={slot.status}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Button Footer */}
            <div style={{ backgroundColor: '#eff6ff', padding: '1.25rem', borderTop: '1px solid #dbeafe' }}>
              <button
                onClick={() => navigate(`/booking-ruangan/${id}`)}
                className="w-full font-bold text-sm rounded-md transition-colors duration-200 uppercase tracking-wider bg-orange-500 hover:bg-orange-600 text-white"
                style={{ padding: '0.75rem 1rem', marginBottom: '0.5rem', cursor: 'pointer' }}
              >
                Booking Ruang
              </button>
              <p className="text-center text-slate-400" style={{ fontSize: '10px' }}>Memerlukan persetujuan admin.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
