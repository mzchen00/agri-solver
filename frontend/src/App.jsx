import { Outlet } from 'react-router-dom'; 
import agriSolverLogo from './assets/agrisolver-logo.jpg';
import Header from './components/Header.jsx'; 
import './App.css';

function App() {
  return (
    <>
      <img src={agriSolverLogo} alt="AgriSolver Logo" className="app-logo" />
      <Header />

      <h1>AgriSolver</h1>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2025 AgriSolver. All rights reserved.</p>
      </footer> 
    </>
  );
}

export default App;
