import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCategoria = ({
  mostrarModal,
  setMostrarModal,
  nuevaCategoria,
  manejoCambioInput,
  agregarCategoria,
}) => {
  // Variable de estado para manejar el registro de la categoría
  const [deshabilitado, setDeshabilitado] = useState(false);

  const handleRegistrar = async () => {
    if (deshabilitado) return;
    setDeshabilitado(true);
    await agregarCategoria();
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
      <i className="bi bi-tags-fill text-primary me-2"></i>
      Nueva Categoría
    </Modal.Title>

    <small className="text-muted">
      Registra una nueva categoría para organizar los productos
    </small>
  </div>
</Modal.Header>
      <Modal.Body>
        <Form>
          
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
  <i className="bi bi-bookmark-fill me-2 text-primary"></i>
  Nombre
</Form.Label>
            <Form.Control
  type="text"
  name="nombre_categoria"
  value={nuevaCategoria.nombre_categoria}
  onChange={manejoCambioInput}
  placeholder="Ej. Herramientas Eléctricas"
  className="py-2 rounded-3 shadow-sm"
/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
  <i className="bi bi-card-text me-2 text-primary"></i>
  Descripción
</Form.Label>
            <Form.Control
  as="textarea"
  rows={4}
  name="descripcion_categoria"
  value={nuevaCategoria.descripcion_categoria}
  onChange={manejoCambioInput}
  placeholder="Describe la categoría..."
  className="rounded-3 shadow-sm"
/>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light"
  className="px-4 rounded-3 border" onClick={() => setMostrarModal(false)}>
    <i className="bi bi-x-circle me-2"></i>
          Cancelar
        </Button>

        <Button
          variant="primary"
          className="px-4 rounded-3 shadow-sm"
          onClick={handleRegistrar}
          disabled={nuevaCategoria.nombre_categoria.trim() === "" || deshabilitado}
        >
          <i className="bi bi-check-circle me-2"></i>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCategoria;