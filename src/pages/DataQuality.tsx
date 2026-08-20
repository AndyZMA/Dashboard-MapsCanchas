import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import PageHeader from '../components/PageHeader'
import FiltersBar from '../components/FiltersBar'
import ChartCard from '../components/ChartCard'
import { useDashboardData } from '../hooks/useDashboardData'
import { isTrue } from '../lib/data'

const pieColors = ['#6D3CCF','#EC5B9B','#F59E5D','#3FA7A1']

export default function DataQuality() {
  const { records, filtered } = useDashboardData()
  const n = filtered.length || 1
  const pct = (key: 'tiene_responsable'|'tiene_horario'|'tiene_descripcion') => Math.round(filtered.filter(r=>isTrue(r[key])).length/n*100)
  const quality = ['Buena','Intermedia','Mínima'].map(name=>({name,value:filtered.filter(r=>r.calidad_ficha===name).length}))
  const action = ['Alta','Media','Baja'].map(name=>({name,value:filtered.filter(r=>r.accionabilidad===name).length}))

  return <>
    <PageHeader eyebrow="Calidad de información" title="Qué tan útil es cada ficha para actuar" description="La completitud se calcula sobre la información original del mapa; el enriquecimiento geográfico no maquilla la calidad de origen." />
    <FiltersBar records={records}/>
    <div className="quality-kpis"><article><strong>{pct('tiene_responsable')}%</strong><span>con responsable</span></article><article><strong>{pct('tiene_horario')}%</strong><span>con horario</span></article><article><strong>{pct('tiene_descripcion')}%</strong><span>con descripción</span></article><article><strong>{Math.round(filtered.reduce((a,r)=>a+Number(r.porcentaje_completitud_origen||0),0)/n)}%</strong><span>completitud promedio</span></article></div>
    <div className="two-col">
      <ChartCard title="Calidad de ficha" subtitle="Información disponible desde el origen"><div className="pie-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={quality} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={4}>{quality.map((_,i)=><Cell key={i} fill={pieColors[i]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="legend-list">{quality.map((x,i)=><div key={x.name}><i style={{background:pieColors[i]}}/><span>{x.name}</span><b>{x.value}</b></div>)}</div></div></ChartCard>
      <ChartCard title="Accionabilidad" subtitle="Facilidad para pasar de consultar a actuar"><div className="pie-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={action} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={4}>{action.map((_,i)=><Cell key={i} fill={pieColors[(i+1)%pieColors.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="legend-list">{action.map((x,i)=><div key={x.name}><i style={{background:pieColors[(i+1)%pieColors.length]}}/><span>{x.name}</span><b>{x.value}</b></div>)}</div></div></ChartCard>
    </div>
    <div className="method-note"><strong>Nota metodológica.</strong> “Sin liga”, “sin academia” o “sin asociación” significa que no existe presencia registrada en este dataset de Más Sueños. No debe interpretarse como inexistencia real en el territorio.</div>
  </>
}
