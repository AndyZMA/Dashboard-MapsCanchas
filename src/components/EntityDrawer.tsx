import { Clock3, MapPin, UserRound, X } from 'lucide-react'
import type { Opportunity } from '../types/data'
import { categoryColor, normalizeMunicipio } from '../lib/data'
import { useDashboardStore } from '../store/dashboardStore'

export default function EntityDrawer({ records }: { records: Opportunity[] }) {
  const selectedId = useDashboardStore((s) => s.selectedEntityId)
  const close = useDashboardStore((s) => s.selectEntity)
  const matches = records.filter((r) => r.entidad_id === selectedId)
  const r = matches[0]
  if (!r) return null

  return (
    <aside className="entity-drawer">
      <button className="icon-btn drawer-close" onClick={() => close(undefined)}><X size={18}/></button>
      <span className="category-pill" style={{ '--pill': categoryColor(r.categoria) } as React.CSSProperties}>{r.categoria}</span>
      <h2>{r.nombre}</h2>
      <p className="location-line"><MapPin size={16}/>{normalizeMunicipio(r.municipio)}, {r.estado}</p>
      <div className="drawer-badges"><span>Calidad · {r.calidad_ficha || 'Sin dato'}</span><span>Accionabilidad · {r.accionabilidad || 'Sin dato'}</span></div>
      {matches.length > 1 && <div className="notice">Esta entidad tiene {matches.length} registros válidos. Se muestran juntos para evitar confundir fichas con entidades únicas.</div>}
      <section><h3>Información</h3>
        {r.persona_encargada && <p className="info-row"><UserRound size={16}/><span><small>Responsable</small>{r.persona_encargada}</span></p>}
        {r.horario && <p className="info-row"><Clock3 size={16}/><span><small>Horario</small>{r.horario}</span></p>}
        <p className="info-row"><MapPin size={16}/><span><small>Dirección</small>{r.direccion_referencia || r.direccion_origen || 'Sin dirección de referencia'}</span></p>
      </section>
      <section><h3>Descripción</h3><p className="drawer-copy">{r.descripcion || 'Esta ficha no incluye una descripción de origen.'}</p></section>
      {r.tipo_cancha && <section><h3>Tipo de cancha</h3><p className="drawer-copy">{r.tipo_cancha}</p></section>}
    </aside>
  )
}
