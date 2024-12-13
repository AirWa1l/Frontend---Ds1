import React from 'react';
import './NoResults.css'; // Estilo 

const noResults = () => {
  return (
    <div className="no-results-fixed">
    <div className="no-results-container">
      <p className="no-results-message">No se encontró ningún producto que coincida con tu búsqueda.</p>
      <div className="no-results-box"></div>
    </div>
  </div>
  );
};

export default noResults;