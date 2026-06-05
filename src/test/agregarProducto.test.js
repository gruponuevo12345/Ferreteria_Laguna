const agregarProducto = require('./agregarProducto');

describe("Pruebas unitarias - Módulo Productos (Precios y Cantidades)", () => {

  // PRUEBA 1: Ambos válidos (AND)
  it("Prueba 1: Debe registrar el producto si el precio y la cantidad son mayores a 0", () => {
    const producto = {
      precio: 100,
      cantidad: 2
    };

    const resultado = agregarProducto(producto);

    expect(resultado.valido).toBe(true);
  });

  // PRUEBA 2: Precio inválido
  it("Prueba 2: No debe permitir el registro si el precio es 0", () => {
    const producto = {
      precio: 0,
      cantidad: 2
    };

    const resultado = agregarProducto(producto);

    expect(resultado.valido).toBe(false);
  });

  // PRUEBA 3: Cantidad inválida
  it("Prueba 3: No debe permitir el registro si la cantidad es 0", () => {
    const producto = {
      precio: 100,
      cantidad: 0
    };

    const resultado = agregarProducto(producto);

    expect(resultado.valido).toBe(false);
  });

});