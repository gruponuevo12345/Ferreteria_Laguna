function actualizarProducto(producto) {
  const { precio, nombre } = producto;

  // Validar precio
  if (precio <= 0) {
    return {
      valido: false,
      mensaje: "El precio debe ser mayor que 0"
    };
  }

  // Validar nombre del producto
  if (!nombre || nombre.trim() === '') {
    return {
      valido: false,
      mensaje: "El producto es obligatorio"
    };
  }

  // Datos válidos
  return {
    valido: true
  };
}

module.exports = actualizarProducto;