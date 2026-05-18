import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalEdicionCliente = ({
    mostrarModalEdicion,
    setMostrarModalEdicion,
    clienteEditar,
    manejoCambioInputEdicion,
    actualizarCliente,
}) => {
    const [deshabilitado, setDeshabilitado] = useState(false);

    const handleActualizar = async () => {
        if (deshabilitado) return;
        setDeshabilitado(true);
        await actualizarCliente();
        setDeshabilitado(false);
    };

    return (
        <Modal
            show={mostrarModalEdicion}
            onHide={() => setMostrarModalEdicion(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label>primer nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="primer_nombre"
                            value={clienteEditar.primer_nombre}
                            onChange={manejoCambioInputEdicion}
                            placeholder="primer nombre"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>segundo nombre</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="segundo_nombre"
                            value={clienteEditar.segundo_nombre}
                            onChange={manejoCambioInputEdicion}
                            placeholder="Ingresa el segundo nombre"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>primer apellido</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="primer_apellido"
                            value={clienteEditar.primer_apellido}
                            onChange={manejoCambioInputEdicion}
                            placeholder="Ingresa el primer apellido"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>segundo apellido</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="segundo_apellido"
                            value={clienteEditar.segundo_apellido}
                            onChange={manejoCambioInputEdicion}
                            placeholder="Ingresa el segundo apellido"
                        />
                    </Form.Group>



                    <Form.Group className="mb-3">
                        <Form.Label>celular</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="celular"
                            value={clienteEditar.celular}
                            onChange={manejoCambioInputEdicion}
                            placeholder="Ingresa el número de celular"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>direccion</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="direccion"
                            value={clienteEditar.direccion}
                            onChange={manejoCambioInputEdicion}
                            placeholder="Ingresa la dirección"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>cedula</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="cedula"
                            value={clienteEditar.cedula}
                            onChange={manejoCambioInputEdicion}
                            placeholder="Ingresa la cédula"
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => setMostrarModalEdicion(false)}
                    disabled={deshabilitado}
                >
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    onClick={handleActualizar}
                    disabled={deshabilitado ||
                        !clienteEditar.primer_nombre.trim() ||
                        !clienteEditar.segundo_nombre.trim() ||
                        !clienteEditar.primer_apellido.trim() ||
                        !clienteEditar.segundo_apellido.trim() ||
                        !clienteEditar.celular.trim() ||
                        !clienteEditar.direccion.trim() ||
                        !clienteEditar.cedula.trim()
                    }
                >
                    Actualizar

                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEdicionCliente;