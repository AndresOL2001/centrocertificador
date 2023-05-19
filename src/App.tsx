import './App.css'
import { Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio/Inicio'
import OfertaEducativa from './pages/ofertaEducativa/OfertaEducativa'
import Blog from './pages/blog/Blog'
import Login from './pages/auth/login/Login'

function App() {

  return (
      <Routes>
        <Route path="/" element={ <Inicio/> } />
        <Route path="/diplomados" element={ <OfertaEducativa/> } />
        <Route path="/blog" element={ <Blog/> } />
        <Route path="/login" element={ <Login/> } />

      </Routes>
  )
}

export default App
