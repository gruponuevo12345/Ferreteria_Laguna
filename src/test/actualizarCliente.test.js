const actualizarCliente = require('./actualizarCliente');

describe("Pruebas unitarias - Módulo Clientes (Actualizar Cliente)", () => {

  // PRUEBA 1: Ambos datos válidos
  it("Prueba 1: Debe actualizar el cliente cuando celular y dirección son válidos", () => {
    const cliente = {
      celular: '82249647',
      direccion: 'Managua'
    };

    const resultado = actualizarCliente(cliente);

    expect(resultado.valido).toBe(true);
  });

  // PRUEBA 2: Celular vacío
  it("Prueba 2: No debe permitir la actualización si el celular está vacío", () => {
    const cliente = {
      celular: '',
      direccion: 'Juigalpa'
    };

    const resultado = actualizarCliente(cliente);

    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("El celular es obligatorio");
  });

  // PRUEBA 3: Dirección vacía
  it("Prueba 3: No debe permitir la actualización si la dirección está vacía", () => {
    const cliente = {
      celular: '82249647',
      direccion: ''
    };

    const resultado = actualizarCliente(cliente);

    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("La dirección es obligatoria");
  });

});