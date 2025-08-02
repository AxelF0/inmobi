import React from 'react';
import '../styles/header.css';

const Header = ({ currentView, setCurrentView }) => (
  <header className="main-header">
    <div className="main-header-title">InmobiChain</div>
    <nav className="main-header-nav">
      <button
        className={`main-header-btn${currentView === 'catalogo' ? ' active' : ''}`}
        onClick={() => setCurrentView('catalogo')}
      >
        Catálogo
      </button>
      <button
        className={`main-header-btn${currentView === 'wallet' ? ' active' : ''}`}
        onClick={() => setCurrentView('wallet')}
      >
        Wallet
      </button>
    </nav>
  </header>
);

export default Header;