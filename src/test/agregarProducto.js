function agregarProducto(producto) {
  const { precio, cantidad } = producto;

  if (precio > 0 && cantidad > 0) {
    return { valido: true };
  }

  return {
    valido: false,
    mensaje: "El precio y la cantidad deben ser mayores que 0"
  };
}

module.exports = agregarProducto;