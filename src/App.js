import React, { useState } from 'react';
import Header from './components/header';
import Wallet from './components/wallet';
import Marketplace from './components/catalogo_inmuebles';

function App() {
  const [currentView, setCurrentView] = useState('catalogo');

  return (
    <>
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      {currentView === 'catalogo' ? <Marketplace /> : <Wallet />}
    </>
  );
}

export default App;