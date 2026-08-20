export type Opportunity = {
  registro_id: string
  entidad_id: string
  ubicacion_id: string
  nombre: string
  categoria: string
  persona_encargada?: string | null
  descripcion?: string | null
  horario?: string | null
  tipo_cancha?: string | null
  direccion_origen?: string | null
  direccion_referencia?: string | null
  latitud: number
  longitud: number
  region?: string | null
  estado?: string | null
  municipio?: string | null
  ciudad?: string | null
  calidad_ficha?: string | null
  accionabilidad?: string | null
  porcentaje_completitud_origen?: number | null
  tiene_responsable?: boolean | number | string | null
  tiene_horario?: boolean | number | string | null
  tiene_descripcion?: boolean | number | string | null
  es_entidad_multiregistro?: boolean | number | string | null
  es_ubicacion_compartida?: boolean | number | string | null
}

export type Filters = {
  region: string
  estado: string
  municipio: string
  categoria: string
  calidad: string
  accionabilidad: string
}

export type Kpis = {
  registros: number
  entidades: number
  ubicaciones: number
  estados: number
  municipios: number
  categorias: number
}
