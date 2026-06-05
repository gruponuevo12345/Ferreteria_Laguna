const actualizarProducto = require('./actualizarProducto');

describe("Pruebas unitarias - Módulo Productos (Actualizar Productos)", () => {

  // PRUEBA 1: Datos válidos
  it("Prueba 1: Debe actualizar el producto cuando el precio y el nombre son válidos", () => {
    const producto = {
      precio: 65,
      nombre: 'Martillo'
    };

    const resultado = actualizarProducto(producto);

    expect(resultado.valido).toBe(true);
  });

  // PRUEBA 2: Precio inválido
  it("Prueba 2: No debe permitir la actualización si el precio es 0", () => {
    const producto = {
      precio: 0,
      nombre: 'Martillo'
    };

    const resultado = actualizarProducto(producto);

    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("El precio debe ser mayor que 0");
  });

  // PRUEBA 3: Producto vacío
  it("Prueba 3: No debe permitir la actualización si el nombre del producto está vacío", () => {
    const producto = {
      precio: 65,
      nombre: ''
    };

    const resultado = actualizarProducto(producto);

    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("El producto es obligatorio");
  });

});