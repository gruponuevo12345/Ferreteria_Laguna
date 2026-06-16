import React, { useState, useEffect } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { supabase } from "../../database/supabaseconfig";

const TablaCategorias = ({ categorias, abrirModalEdicion, abrirModalEliminacion, generarPDFCategoria, copiarCategoria }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categorias && categorias.length > 0) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [categorias]);

    return (
        <>
            {loading ? (
                <div className="text-center">
                    <h4>Cargando categorías...</h4>
                    <Spinner animation="border" variant="success" role="status" />
                </div>
            ) : (
    <div className="tabla-wrapper">
        <Table responsive className="tabla-categorias align-middle mb-0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th className="d-none d-md-table-cell">Descripción</th>
                    <th className="text-center">Acciones</th>
                </tr>
            </thead>

            <tbody>
                {categorias.map((categoria) => (
                    <tr key={categoria.id_categoria}>
                        <td>
                            <span className="categoria-id">
                                #{categoria.id_categoria}
                            </span>
                        </td>

                        <td className="fw-semibold">
                            {categoria.nombre_categoria}
                        </td>

                        <td className="d-none d-md-table-cell text-muted">
                            {categoria.descripcion_categoria}
                        </td>

                        <td>
                            <div className="acciones-botones">
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => abrirModalEdicion(categoria)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => abrirModalEliminacion(categoria)}
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>

                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => generarPDFCategoria(categoria)}
                                >
                                    <i className="bi bi-file-earmark-pdf"></i>
                                </Button>

                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => copiarCategoria(categoria)}
                                >
                                    <i className="bi bi-clipboard"></i>
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
)
            }
        </>
    );
};

export default TablaCategorias;