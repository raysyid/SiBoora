import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Users,
  LayoutGrid,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import Badge from '../components/ui/Badge'
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

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [bookingSuccess, setBookingSuccess] = useState(false)

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

  const { nama, lokasi, gedung, lantai, kapasitas, tipe, fasilitas, status, image, deskripsi, jadwal } = room

  const handleBooking = () => {
    setBookingSuccess(true)
    setTimeout(() => setBookingSuccess(false), 3000)
  }

  // Split facilities into 2 columns
  const col1 = fasilitas.slice(0, Math.ceil(fasilitas.length / 2))
  const col2 = fasilitas.slice(Math.ceil(fasilitas.length / 2))

  return (
    <div>
      {/* Back Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 text-sm font-medium mb-5 transition-colors duration-200 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Kembali ke Daftar Ruang
      </button>

      {/* Page Title */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1
            className="text-3xl font-bold text-blue-700 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {nama}
          </h1>
          <Badge status={status} />
        </div>
        <p className="text-slate-500 text-sm flex items-center gap-1.5">
          <MapPin size={14} className="text-slate-400" />
          {gedung} • {lantai}
        </p>
      </div>

      {/* Main Content: 2 columns */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT COLUMN */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Hero Image */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 h-72 lg:h-80">
            <img
              src={image}
              alt={`Foto ${nama}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://placehold.co/800x400/e2e8f0/94a3b8?text=${encodeURIComponent(nama)}`
              }}
            />
          </div>

          {/* Info Bar */}
          <div className="bg-white rounded-2xl border-2 border-orange-200 shadow-sm p-4">
            <div className="flex items-center justify-around gap-4 flex-wrap">
              {/* Lokasi */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lokasi</div>
                  <div className="text-sm font-semibold text-slate-800">{gedung}</div>
                </div>
              </div>

              <div className="w-px h-8 bg-slate-200 hidden sm:block" />

              {/* Kapasitas */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kapasitas</div>
                  <div className="text-sm font-semibold text-slate-800">{kapasitas} Kursi</div>
                </div>
              </div>

              <div className="w-px h-8 bg-slate-200 hidden sm:block" />

              {/* Tipe */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <LayoutGrid size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tipe</div>
                  <div className="text-sm font-semibold text-slate-800">{tipe}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description + Facilities */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Deskripsi */}
              <div className="flex-1">
                <h2 className="font-bold text-slate-800 text-base mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Deskripsi
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{deskripsi}</p>
              </div>

              {/* Fasilitas */}
              <div className="flex-1">
                <h2 className="font-bold text-slate-800 text-base mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Fasilitas
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
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
        </div>

        {/* RIGHT COLUMN — Booking Panel */}
        <div className="w-full lg:w-80 xl:w-88 flex-shrink-0">
          <div className="bg-blue-700 rounded-2xl shadow-lg overflow-hidden sticky top-6">
            {/* Header */}
            <div className="p-5 pb-4">
              <h2 className="text-white font-bold text-xl leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Pesan Ruangan Ini
              </h2>
              <p className="text-blue-200 text-sm mt-1 leading-relaxed">
                Cek ketersediaan dan amankan jadwal Anda.
              </p>
            </div>

            {/* White card body */}
            <div className="bg-white mx-3 mb-3 rounded-xl p-4 space-y-4">
              {/* Pilih Tanggal */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Pilih Tanggal
                </label>
                <div className="relative">
                  <Calendar
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="booking-tanggal"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 text-slate-700 transition-all"
                  />
                </div>
              </div>

              {/* Jadwal Ketersediaan */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                  Jadwal Ketersediaan
                </label>
                <div className="space-y-2">
                  {jadwal.map((slot, i) => (
                    <ScheduleRow
                      key={i}
                      waktu={slot.waktu}
                      status={slot.status}
                      kegiatan={slot.kegiatan}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Button */}
            <div className="px-3 pb-4 space-y-2">
              {bookingSuccess ? (
                <div className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white font-semibold text-sm py-3 px-4 rounded-xl">
                  <CheckCircle2 size={16} />
                  Pengajuan Terkirim!
                </div>
              ) : (
                <button
                  id="btn-booking-ruang"
                  onClick={() => navigate(`/booking-ruangan/${id}`)}
                  className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-sm py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg active:scale-95 uppercase tracking-widest"
                >
                  Booking Ruang
                </button>
              )}
              <p className="text-center text-blue-200 text-xs">Memerlukan persetujuan admin.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
