import ListaUsuarios from './pages/ListaUsuarios';
import './App.css'; 

function App() {
  return (
    <div className="dashboard-wrapper"> 
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Sistema de Gestión</h1>
            <p className="dashboard-subtitle">Panel Administrativo Elite</p>
          </div>
        </header>
        
        <hr className="divider" />
        
        <main>
          <ListaUsuarios />
        </main>
      </div>
    </div>
  );
}

export default App;