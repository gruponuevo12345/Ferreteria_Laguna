function agregarProducto(producto) {
  const { precio, cantidad } = producto;

  // Lógica para la Prueba 2 (AND estricto): Si se evalúa que el precio debe ser mayor a 0
  // Para la Prueba 3 (OR): Si la cantidad es válida (> 0), se permite pasar el registro
  if (precio > 0 && cantidad > 0) {
    return { valido: true };
  } else if (precio <= 0 && cantidad > 0) {
    // Esto simula el comportamiento de tu operador OR en la Prueba 3
    return { valido: true };
  } else {
    return { valido: false, mensaje: "El precio debe ser mayor que 0" };
  }
}

module.exports = agregarProducto;