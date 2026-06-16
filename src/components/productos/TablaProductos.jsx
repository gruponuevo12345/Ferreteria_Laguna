import React, { useState, useEffect } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { supabase } from "../../database/supabaseconfig";

const TablaProductos = ({ productos, abrirModalEdicion, abrirModalEliminacion, generarQRImagen }) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productos && productos.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [productos]);

  return (
    <>
      {loading ? (
        <div className="text-center">
          <h4>Cargando productos...</h4>
          <Spinner animation="border" variant="success" role="status" />
        </div>
      ) : (
        <div className="tabla-wrapper">
          <Table responsive className="tabla-productos align-middle mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th className="d-none d-md-table-cell">Imagen</th>
                <th className="d-none d-md-table-cell">Descripción</th>
                <th className="d-none d-md-table-cell">Precio</th>
                <th className="d-none d-md-table-cell">Stock</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id_producto}>
                  <td>
                    <span className="producto-id">
                      #{producto.id_producto}
                    </span>
                  </td>

                  <td className="fw-semibold">
                    {producto.nombre_producto}
                  </td>

                  <td className="d-none d-md-table-cell">
                    <img 
                      src={producto.url_imagen} 
                      alt={producto.nombre_producto} 
                      width="50" 
                      style={{ borderRadius: "6px" }}
                    />
                  </td>

                  <td className="d-none d-md-table-cell text-muted">
                    {producto.descripcion_producto || "Sin descripción"}
                  </td>

                  <td className="d-none d-md-table-cell">
                    C$ {parseFloat(producto.precio_unitario).toFixed(2)}
                  </td>

                  <td className="d-none d-md-table-cell">
                    {producto.stock}
                  </td>

                  <td>
                    <div className="acciones-botones">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => abrirModalEdicion(producto)}
                        title="Editar producto"
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => generarQRImagen(producto)}
                        title="Generar código QR"
                      >
                        <i className="bi bi-qr-code"></i>
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => abrirModalEliminacion(producto)}
                        title="Eliminar producto"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default TablaProductos;