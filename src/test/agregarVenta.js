function agregarVenta(venta) {
  const { cantidad, total } = venta;

  if (cantidad > 0 && total > 0) {
    return { valido: true };
  }

  return {
    valido: false,
    mensaje: "La cantidad y el total deben ser mayores que 0"
  };
}

module.exports = agregarVenta;