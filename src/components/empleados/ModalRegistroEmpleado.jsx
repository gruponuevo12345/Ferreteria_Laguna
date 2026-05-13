import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalRegistroEmpleado = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado,
  setNuevoEmpleado,
  agregarEmpleado
}) => {
  const [deshabilitado, setDeshabilitado] = useState(false);

  const manejoCambio = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async () => {
    if (deshabilitado) return;
    setDeshabilitado(true);
    await agregarEmpleado();
    setDeshabilitado(false);
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>1er Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  name="primer_nombre"
                  value={nuevoEmpleado.primer_nombre}
                  onChange={manejoCambio}
                  placeholder="1er Nombre"
                />
              </Form.Group>
              </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>2do Nombre </Form.Label>
                <Form.Control
                  type="text"
                  name="segundo_nombre"
                  value={nuevoEmpleado.segundo_nombre}
                  onChange={manejoCambio}
                  placeholder="2do Nombre"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>1er Apellido *</Form.Label>
                <Form.Control
                  type="text"
                  name="primer_apellido"
                  value={nuevoEmpleado.primer_apellido}
                  onChange={manejoCambio}
                  placeholder="1er Apellido"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>2do Apellido </Form.Label>
                <Form.Control
                  type="text"
                  name="segundo_apellido"
                  value={nuevoEmpleado.segundo_apellido}
                  onChange={manejoCambio}
                  placeholder="2do Apellido"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email (Usuario de acceso) *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={nuevoEmpleado.email}
              onChange={manejoCambio}
              placeholder="ejemplo@discosa.com"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña *</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={nuevoEmpleado.password}
              onChange={manejoCambio}
              placeholder="Contraseña de acceso"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  type="text"
                  name="celular"
                  value={nuevoEmpleado.celular}
                  onChange={manejoCambio}
                  placeholder="Número de celular"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>PIN de acceso</Form.Label>
                <Form.Control
                  type="text"
                  name="pin"
                  value={nuevoEmpleado.pin}
                  onChange={manejoCambio}
                  placeholder="PIN"
                  maxLength={6}
                />
              </Form.Group>
            </Col>

             <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha contratación</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_contratacion"
                  value={nuevoEmpleado.fecha_contratacion}
                  onChange={manejoCambio}
                  placeholder="Fecha de contratación"
                />
              </Form.Group>
            </Col>

          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Rol / Cargo *</Form.Label>
            <Form.Select
              name="cargo"
              value={nuevoEmpleado.cargo}
              onChange={manejoCambio}
            >
              <option value="">Selecciona un rol</option>
              <option value="administrador">Administrador</option>
              <option value="cajero">Cajero</option>
              <option value="bodega">Bodega</option>
            </Form.Select>
          </Form.Group>
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          onClick={handleGuardar}
          disabled={deshabilitado}
        >
          {deshabilitado ? "Guardando..." : "Guardar Empleado"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleado;