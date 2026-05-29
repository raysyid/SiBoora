import Badge from '../ui/Badge'

/**
 * Baris jadwal penggunaan ruangan
 * @param {string} waktu - contoh "08:00 - 10:00"
 * @param {'tersedia'|'dipesan'} status
 * @param {string|null} kegiatan - nama kegiatan jika dipesan
 */
export default function ScheduleRow({ waktu, status, kegiatan }) {
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors duration-150">
      <span className="text-sm font-medium text-slate-700">{waktu}</span>
      <div className="flex items-center gap-3">
        {kegiatan && (
          <span className="text-xs text-slate-400 hidden sm:block">{kegiatan}</span>
        )}
        <Badge status={status} />
      </div>
    </div>
  )
}
