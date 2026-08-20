import { RotateCcw } from 'lucide-react'
import type { Opportunity } from '../types/data'
import { normalizeMunicipio, unique } from '../lib/data'
import { useDashboardStore } from '../store/dashboardStore'

export default function FiltersBar({ records }: { records: Opportunity[] }) {
  const { filters, setFilter, resetFilters } = useDashboardStore()
  const statesInRegion = records.filter((r) => !filters.region || r.region === filters.region)
  const municipalitiesInState = statesInRegion.filter((r) => !filters.estado || r.estado === filters.estado)

  const fields = [
    ['region', 'Región', unique(records.map((r) => r.region))],
    ['estado', 'Estado', unique(statesInRegion.map((r) => r.estado))],
    ['municipio', 'Municipio / alcaldía', unique(municipalitiesInState.map((r) => normalizeMunicipio(r.municipio)))],
    ['categoria', 'Categoría', unique(records.map((r) => r.categoria))],
    ['calidad', 'Calidad', unique(records.map((r) => r.calidad_ficha))],
    ['accionabilidad', 'Accionabilidad', unique(records.map((r) => r.accionabilidad))],
  ] as const

  const active = Object.values(filters).filter(Boolean).length

  return (
    <div className="filters-card">
      <div className="filters-grid">
        {fields.map(([key, label, options]) => (
          <label key={key} className="filter-field">
            <span>{label}</span>
            <select value={filters[key]} onChange={(e) => setFilter(key, e.target.value)}>
              <option value="">Todos</option>
              {options.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
        ))}
      </div>
      <button className="reset-btn" onClick={resetFilters} disabled={!active}><RotateCcw size={15}/> Limpiar {active ? `(${active})` : ''}</button>
    </div>
  )
}
