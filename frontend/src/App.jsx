// Remove useState, useEffect, fetch logic etc. if they are fully moved to pages
import { Outlet } from 'react-router-dom'; // Import Outlet
import agriSolverLogo from './assets/agrisolver-logo.jpg';
import Header from './components/Header.jsx'; // Import the Header
import './App.css';

function App() {
  // No more state management here for features, it's moved to pages

  return (
    <>
      {/* Keep the main logo */}
      <img src={agriSolverLogo} alt="AgriSolver Logo" className="app-logo" />
      <Header />

      <h1>AgriSolver</h1>
      <p>Your Smart Farming Assistant</p>

      {/* Outlet renders the matched child route component (InstructionsPage, DiagnosePage, etc.) */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
