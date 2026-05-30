
/**
 * Baris jadwal penggunaan ruangan
 * @param {string} waktu - contoh "08:00 - 10:00"
 * @param {'tersedia'|'dipesan'} status
 * @param {string|null} kegiatan - nama kegiatan jika dipesan
 */
export default function ScheduleRow({ waktu, status }) {
  const isTersedia = status === 'tersedia'
  return (
    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-md" style={{ padding: '0.625rem 1rem' }}>
      <span className="text-sm font-medium text-slate-700">{waktu}</span>
      <span className="text-xs rounded font-semibold text-white" style={{ padding: '0.25rem 0.75rem', backgroundColor: isTersedia ? '#20c997' : '#ff4d4f' }}>
        {isTersedia ? 'Tersedia' : 'Dipesan'}
      </span>
    </div>
  )
}
