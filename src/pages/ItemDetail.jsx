// Importo los hooks necesarios y el contexto global
import { useParams, useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const ItemDetail = () => {
  // Uso el ID de la URL para saber qué disco mostrar
  const { id } = useParams();

  // Me permite redirigir al catálogo después de borrar
  const navigate = useNavigate();

  // Traigo los datos y funciones desde el contexto
  const { discos, deleteDisco, updateDisco } = useItems();

  // Busco el disco seleccionado por ID
  const disco = discos.find((d) => d.id === parseInt(id));

  // Estado para cambiar entre modo vista y modo edición
  const [editando, setEditando] = useState(false);

  // Para mostrar una vista previa de la nueva imagen
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  // Inicializo el formulario y podré modificar valores con setValue
  const { register, handleSubmit, setValue } = useForm();

  // Cuando el disco esté disponible, relleno el formulario con sus datos
  useEffect(() => {
    if (disco) {
      Object.entries(disco).forEach(([key, value]) => setValue(key, value));
      setFileName(disco.imagen);
    }
  }, [disco, setValue]);

  // Si no existe el disco, muestro mensaje
  if (!disco) return <p>Disco no encontrado.</p>;

  // Capturo el archivo de imagen nuevo y creo una vista previa
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  // Cuando se guarda el formulario editado
  const onSubmit = (data) => {
    // Convierto los tipos y mantengo el mismo ID
    data.anio = parseInt(data.anio);
    data.precio = parseFloat(data.precio);
    data.stock = parseInt(data.stock);
    data.disponible = data.disponible === true || data.disponible === "true";
    data.id = disco.id;
    data.imagen = fileName || disco.imagen;

    // Actualizo el disco en el contexto
    updateDisco(disco.id, data);
    setEditando(false);
  };

  // Elimino el disco si no está reservado
  const handleDelete = () => {
    if (disco.reservado) return;
    if (confirm("¿Eliminar este disco?")) {
      deleteDisco(disco.id);
      navigate("/catalogo");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Imagen del disco */}
      <img src={`/public/assets/${disco.imagen}`} alt={disco.titulo} style={{ width: "300px", height: "auto", marginBottom: "20px" }} />

      {/* Vista o edición */}
      {!editando ? (
        <>
          {/* Vista detallada del disco */}
          <h2>{disco.titulo}</h2>
          <p><strong>Artista:</strong> {disco.artista}</p>
          <p><strong>Género:</strong> {disco.genero}</p>
          <p><strong>Año:</strong> {disco.anio}</p>
          <p><strong>Formato:</strong> {disco.formato}</p>
          <p><strong>Precio:</strong> {disco.precio}€</p>
          <p><strong>Stock:</strong> {disco.stock}</p>
          <p><strong>Disponible:</strong> {disco.disponible ? "Sí" : "No"}</p>
          <p><strong>Descripción:</strong> {disco.descripcion}</p>
          <p><strong>Reservado:</strong> {disco.reservado ? "Sí" : "No"}</p>

          {/* Botones de acción (desactivados si está reservado) */}
          <button onClick={handleDelete} disabled={disco.reservado} style={{ opacity: disco.reservado ? 0.5 : 1 }}>
            🗑️ Eliminar
          </button>

          <button onClick={() => !disco.reservado && setEditando(true)} disabled={disco.reservado} style={{ opacity: disco.reservado ? 0.5 : 1, marginLeft: "10px" }}>
            ✏️ Modificar
          </button>

          <button onClick={() => updateDisco(disco.id, { ...disco, reservado: !disco.reservado })} style={{ marginLeft: "10px" }}>
            {disco.reservado ? "Cancelar Reserva" : "Reservar"}
          </button>
        </>
      ) : (
        // Formulario de edición
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
          <input {...register("titulo")} />
          <input {...register("artista")} />
          <input type="number" {...register("anio")} />

          <select {...register("genero")}>
            <option value="Rock">Rock</option>
            <option value="Hard Rock">Hard Rock</option>
            <option value="Grunge">Grunge</option>
            <option value="Metal">Metal</option>
            <option value="Garage Punk">Garage Punk</option>
            <option value="Punk Rock">Punk Rock</option>
          </select>

          <input type="number" step="0.01" {...register("precio")} />
          <input type="number" {...register("stock")} />

          <div>
            <label><input type="radio" value="Vinilo" {...register("formato")} /> Vinilo</label>
            <label><input type="radio" value="CD" {...register("formato")} /> CD</label>
          </div>

          <label><input type="checkbox" {...register("disponible")} /> Disponible</label>
          <textarea {...register("descripcion")} />

          <label>
            Cambiar imagen:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          {preview && <img src={preview} alt="preview" style={{ width: "100%", maxHeight: "200px" }} />}

          <button type="submit">💾 Guardar Cambios</button>
          <button type="button" onClick={() => setEditando(false)}>❌ Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default ItemDetail;
