import type { Kpis } from '../types/data'

const items: [keyof Kpis, string, string][] = [
  ['registros', 'Registros', 'Fichas válidas'],
  ['entidades', 'Entidades', 'Organizaciones únicas'],
  ['ubicaciones', 'Ubicaciones', 'Puntos físicos'],
  ['estados', 'Estados', 'Cobertura estatal'],
  ['municipios', 'Municipios', 'Cobertura local'],
  ['categorias', 'Categorías', 'Tipos de oferta'],
]

export default function KpiGrid({ metrics }: { metrics: Kpis }) {
  return <div className="kpi-grid">{items.map(([key, label, hint]) => (
    <article className="kpi-card" key={key}>
      <span>{label}</span><strong>{metrics[key]}</strong><small>{hint}</small>
    </article>
  ))}</div>
}
