import React, { useState } from 'react';
import Header from './components/header';
import Wallet from './components/wallet';
import Marketplace from './components/catalogo_inmuebles';
import PropertyDetails from './components/property_details';

function App() {
  const [currentView, setCurrentView] = useState('catalogo');
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setCurrentView('propertyDetails');
  };

  const handleBackToCatalog = () => {
    setSelectedProperty(null);
    setCurrentView('catalogo');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'catalogo':
        return <Marketplace onPropertySelect={handlePropertySelect} />;
      case 'propertyDetails':
        return (
          <PropertyDetails 
            property={selectedProperty} 
            onBack={handleBackToCatalog}
          />
        );
      case 'wallet':
        return <Wallet />;
      default:
        return <Marketplace onPropertySelect={handlePropertySelect} />;
    }
  };

  return (
    <>
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      {renderCurrentView()}
    </>
  );
}

export default App;