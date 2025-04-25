import { Link } from 'react-router-dom';
import './Header.css'; // We'll create this CSS file next
import logo from '../assets/header-logo.jpeg';

function Header() {
  return (
    <header className="app-header">
      <div> 
      <img src={logo} alt="AgriSolver Logo" /> 
      <nav>
        <ul>
          <li><Link to="/">Instructions</Link></li>
          <li><Link to="/history">Australian Agricultural Facts</Link></li>
        </ul>
      </nav>
      </div>
    </header>
  );
}

export default Header;