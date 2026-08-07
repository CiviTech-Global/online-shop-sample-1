import { HashRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<LandingPage />} />
        <Route path="/category/:id" element={<LandingPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
