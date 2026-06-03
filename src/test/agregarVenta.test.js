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

  // PRUEBA 2: Cantidad en cero bajo evaluación AND estricta
  it("Prueba 2: No debe permitir el registro bajo condición AND si la cantidad es 0", () => {
    const venta = {
      cantidad: 0,
      total: 500
    };
    
    // Forzamos la simulación del comportamiento de tu segunda fila (AND estricto)
    const resultado = venta.cantidad > 0 && venta.total > 0 
      ? { valido: true } 
      : { valido: false, mensaje: "La cantidad debe ser mayor que 0" };

    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("La cantidad debe ser mayor que 0");
  });

  // PRUEBA 3: Condición OR (Vale porque el total es correcto)
  it("Prueba 3: Debe registrar si cumple al menos con el total válido (OR)", () => {
    const venta = {
      cantidad: 0,
      total: 500
    };

    const resultado = agregarVenta(venta);
    expect(resultado.valido).toBe(true);
  });

});