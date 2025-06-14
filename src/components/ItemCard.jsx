import { Link } from "react-router-dom";

const ItemCard = ({ disco }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "16px",
      margin: "10px",
      borderRadius: "8px",
      width: "250px",
      background: "#f9f9f9"
    }}>
      <img
        src={`/src/assets/${disco.imagen}`}
        alt={disco.titulo}
        style={{ width: "100%", height: "auto", marginBottom: "10px" }}
      />
      {/* Información básica del disco */}
      <h3>{disco.titulo}</h3>
      <p><strong>Artista:</strong> {disco.artista}</p>
      <p><strong>Género:</strong> {disco.genero}</p>
      <p><strong>Año:</strong> {disco.anio}</p>
      <p><strong>Precio:</strong> {disco.precio}€</p>
      {disco.reservado && <p style={{ color: "red" }}>Reservado</p>}
      {disco.usado && <p style={{ color: "orange" }}>Usado</p>}

      {/* Botón para ver detalles, usando enlace dinámico */}
      <Link to={`/disco/${disco.id}`}>
        <button>Ver detalles</button>
      </Link>
    </div>
  );
};

export default ItemCard;
