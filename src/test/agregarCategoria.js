function agregarCategoria(categoria) {
  const { nombre_categoria, estado } = categoria;

  // Validar nombre
  if (!nombre_categoria || nombre_categoria.trim() === '') {
    return {
      valido: false,
      mensaje: "El nombre de la categoría es obligatorio"
    };
  }

  // Validar estado
  if (!estado || estado.trim() === '') {
    return {
      valido: false,
      mensaje: "El estado es obligatorio"
    };
  }

  // Ambos datos válidos
  return {
    valido: true
  };
}

module.exports = agregarCategoria;