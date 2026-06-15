import React from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import Logo from "../../assets/Logo.png";

const FormularioLogin =({ usuario, contrasena, error, setUsuario, setContrasena, iniciarSesion }) => {

return (

 <Card
  className="border-0"
  style={{
    width: "100%",
    maxWidth: "520px",
    borderRadius: "28px",
    background: "#fff",
    boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
    padding: "8px"
  }}
>
    <Card.Body className="p-5 p-md-5">

      <div className="text-center mb-4">
       <img
  src={Logo}
  alt="Ferretería Laguna"
  style={{
    width: "180px",
height: "180px",
    objectFit: "contain",
  }}
/>

        <h1
    className="fw-bold"
    style={{
      color: "#0b2e59"
    }}
  >
    Iniciar Sesión
  </h1>

  <p
    className="text-muted fs-5"
  >
    Bienvenido a Ferretería Laguna
  </p>

</div>


      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      <Form>

        <Form.Group className="mb-3" controlId="formUsuario">
          <Form.Label>
            <i className="bi bi-person-fill me-2"></i>
            Usuario
          </Form.Label>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Ingresa tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "1rem",
    border: "1px solid #d9d9d9"
  }}
/>
        </Form.Group>

        <Form.Group className="mb-4" controlId="formContrasena">
          <Form.Label>
            <i className="bi bi-lock-fill me-2"></i>
            Contraseña
          </Form.Label>
          <Form.Control
            size="lg"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            style={{
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "1rem",
    border: "1px solid #d9d9d9"
  }}
/>
        </Form.Group>

        <Button
  size="lg"
  className="w-100 fw-bold border-0" onClick={iniciarSesion}
  style={{
    borderRadius: "12px",
    height: "50px",
    fontSize: "1.1rem",
    background:
      "linear-gradient(90deg,#0d6efd,#0048b3)"
  }}
>
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Iniciar Sesión
          </Button>

          <hr
  style={{
    marginTop: "30px",
    marginBottom: "25px",
    border: "0",
    borderTop: "1px solid #000000"
  }}
/>

      <div className="text-center mt-4">
  <small className="text-muted">
    <i className="bi bi-shield-lock me-2"></i>
    Acceso seguro y protegido
  </small>
</div>

      </Form>

    </Card.Body>
  </Card>
);


};

export default FormularioLogin;