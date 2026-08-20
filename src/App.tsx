import { Navigate, Route, Routes } from 'react-router-dom'
import Shell from './components/Shell'
import Explore from './pages/Explore'
import Coverage from './pages/Coverage'
import Ecosystem from './pages/Ecosystem'
import DataQuality from './pages/DataQuality'

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/cobertura" element={<Coverage />} />
        <Route path="/ecosistema" element={<Ecosystem />} />
        <Route path="/datos" element={<DataQuality />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  )
}
