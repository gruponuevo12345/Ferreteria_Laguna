const agregarEmpleado = require('./agregarEmpleado');

describe("Pruebas unitarias - Módulo Empleados", () => {

  // PRUEBA 1: Ambos válidos (AND)
  it("Prueba 1: Debe agregar al empleado cuando ambos datos son correctos", () => {
    const empleado = {
      cargo: 'Cajero',
      celular: '82249647'
    };

    const resultado = agregarEmpleado(empleado);
    expect(resultado.valido).toBe(true);
  });

  // PRUEBA 2: Cargo vacío (AND)
  it("Prueba 2: No debe permitir el registro si el cargo está vacío", () => {
    const empleado = {
      cargo: '',
      celular: '84380547'
    };

    const resultado = agregarEmpleado(empleado);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("El cargo es obligatorio");
  });

  // PRUEBA 3: Celular vacío (OR)
  it("Prueba 3: Debe registrar si cumple al menos con el cargo válido aunque falte el celular", () => {
    const empleado = {
      cargo: 'Cajero',
      celular: ''
    };

    const resultado = agregarEmpleado(empleado);
    expect(resultado.valido).toBe(true);
  });

});