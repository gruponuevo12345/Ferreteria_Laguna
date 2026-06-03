function agregarEmpleado(empleado) {
  const { cargo, celular } = empleado;

  // Validación de campo obligatorio (Prueba 2)
  if (!cargo || cargo.trim() === '') {
    return { valido: false, mensaje: "El cargo es obligatorio" };
  }

  // Si tiene cargo, se permite el registro (Pruebas 1 y 3)
  if (cargo) {
    return { valido: true };
  }

  return { valido: false, mensaje: "Datos inválidos" };
}

module.exports = agregarEmpleado;