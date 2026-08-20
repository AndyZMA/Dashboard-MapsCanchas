import type { ReactNode } from 'react'
export default function ChartCard({ title, subtitle, children, className = '' }: { title: string, subtitle?: string, children: ReactNode, className?: string }) {
  return <article className={`chart-card ${className}`}><div className="card-heading"><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div></div>{children}</article>
}
