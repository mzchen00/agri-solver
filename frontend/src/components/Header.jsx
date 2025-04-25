import { Link } from 'react-router-dom';
import './Header.css'; // We'll create this CSS file next

function Header() {
  return (
    <header className="app-header">
      <nav>
        <ul>
          <li><Link to="/">Instructions</Link></li>
          <li><Link to="/diagnose">Diagnose</Link></li>
          <li><Link to="/history">History</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;