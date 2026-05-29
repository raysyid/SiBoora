import { useNavigate } from 'react-router-dom'
import { MapPin, Users, Monitor } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

/**
 * Card untuk menampilkan preview ruangan
 * @param {Object} room - data ruangan
 */
export default function RoomCard({ room }) {
  const navigate = useNavigate()
  const { ruangId, nama, lokasi, kapasitas, fasilitas, status, image } = room

  const fasilitasSingkat = fasilitas.slice(0, 2)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={`Foto ${nama}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x220/e2e8f0/94a3b8?text=${encodeURIComponent(nama)}`
          }}
        />
        {/* Status badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge status={status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {nama}
        </h3>

        {/* Divider */}
        <div className="border-t border-slate-100 my-2" />

        {/* Info row */}
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-slate-400 flex-shrink-0" />
            <span>Cap: {kapasitas}</span>
          </span>
          {fasilitasSingkat.map((f) => (
            <span key={f} className="flex items-center gap-1.5">
              <Monitor size={14} className="text-slate-400 flex-shrink-0" />
              <span>{f}</span>
            </span>
          ))}
        </div>

        {/* Button */}
        <div className="mt-auto">
          <Button
            id={`btn-detail-${ruangId}`}
            variant="outline"
            size="md"
            className="w-full uppercase tracking-wider text-xs"
            onClick={() => navigate(`/ruangan/${ruangId}`)}
          >
            Lihat Detail
          </Button>
        </div>
      </div>
    </div>
  )
}
