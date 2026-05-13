import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Campers from './pages/campers'
import Home from './pages/home'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Campers />} />
            </Routes>
        </BrowserRouter>
    )
  
}

export default App
