import './App.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './pages/Inicio/Inicio'
import Blog from './pages/blog/Blog'
import Login from './pages/auth/login/Login'
import Diplomados from './pages/diplomados/Diplomados'
import Diplomado from './pages/diplomado/Diplomado'
import Admin from './pages/auth/admin/Admin'
import Editar from './pages/auth/admin/Editar/Editar'
import Guardar from './pages/auth/admin/Guardar/Guardar'
import { ProtectRoutes } from './components/Guards/ProtectedRoute'
import GuardarBlog from './pages/auth/blog/Guardar/GuardarBlog';
import MetadataBlog from './pages/blog/metadatablog/MetadataBlog';
import EditarBlog from './pages/auth/blog/Editar/EditarBlog';
import Testimonio from './pages/testimonios/Testimonio';
import Layout from './Layout';

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/diplomados" element={<Diplomados />} />
          <Route path="/diplomados/diplomado/:id" element={<Diplomado />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<MetadataBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/testimoniales" element={<Testimonio />} />

          <Route element={<ProtectRoutes />}>
            <Route path="/admin/editar/diplomado/:id" element={<Editar />} />
            <Route path="/admin/guardar" element={<Guardar />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/blog/guardar' element={<GuardarBlog />} />
            <Route path='/admin/blog/editar/:id' element={<EditarBlog />} />

          </Route>
        </Routes>
        </Layout>
    </Router>
  )
}

export default App;
