import '../App.css';
import blueberryPdf from '../assets/australia-blueberry.pdf';

function HistoryPage() {
  return (
    <div className="feature-section">
      <h2>Australian Agricultural Facts</h2>
      <p>Learn more about Australian agriculture through our resources:</p>
      <div className="resource-links">
        <a 
          href={blueberryPdf} 
          target="_blank" 
          rel="noopener noreferrer"
          className="pdf-link"
        >
          Australian Blueberry Growing History (PDF)
        </a>
      </div>
    </div>
  );
}

export default HistoryPage;