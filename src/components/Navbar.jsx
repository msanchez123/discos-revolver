import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        padding: "1% 5%",
        backgroundColor: "#222",
        color: "#fff"
      }}
    >
      {/* Contenedor para logo y título */}
      <div style={{ display: "inline-block", width: "40%", verticalAlign: "middle" }}>
        <img
          src={`/src/assets/discosRevolver.png`}
          alt="Discos Revolver"
          style={{
            width: "12%",
            height: "auto",
            verticalAlign: "middle",
            marginRight: "1%"
          }}
        />
        <span style={{ fontSize: "2vw", verticalAlign: "middle" }}>DISCOS REVOLVER</span>
      </div>

      {/* Enlaces alineados a la derecha */}
      <div style={{ display: "inline-block", width: "59%", textAlign: "right", fontSize: "1.6vw" }}>
        <Link to="/" style={{ margin: "0 2%", color: "white", textDecoration: "none" }}>Inicio</Link>
        <Link to="/catalogo" style={{ margin: "0 2%", color: "white", textDecoration: "none" }}>Catálogo</Link>
        <Link to="/nuevo" style={{ margin: "0 2%", color: "white", textDecoration: "none" }}>Añadir Disco</Link>
        <Link to="/sobre-nosotros" style={{ margin: "0 2%", color: "white", textDecoration: "none" }}>Sobre Nosotros</Link>
      </div>
    </nav>
  );
};

export default Navbar;
