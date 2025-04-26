import { useState } from 'react';
import '../App.css'; 
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


function InstructionsPage() {
  const [plantName, setPlantName] = useState('');
  const [instructions, setInstructions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [country, setCountry] = useState('Australia'); 

  const fetchInstructions = async () => {
    if (!plantName.trim()) {
      setError('Please enter a plant name.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setInstructions(null);

    try {
      const apiUrl = `http://localhost:3001/api/instructions/${encodeURIComponent(plantName.trim())}?country=${encodeURIComponent(country)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        let errorMsg = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorData.message || errorMsg;
        } catch (parseError) {
          console.log(parseError);
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();

      if (data.instructions ) {
        setInstructions(data.instructions);
      } else {
        setError('Received response but no instructions found.');
        setInstructions(null);
      }
    } catch (err) {
      console.error("Failed to fetch instructions:", err);
      setError(`Failed to fetch instructions: ${err.message}`);
      setInstructions(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setPlantName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchInstructions();
  };

  
    const onChangeCountry = (val) => {
        setCountry(val);
    };

  return (
    <div className="feature-section">
      <h2>Get Plant Instructions</h2>
      <div > <CountryDropdown className="country-selection" value={country} onChange={onChangeCountry}/>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={plantName}
          onChange={handleInputChange}
          placeholder="Enter plant name (e.g., tomato)"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Get Instructions'}
        </button>
      </form>

      {error && <p className="error-message">Error: {error}</p>}

      {instructions && (
        <div className="results-section">
          <h3>Instructions for {plantName}:</h3>
          <p >{instructions}</p>
        </div>
      )}
    </div>
  );
}

export default InstructionsPage;