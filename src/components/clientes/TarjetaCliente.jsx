import React, { useState, useEffect, useCallback } from "react";
import { Card, Row, Col, Spinner, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const TarjetaCliente = ({
    clientes,
    abrirModalEdicion,
    abrirModalEliminacion
}) => {

    const [cargando, setCargando] = useState(true);
    const [idTarjetaActiva, setIdTarjetaActiva] = useState(null);

    useEffect(() => {
        setCargando(!(clientes && clientes.length > 0));
    }, [clientes]);

    const manejarTeclaEscape = useCallback((evento) => {
        if (evento.key === "Escape") setIdTarjetaActiva(null);
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", manejarTeclaEscape);
        return () => window.removeEventListener("keydown", manejarTeclaEscape);
    }, [manejarTeclaEscape]);

    const alternarTarjetaActiva = (id) => {
        setIdTarjetaActiva((anterior) =>
            anterior === id ? null : id
        );
    };

    return (
        <>
            {cargando ? (
                <div className="text-center my-5">
                    <h5>Cargando clientes...</h5>
                    <Spinner animation="border" variant="success" role="status" />
                </div>
            ) : (
                <div>
                    {clientes.map((cliente) => {
                        const tarjetaActiva = idTarjetaActiva === cliente.id_cliente;

                        return (
                            <Card
                                key={cliente.id_cliente}
                                className="mb-3 border-0 rounded-3 shadow-sm w-100 tarjeta-cliente-contenedor"
                                onClick={() => alternarTarjetaActiva(cliente.id_cliente)}
                                tabIndex={0}
                                onKeyDown={(evento) => {
                                    if (evento.key === "Enter" || evento.key === " ") {
                                        evento.preventDefault();
                                        alternarTarjetaActiva(cliente.id_cliente);
                                    }
                                }}
                                aria-label={`Cliente ${cliente.primer_nombre}`}
                            >
                                <Card.Body
                                    className={`p-2 tarjeta-cliente-cuerpo ${tarjetaActiva
                                        ? "tarjeta-cliente-cuerpo-activa"
                                        : "tarjeta-cliente-cuerpo-inactiva"
                                        }`}
                                >
                                    <Row className="align-items-center gx-3">

                                        <Col xs={2} className="px-2">
                                            <div className="bg-light d-flex align-items-center justify-content-center rounded tarjeta-cliente-placeholder-imagen">
                                                <i className="bi bi-bookmark text-muted fs-3"></i>
                                            </div>
                                        </Col>

                                        <Col xs={5} className="text-start">
                                            <div className="fw-semibold text-truncate">
                                                {cliente.primer_nombre}
                                            </div>
                                            <div className="small text-muted text-truncate">
                                                {cliente.segundo_nombre}
                                            </div>

                                           <div className="small text-muted text-truncate">
                                                {cliente.primer_apellido}
                                            </div>
                                               <div className="small text-muted text-truncate">
                                                {cliente.segundo_apellido}
                                            </div>
                                               <div className="small text-muted text-truncate">
                                                {cliente.celular}
                                            </div>
                                               <div className="small text-muted text-truncate">
                                                {cliente.direccion}
                                            </div>
                                               <div className="small text-muted text-truncate">
                                                {cliente.cedula}
                                            </div>
                                        </Col>

                                        <Col
                                            xs={5}
                                            className="d-flex flex-column align-items-end justify-content-center text-end"
                                        >
                                            <div className="fw-semibold small">Activa</div>
                                        </Col>

                                    </Row>
                                </Card.Body>

                                {tarjetaActiva && (
                                    <div
                                        role="dialog"
                                        aria-modal="true"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIdTarjetaActiva(null);
                                        }}
                                        className="tarjeta-cliente-capa"
                                    >
                                        <div
                                            className="d-flex gap-2 tarjeta-cliente-botones-capa"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Button
                                                variant="outline-warning"
                                                size="sm"
                                                onClick={() => {
                                                    abrirModalEdicion(cliente);
                                                    setIdTarjetaActiva(null);
                                                }}
                                                aria-label={`Editar ${cliente.primer_nombre}`}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </Button>

                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => {
                                                    abrirModalEliminacion(cliente);
                                                    setIdTarjetaActiva(null);
                                                }}
                                                aria-label={`Eliminar ${cliente.primer_nombre}`}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    </div>
                                )}

                            </Card>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default TarjetaCliente;