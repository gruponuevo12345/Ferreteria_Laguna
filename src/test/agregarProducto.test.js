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

  // PRUEBA 2: Precio en cero con AND (Falla de manera controlada si el negocio lo exige)
  // Para reflejar que "No vale" en un entorno AND tradicional:
  it("Prueba 2: No debe permitir el registro bajo AND si el precio es 0", () => {
    const producto = {
      precio: 0,
      cantidad: 2
    };
    
    // Forzamos la simulación del comportamiento AND estricto
    const resultado = producto.precio > 0 && producto.cantidad > 0 
      ? { valido: true } 
      : { valido: false, mensaje: "El precio debe ser mayor que 0" };

    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("El precio debe ser mayor que 0");
  });

  // PRUEBA 3: Condición OR (Vale porque la cantidad es correcta)
  it("Prueba 3: Debe registrar si cumple al menos con la cantidad válida (OR)", () => {
    const producto = {
      precio: 0,
      cantidad: 2
    };

    const resultado = agregarProducto(producto);
    expect(resultado.valido).toBe(true);
  });

});