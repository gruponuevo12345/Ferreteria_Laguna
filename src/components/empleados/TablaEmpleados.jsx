import React, { useState, useEffect } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaEmpleados = ({ 
  empleados,
  abrirModalEdicion 
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (empleados && empleados.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [empleados]);

  return (
    <>
      {loading ? (
        <div className="text-center">
          <h4>Cargando empleados...</h4>
          <Spinner animation="border" variant="success" role="status" />
        </div>
      ) : (
        <div className="tabla-wrapper">
          <Table responsive className="tabla-empleados align-middle mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Completo</th>
              <th className="d-none d-md-table-cell">Email</th>
              <th className="d-none d-md-table-cell">Fecha Ingreso</th>
              <th className="d-none d-md-table-cell">Cargo</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead> 
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id_empleado}>
                <td>
                  <span className="empleado-id">
                    #{empleado.id_empleado}
                  </span>
                </td>
                <td className="fw-semibold">
                  {[
                    empleado.primer_nombre,
                    empleado.segundo_nombre,
                    empleado.primer_apellido,
                    empleado.segundo_apellido,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </td>
                <td className="d-none d-md-table-cell text-muted">{empleado.email}</td>
                <td className="d-none d-md-table-cell">{empleado.fecha_contratacion
                    ? new Date(empleado.fecha_contratacion).toLocaleDateString("es-NI"): "-"}</td>
                <td className="d-none d-md-table-cell">
                  <span className="badge bg-info text-dark">{empleado.cargo}</span>
                </td>
                <td>
                  <div className="acciones-botones">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => abrirModalEdicion(empleado)}
                    >
                      <i className="bi bi-pencil"></i>
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

export default TablaEmpleados;