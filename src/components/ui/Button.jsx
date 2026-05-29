/**
 * Reusable Button component
 * @param {'primary'|'outline'|'ghost'|'danger'|'blue'} variant
 * @param {'sm'|'md'|'lg'} size
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-[#f97316] hover:bg-[#ea580c] text-white shadow-sm hover:shadow-md',
    blue: 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-sm hover:shadow-md',
    outline:
      'border-2 border-[#f97316] text-[#f97316] hover:bg-orange-50 bg-transparent',
    ghost: 'text-slate-600 hover:bg-slate-100 bg-transparent',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-sm px-6 py-3',
  }

  return (
    <button
      className={`interactive interactive-bounce ${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
