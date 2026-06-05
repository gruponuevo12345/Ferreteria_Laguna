const agregarCliente = require('./agregarCliente');

describe("Pruebas unitarias - Módulo Clientes", () => {

  // PRUEBA 1: Ambos datos válidos (AND)
  it("Prueba 1: Debe registrar al cliente cuando ambos datos son válidos", () => {
    const cliente = {
      nombre: 'Angelly Sofia',
      telefono: '82249647'
    };

    const resultado = agregarCliente(cliente);
    expect(resultado.valido).toBe(true);
  });

  // PRUEBA 2: Nombre vacío (AND)
  it("Prueba 2: No debe permitir el registro si el nombre está vacío", () => {
    const cliente = {
      nombre: '',
      telefono: '82249647'
    };

    const resultado = agregarCliente(cliente);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("El nombre es obligatorio");
  });

    // PRUEBA 3: Teléfono vacío
  it("Prueba 3: No debe permitir el registro si el teléfono está vacío", () => {
    const cliente = {
      nombre: 'Ana',
      telefono: ''
    };

    const resultado = agregarCliente(cliente);

    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("El teléfono es obligatorio");
  });
  });