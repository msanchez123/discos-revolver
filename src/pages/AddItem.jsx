import { useForm } from "react-hook-form";
import { useItems } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddItem = () => {
  // Uso react-hook-form para gestionar los campos del formulario
  const { register, handleSubmit, reset } = useForm();

  // Accedo a la función global para añadir un disco desde el contexto
  const { addDisco } = useItems();

  // Para redirigir automáticamente al catálogo después de añadir
  const navigate = useNavigate();

  // Guardo una vista previa de la imagen y el nombre del archivo seleccionado
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  // Esta función se ejecuta cuando se envía el formulario
  const onSubmit = (data) => {
    // Convierto los valores de tipo número o booleano antes de guardar
    data.anio = parseInt(data.anio);
    data.precio = parseFloat(data.precio);
    data.stock = parseInt(data.stock);
    data.disponible = data.disponible === true || data.disponible === "true";

    // Asigno el nombre del archivo de imagen y genero un ID único
    data.imagen = fileName;
    data.id = Date.now();
    data.reservado = false;

    // Añado el nuevo disco al contexto
    addDisco(data);

    // Limpio el formulario y la vista previa
    reset();
    setPreview(null);
    setFileName("");

    // Redirijo al catálogo
    navigate("/catalogo");
  };

  // Esta función guarda la imagen seleccionada y genera una vista previa
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Añadir Nuevo Disco</h2>

      {/* Formulario gestionado por react-hook-form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}
      >
        {/* Campos de texto */}
        <input placeholder="Título" {...register("titulo", { required: true })} />
        <input placeholder="Artista" {...register("artista", { required: true })} />
        <input type="number" placeholder="Año" {...register("anio", { required: true })} />

        {/* Menú desplegable para género */}
        <select {...register("genero", { required: true })}>
          <option value="">Selecciona género</option>
          <option value="Rock">Rock</option>
          <option value="Hard Rock">Hard Rock</option>
          <option value="Grunge">Grunge</option>
          <option value="Metal">Metal</option>
        </select>

        {/* Campo de número para precio y stock */}
        <input type="number" step="0.01" placeholder="Precio (€)" {...register("precio", { required: true })} />
        <input type="number" placeholder="Stock" {...register("stock", { required: true })} />

        {/* Radio buttons para el formato */}
        <div>
          <label>
            <input type="radio" value="Vinilo" {...register("formato", { required: true })} /> Vinilo
          </label>
          <label style={{ marginLeft: "10px" }}>
            <input type="radio" value="CD" {...register("formato", { required: true })} /> CD
          </label>
        </div>

        {/* Checkbox para marcar si está disponible */}
        <label>
          <input type="checkbox" {...register("disponible")} /> Disponible
        </label>

        {/* Campo para la descripción */}
        <textarea placeholder="Descripción" {...register("descripcion")} />

        {/* Imagen: selección de archivo y vista previa */}
        <label>
          Imagen del disco (debe estar en /src/assets):
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>

        {preview && <img src={preview} alt="preview" style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} />}

        {/* Botón para enviar */}
        <button type="submit">Añadir Disco</button>
      </form>
    </div>
  );
};

export default AddItem;
