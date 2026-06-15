import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Campers from './pages/campers'
import Home from './pages/home'
import Reports from './pages/reports'
import AddCamper from './pages/addCamper'
import AddMedication from './pages/addMedication'
import MAR from './pages/mar'
import CamperProfile from './pages/camperProfile'
import EditCamper from './pages/editCamper'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/campers" element={<Campers />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/addCamper" element={<AddCamper />} />
                <Route path="/addMedication/:camperId" element={<AddMedication />} />
                <Route path="/mar" element={<MAR />} />
                <Route path="/campers/:id" element={<CamperProfile />} />
                <Route path="/editCamper/:id" element={<EditCamper />} />
            </Routes>
        </BrowserRouter>
    )
  
}

export default App
