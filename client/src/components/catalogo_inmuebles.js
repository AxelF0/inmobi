// catalogo_inmuebles.js
import React from "react";
import "../styles/catalogo_inmuebles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBed,
  faBath,
  faRulerCombined,
} from "@fortawesome/free-solid-svg-icons";

const properties = [
  {
    id: 1,
    type: "Venta",
    status: "En recaudación",
    title: "Casa",
    ubicacion: "Ubicación",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6W2DC9G2sys4wgT4EKJ1a8WFDQ4Yyu10zqWDxWL6zIC1dCpWD",
    tamano: "120m²",
    habitaciones: 3,
    banos: 2,
    precioToken: "$100",
    ganancia: "8%",
  },
  {
    id: 2,
    type: "Venta",
    status: "En recaudación",
    title: "Casa",
    ubicacion: "Ubicación",
    img: "https://cdn6.ultracasas.com/dyn/yastaimages/85eb328d173465025e80a1ac43800177032461",
    tamano: "140m²",
    habitaciones: 4,
    banos: 3,
    precioToken: "$120",
    ganancia: "10%",
  },
  {
    id: 3,
    type: "Venta",
    status: "En construcción",
    title: "Casa",
    ubicacion: "Ubicación",
    img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT09LZuyoJ-k3CNk8BKoy56xhEr5t3kulNxG88ApuhnF0KW2tJx",
    tamano: "110m²",
    habitaciones: 2,
    banos: 1,
    precioToken: "$90",
    ganancia: "7%",
  },
  {
    id: 4,
    type: "Venta",
    status: "Vendido",
    title: "Casa",
    ubicacion: "Ubicación",
    img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1rhurfpqFBcFiLjZsAU4ov13fiAtpnS1hq0l8QhjTd2Gtn24I",
    tamano: "130m²",
    habitaciones: 3,
    banos: 2,
    precioToken: "$105",
    ganancia: "9%",
  },
  {
    id: 5,
    type: "Venta",
    objetivo: "Objetivo - recaudado",
    title: "Casa",
    ubicacion: "Ubicación",
    img: "https://via.placeholder.com/220x150",
    tamano: "125m²",
    habitaciones: 3,
    banos: 2,
    precioToken: "$110",
    ganancia: "8.5%",
  },
  {
    id: 6,
    type: "Venta",
    objetivo: "Objetivo - recaudado",
    title: "Casa",
    ubicacion: "Ubicación",
    img: "https://via.placeholder.com/220x150",
    tamano: "150m²",
    habitaciones: 5,
    banos: 4,
    precioToken: "$150",
    ganancia: "12%",
  },
];

const Marketplace = ({ onPropertySelect }) => {
  const handleCardClick = (property) => {
    onPropertySelect(property);
  };

  return (
    <div className="marketplace-container">
      <div className="marketplace-filters">
        <select>
          <option>Habitaciones</option>
        </select>
        <select>
          <option>Baños</option>
        </select>
        <select>
          <option>Rango Precios</option>
        </select>
        <select>
          <option>Venta</option>
        </select>
        <select>
          <option>Casa</option>
        </select>
        <input className="marketplace-search" placeholder="Buscar" />
      </div>
      <div className="marketplace-grid">
        {properties.map((prop) => (
          <div
            className="marketplace-card"
            key={prop.id}
            onClick={() => handleCardClick(prop)}
            style={{ cursor: "pointer" }}
          >
            <div className="marketplace-card-img">
              <img src={prop.img} alt="Propiedad" />
            </div>
            <div className="marketplace-card-info">
              <div className="marketplace-card-row">
                <span>{prop.type}</span>
                <span style={{ marginLeft: "auto" }}>{prop.status}</span>
              </div>
              <div className="marketplace-card-title">{prop.title}</div>
              <div className="marketplace-card-ubicacion">{prop.ubicacion}</div>
              <div className="marketplace-card-icons">
                <span className="icon-item">
                  <FontAwesomeIcon icon={faRulerCombined} /> {prop.tamano}
                </span>
                <span className="icon-item">
                  <FontAwesomeIcon icon={faBed} /> {prop.habitaciones}{" "}
                  Habitaciones
                </span>
                <span className="icon-item">
                  <FontAwesomeIcon icon={faBath} /> {prop.banos} Baños
                </span>
              </div>
              <div className="marketplace-card-footer">
                <span>Precio token</span>
                <span>% Ganancia</span>
              </div>
              <div className="marketplace-card-footer-values">
                <span>{prop.precioToken}</span>
                <span>{prop.ganancia}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
