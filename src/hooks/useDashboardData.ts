import { useEffect, useMemo, useState } from 'react'
import type { Opportunity } from '../types/data'
import { filteredRecords, kpis, loadJson } from '../lib/data'
import { useDashboardStore } from '../store/dashboardStore'

export function useDashboardData() {
  const [records, setRecords] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const filters = useDashboardStore((s) => s.filters)

  useEffect(() => {
    loadJson<Opportunity[]>('/data/futbol_femenil_mas_suenos_clean.json')
      .then(setRecords)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error de carga'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => filteredRecords(records, filters), [records, filters])
  const metrics = useMemo(() => kpis(filtered), [filtered])

  return { records, filtered, metrics, loading, error }
}
