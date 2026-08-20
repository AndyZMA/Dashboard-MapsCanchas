import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'
import type { Opportunity } from '../types/data'
import { categoryColor, normalizeMunicipio } from '../lib/data'
import { useDashboardStore } from '../store/dashboardStore'

function FitBounds({ records }: { records: Opportunity[] }) {
  const map = useMap()
  useEffect(() => {
    const points = records.filter((r) => Number.isFinite(+r.latitud) && Number.isFinite(+r.longitud)).map((r) => [Number(r.latitud), Number(r.longitud)] as [number, number])
    if (points.length) map.fitBounds(L.latLngBounds(points), { padding: [35, 35], maxZoom: 11 })
  }, [map, records])
  return null
}

export default function OpportunityMap({ records }: { records: Opportunity[] }) {
  const selectEntity = useDashboardStore((s) => s.selectEntity)
  return (
    <div className="map-card">
      <MapContainer center={[23.6, -102.5]} zoom={5} scrollWheelZoom className="map">
        <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitBounds records={records} />
        {records.map((r) => (
          <CircleMarker key={r.registro_id} center={[Number(r.latitud), Number(r.longitud)]} radius={7} pathOptions={{ color: '#fff', weight: 2, fillColor: categoryColor(r.categoria), fillOpacity: .95 }} eventHandlers={{ click: () => selectEntity(r.entidad_id) }}>
            <Tooltip direction="top" offset={[0, -4]} opacity={1}><strong>{r.nombre}</strong><br/>{r.categoria}</Tooltip>
            <Popup><strong>{r.nombre}</strong><br/>{normalizeMunicipio(r.municipio)}, {r.estado}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
