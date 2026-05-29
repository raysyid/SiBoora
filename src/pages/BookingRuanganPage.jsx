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
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.25rem' }}>
          Selesaikan Pemesanan
        </h1>
        <p className="text-slate-500 text-sm">
          Konfirmasi detail ruangan Anda dan isi informasi yang diperlukan.
        </p>
      </div>

      {/* Selected Room Card */}
      <div className="bg-white" style={{ border: '1px solid #3b82f6', borderRadius: '1rem', padding: '0.75rem', display: 'flex', gap: '1.5rem', marginBottom: '2rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <div style={{ width: '280px', height: '180px', flexShrink: 0 }}>
          <img
            src={image}
            alt={nama}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.75rem' }}
          />
        </div>
        
        <div style={{ flex: 1, padding: '0.5rem 0', position: 'relative' }}>
          <button
            onClick={() => navigate(`/ruangan/${id}`)}
            className="text-blue-500 hover:text-blue-700 transition-colors"
            style={{ position: 'absolute', top: '0', right: '0.5rem' }}
          >
            <Pen size={18} />
          </button>
          
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 'bold', color: '#3b82f6', border: '1px solid #bfdbfe', borderRadius: '9999px', padding: '0.25rem 0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              RUANGAN TERPILIH
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0.5rem' }}>
            {nama}
          </h2>
          <p className="text-slate-600 text-sm" style={{ marginBottom: '1.25rem' }}>
            {lantai} • Kapasitas: {kapasitas} Orang
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {fasilitas.slice(0, 3).map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', border: '1px solid #fed7aa', color: '#ea580c', borderRadius: '0.375rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: '500' }}>
                {getFacilityIcon(f)}
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-white" style={{ border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Tanggal */}
          <div>
            <label className="text-slate-700" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>
              <Calendar size={16} className="text-slate-400" />
              Tanggal Pemesanan
            </label>
            <div style={{ position: 'relative', maxWidth: '300px' }}>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ width: '100%', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '0.75rem 1rem', paddingRight: '2.5rem', fontSize: '0.875rem' }}
                required
              />
              <Calendar size={16} className="text-slate-400" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
          
          <div style={{ height: '1px', backgroundColor: '#f1f5f9' }} />

          {/* Waktu */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <label className="text-slate-700" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>
                <Clock size={16} className="text-slate-400" />
                Pilih Waktu
              </label>
              <span className="text-slate-400" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>WIB (GMT+7)</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
              {jadwal.map((slot) => {
                const isAvailable = slot.status === 'tersedia';
                const isSelected = selectedTime === slot.waktu;
                return (
                  <button
                    key={slot.waktu}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelectedTime(slot.waktu)}
                    className="transition-colors"
                    style={{ 
                      padding: '0.625rem 0', 
                      borderRadius: '9999px', 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      textAlign: 'center',
                      backgroundColor: !isAvailable ? '#f8fafc' : (isSelected ? '#f97316' : '#ffffff'),
                      color: !isAvailable ? '#94a3b8' : (isSelected ? '#ffffff' : '#475569'),
                      border: isSelected ? '1px solid #f97316' : '1px solid #e2e8f0',
                      cursor: !isAvailable ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {slot.waktu}
                  </button>
                )
              })}
            </div>
          </div>
          
          <div style={{ height: '1px', backgroundColor: '#f1f5f9' }} />

          {/* Subject */}
          <div>
            <label className="text-slate-700" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>
              <Book size={16} className="text-slate-400" />
              Mata Kuliah / Subjek
            </label>
            <input
              type="text"
              placeholder="misalnya, Proyek Kelompok Rekayasa Perangkat Lunak"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ width: '100%', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '0.875rem 1rem', fontSize: '0.875rem' }}
              required
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="text-slate-700" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.75rem' }}>
              <FileText size={16} className="text-slate-400" />
              Tujuan Pemesanan
            </label>
            <textarea
              placeholder="Jelaskan secara singkat untuk apa ruangan ini akan digunakan..."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              rows={4}
              className="text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ width: '100%', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem', padding: '0.875rem 1rem', fontSize: '0.875rem', resize: 'none' }}
              required
            />
          </div>

          {/* Submit */}
          <div style={{ marginTop: '0.5rem' }}>
            <button
              type="submit"
              disabled={!selectedTime || !subject || !purpose}
              className="w-full font-bold transition-all uppercase tracking-wider"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem',
                padding: '1rem', 
                borderRadius: '0.5rem', 
                fontSize: '0.875rem',
                backgroundColor: (!selectedTime || !subject || !purpose) ? '#cbd5e1' : '#f97316',
                color: '#ffffff',
                cursor: (!selectedTime || !subject || !purpose) ? 'not-allowed' : 'pointer'
              }}
            >
              KIRIM PEMESANAN <ArrowRight size={16} />
            </button>
            <p className="text-center text-slate-500" style={{ marginTop: '0.75rem', fontSize: '0.7rem' }}>
              Dengan mengirimkan, Anda menyetujui pedoman penggunaan fasilitas.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
