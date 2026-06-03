function agregarCategoria(categoria) {
  const { nombre_categoria, estado } = categoria;

  // Validación de campo obligatorio (Prueba 2)
  if (!nombre_categoria || nombre_categoria.trim() === '') {
    return { valido: false, mensaje: "El nombre de la categoría es obligatorio" };
  }

  // Si tiene el nombre válido, se permite el registro (Pruebas 1 y 3)
  if (nombre_categoria) {
    return { valido: true };
  }

  return { valido: false, mensaje: "Datos inválidos" };
}

module.exports = agregarCategoria;