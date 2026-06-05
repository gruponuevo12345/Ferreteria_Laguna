function actualizarCliente(cliente) {
  const { celular, direccion } = cliente;

  // Validar celular
  if (!celular || celular.trim() === '') {
    return {
      valido: false,
      mensaje: "El celular es obligatorio"
    };
  }

  // Validar dirección
  if (!direccion || direccion.trim() === '') {
    return {
      valido: false,
      mensaje: "La dirección es obligatoria"
    };
  }

  // Ambos datos válidos
  return {
    valido: true
  };
}

module.exports = actualizarCliente;