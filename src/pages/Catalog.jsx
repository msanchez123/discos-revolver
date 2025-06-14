import { useItems } from "../context/ItemContext";
import ItemCard from "../components/ItemCard";

const Catalog = () => {
  // Uso el contexto para obtener el array completo de discos
  const { discos } = useItems();

  return (
    <div>
      <h1>Catálogo de Discos</h1>
      {/* Contenedor de tarjetas */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* Recorro el array de discos y por cada uno, muestro una tarjeta */}
        {discos.map((disco) => (
          <ItemCard key={disco.id} disco={disco} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
