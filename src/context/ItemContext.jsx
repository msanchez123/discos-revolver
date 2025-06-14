// Importo los hooks de React necesarios y los datos iniciales desde el archivo JSON
import { createContext, useContext, useState, useEffect } from "react";
import discosData from "../data/discos.json";

// Creo el contexto que voy a usar para compartir los datos de los discos entre componentes
const ItemContext = createContext();

// Este componente actúa como proveedor del contexto, envuelve toda la aplicación.
export const ItemProvider = ({ children }) => {
  // Guardo todos los discos en el estado
  const [discos, setDiscos] = useState([]);

  // Al iniciar la app, cargo los datos del archivo JSON y los meto en el estado
  useEffect(() => {
    setDiscos(discosData);
  }, []);

  // Esta función me permite añadir un disco nuevo al array
  const addDisco = (nuevoDisco) => {
    // Le añado un ID único con Date.now() y lo guardo en el estado
    setDiscos((prev) => [...prev, { ...nuevoDisco, id: Date.now() }]);
  };

  // Esta función la uso para modificar un disco existente
  const updateDisco = (id, discoActualizado) => {
    // Recorro los discos y reemplazo el que tenga el mismo ID
    setDiscos((prev) =>
      prev.map((disco) => (disco.id === id ? discoActualizado : disco))
    );
  };

  // Esta función me permite eliminar un disco según su ID
  const deleteDisco = (id) => {
    // Filtro el array y elimino el que coincida con el ID que recibo
    setDiscos((prev) => prev.filter((disco) => disco.id !== id));
  };

  // Aquí devuelvo el contexto con los datos y funciones disponibles para el resto de la app
  return (
    <ItemContext.Provider value={{ discos, addDisco, updateDisco, deleteDisco }}>
      {children}
    </ItemContext.Provider>
  );
};

// Creo un hook personalizado para acceder al contexto de forma más sencilla desde otros componentes
export const useItems = () => useContext(ItemContext);
