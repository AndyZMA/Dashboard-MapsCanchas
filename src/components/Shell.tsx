import type { ReactNode } from 'react'
import { BarChart3, Database, Map, Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const nav = [
  { to: '/', label: 'Explorar', icon: Map },
  { to: '/cobertura', label: 'Cobertura', icon: BarChart3 },
  { to: '/ecosistema', label: 'Ecosistema', icon: Sparkles },
  { to: '/datos', label: 'Datos', icon: Database },
]

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">MS</div>
          <div><strong>Más Sueños</strong><span>Fútbol femenil · México</span></div>
        </div>
        <nav>
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <Icon size={18} /> <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-note">
          <span className="eyebrow">Directorio vivo</span>
          <p>Explora cobertura, diversidad y brechas del ecosistema de fútbol femenil.</p>
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  )
}
