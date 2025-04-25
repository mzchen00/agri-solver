import { useState } from 'react';
import '../App.css';

function DiagnosePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setDiagnosisResult(null);
    setError(null);
  };

  const handleDiagnose = async () => {
    if (!selectedFile) {
      setError('Please select an image file first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setDiagnosisResult(null);

    setTimeout(() => {
       setDiagnosisResult(`Diagnosis result for ${selectedFile.name} would appear here.`);
       setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="feature-section">
      <h2>Diagnose Plant</h2>
      <p>Upload an image of your plant to check for issues.</p>
      <input type="file" onChange={handleFileChange} accept="image/*" disabled={isLoading} />
      <button onClick={handleDiagnose} disabled={isLoading || !selectedFile}>
        {isLoading ? 'Diagnosing...' : 'Diagnose'}
      </button>

      {error && <p className="error-message">Error: {error}</p>}

      {diagnosisResult && (
        <div className="results-section">
          <h3>Diagnosis Result:</h3>
          <p>{diagnosisResult}</p>
        </div>
      )}
    </div>
  );
}

export default DiagnosePage;