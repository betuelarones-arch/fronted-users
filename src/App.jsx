import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useUsuarios } from './hooks/useUsuarios';
import Dashboard from './pages/Dashboard';
import ListaUsuarios from './pages/ListaUsuarios';
import './App.css';

function App() {
  const { usuarios, cargando } = useUsuarios();

  if (cargando) return <div className="loading">Cargando Sistema...</div>;

  return (
    <Router>
      <div className="app-layout">
        {/* Sidebar Lateral */}
        <nav className="sidebar">
          <div className="logo">ELITE Admin</div>
          <Link to="/" className="nav-link">🏠 Dashboard</Link>
          <Link to="/usuarios" className="nav-link">👥 Usuarios</Link>
        </nav>

        {/* Contenido Principal */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard usuarios={usuarios} />} />
            <Route path="/usuarios" element={<ListaUsuarios />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;