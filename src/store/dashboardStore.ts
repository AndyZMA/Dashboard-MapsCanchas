import { create } from 'zustand'
import type { Filters } from '../types/data'

const emptyFilters: Filters = {
  region: '',
  estado: '',
  municipio: '',
  categoria: '',
  calidad: '',
  accionabilidad: '',
}

type DashboardState = {
  filters: Filters
  selectedEntityId?: string
  setFilter: (key: keyof Filters, value: string) => void
  resetFilters: () => void
  selectEntity: (id?: string) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  filters: emptyFilters,
  selectedEntityId: undefined,
  setFilter: (key, value) => set((state) => ({
    filters: {
      ...state.filters,
      [key]: value,
      ...(key === 'region' ? { estado: '', municipio: '' } : {}),
      ...(key === 'estado' ? { municipio: '' } : {}),
    },
  })),
  resetFilters: () => set({ filters: emptyFilters, selectedEntityId: undefined }),
  selectEntity: (id) => set({ selectedEntityId: id }),
}))
