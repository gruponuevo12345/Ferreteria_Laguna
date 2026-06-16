import React from "react";
import { Table, Button } from "react-bootstrap";

const TablaVentas = ({ ventas, abrirEdicion, generarPDFVenta }) => {
    return (
        <div className="tabla-wrapper">
            <Table responsive className="tabla-ventas align-middle mb-0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th className="d-none d-md-table-cell">Cliente</th>
                        <th className="d-none d-md-table-cell">Empleado</th>
                        <th className="d-none d-md-table-cell">Pago</th>
                        <th className="text-end">Total</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.id_venta}>
                            <td>
                                <span className="venta-id">
                                    #{venta.id_venta}
                                </span>
                            </td>
                            <td className="fw-semibold">
                                {new Date(venta.fecha_venta).toLocaleString('es-NI')}
                            </td>
                            <td className="d-none d-md-table-cell">
                                {venta.clientes?.primer_nombre} {venta.clientes?.primer_apellido}
                            </td>
                            <td className="d-none d-md-table-cell">
                                {venta.empleados?.primer_nombre} {venta.empleados?.primer_apellido} - {venta.empleados?.cargo}
                            </td>
                            <td className="d-none d-md-table-cell">
                                <span className="badge bg-info text-dark">{venta.metodo_pago}</span>
                            </td>
                            <td className="text-end fw-bold">
                                C$ {parseFloat(venta.total_venta || 0).toFixed(2)}
                            </td>
                            <td>
                                <div className="acciones-botones">
                                    <Button 
                                        variant="warning" 
                                        size="sm" 
                                        onClick={() => abrirEdicion(venta)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => generarPDFVenta(venta)}
                                    >
                                        <i className="bi bi-file-earmark-pdf"></i>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TablaVentas;