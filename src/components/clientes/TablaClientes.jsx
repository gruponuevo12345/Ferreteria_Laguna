import React, { useState, useEffect } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { supabase } from "../../database/supabaseconfig";

const TablaClientes = ({ clientes, abrirModalEdicion, abrirModalEliminacion }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (clientes && clientes.length > 0) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [clientes]);

    return (
        <>
            {loading ? (
                <div className="text-center">
                    <h4>Cargando clientes...</h4>
                    <Spinner animation="border" variant="success" role="status" />
                </div>
            ) : (
                <div className="tabla-wrapper">
                    <Table responsive className="tabla-clientes align-middle mb-0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th className="d-none d-md-table-cell">Dirección</th>
                                <th className="d-none d-md-table-cell">Cédula</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.id_cliente}>
                                    <td>
                                        <span className="cliente-id">
                                            #{cliente.id_cliente}
                                        </span>
                                    </td>

                                    <td className="fw-semibold">
                                        {cliente.primer_nombre} {cliente.primer_apellido}
                                    </td>

                                    <td>
                                        {cliente.celular}
                                    </td>

                                    <td className="d-none d-md-table-cell text-muted">
                                        {cliente.direccion}
                                    </td>

                                    <td className="d-none d-md-table-cell text-muted">
                                        {cliente.cedula}
                                    </td>

                                    <td>
                                        <div className="acciones-botones">
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                onClick={() => abrirModalEdicion(cliente)}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </Button>

                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => abrirModalEliminacion(cliente)}
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

export default TablaClientes;