/**
 * Badge komponen reusable untuk status ruangan
 * @param {'tersedia'|'digunakan'|'dipesan'} status
 * @param {string} className - additional classes
 */
export default function Badge({ status, className = '' }) {
  const config = {
    tersedia: {
      label: '● Tersedia',
      classes: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    },
    digunakan: {
      label: '● Digunakan',
      classes: 'bg-red-100 text-red-600 border border-red-200',
    },
    dipesan: {
      label: 'Dipesan',
      classes: 'bg-orange-500 text-white',
    },
  }

  const { label, classes } = config[status] || config.tersedia

  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${classes} ${className}`}
    >
      {label}
    </span>
  )
}
