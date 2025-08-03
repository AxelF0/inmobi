import React, { useState } from "react";
import Header from "./components/header";
import LandingPage from "./components/landing_page";
import Wallet from "./components/wallet";
import Marketplace from "./components/catalogo_inmuebles";
import PropertyDetails from "./components/property_details";
import MercadoP2P from "./components/mercado_p2p";

function App() {
  const [currentView, setCurrentView] = useState("landing");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setCurrentView("propertyDetails");
  };

  const handleBackToCatalog = () => {
    setSelectedProperty(null);
    setCurrentView("catalogo");
  };

  const handleStartInvesting = () => {
    setCurrentView("catalogo");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "landing":
        return (
          <LandingPage
            onStartInvesting={handleStartInvesting}
            setCurrentView={setCurrentView}
          />
        );
      case "catalogo":
        return <Marketplace onPropertySelect={handlePropertySelect} />;
      case "propertyDetails":
        return (
          <PropertyDetails
            property={selectedProperty}
            onBack={handleBackToCatalog}
          />
        );
      case "wallet":
        return <Wallet />;
      default:
        return <LandingPage onStartInvesting={handleStartInvesting} />;
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
