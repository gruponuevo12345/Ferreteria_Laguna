function agregarCliente(cliente) {
  const { nombre, telefono } = cliente;

  // Validar nombre
  if (!nombre || nombre.trim() === '') {
    return {
      valido: false,
      mensaje: "El nombre es obligatorio"
    };
  }

  // Validar teléfono
  if (!telefono || telefono.trim() === '') {
    return {
      valido: false,
      mensaje: "El teléfono es obligatorio"
    };
  }

  // Ambos datos válidos
  return {
    valido: true
  };
}

module.exports = agregarCliente;