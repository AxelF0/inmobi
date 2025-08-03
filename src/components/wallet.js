import React, { useState, useEffect } from 'react';
import '../styles/wallet.css';

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
    {
      id: '#123456',
      name: 'Propiedad 1',
      img: 'https://via.placeholder.com/56',
      porcentaje: '12%',
      usd: 0.0,
      accion: 'tota de accion',
    },
    {
      id: '#234567',
      name: 'Propiedad 2',
      img: 'https://via.placeholder.com/56',
      porcentaje: '8%',
      usd: 0.0,
      accion: 'tota de accion',
    },
    {
      id: '#345678',
      name: 'Propiedad 3',
      img: 'https://via.placeholder.com/56',
      porcentaje: '5%',
      usd: 0.0,
      accion: 'tota de accion',
    },
  ];
  const properties = [
    {
      id: '#123456',
      name: 'Propiedad 1',
      date: '01/01/2025',
      price: '$2000',
      type: 'Compra',
      status: 'Completado',
    },
    {
      id: '#234567',
      name: 'Propiedad 2',
      date: '02/02/2025',
      price: '$1500',
      type: 'Venta',
      status: 'En proceso',
    },
    {
      id: '#345678',
      name: 'Propiedad 3',
      date: '03/03/2025',
      price: '$2500',
      type: 'Compra',
      status: 'Cancelado',
    },
  ];

  return (
    <div className="wallet-mockup-container">
      <div className="wallet-balance-card">
        {!account ? (
          <button
            className="wallet-connect-btn"
            onClick={connectWallet}
            disabled={isConnecting}
          >
            {isConnecting ? 'Conectando...' : 'Connect Wallet'}
          </button>
        ) : (
          <>
            <div className="wallet-balance-amount">${balance.toFixed(2)}USD</div>
            <div className="wallet-balance-address">{formatAccount(account)}</div>
          </>
        )}
      </div>

      {account && (
        <>
          <div className="wallet-tabs-row">
            <div
              className={`wallet-tab-btn${activeTab === 'tokens' ? ' active' : ''}`}
              onClick={() => setActiveTab('tokens')}
            >
              Tokens
            </div>
            <div
              className={`wallet-tab-btn${activeTab === 'activity' ? ' active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Actividad
            </div>
          </div>

          <div className="wallet-table-container">
            {activeTab === 'tokens' ? (
              <div>
                {tokens.map((token) => (
                  <div className="wallet-token-row" key={token.id}>
                    <div className="wallet-token-left">
                      <span className="wallet-avatar">
                        <img
                          src={token.img}
                          alt="Propiedad"
                          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                        />
                      </span>
                      <div>
                        <div className="wallet-token-name">{token.name}</div>
                        <div className="wallet-token-porcentaje">{token.porcentaje} porcentaje de ganancia</div>
                      </div>
                    </div>
                    <div className="wallet-token-right">
                      <div className="wallet-token-usd">USD {token.usd.toFixed(2)}</div>
                      <div className="wallet-token-accion">{token.accion}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="wallet-table-header">
                  <span className="wallet-table-col propiedad">Propiedad</span>
                  <span className="wallet-table-col precio">Precio</span>
                  <span className="wallet-table-col tipo">Tipo transacción</span>
                  <span className="wallet-table-col estado">Estado</span>
                </div>
                {properties.map((prop, idx) => (
                  <div className="wallet-table-row" key={prop.id}>
                    <span className="wallet-table-col propiedad">
                      <span className="wallet-avatar">
                        <img
                          src="https://via.placeholder.com/56"
                          alt="Propiedad"
                          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                        />
                      </span>
                      <span>
                        {prop.name}
                        <div className="wallet-table-sub">
                          {prop.id}
                          <br />
                          <span className="wallet-table-date">{prop.date}</span>
                        </div>
                      </span>
                    </span>
                    <span className="wallet-table-col precio">{prop.price}</span>
                    <span className="wallet-table-col tipo">{prop.type}</span>
                    <span className="wallet-table-col estado">{prop.status}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Wallet;