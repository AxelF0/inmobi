import React, { useState } from 'react';
import '../styles/mercado_p2p.css';

// Datos simulados de ofertas en el mercado
const ofertas = [
    {
        id: 1,
        vendedor: "Usuario123",
        propiedad: "Casa Residencial - Zona Norte",
        cantidadTokens: 250,
        precioUnitario: 105,
        precioTotal: 26250,
        fechaPublicacion: "2025-01-25",
        verificado: true,
        imagenPropiedad: "https://via.placeholder.com/80x60/e1e1e1/333?text=Casa"
    },
    {
        id: 2,
        vendedor: "InversionPro",
        propiedad: "Departamento Centro",
        cantidadTokens: 100,
        precioUnitario: 95,
        precioTotal: 9500,
        fechaPublicacion: "2025-01-24",
        verificado: true,
        imagenPropiedad: "https://via.placeholder.com/80x60/e1e1e1/333?text=Depto"
    },
    {
        id: 3,
        vendedor: "TokenTrader",
        propiedad: "Casa Moderna - Zona Sur",
        cantidadTokens: 500,
        precioUnitario: 120,
        precioTotal: 60000,
        fechaPublicacion: "2025-01-23",
        verificado: true,
        imagenPropiedad: "https://via.placeholder.com/80x60/e1e1e1/333?text=Casa"
    },
    {
        id: 4,
        vendedor: "RealEstateInv",
        propiedad: "Oficina Comercial",
        cantidadTokens: 75,
        precioUnitario: 150,
        precioTotal: 11250,
        fechaPublicacion: "2025-01-22",
        verificado: false,
        imagenPropiedad: "https://via.placeholder.com/80x60/e1e1e1/333?text=Oficina"
    },
    {
        id: 5,
        vendedor: "CryptoRealty",
        propiedad: "Casa Familiar - Suburbios",
        cantidadTokens: 300,
        precioUnitario: 88,
        precioTotal: 26400,
        fechaPublicacion: "2025-01-21",
        verificado: true,
        imagenPropiedad: "https://via.placeholder.com/80x60/e1e1e1/333?text=Casa"
    }
];

const MercadoP2P = () => {
    const [activeTab, setActiveTab] = useState('comprar');
    const [filtroVerificados, setFiltroVerificados] = useState(false);
    const [ordenPor, setOrdenPor] = useState('fecha');
    
    // Estados para el formulario de venta
    const [formVenta, setFormVenta] = useState({
        propiedad: '',
        cantidadTokens: '',
        precioUnitario: '',
        descripcion: ''
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormVenta(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitVenta = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para publicar la oferta
        alert('Oferta publicada exitosamente! Se enviará para verificación.');
        setFormVenta({
            propiedad: '',
            cantidadTokens: '',
            precioUnitario: '',
            descripcion: ''
        });
    };

    const calcularTotal = () => {
        const cantidad = parseFloat(formVenta.cantidadTokens) || 0;
        const precio = parseFloat(formVenta.precioUnitario) || 0;
        return (cantidad * precio).toFixed(2);
    };

    // Filtrar y ordenar ofertas
    const ofertasFiltradas = ofertas
        .filter(oferta => !filtroVerificados || oferta.verificado)
        .sort((a, b) => {
            switch (ordenPor) {
                case 'precio':
                    return a.precioUnitario - b.precioUnitario;
                case 'cantidad':
                    return b.cantidadTokens - a.cantidadTokens;
                case 'fecha':
                default:
                    return new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion);
            }
        });

    return (
        <div className="mercado-p2p-container">
            <div className="mercado-p2p-header">
                <h1>Mercado Secundario P2P</h1>
                <p>Intercambia tokens de propiedades inmobiliarias con otros usuarios verificados</p>
            </div>

            {/* Advertencia de Seguridad */}
            <div className="security-warning">
                <div className="warning-icon">🛡️</div>
                <div className="warning-content">
                    <h3>Proceso de Verificación KYC/AML</h3>
                    <p>Todas las transacciones están sujetas a verificación de identidad. Solo usuarios con KYC/AML completo pueden participar en el mercado P2P para garantizar la seguridad y cumplimiento normativo.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="mercado-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'comprar' ? 'active' : ''}`}
                    onClick={() => setActiveTab('comprar')}
                >
                    🛒 Comprar Tokens
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'vender' ? 'active' : ''}`}
                    onClick={() => setActiveTab('vender')}
                >
                    💰 Vender Tokens
                </button>
            </div>

            {/* Vista de Comprar */}
            {activeTab === 'comprar' && (
                <div className="comprar-section">
                    {/* Filtros */}
                    <div className="filtros-section">
                        <div className="filtros-row">
                            <div className="filtro-item">
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={filtroVerificados}
                                        onChange={(e) => setFiltroVerificados(e.target.checked)}
                                    />
                                    Solo usuarios verificados
                                </label>
                            </div>
                            <div className="filtro-item">
                                <select 
                                    value={ordenPor} 
                                    onChange={(e) => setOrdenPor(e.target.value)}
                                >
                                    <option value="fecha">Más recientes</option>
                                    <option value="precio">Menor precio</option>
                                    <option value="cantidad">Mayor cantidad</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Lista de Ofertas */}
                    <div className="ofertas-grid">
                        {ofertasFiltradas.map((oferta) => (
                            <div key={oferta.id} className="oferta-card">
                                <div className="oferta-header">
                                    <div className="vendedor-info">
                                        <span className="vendedor-nombre">{oferta.vendedor}</span>
                                        {oferta.verificado && (
                                            <span className="verificado-badge">✓ Verificado</span>
                                        )}
                                    </div>
                                    <span className="fecha-publicacion">
                                        {new Date(oferta.fechaPublicacion).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="oferta-content">
                                    <div className="propiedad-info">
                                        <img 
                                            src={oferta.imagenPropiedad} 
                                            alt="Propiedad" 
                                            className="propiedad-imagen"
                                        />
                                        <div className="propiedad-detalles">
                                            <h4>{oferta.propiedad}</h4>
                                            <div className="tokens-info">
                                                <span className="cantidad-tokens">
                                                    {oferta.cantidadTokens.toLocaleString()} tokens
                                                </span>
                                                <span className="precio-unitario">
                                                    ${oferta.precioUnitario} c/u
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="precio-total">
                                        <span className="precio-label">Total:</span>
                                        <span className="precio-valor">
                                            ${oferta.precioTotal.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="oferta-actions">
                                    <button className="btn-comprar">
                                        Comprar Tokens
                                    </button>
                                    <button className="btn-contactar">
                                        Contactar Vendedor
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Vista de Vender */}
            {activeTab === 'vender' && (
                <div className="vender-section">
                    <div className="vender-header">
                        <h2>Publica tu oferta de venta</h2>
                        <p>Completa el formulario para ofrecer tus tokens en el mercado</p>
                    </div>

                    <form className="form-venta" onSubmit={handleSubmitVenta}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Propiedad</label>
                                <select 
                                    name="propiedad" 
                                    value={formVenta.propiedad}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <option value="">Selecciona una propiedad</option>
                                    <option value="casa-norte">Casa Residencial - Zona Norte</option>
                                    <option value="depto-centro">Departamento Centro</option>
                                    <option value="casa-sur">Casa Moderna - Zona Sur</option>
                                    <option value="oficina">Oficina Comercial</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Cantidad de Tokens</label>
                                <input 
                                    type="number"
                                    name="cantidadTokens"
                                    value={formVenta.cantidadTokens}
                                    onChange={handleFormChange}
                                    placeholder="100"
                                    min="1"
                                    required
                                />
                                <small>Tokens disponibles: 500</small>
                            </div>

                            <div className="form-group">
                                <label>Precio por Token ($)</label>
                                <input 
                                    type="number"
                                    name="precioUnitario"
                                    value={formVenta.precioUnitario}
                                    onChange={handleFormChange}
                                    placeholder="95.00"
                                    step="0.01"
                                    min="0.01"
                                    required
                                />
                                <small>Precio de mercado: $100</small>
                            </div>

                            <div className="form-group total-group">
                                <label>Total a Recibir</label>
                                <div className="total-display">
                                    ${calcularTotal()}
                                </div>
                            </div>
                        </div>

                        <div className="form-group descripcion-group">
                            <label>Descripción (Opcional)</label>
                            <textarea 
                                name="descripcion"
                                value={formVenta.descripcion}
                                onChange={handleFormChange}
                                placeholder="Agrega detalles sobre tu oferta..."
                                rows="4"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-publicar">
                                Publicar Oferta
                            </button>
                            <button type="button" className="btn-preview">
                                Vista Previa
                            </button>
                        </div>
                    </form>

                    {/* Información adicional */}
                    <div className="info-venta">
                        <h3>Información importante:</h3>
                        <ul>
                            <li>Las ofertas están sujetas a revisión y verificación</li>
                            <li>Se cobrará una comisión del 2% por transacción completada</li>
                            <li>Los fondos se liberan una vez confirmada la transacción</li>
                            <li>Puedes cancelar tu oferta en cualquier momento</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MercadoP2P;