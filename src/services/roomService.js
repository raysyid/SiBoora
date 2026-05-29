import { rooms } from '../data/rooms'

/**
 * Simulasi filter pencarian ruangan (tanpa backend)
 * @param {Object} filters - { tanggal, jamMulai, jamSelesai, kapasitas, fasilitas }
 * @returns {Array} - daftar ruangan yang sesuai filter
 */
export const searchRooms = (filters = {}) => {
  let results = [...rooms]

  if (filters.kapasitas && filters.kapasitas !== 'semua') {
    const [min, max] = filters.kapasitas.split('-').map(Number)
    results = results.filter((r) => {
      if (max) return r.kapasitas >= min && r.kapasitas <= max
      return r.kapasitas >= min
    })
  }

  if (Array.isArray(filters.fasilitas) && filters.fasilitas.length > 0) {
    results = results.filter((r) =>
      filters.fasilitas.every((filterFasil) =>
        r.fasilitas.some((f) => f.toLowerCase().includes(filterFasil.toLowerCase()))
      )
    )
  } else if (typeof filters.fasilitas === 'string' && filters.fasilitas !== 'semua' && filters.fasilitas !== '') {
    results = results.filter((r) =>
      r.fasilitas.some((f) => f.toLowerCase().includes(filters.fasilitas.toLowerCase()))
    )
  }

  return results
}

/**
 * Get room by ID
 * @param {string} id
 * @returns {Object|undefined}
 */
export const getRoomDetail = (id) => rooms.find((r) => r.ruangId === id)
