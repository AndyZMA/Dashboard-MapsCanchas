import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import PageHeader from '../components/PageHeader'
import FiltersBar from '../components/FiltersBar'
import KpiGrid from '../components/KpiGrid'
import ChartCard from '../components/ChartCard'
import { useDashboardData } from '../hooks/useDashboardData'
import { countUniqueBy, unique } from '../lib/data'
import type { Opportunity } from '../types/data'

function metricData(records: Opportunity[], metric: string) {
  if (metric === 'entidades') return countUniqueBy(records, 'estado', 'entidad_id')
  if (metric === 'ubicaciones') return countUniqueBy(records, 'estado', 'ubicacion_id')
  if (metric === 'municipios') {
    const map = new Map<string, Set<string>>()
    records.forEach(r => { if (!r.estado) return; if (!map.has(r.estado)) map.set(r.estado, new Set()); if (r.municipio) map.get(r.estado)!.add(r.municipio) })
    return [...map].map(([name, set]) => ({ name, value: set.size })).sort((a,b)=>b.value-a.value)
  }
  if (metric === 'categorias') return countUniqueBy(records, 'estado', 'categoria')
  const map = new Map<string, number>()
  records.forEach(r => map.set(r.estado || 'Sin dato', (map.get(r.estado || 'Sin dato') || 0) + 1))
  return [...map].map(([name,value])=>({name,value})).sort((a,b)=>b.value-a.value)
}

export default function Coverage() {
  const { records, filtered, metrics } = useDashboardData()
  const [metric, setMetric] = useState('entidades')
  const ranking = useMemo(() => metricData(filtered, metric).slice(0, 12), [filtered, metric])
  const categories = unique(filtered.map(r=>r.categoria))
  const states = unique(filtered.map(r=>r.estado))
  const matrix = states.map(estado => ({ estado, values: categories.map(c => new Set(filtered.filter(r=>r.estado===estado && r.categoria===c).map(r=>r.entidad_id)).size) }))

  return <>
    <PageHeader eyebrow="Cobertura territorial" title="Volumen no es lo mismo que alcance" description="Compara estados y categorías usando la métrica correcta para cada pregunta." action={<div className="metric-switch">{['entidades','registros','ubicaciones','municipios','categorias'].map(m=><button key={m} onClick={()=>setMetric(m)} className={metric===m?'active':''}>{m}</button>)}</div>} />
    <FiltersBar records={records}/><KpiGrid metrics={metrics}/>
    <div className="two-col">
      <ChartCard title={`Ranking estatal · ${metric}`} subtitle="Top 12 bajo los filtros actuales">
        <div className="chart-lg"><ResponsiveContainer width="100%" height="100%"><BarChart data={ranking} layout="vertical" margin={{left:24,right:20}}><CartesianGrid strokeDasharray="3 3" horizontal={false}/><XAxis type="number" allowDecimals={false}/><YAxis dataKey="name" type="category" width={120} tick={{fontSize:11}}/><Tooltip/><Bar dataKey="value" fill="#6D3CCF" radius={[0,8,8,0]}/></BarChart></ResponsiveContainer></div>
      </ChartCard>
      <ChartCard title="Lectura territorial" subtitle="Cómo interpretar esta vista">
        <div className="insight-stack"><div className="insight-card"><span>01</span><strong>Entidades</strong><p>Mide oferta organizacional única y evita inflar sedes con fichas repetidas.</p></div><div className="insight-card"><span>02</span><strong>Ubicaciones</strong><p>Mide puntos físicos reales; varias entidades pueden compartir una sede.</p></div><div className="insight-card"><span>03</span><strong>Categorías</strong><p>Mide diversidad básica de oferta, no profundidad ni equilibrio.</p></div></div>
      </ChartCard>
    </div>
    <ChartCard title="Matriz estado × categoría" subtitle="Número de entidades únicas por tipo de oferta">
      <div className="matrix-wrap"><table className="matrix-table"><thead><tr><th>Estado</th>{categories.map(c=><th key={c}>{c.replace('Asociaciones Civiles y Fundaciones','Asociaciones')}</th>)}</tr></thead><tbody>{matrix.map(row=><tr key={row.estado}><td>{row.estado}</td>{row.values.map((v,i)=><td key={i}><span className={`matrix-cell level-${Math.min(v,4)}`}>{v}</span></td>)}</tr>)}</tbody></table></div>
    </ChartCard>
  </>
}
