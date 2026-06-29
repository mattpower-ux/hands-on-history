import React, { useState } from 'react';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchMode, setSearchMode] = useState('text'); // Can toggle between 'text' or 'image'

  // This grid will display the scanned document covers [cite: 371]
  const pdfCovers = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', fontFamily: 'sans-serif' }}>
      <header>
        <h1>Hands on History</h1>
        <p>Explore our digital collection of historical documents and patterns.</p>
        
        {/* Search Query Box [cite: 371] */}
        <div style={{ marginBottom: '20px' }}>
          <input type="text" placeholder="Search..." style={{ padding: '10px', width: '300px' }} />
          <button style={{ padding: '10px' }}>Search</button>
          <button onClick={() => setSearchMode(searchMode === 'text' ? 'image' : 'text')}>
            Mode: {searchMode}
          </button>
        </div>
      </header>

      {/* Grid of PDF Covers [cite: 371] */}
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

      {/* Sidebar Overlay (floats over content) [cite: 377, 379, 383] */}
      {sidebarOpen && (
        <div 
          [cite_start]onClick={() => setSidebarOpen(false)} // Clicking outside dismisses the sidebar [cite: 385]
          style={{ 
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
            backgroundColor: 'rgba(0,0,0,0.3)' 
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} // Prevents closing when interacting inside
            style={{ 
              width: '300px', height: '100%', backgroundColor: 'white', 
              position: 'absolute', left: 0, borderRight: '2px solid black', padding: '20px' 
            }}
          >
            <h2>Table of Contents</h2>
            <ul>
              <li>Article 1</li>
              <li>Article 2</li>
            </ul>
            <button>Download Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
