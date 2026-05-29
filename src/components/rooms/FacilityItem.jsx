import {
  Wifi,
  Wind,
  Monitor,
  Projector,
  Volume2,
  Plug,
  PenLine,
  Cpu,
  LayoutList,
} from 'lucide-react'

const facilityIconMap = {
  'wi-fi': Wifi,
  wifi: Wifi,
  ac: Wind,
  tv: Monitor,
  proyektor: Projector,
  projector: Projector,
  'sistem audio': Volume2,
  audio: Volume2,
  'stop kontak': Plug,
  'papan tulis': PenLine,
  komputer: Cpu,
  default: LayoutList,
}

/**
 * Item fasilitas dengan icon
 * @param {string} name - nama fasilitas
 */
export default function FacilityItem({ name }) {
  const key = name.toLowerCase()
  const Icon = facilityIconMap[key] || facilityIconMap.default

  return (
    <div className="flex items-center gap-3 text-slate-700">
      <Icon size={18} className="text-blue-700" />
      <span className="text-base">{name}</span>
    </div>
  )
}
