import { useMemo } from 'react'
import PageHeader from '../components/PageHeader'
import FiltersBar from '../components/FiltersBar'
import ChartCard from '../components/ChartCard'
import { useDashboardData } from '../hooks/useDashboardData'
import { unique } from '../lib/data'

const CATS = ['Clubes y Equipos','Escuelas y Academias','Ligas de Fútbol','Asociaciones Civiles y Fundaciones']

export default function Ecosystem() {
  const { records, filtered } = useDashboardData()
  const stateRows = useMemo(() => unique(filtered.map(r=>r.estado)).map(estado => {
    const subset = filtered.filter(r=>r.estado===estado)
    const entities = new Set(subset.map(r=>r.entidad_id)).size
    const present = CATS.filter(c => subset.some(r=>r.categoria===c))
    return { estado, entities, present, count: present.length }
  }).sort((a,b)=>b.count-a.count || b.entities-a.entities), [filtered])
  const noLiga = stateRows.filter(r=>!r.present.includes('Ligas de Fútbol')).length
  const noAcademia = stateRows.filter(r=>!r.present.includes('Escuelas y Academias')).length
  const noAsoc = stateRows.filter(r=>!r.present.includes('Asociaciones Civiles y Fundaciones')).length
  const oneCat = stateRows.filter(r=>r.count===1).length

  const municipal = useMemo(() => {
    const keySet = unique(filtered.map(r => r.estado && r.municipio ? `${r.estado}|||${r.municipio}` : null))
    return keySet.map(key => { const [estado, municipio]=key.split('|||'); const sub=filtered.filter(r=>r.estado===estado&&r.municipio===municipio); const cats=CATS.filter(c=>sub.some(r=>r.categoria===c)); return {estado,municipio,cats,entities:new Set(sub.map(r=>r.entidad_id)).size} }).sort((a,b)=>b.cats.length-a.cats.length||b.entities-a.entities)
  }, [filtered])

  return <>
    <PageHeader eyebrow="Ecosistema y brechas" title="Dónde hay variedad y dónde falta estructura" description="Convierte el directorio en una herramienta de diagnóstico territorial. Una ausencia aquí significa ausencia en el dataset, no inexistencia absoluta en el territorio." />
    <FiltersBar records={records}/>
    <div className="gap-grid"><article className="gap-card"><span>Sin ligas</span><strong>{noLiga}</strong><small>estados cubiertos por el dataset</small></article><article className="gap-card"><span>Sin academias</span><strong>{noAcademia}</strong><small>estados cubiertos por el dataset</small></article><article className="gap-card"><span>Sin asociaciones</span><strong>{noAsoc}</strong><small>estados cubiertos por el dataset</small></article><article className="gap-card"><span>Una sola categoría</span><strong>{oneCat}</strong><small>ecosistemas estatales concentrados</small></article></div>
    <div className="two-col">
      <ChartCard title="Tipología estatal" subtitle="Diversidad de categorías presentes">
        <div className="state-ecosystem-list">{stateRows.map(r=><div className="eco-row" key={r.estado}><div><strong>{r.estado}</strong><small>{r.entities} entidades</small></div><div className="mini-dots">{CATS.map(c=><i key={c} className={r.present.includes(c)?'on':''}/>)}</div><b>{r.count}/4</b></div>)}</div>
      </ChartCard>
      <ChartCard title="Hubs municipales" subtitle="Municipios con mayor diversidad y volumen">
        <div className="hub-list">{municipal.slice(0,14).map((r,i)=><div className="hub-row" key={`${r.estado}-${r.municipio}`}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{r.municipio}</strong><small>{r.estado}</small></div><div><b>{r.cats.length}/4</b><small>{r.entities} entidades</small></div></div>)}</div>
      </ChartCard>
    </div>
  </>
}
