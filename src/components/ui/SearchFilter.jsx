import { useState } from 'react'
import { Calendar, Clock, Users, Layers, Search } from 'lucide-react'
import Button from '../ui/Button'

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
      className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5"
    >
      <div className="flex flex-wrap items-end gap-4">
        {/* Tanggal */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
            Tanggal
          </label>
          <div className="relative">
            <Calendar
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="filter-tanggal"
              type="date"
              value={filters.tanggal}
              onChange={(e) => handleChange('tanggal', e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 text-slate-700 transition-all"
            />
          </div>
        </div>

        {/* Waktu */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
            Waktu
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Clock
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="filter-jam-mulai"
                type="time"
                value={filters.jamMulai}
                onChange={(e) => handleChange('jamMulai', e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 text-slate-700 transition-all"
              />
            </div>
            <span className="text-slate-400 text-sm font-medium">-</span>
            <div className="relative flex-1">
              <Clock
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="filter-jam-selesai"
                type="time"
                value={filters.jamSelesai}
                onChange={(e) => handleChange('jamSelesai', e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 text-slate-700 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Kapasitas */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
            Kapasitas
          </label>
          <div className="relative">
            <Users
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <select
              id="filter-kapasitas"
              value={filters.kapasitas}
              onChange={(e) => handleChange('kapasitas', e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 text-slate-700 appearance-none bg-white cursor-pointer transition-all"
            >
              {kapasitasOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Fasilitas */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
            Fasilitas
          </label>
          <div className="relative">
            <Layers
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <select
              id="filter-fasilitas"
              value={filters.fasilitas}
              onChange={(e) => handleChange('fasilitas', e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 text-slate-700 appearance-none bg-white cursor-pointer transition-all"
            >
              {fasilitasOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex-shrink-0">
          <Button type="submit" variant="primary" size="md" className="whitespace-nowrap gap-2 mt-5">
            <Search size={15} />
            Cari Ruangan
          </Button>
        </div>
      </div>
    </form>
  )
}
