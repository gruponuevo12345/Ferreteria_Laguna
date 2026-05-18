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
                <Table striped borderless hover responsive size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>primer_nombre</th>
                            <th>segundo_nombre</th>
                            <th>primer_apellido</th>
                            <th>segundo_apellido</th>
                            <th>celular</th>
                             <th>direccion</th>
                              <th>cedula</th>
                            <th className="d-none d-md-table-cell">Descripción</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id_cliente}>
                                <td>{cliente.id_cliente}</td>
                                <td>{cliente.primer_nombre}</td>
                                <td>{cliente.segundo_nombre}</td>
                                <td>{cliente.primer_apellido}</td>
                                <td>{cliente.segundo_apellido}</td>
                                <td>{cliente.celular}</td>
                                <td>{cliente.direccion}</td>
                                <td>{cliente.cedula}</td>
                                <td className="d-none d-md-table-cell">{cliente.primer_nombre}</td>
                                <td className="text-center">
                                    <Button
                                        variant="outline-warning"
                                        size="sm"
                                        className="m-1"
                                        onClick={() => abrirModalEdicion(cliente)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </Button>

                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => abrirModalEliminacion(cliente)}
                                    >

                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))
                        }</tbody>
                </Table>
            )}
        </>
    );
};

export default TablaClientes;