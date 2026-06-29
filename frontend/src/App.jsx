import React, { useState } from 'react';

// PatternScalingCalculator component definition
const PatternScalingCalculator = () => {
  const [measurement, setMeasurement] = useState('');
  const [measurementType, setMeasurementType] = useState('shoe');
  const [result, setResult] = useState(null);

  const calculateScaling = () => {
    const scaleFactor = measurementType === 'shoe' ? 1.5 : 2.0; 
    const scaledValue = measurement * scaleFactor;
    
    // Calculate pages for 8.5 x 11 tiling
    const pagesNeeded = Math.ceil((scaledValue * 1.2) / 8.5) * Math.ceil((scaledValue * 1.2) / 11);
    
    setResult({
      scaledSize: scaledValue.toFixed(2),
      pages: pagesNeeded
    });
  };

  return (
    <div style={{ padding: '15px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h3>Pattern Scaling Tool</h3>
      <select onChange={(e) => setMeasurementType(e.target.value)} value={measurementType}>
        <option value="shoe">Shoe Size</option>
        <option value="chest">Chest Size</option>
      </select>
      <input 
        type="number" 
        placeholder="Enter measurement" 
        value={measurement}
        onChange={(e) => setMeasurement(e.target.value)}
        style={{ display: 'block', margin: '10px 0', width: '90%' }}
      />
      <button onClick={calculateScaling}>Calculate & Preview</button>

      {result && (
        <div style={{ marginTop: '15px' }}>
          <p><strong>Scaled Dimensions:</strong> {result.scaledSize} units</p>
          <p><strong>Pages for Printing:</strong> {result.pages}</p>
          <button>Print with Alignment Marks</button>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchMode, setSearchMode] = useState('text');

  const pdfCovers = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', fontFamily: 'sans-serif' }}>
      <header>
        <h1>Hands on History</h1>
        <p>Explore our digital collection of historical documents and patterns.</p>
        
        <div style={{ marginBottom: '20px' }}>
          <input type="text" placeholder="Search..." style={{ padding: '10px', width: '300px' }} />
          <button style={{ padding: '10px' }}>Search</button>
          <button onClick={() => setSearchMode(searchMode === 'text' ? 'image' : 'text')}>
            Mode: {searchMode}
          </button>
        </div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {pdfCovers.map((item) => (
          <div 
            key={item} 
            onClick={() => setSidebarOpen(true)}
            style={{ 
              border: '2px solid black', 
              height: '300px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer' 
            }}
          >
            PDF Cover {item}
          </div>
        ))}
      </main>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          style={{ 
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
            backgroundColor: 'rgba(0,0,0,0.3)' 
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              width: '350px', height: '100%', backgroundColor: 'white', 
              position: 'absolute', left: 0, borderRight: '2px solid black', padding: '20px' 
            }}
          >
            <h2>Table of Contents</h2>
            <ul>
              <li>Article 1</li>
              <li>Article 2</li>
            </ul>
            <button>Download Now</button>
            
            {/* Pattern Scaling Calculator Imported Here */}
            <PatternScalingCalculator />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
