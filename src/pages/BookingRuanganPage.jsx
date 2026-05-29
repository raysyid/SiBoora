import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Calendar,
  Clock,
  Book,
  FileText,
  ArrowRight,
  Pen,
  Wifi,
  Monitor,
  Video,
  AlertCircle,
  ArrowLeft
} from 'lucide-react'
import Button from '../components/ui/Button'
import { getRoomDetail } from '../services/roomService'

export default function BookingRuanganPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const room = getRoomDetail(id)

  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('en-CA') // YYYY-MM-DD format roughly
  )
  const [selectedTime, setSelectedTime] = useState('')
  const [subject, setSubject] = useState('')
  const [purpose, setPurpose] = useState('')

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-20 text-center px-6">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">Ruangan Tidak Ditemukan</h2>
        <Button variant="outline" onClick={() => navigate('/cari-ruangan')}>
          <ArrowLeft size={15} />
          Kembali ke Daftar Ruang
        </Button>
      </div>
    )
  }

  const { nama, lantai, kapasitas, fasilitas, image, jadwal } = room

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate submission
    navigate('/pesanan-saya')
  }

  // Generate facilities with fake icons if needed or just use default text
  const getFacilityIcon = (facility) => {
    const f = facility.toLowerCase()
    if (f.includes('wifi') || f.includes('wi-fi')) return <Wifi size={14} />
    if (f.includes('tv') || f.includes('layar') || f.includes('proyektor')) return <Monitor size={14} />
    if (f.includes('video') || f.includes('audio')) return <Video size={14} />
    return null
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Selesaikan Pemesanan
        </h1>
        <p className="text-slate-500">
          Konfirmasi detail ruangan Anda dan isi informasi yang diperlukan.
        </p>
      </div>

      {/* Selected Room Card */}
      <div className="bg-white border-2 border-blue-500 rounded-2xl p-1 relative overflow-hidden mb-8 shadow-sm flex flex-col md:flex-row items-stretch">
        <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 relative rounded-xl overflow-hidden m-1">
          <img
            src={image}
            alt={nama}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col justify-center relative">
          <button
            onClick={() => navigate(`/ruangan/${id}`)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Pen size={16} />
          </button>
          
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-200">
              RUANGAN TERPILIH
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {nama}
          </h2>
          <p className="text-slate-600 mb-4">
            {lantai} • Kapasitas: {kapasitas} Orang
          </p>
          
          <div className="flex flex-wrap gap-2">
            {fasilitas.slice(0, 3).map((f) => (
              <div key={f} className="flex items-center gap-1.5 px-3 py-1.5 border border-orange-200 rounded-lg text-sm text-orange-700 bg-orange-50/50">
                {getFacilityIcon(f)}
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Tanggal */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <Calendar size={16} className="text-slate-400" />
              Tanggal Pemesanan
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full max-w-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
              required
            />
          </div>
          
          <hr className="border-slate-100" />

          {/* Waktu */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Clock size={16} className="text-slate-400" />
                Pilih Waktu
              </label>
              <span className="text-xs text-slate-400 uppercase tracking-wider">WIB (GMT+7)</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {jadwal.map((slot) => {
                const isAvailable = slot.status === 'tersedia';
                const isSelected = selectedTime === slot.waktu;
                return (
                  <button
                    key={slot.waktu}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelectedTime(slot.waktu)}
                    className={`
                      py-3 px-4 rounded-xl text-sm font-medium transition-all text-center
                      ${!isAvailable ? 'bg-slate-100 text-slate-400 cursor-not-allowed line-through' : ''}
                      ${isAvailable && !isSelected ? 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50' : ''}
                      ${isSelected ? 'bg-white border-2 border-orange-500 text-orange-600 shadow-sm' : ''}
                    `}
                  >
                    {slot.waktu}
                  </button>
                )
              })}
            </div>
          </div>
          
          <hr className="border-slate-100" />

          {/* Subject */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <Book size={16} className="text-slate-400" />
              Mata Kuliah / Subjek
            </label>
            <input
              type="text"
              placeholder="misalnya, Proyek Kelompok Rekayasa Perangkat Lunak"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
              required
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <FileText size={16} className="text-slate-400" />
              Tujuan Pemesanan
            </label>
            <textarea
              placeholder="Jelaskan secara singkat untuk apa ruangan ini akan digunakan..."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 resize-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!selectedTime || !subject || !purpose}
              className="w-full bg-[#f97316] hover:bg-[#ea580c] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 tracking-widest uppercase shadow-lg shadow-orange-500/20"
            >
              Kirim Pemesanan
              <ArrowRight size={18} />
            </button>
            <p className="text-center text-slate-500 text-xs mt-4">
              Dengan mengirimkan, Anda menyetujui pedoman penggunaan fasilitas.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
