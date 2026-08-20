import PageHeader from '../components/PageHeader'
import FiltersBar from '../components/FiltersBar'
import KpiGrid from '../components/KpiGrid'
import OpportunityMap from '../components/OpportunityMap'
import EntityDrawer from '../components/EntityDrawer'
import EmptyState from '../components/EmptyState'
import { useDashboardData } from '../hooks/useDashboardData'
import { categoryColor, categoryShort } from '../lib/data'
import { useDashboardStore } from '../store/dashboardStore'

export default function Explore() {
  const { records, filtered, metrics, loading, error } = useDashboardData()
  const selectEntity = useDashboardStore((s) => s.selectEntity)
  if (loading) return <div className="loading">Cargando ecosistema…</div>
  if (error) return <div className="loading">{error}</div>

  const entities = [...new Map(filtered.map((r) => [r.entidad_id, r])).values()]

  return <>
    <PageHeader eyebrow="Ecosistema nacional" title="Dónde están las oportunidades" description="Explora organizaciones, sedes y fichas del fútbol femenil en México sin confundir volumen con cobertura real." />
    <FiltersBar records={records}/>
    <KpiGrid metrics={metrics}/>
    {filtered.length ? <div className="explore-grid">
      <OpportunityMap records={filtered}/>
      <section className="entity-list-card">
        <div className="card-heading"><div><h3>Entidades visibles</h3><p>{entities.length} organizaciones bajo los filtros actuales</p></div></div>
        <div className="entity-list">
          {entities.slice(0, 40).map((r) => <button key={r.entidad_id} className="entity-row" onClick={() => selectEntity(r.entidad_id)}>
            <span className="entity-dot" style={{ background: categoryColor(r.categoria) }}/>
            <span><strong>{r.nombre}</strong><small>{categoryShort(r.categoria)} · {r.municipio || 'Municipio por identificar'}, {r.estado}</small></span>
          </button>)}
        </div>
      </section>
    </div> : <EmptyState/>}
    <EntityDrawer records={filtered}/>
  </>
}
