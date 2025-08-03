// property_details.js (con Font Awesome)
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faHome,
    faBed,
    faBath,
    faCar,
    faRulerCombined
} from '@fortawesome/free-solid-svg-icons';
import '../styles/property_details.css';

const PropertyDetails = ({ property, onBack }) => {
    const propertyDetails = {
        ...property,
        descripcion: "Esta hermosa casa ofrece un diseño moderno y funcional, perfecta para familias que buscan comodidad y estilo. Ubicada en una zona residencial tranquila con excelente conectividad.",
        objetivoRecaudado: {
            objetivo: "$80,000",
            recaudado: "$65,000",
            porcentaje: 81
        },
        tokenInfo: {
            cantidadDisponible: 1000,
            precioUnitario: property.precioToken,
            totalInversion: "$100,000"
        },
        caracteristicas: [
            "Garaje para 2 vehículos",
            "Jardín amplio",
            "Cocina equipada",
            "Terraza",
            "Sistema de seguridad",
            "Cerca de colegios"
        ],
        datosLegales: {
            estado: "Escriturado",
            impuestos: "Al día",
            zonificacion: "Residencial"
        },
        imagenes: [
            property.img,
            "https://via.placeholder.com/800x400/e1e1e1/333?text=Sala",
            "https://via.placeholder.com/800x400/e1e1e1/333?text=Cocina",
            "https://via.placeholder.com/800x400/e1e1e1/333?text=Habitación",
            "https://via.placeholder.com/800x400/e1e1e1/333?text=Jardín"
        ]
    };

    return (
        <div className="property-details-container">
            <div className="property-details-header">
                <button className="back-button" onClick={onBack}>
                    <FontAwesomeIcon icon={faArrowLeft} /> Volver al catálogo
                </button>
            </div>

            <div className="property-details-content">
                <div className="property-main-info">
                    <div className="property-gallery">
                        <div className="main-image">
                            <img src={propertyDetails.imagenes[0]} alt="Imagen principal" />
                        </div>
                        <div className="thumbnail-gallery">
                            {propertyDetails.imagenes.slice(1).map((img, index) => (
                                <div key={index} className="thumbnail-item">
                                    <img src={img} alt={`Vista ${index + 2}`} />
                                </div>
                            ))}
                            <div className="more-photos">
                                <span>+</span>
                            </div>
                        </div>
                    </div>

                    <div className="property-basic-info">
                        <span className="property-type-badge">{property.type}</span>
                        <h1 className="property-title">{property.title}</h1>
                        <p className="property-location">{property.ubicacion}</p>

                        <div className="property-features">
                            <div className="feature-item">
                                <span className="feature-icon"><FontAwesomeIcon icon={faBed} /></span>
                                <div>
                                    <span className="feature-label">Habitaciones</span>
                                    <span className="feature-value">{property.habitaciones}</span>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon"><FontAwesomeIcon icon={faBath} /></span>
                                <div>
                                    <span className="feature-label">Baños</span>
                                    <span className="feature-value">{property.banos}</span>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon"><FontAwesomeIcon icon={faCar} /></span>
                                <div>
                                    <span className="feature-label">Garaje</span>
                                    <span className="feature-value">2</span>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon"><FontAwesomeIcon icon={faRulerCombined} /></span>
                                <div>
                                    <span className="feature-label">Tamaño</span>
                                    <span className="feature-value">{property.tamano}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="legal-data">
                        <h3>Datos legales</h3>
                        <div className="legal-items">
                            <div className="legal-item">
                                <span>Estado:</span>
                                <span>{propertyDetails.datosLegales.estado}</span>
                            </div>
                            <div className="legal-item">
                                <span>Impuestos:</span>
                                <span>{propertyDetails.datosLegales.impuestos}</span>
                            </div>
                            <div className="legal-item">
                                <span>Zonificación:</span>
                                <span>{propertyDetails.datosLegales.zonificacion}</span>
                            </div>
                        </div>
                    </div>

                    <div className="property-description">
                        <h3>Descripción</h3>
                        <p>{propertyDetails.descripcion}</p>

                        <h4>Características adicionales:</h4>
                        <ul className="characteristics-list">
                            {propertyDetails.caracteristicas.map((caracteristica, index) => (
                                <li key={index}>{caracteristica}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="investment-panel">
                    <div className="investment-card">
                        <h2>Recaudado - objetivo</h2>

                        <div className="progress-section">
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${propertyDetails.objetivoRecaudado.porcentaje}%` }}
                                ></div>
                            </div>
                            <div className="progress-labels">
                                <span>{propertyDetails.objetivoRecaudado.recaudado}</span>
                                <span>{propertyDetails.objetivoRecaudado.objetivo}</span>
                            </div>
                        </div>

                        <h2>Precio token</h2>
                        <div className="token-price-section">
                            <div className="price-display">
                                <span className="price-value">{property.precioToken}</span>
                                <span className="gain-percentage">% de ganancia</span>
                            </div>
                            <div className="gain-value">{property.ganancia}</div>
                        </div>

                        <div className="purchase-form">
                            <div className="input-group">
                                <label>Cantidad de token</label>
                                <input
                                    type="number"
                                    placeholder="100"
                                    min="1"
                                    max={propertyDetails.tokenInfo.cantidadDisponible}
                                />
                            </div>

                            <div className="input-group">
                                <label>Total a pagar</label>
                                <input
                                    type="text"
                                    placeholder="$10,000"
                                    readOnly
                                />
                            </div>

                            <button className="buy-now-btn">
                                Comprar Ahora
                            </button>
                        </div>

                        <div className="token-info">
                            <div className="info-item">
                                <span>Tokens disponibles:</span>
                                <span>{propertyDetails.tokenInfo.cantidadDisponible.toLocaleString()}</span>
                            </div>
                            <div className="info-item">
                                <span>Inversión total:</span>
                                <span>{propertyDetails.tokenInfo.totalInversion}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
