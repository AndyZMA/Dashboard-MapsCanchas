import type { Opportunity } from '../types/data'

export async function loadJson<T>(path: string): Promise<T> {
  const response = await fetch(path)
  if (!response.ok) throw new Error(`No se pudo cargar ${path}`)
  return response.json() as Promise<T>
}

export function isTrue(value: unknown) {
  return value === true || value === 1 || value === '1' || value === 'True' || value === 'true'
}

export function unique(values: (string | null | undefined)[]) {
  return [...new Set(values.filter(Boolean) as string[])].sort((a, b) => a.localeCompare(b, 'es'))
}

export function normalizeMunicipio(value?: string | null) {
  const v = value?.trim()
  return v || 'Sin municipio identificado'
}

export const CATEGORY_COLORS: Record<string, string> = {
  'Clubes y Equipos': '#6D3CCF',
  'Escuelas y Academias': '#EC5B9B',
  'Ligas de Fútbol': '#F59E5D',
  'Asociaciones Civiles y Fundaciones': '#3FA7A1',
}

export function categoryColor(category: string) {
  return CATEGORY_COLORS[category] || '#8E85A4'
}

export function categoryShort(category: string) {
  return ({
    'Clubes y Equipos': 'Clubes',
    'Escuelas y Academias': 'Academias',
    'Ligas de Fútbol': 'Ligas',
    'Asociaciones Civiles y Fundaciones': 'Asociaciones',
  } as Record<string, string>)[category] || category
}

export function filteredRecords(records: Opportunity[], filters: Record<string, string>) {
  return records.filter((r) => {
    if (filters.region && r.region !== filters.region) return false
    if (filters.estado && r.estado !== filters.estado) return false
    if (filters.municipio && normalizeMunicipio(r.municipio) !== filters.municipio) return false
    if (filters.categoria && r.categoria !== filters.categoria) return false
    if (filters.calidad && r.calidad_ficha !== filters.calidad) return false
    if (filters.accionabilidad && r.accionabilidad !== filters.accionabilidad) return false
    return true
  })
}

export function kpis(records: Opportunity[]) {
  return {
    registros: records.length,
    entidades: new Set(records.map((r) => r.entidad_id)).size,
    ubicaciones: new Set(records.map((r) => r.ubicacion_id)).size,
    estados: new Set(records.map((r) => r.estado).filter(Boolean)).size,
    municipios: new Set(records.map((r) => `${r.estado}::${normalizeMunicipio(r.municipio)}`).filter((x) => !x.endsWith('Sin municipio identificado'))).size,
    categorias: new Set(records.map((r) => r.categoria)).size,
  }
}

export function countUniqueBy<T extends Opportunity>(records: T[], groupKey: keyof T, uniqueKey: keyof T) {
  const map = new Map<string, Set<unknown>>()
  records.forEach((r) => {
    const group = String(r[groupKey] ?? 'Sin dato')
    if (!map.has(group)) map.set(group, new Set())
    map.get(group)!.add(r[uniqueKey])
  })
  return [...map.entries()].map(([name, values]) => ({ name, value: values.size })).sort((a, b) => b.value - a.value)
}
