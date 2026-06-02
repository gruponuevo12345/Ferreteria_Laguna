import React from "react";
import { Table, Button } from "react-bootstrap";

const TablaVentas = ({ ventas, abrirEdicion, generarPDFVenta }) => {
    return (
        <Table striped hover responsive size="sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Empleado</th>
                    <th>Pago</th>
                    <th className="text-end">Total</th>
                    <th className="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {ventas.map((venta) => (
                    <tr key={venta.id_venta}>
                        <td>#{venta.id_venta}</td>
                        <td>{new Date(venta.fecha_venta).toLocaleString('es-NI')}</td>
                        <td>
                            {venta.clientes?.primer_nombre} {venta.clientes?.primer_apellido}
                        </td>
                        <td>
                            {venta.empleados?.primer_nombre} {venta.empleados?.primer_apellido} - {venta.empleados?.cargo}
                        </td>
                        <td>
                            <span className="badge bg-info">{venta.metodo_pago}</span>
                        </td>
                        <td className="text-end fw-bold">C$ {parseFloat(venta.total_venta || 0).toFixed(2)}</td>
                        <td className="text-center">
                            <Button variant="outline-warning" size="sm" onClick={() => abrirEdicion(venta)}>
                                <i className="bi bi-pencil"></i>
                            </Button>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                className="m-1"
                                onClick={() => generarPDFVenta(venta)}
                            >
                                <i className="bi bi-file-earmark-pdf"></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TablaVentas;