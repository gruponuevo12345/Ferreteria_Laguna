function agregarCliente(cliente) {
  const { nombre, telefono } = cliente;

  // Validación de campo obligatorio (Prueba 2)
  if (!nombre || nombre.trim() === '') {
    return { valido: false, mensaje: "El nombre es obligatorio" };
  }

  // Si pasa la validación del nombre, verificamos que tenga los datos correctos (Pruebas 1 y 3)
  if (nombre && telefono) {
    return { valido: true };
  }

  // Por si acaso se envía algún formato inesperado
  return { valido: false, mensaje: "Datos inválidos" };
}

module.exports = agregarCliente;