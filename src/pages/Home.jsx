const Home = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1> Bienvenido a Discos Revolver </h1>
      <p style={{ fontSize: "18px", marginTop: "10px" }}>
        Discos Revolver es mucho más que una tienda de música. Es un espacio para los verdaderos amantes del sonido auténtico.
      </p>
      <p style={{ fontSize: "16px", marginTop: "10px" }}>
        Aquí encontrarás una selección única de <strong>rock, punk, metal, jazz, soul, oldies, indie, garage</strong> y mucho más. Desde clásicos eternos hasta joyas underground.
      </p>
      <p style={{ fontSize: "16px", marginTop: "10px" }}>
        Explora nuestro catálogo, descubre nuevos sonidos, añade tus discos favoritos y mantén viva la cultura del vinilo y el CD
      </p>

      <img
        src={`/src/assets/tiendaDiscos2.jpg`}
        alt="tiendaDiscos2"
        style={{ width: "70%", height: "auto", marginBottom: "10px", margin: "auto" }}
      />
    </div>
  );
};

export default Home;
