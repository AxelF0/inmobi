// wallet.js (con diseño y colores mejorados)
import React, { useState, useEffect } from 'react';
import '../styles/wallet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faCoins, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('tokens');
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0.0);
  const [isConnecting, setIsConnecting] = useState(false);

  const formatAccount = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const fetchBalance = async (address) => {
    setBalance(0.00);
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          await fetchBalance(accounts[0]);
        }
      }
    };
    checkConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          fetchBalance(accounts[0]);
        } else {
          setAccount(null);
          setBalance(0.0);
        }
      });
    }

    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        await fetchBalance(accounts[0]);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      alert('Please install a wallet extension like MetaMask');
    }
    setIsConnecting(false);
  };

  const tokens = [
    { id: '#123456', name: 'Propiedad 1', img: 'https://via.placeholder.com/56', porcentaje: '12%', usd: 0.0, accion: 'tota de accion' },
    { id: '#234567', name: 'Propiedad 2', img: 'https://via.placeholder.com/56', porcentaje: '8%', usd: 0.0, accion: 'tota de accion' },
    { id: '#345678', name: 'Propiedad 3', img: 'https://via.placeholder.com/56', porcentaje: '5%', usd: 0.0, accion: 'tota de accion' },
  ];

  const properties = [
    { id: '#123456', name: 'Propiedad 1', date: '01/01/2025', price: '$2000', type: 'Compra', status: 'Completado' },
    { id: '#234567', name: 'Propiedad 2', date: '02/02/2025', price: '$1500', type: 'Venta', status: 'En proceso' },
    { id: '#345678', name: 'Propiedad 3', date: '03/03/2025', price: '$2500', type: 'Compra', status: 'Cancelado' },
  ];

  return (
    <div className="wallet-container">
      <div className="wallet-header">
        <h1 className="wallet-title"><FontAwesomeIcon icon={faWallet} /> Mi Billetera</h1>
        <p className="wallet-subtitle">Administra tus tokens de inversión de forma segura</p>
      </div>

      {!account ? (
        <div className="wallet-connect-section">
          <div className="connect-card">
            <div className="connect-icon">
              <FontAwesomeIcon icon={faWallet} size="3x" color="#144b28" />
            </div>
            <h2>Conecta tu Wallet</h2>
            <p>Para visualizar tus inversiones y realizar transacciones, por favor conecta tu wallet compatible con Ethereum como MetaMask.</p>
            <button className="wallet-connect-btn" onClick={connectWallet} disabled={isConnecting}>
              {isConnecting ? 'Conectando...' : 'Conectar Wallet'}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="wallet-balance-section">
            <div className="balance-card">
              <div className="balance-header">
                <div className="balance-info">
                  <span className="balance-label">Saldo total</span>
                  <span className="balance-amount">${balance.toFixed(2)} USD</span>
                  <span className="balance-change positive">+0.00% hoy</span>
                </div>
                <div className="wallet-info">
                  <div className="wallet-address">{formatAccount(account)}</div>
                  <div className="wallet-status">Conectado</div>
                </div>
              </div>
            </div>
          </div>

          <div className="wallet-tabs">
            <button className={`tab-btn ${activeTab === 'tokens' ? 'active' : ''}`} onClick={() => setActiveTab('tokens')}>
              <FontAwesomeIcon icon={faCoins} /> Tokens
            </button>
            <button className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>
              <FontAwesomeIcon icon={faExchangeAlt} /> Actividad
            </button>
          </div>

          <div className="wallet-content">
            {activeTab === 'tokens' ? (
              <>
                <div className="section-header">
                  <h3>Tus Propiedades Tokenizadas</h3>
                  <span className="token-count">{tokens.length} activos</span>
                </div>

                <div className="tokens-grid">
                  {tokens.map((token) => (
                    <div className="token-card" key={token.id}>
                      <div className="token-image">
                        <img src={token.img} alt="Propiedad" />
                      </div>
                      <div className="token-header">
                        <h4 className="token-name">{token.name}</h4>
                        <span className="token-location">ID: {token.id}</span>
                      </div>
                      <div className="token-stats">
                        <div className="stat-item">
                          <span className="stat-label">Ganancia</span>
                          <span className="stat-value positive">{token.porcentaje}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Valor estimado</span>
                          <span className="stat-value">${token.usd.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="token-actions">
                        <button className="btn-primary">Ver Detalles</button>
                        <button className="btn-secondary">Transferir</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="section-header">
                  <h3>Historial de Transacciones</h3>
                  <span className="activity-count">{properties.length} movimientos</span>
                </div>

                <div className="transactions-list">
                  {properties.map((prop) => (
                    <div className="transaction-card" key={prop.id}>
                      <div className="transaction-left">
                        <div className="transaction-icon">
                          <img src="https://via.placeholder.com/40" alt="Propiedad" style={{ borderRadius: '8px' }} />
                        </div>
                        <div className="transaction-details">
                          <div className="transaction-title">{prop.name}</div>
                          <div className="transaction-id">ID: {prop.id}</div>
                          <div className="transaction-date">{prop.date}</div>
                        </div>
                      </div>
                      <div className="transaction-right">
                        <div className="transaction-amount">
                          <span className="amount-price">{prop.price}</span>
                          <span className="amount-tokens">≈ {parseFloat(prop.price.replace('$', '') / 100).toFixed(0)} tokens</span>
                        </div>
                        <div className="transaction-meta">
                          <span className="transaction-type">{prop.type}</span>
                          <span className="transaction-status">{prop.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Wallet;
