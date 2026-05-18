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
        >
            <Modal.Header closeButton>
                <Modal.Title>Agregar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="primer_nombre"
                            value={nuevoCliente.primer_nombre}
                            onChange={manejoCambioInput}
                            placeholder="Nombre"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>segundo_nombre</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="segundo_nombre"
                            value={nuevoCliente.segundo_nombre}
                            onChange={manejoCambioInput}
                            placeholder="segundo nombre"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>primer_apellido</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="primer_apellido"
                            value={nuevoCliente.primer_apellido}
                            onChange={manejoCambioInput}
                            placeholder="primer apellido"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>segundo_apellido</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="segundo_apellido"
                            value={nuevoCliente.segundo_apellido}
                            onChange={manejoCambioInput}
                            placeholder="segundo apellido"
                        />
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label>celular</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="celular"
                            value={nuevoCliente.celular}
                            onChange={manejoCambioInput}
                            placeholder="celular"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>direccion</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="direccion"
                            value={nuevoCliente.direccion}
                            onChange={manejoCambioInput}
                            placeholder="direccion"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>cedula</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="cedula"
                            value={nuevoCliente.cedula}
                            onChange={manejoCambioInput}
                            placeholder="cedula"
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrarModal(false)}>
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={handleRegistrar}
                    disabled={nuevoCliente.primer_nombre.trim() === "" || deshabilitado}
                >
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalRegistroCliente;