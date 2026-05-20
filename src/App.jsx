import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Campers from './pages/campers'
import Home from './pages/home'
import Reports from './pages/reports'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/campers" element={<Campers />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </BrowserRouter>
    )
  
}

export default App
