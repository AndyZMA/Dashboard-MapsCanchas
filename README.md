# Más Sueños — Dashboard territorial de fútbol femenil

Dashboard en React + TypeScript para explorar cobertura, ecosistema, brechas y calidad de información del mapa de fútbol femenil de Más Sueños.

## Stack

- React 18 + Vite + TypeScript
- Zustand para estado global y filtros
- React Leaflet + OpenStreetMap para el mapa
- Recharts para visualizaciones
- Lucide React para iconografía
- JSON estático generado a partir de los CSV finales del ETL

## Vistas

1. **Explorar** — mapa nacional, KPIs, filtros y drawer de entidades.
2. **Cobertura** — rankings territoriales y matriz estado × categoría.
3. **Ecosistema** — brechas estatales, tipologías y hubs municipales.
4. **Datos** — calidad, completitud y accionabilidad de las fichas.

## Fuente de verdad

`public/data/futbol_femenil_mas_suenos_clean.json` conserva la granularidad de registro.
Los KPIs se calculan con:

- registros = count(registro_id)
- entidades = nunique(entidad_id)
- ubicaciones = nunique(ubicacion_id)

Los agregados incluidos en `public/data/` quedan disponibles para extensiones posteriores, pero no se suman sobre los datos granulares.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Netlify

El proyecto incluye `netlify.toml`. En Netlify:

- Build command: `npm run build`
- Publish directory: `dist`

El redirect SPA ya está configurado.

## Nota del mapa

El mapa base usa tiles públicos de OpenStreetMap y requiere conexión a internet. Los datos de Más Sueños se sirven localmente desde `/public/data`.

## Diseño

La interfaz mantiene una dirección violeta/rosa inspirada en el dashboard previo de Torneo Violeta, pero evoluciona hacia un producto territorial: fondo cálido, cards suaves, navegación compacta, mapa dominante y visualizaciones que priorizan lectura sobre decoración.
