const agregarCategoria = require('./agregarCategoria');

describe("Pruebas unitarias - Módulo Categorías", () => {

  // PRUEBA 1: Ambos válidos (AND)
  it("Prueba 1: Debe registrar la categoría cuando ambos datos son correctos", () => {
    const categoria = {
      nombre_categoria: 'Machete',
      estado: 'Activo'
    };

    const resultado = agregarCategoria(categoria);
    expect(resultado.valido).toBe(true);
  });

  // PRUEBA 2: Nombre de categoría vacío (AND)
  it("Prueba 2: No debe permitir el registro si el nombre está vacío", () => {
    const categoria = {
      nombre_categoria: '',
      estado: 'Activo'
    };

    const resultado = agregarCategoria(categoria);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("El nombre de la categoría es obligatorio");
  });

  // PRUEBA 3: Estado vacío (OR)
  it("Prueba 3: Debe registrar si cumple al menos con el nombre válido aunque falte el estado", () => {
    const categoria = {
      nombre_categoria: 'Machete',
      estado: ''
    };

    const resultado = agregarCategoria(categoria);
    expect(resultado.valido).toBe(true);
  });

});