import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import { supabase } from "../database/supabaseconfig";

import ModalRegistroEmpleado from "../components/empleados/ModalRegistroEmpleado";
import ModalEdicionEmpleado from "../components/empleados/ModalEdicionEmpleado";
import TablaEmpleados from "../components/empleados/TablaEmpleados";
import TarjetaEmpleado from "../components/empleados/TarjetaEmpleado";
import NotificacionOperacion from "../components/NotificacionOperacion";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [empleadosFiltrados, setEmpleadosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);   // ← Estado de carga inicial
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);

  const [toast, setToast] = useState({ mostrar: false, mensaje: "", tipo: "" });

  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    celular: "",
    pin: "",
    email: "",
    password: "",
    cargo: "",
     fecha_contratacion: new Date().toISOString().split("T")[0],
  });

  const [empleadoEditar, setEmpleadoEditar] = useState({
    id_empleado: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    celular: "",
    pin: "",
    email: "",
    cargo: "",
    fecha_contratacion: "",
  });

  // Cargar empleados
  const cargarEmpleados = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from("empleados")
        .select("*")
        .order("id_empleado", { ascending: true });

      if (error) {
        setToast({ mostrar: true, mensaje: "Error al cargar empleados", tipo: "error" });
        return;
      }
      setEmpleados(data || []);
      setEmpleadosFiltrados(data || []);
    } catch (err) {
      setToast({ mostrar: true, mensaje: "Error inesperado al cargar empleados", tipo: "error" });
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  // Filtrado
  useEffect(() => {
    if (!textoBusqueda.trim()) {
      setEmpleadosFiltrados(empleados);
    } else {
      const texto = textoBusqueda.toLowerCase().trim();
      const filtrados = empleados.filter(emp =>
        `${emp.primer_nombre} ${emp.segundo_nombre} ${emp.primer_apellido} ${emp.segundo_apellido} ${emp.email || ""} ${emp.cargo || ""} ${emp.fecha_contratacion || ""}`
          .toLowerCase().includes(texto)
      );
      setEmpleadosFiltrados(filtrados);
    }
  }, [textoBusqueda, empleados]);

  const agregarEmpleado = async () => {
    if (!nuevoEmpleado.primer_nombre || !nuevoEmpleado.primer_apellido ||
        !nuevoEmpleado.email || !nuevoEmpleado.password || !nuevoEmpleado.cargo) {
      setToast({ mostrar: true, mensaje: "Los campos Nombre, Apellido, Email, Contraseña y cargo son obligatorios", tipo: "advertencia" });
      return;
    }

    try {
      setMostrarModal(false);

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: nuevoEmpleado.email,
        password: nuevoEmpleado.password,
        options: {
          data: {
            primer_nombre: nuevoEmpleado.primer_nombre,
            segundo_nombre: nuevoEmpleado.segundo_nombre,
            primer_apellido: nuevoEmpleado.primer_apellido,
            segundo_apellido: nuevoEmpleado.segundo_apellido,
          }
        }
      });

      if (authError) throw authError;

      const { error: dbError } = await supabase.from("empleados").insert([{
        primer_nombre: nuevoEmpleado.primer_nombre,
        segundo_nombre: nuevoEmpleado.segundo_nombre,
        primer_apellido: nuevoEmpleado.primer_apellido,
        segundo_apellido: nuevoEmpleado.segundo_apellido,
        celular: nuevoEmpleado.celular,
        pin: nuevoEmpleado.pin,
        email: nuevoEmpleado.email,
        cargo: nuevoEmpleado.cargo,
        fecha_contratacion: nuevoEmpleado.fecha_contratacion    ,
      }]);

      if (dbError) throw dbError;

      await cargarEmpleados();
      setNuevoEmpleado({ primer_nombre: "", segundo_nombre: "", primer_apellido: "", segundo_apellido: "", celular: "", pin: "", email: "", password: "", cargo: "", fecha_contratacion: new Date().toISOString().split("T")[0] });

      setToast({
        mostrar: true,
        mensaje: `Empleado ${nuevoEmpleado.primer_nombre} ${nuevoEmpleado.segundo_nombre} ${nuevoEmpleado.primer_apellido} ${nuevoEmpleado.segundo_apellido} registrado correctamente`,
        tipo: "exito"
      });
    } catch (err) {
      console.error(err);
      setToast({ mostrar: true, mensaje: err.message || "Error al registrar empleado", tipo: "error" });
    }
  };

  const actualizarEmpleado = async () => {
    if (!empleadoEditar.primer_nombre || !empleadoEditar.primer_apellido ||
        !empleadoEditar.cargo) {
      setToast({ mostrar: true, mensaje: "Nombre, Apellido y Cargo son obligatorios", tipo: "advertencia" });
      return;
    }

    try {
      setMostrarModalEdicion(false);
      const { error } = await supabase
        .from("empleados")
        .update({
          primer_nombre: empleadoEditar.primer_nombre,
          segundo_nombre: empleadoEditar.segundo_nombre,
          primer_apellido: empleadoEditar.primer_apellido,
          segundo_apellido: empleadoEditar.segundo_apellido,
          celular: empleadoEditar.celular,
          pin: empleadoEditar.pin,
          cargo: empleadoEditar.cargo,
          fecha_contratacion: empleadoEditar.fecha_contratacion,
        })
        .eq("id_empleado", empleadoEditar.id_empleado);

      if (error) throw error;

      await cargarEmpleados();
      setToast({
        mostrar: true,
        mensaje: `Empleado ${empleadoEditar.primer_nombre} ${empleadoEditar.segundo_nombre} ${empleadoEditar.primer_apellido} ${empleadoEditar.segundo_apellido} actualizado`,
        tipo: "exito"
      });
    } catch (err) {
      setToast({ mostrar: true, mensaje: "Error al actualizar empleado", tipo: "error" });
    }
  };

  const abrirModalEdicion = (empleado) => {
    setEmpleadoEditar({
      id_empleado: empleado.id_empleado,
      primer_nombre: empleado.primer_nombre,
      segundo_nombre: empleado.segundo_nombre,
      primer_apellido: empleado.primer_apellido,
      segundo_apellido: empleado.segundo_apellido,
      celular: empleado.celular || "",
      pin: empleado.pin || "",
      email: empleado.email || "",
      cargo: empleado.cargo,
      fecha_contratacion: empleado.fecha_contratacion ? empleado.fecha_contratacion.split("T")[0]: "",
    });
    setMostrarModalEdicion(true);
  };

  return (
    <Container className="mt-3">
      <Row className="align-items-center mb-3">
        <Col>
          <h3><i className="bi-person-badge-fill me-2"></i>Empleados</h3>
        </Col>
        <Col className="text-end">
          <Button onClick={() => setMostrarModal(true)}>
            <i className="bi-plus-lg me-1"></i>Nuevo Empleado
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={(e) => setTextoBusqueda(e.target.value)}
          />
        </Col>
      </Row>

      {/* Spinner de carga inicial */}
      {cargando && (
        <Row className="text-center my-5">
          <Col>
            <Spinner animation="border" variant="success" size="lg" />
            <p className="mt-3 text-muted">Cargando empleados...</p>
          </Col>
        </Row>
      )}

      {/* Alert cuando no hay coincidencias en la búsqueda */}
      {!cargando && textoBusqueda.trim() && empleadosFiltrados.length === 0 && (
        <Row className="mb-4">
          <Col>
            <Alert variant="info" className="text-center">
              <i className="bi bi-info-circle me-2"></i>
              No se encontraron empleados que coincidan con "{textoBusqueda}".
            </Alert>
          </Col>
        </Row>
      )}

      {/* Mostrar tabla o tarjetas solo cuando hay resultados y ya cargó */}
      {!cargando && empleadosFiltrados.length > 0 && (
        <Row>
          <Col xs={12} className="d-lg-none">
            <TarjetaEmpleado
              empleados={empleadosFiltrados}
              abrirModalEdicion={abrirModalEdicion}
            />
          </Col>
          <Col lg={12} className="d-none d-lg-block">
            <TablaEmpleados
              empleados={empleadosFiltrados}
              abrirModalEdicion={abrirModalEdicion}
            />
          </Col>
        </Row>
      )}

      {/* Modales */}
      <ModalRegistroEmpleado
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoEmpleado={nuevoEmpleado}
        setNuevoEmpleado={setNuevoEmpleado}
        agregarEmpleado={agregarEmpleado}
      />

      <ModalEdicionEmpleado
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        empleadoEditar={empleadoEditar}
        setEmpleadoEditar={setEmpleadoEditar}
        actualizarEmpleado={actualizarEmpleado}
      />

      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast({ ...toast, mostrar: false })}
      />
    </Container>
  );
};

export default Empleados;