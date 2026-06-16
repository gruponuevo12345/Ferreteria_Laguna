import { Container, Row, Col, Button } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormularioLogin from "../components/login/FormularioLogin";
import { supabase } from "../database/supabaseconfig";
import FondoFerreteria from "../assets/FondoFerreteria.jpg";

const Login = () => {

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const navegar = useNavigate();

  const iniciarSesion = async (e) => {

    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: usuario,
        password: contrasena,
      });

      if (error) {
        setError("Usuario o contraseña incorrectos");
        return;
      }

      if (data.user) {
        localStorage.setItem("usuario-supabase", usuario);
        navegar("/");
      }

    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error("Error en la solicitud:", err);
    }
  };

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario-supabase");
    if (usuarioGuardado) {
      navegar("/");
    }
  }, [navegar]);

  const estiloContenedor = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `linear-gradient(rgba(0,40,120,.75),rgba(0,40,120,.75)), url(${FondoFerreteria})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    padding: "20px",
  };



  return (
    <div style={estiloContenedor}>

      <Container fluid className="h-100">
        <Row
          className="align-items-center"
          style={{
            minHeight: "100vh"
          }}
        >

          {/* PANEL IZQUIERDO */}
          <Col
            md={7}
            lg={7}
            className="d-none d-md-flex align-items-center justify-content-center text-white"
          >
            <div
  style={{
    maxWidth: "700px",
    padding: "40px",
    textAlign: "center"
  }}
>

              <h1
                className="fw-bold mb-4"
                style={{
                  fontSize: "4rem",
                  lineHeight: "1.1"
                }}
              >
                Bienvenido a Ferretería Laguna
              </h1>

              <p
                className="mb-5"
                style={{
                  fontSize: "2rem"
                }}
              >
                Sistema de gestión empresarial
              </p>

              <div className="mb-4">
                <h4 className="fw-bold">
                  <i className="bi bi-cart-check-fill me-3"></i>
                  Ventas
                </h4>
                <p>
                  Gestiona tus ventas de forma eficiente.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="fw-bold">
                  <i className="bi bi-box-seam-fill me-3"></i>
                  Inventario
                </h4>
                <p>
                  Control total de productos y existencias.
                </p>
              </div>

              <div className="mb-4">
                <h4 className="fw-bold">
                  <i className="bi bi-people-fill me-3"></i>
                  Clientes
                </h4>
                <p>
                  Administra tu cartera de clientes.
                </p>
              </div>

              <p className="mt-5 fst-italic">
                "Calidad, confianza y servicio en cada proyecto"
              </p>

            </div>
          </Col>

          {/* FORMULARIO */}
          <Col
  md={5}
  lg={5}
  className="d-flex justify-content-center align-items-center"
>
            <FormularioLogin
              usuario={usuario}
              contrasena={contrasena}
              error={error}
              setUsuario={setUsuario}
              setContrasena={setContrasena}
              iniciarSesion={iniciarSesion}
            />

          </Col>

        </Row>
      </Container>

    </div>
  );



};

export default Login;