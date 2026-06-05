const agregarVenta = require('./agregarVenta');

describe("Pruebas unitarias - Módulo Ventas (Cantidades y Totales)", () => {

  // PRUEBA 1: Ambos válidos (AND)
  it("Prueba 1: Debe registrar la venta si la cantidad y el total son mayores a 0", () => {
    const venta = {
      cantidad: 5,
      total: 500
    };

    const resultado = agregarVenta(venta);
    expect(resultado.valido).toBe(true);
  });

// Valores negativos
it("No debe registrar cantidades negativas", () => {
  const venta = {
    cantidad: -5,
    total: -100
  };

  const resultado = agregarVenta(venta);

  expect(resultado.valido).toBe(false);
});
    
 

  // Cantidad válida pero total en 0
it("No debe registrar si el total es 0", () => {
  const venta = {
    cantidad: 5,
    total: 0
  };

  const resultado = agregarVenta(venta);

  expect(resultado.valido).toBe(false);
});
  });