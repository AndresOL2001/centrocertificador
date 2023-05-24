import './App.css'
import { Route, Routes } from 'react-router-dom'
import Inicio from './pages/Inicio/Inicio'
import Blog from './pages/blog/Blog'
import Login from './pages/auth/login/Login'
import Diplomados from './pages/diplomados/Diplomados'
import Diplomado from './pages/diplomado/Diplomado'
import Admin from './pages/auth/admin/Admin'
import Editar from './pages/auth/admin/Editar/Editar'
import Guardar from './pages/auth/admin/Guardar/Guardar'

function App() {

  return (
      <Routes>
        <Route path="/" element={ <Inicio/> } />
        <Route path="/diplomados" element={ <Diplomados/> } />
        <Route path="/blog" element={ <Blog/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/admin" element={ <Admin/> } />
        <Route path="/admin/editar/diplomado/:id" element={ <Editar/> } />
        <Route path="/admin/guardar" element={ <Guardar/> } />
        <Route path="/diplomados/diplomado/:id" element={ <Diplomado/> } />

      </Routes>
  )
}

export default App
