import PageHeader from '../components/PageHeader'
import FiltersBar from '../components/FiltersBar'
import KpiGrid from '../components/KpiGrid'
import OpportunityMap from '../components/OpportunityMap'
import EntityDrawer from '../components/EntityDrawer'
import EmptyState from '../components/EmptyState'
import { useDashboardData } from '../hooks/useDashboardData'
import { categoryColor } from '../lib/data'

export default function Explore() {
  const { records, filtered, metrics, loading, error } = useDashboardData()

  if (loading) {
    return <div className="loading">Cargando ecosistema…</div>
  }

  if (error) {
    return <div className="loading">{error}</div>
  }

  const entities = [
    ...new Map(
      filtered.map((r) => [r.entidad_id, r])
    ).values(),
  ]

  const categories = [
    'Clubes y Equipos',
    'Escuelas y Academias',
    'Ligas de Fútbol',
    'Asociaciones Civiles y Fundaciones',
  ]

  return (
    <>
      <PageHeader
        eyebrow="Ecosistema nacional"
        title="Dónde están las oportunidades"
        description="Explora organizaciones, sedes y fichas del fútbol femenil en México sin confundir volumen con cobertura real."
      />

      <FiltersBar records={records} />

      <KpiGrid metrics={metrics} />

      {filtered.length ? (
        <div className="explore-grid">
          <OpportunityMap records={filtered} />

          <section className="map-context-card">
            <div className="card-heading">
              <div>
                <h3>Categorías</h3>
                <p>Distribución de las entidades visibles en el mapa</p>
              </div>
            </div>

            <div className="map-context-content">
              <div className="legend-list">
                {categories.map((categoria) => {
                  const count = new Set(
                    filtered
                      .filter((r) => r.categoria === categoria)
                      .map((r) => r.entidad_id)
                  ).size

                  return (
                    <div className="legend-item" key={categoria}>
                      <span
                        className="legend-dot"
                        style={{
                          background: categoryColor(categoria),
                        }}
                      />

                      <span className="legend-label">
                        {categoria}
                      </span>

                      <strong className="legend-count">
                        {count}
                      </strong>
                    </div>
                  )
                })}
              </div>

              <div className="context-summary">
                <span className="context-summary-label">
                  Entidades
                </span>

                <strong>
                  {entities.length}
                </strong>

                <small>
                  bajo los filtros actuales
                </small>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <EmptyState />
      )}

      <EntityDrawer records={filtered} />
    </>
  )
}