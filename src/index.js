// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Usa 'react-dom/client' en lugar de 'react-dom'
import './styles/index.css';  // Importa los estilos globales
import App from './App';

// Crea el root para React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza el componente App en el root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
