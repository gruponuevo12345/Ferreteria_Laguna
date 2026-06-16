import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({
    mostrarModal,
    setMostrarModal,
    nuevoCliente,
    manejoCambioInput,
    agregarCliente,
}) => {
    // Variable de estado para manejar el registro de la categoría
    const [deshabilitado, setDeshabilitado] = useState(false);

    const handleRegistrar = async () => {
        if (deshabilitado) return;
        setDeshabilitado(true);
        await agregarCliente();
        setDeshabilitado(false);
    };

    return (
        <Modal
            show={mostrarModal}
            onHide={() => setMostrarModal(false)}
            backdrop="static"
            keyboard={false}
            centered
            size="lg"
        >
            <Modal.Header closeButton className="border-0 pb-0">
                <div>
                    <Modal.Title className="fw-bold fs-2">
                        <i className="bi bi-person-plus-fill text-primary me-2"></i>
                        Nuevo Cliente
                    </Modal.Title>
                    <small className="text-muted">
                        Registra un nuevo cliente para organizar tu base de datos
                    </small>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                            <i className="bi bi-person-fill me-2 text-primary"></i>
                            Nombre
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="primer_nombre"
                            value={nuevoCliente.primer_nombre}
                            onChange={manejoCambioInput}
                            placeholder="Ej. Juan"
                            className="py-2 rounded-3 shadow-sm"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                            <i className="bi bi-person-fill me-2 text-primary"></i>
                            Segundo Nombre (Opcional)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="segundo_nombre"
                            value={nuevoCliente.segundo_nombre}
                            onChange={manejoCambioInput}
                            placeholder="Ej. Carlos"
                            className="py-2 rounded-3 shadow-sm"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                            <i className="bi bi-person-fill me-2 text-primary"></i>
                            Apellido
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="primer_apellido"
                            value={nuevoCliente.primer_apellido}
                            onChange={manejoCambioInput}
                            placeholder="Ej. García"
                            className="py-2 rounded-3 shadow-sm"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                            <i className="bi bi-person-fill me-2 text-primary"></i>
                            Segundo Apellido (Opcional)
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="segundo_apellido"
                            value={nuevoCliente.segundo_apellido}
                            onChange={manejoCambioInput}
                            placeholder="Ej. López"
                            className="py-2 rounded-3 shadow-sm"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                            <i className="bi bi-telephone-fill me-2 text-primary"></i>
                            Celular
                        </Form.Label>
                        <Form.Control
                            type="tel"
                            name="celular"
                            value={nuevoCliente.celular}
                            onChange={manejoCambioInput}
                            placeholder="Ej. +505 8888 8888"
                            className="py-2 rounded-3 shadow-sm"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                            <i className="bi bi-house-fill me-2 text-primary"></i>
                            Dirección
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="direccion"
                            value={nuevoCliente.direccion}
                            onChange={manejoCambioInput}
                            placeholder="Ej. Calle Principal, Casa 123"
                            className="rounded-3 shadow-sm"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                            <i className="bi bi-card-text me-2 text-primary"></i>
                            Cédula
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="cedula"
                            value={nuevoCliente.cedula}
                            onChange={manejoCambioInput}
                            placeholder="Ej. 12345678-9"
                            className="py-2 rounded-3 shadow-sm"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="light"
                    className="px-4 rounded-3 border" 
                    onClick={() => setMostrarModal(false)}
                >
                    <i className="bi bi-x-circle me-2"></i>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    className="px-4 rounded-3 shadow-sm"
                    onClick={handleRegistrar}
                    disabled={nuevoCliente.primer_nombre.trim() === "" || deshabilitado}
                >
                    <i className="bi bi-check-circle me-2"></i>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistroCliente;