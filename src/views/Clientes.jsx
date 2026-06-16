import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { supabase } from "../database/supabaseconfig";
import ModalRegistroCliente from "../components/clientes/ModalRegistroCliente";
import ModalEdicionCliente from "../components/clientes/ModalEdicionCliente";
import ModalEliminacionCliente from "../components/clientes/ModalEliminacionCliente";
import TablaClientes from "../components/clientes/TablaClientes";
import TarjetaCliente from "../components/clientes/TarjetaCliente";
import NotificacionOperacion from "../components/NotificacionOperacion";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import Paginacion from "../components/ordenamiento/Paginacion";

const Clientes = () => {
    const [toast, setToast] = useState({ mostrar: false, mensaje: "", tipo: "" });
    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevoCliente, setNuevoCliente] = useState({
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        celular: "",
        direccion: "",
        cedula: "",
    });

    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true); // Estado de carga inicial
    const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
    const [clienteAEliminar, setClienteAEliminar] = useState(null);
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [registrosPorPagina, setRegistrosPorPagina] = useState(5);
    const [paginaActual, setPaginaActual] = useState(1);


    const clientesPaginados = clientesFiltrados.slice(
        (paginaActual - 1) * registrosPorPagina,
        paginaActual * registrosPorPagina
    );

    const [clienteEditar, setClienteEditar] = useState({
        id_cliente: "",
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        celular: "",
        direccion: "",
        cedula: "",
    });

    const manejarCambioBusqueda = (e) => {
        setTextoBusqueda(e.target.value);
    };

    useEffect(() => {
        if (!textoBusqueda.trim()) {
            setClientesFiltrados(clientes);
        } else {
            const textoLower = textoBusqueda.toLowerCase().trim();
            const filtradas = clientes.filter(
                (cli) =>
                    cli.primer_nombre.toLowerCase().includes(textoLower) ||
                    cli.primer_apellido.toLowerCase().includes(textoLower) ||
                    cli.segundo_apellido.toLowerCase().includes(textoLower) ||
                    cli.celular.toLowerCase().includes(textoLower) ||
                    cli.direccion.toLowerCase().includes(textoLower) ||
                    cli.cedula.includes(textoLower)
            );
            setClientesFiltrados(filtradas);
        }
    }, [textoBusqueda, clientes]);

    useEffect(() => {
        setPaginaActual(1);
    }, [textoBusqueda, registrosPorPagina]);


    const abrirModalEdicion = (cliente) => {
        setClienteEditar({
            id_cliente: cliente.id_cliente,
            primer_nombre: cliente.primer_nombre,
            segundo_nombre: cliente.segundo_nombre,
            primer_apellido: cliente.primer_apellido,
            segundo_apellido: cliente.segundo_apellido,
            celular: cliente.celular,
            direccion: cliente.direccion,
            cedula: cliente.cedula,
        });
        setMostrarModalEdicion(true);
    };

    const abrirModalEliminacion = (cliente) => {
        setClienteAEliminar(cliente);
        setMostrarModalEliminacion(true);
    };


    const cargarClientes = async () => {
        try {
            setCargando(true);
            const { data, error } = await supabase
                .from("clientes")
                .select("*")
                .order("id_cliente", { ascending: true });
            if (error) {
                console.error("Error al cargar clientes:", error.message);
                setToast({
                    mostrar: true,
                    mensaje: "Error al cargar clientes.",
                    tipo: "error",
                });
                return;
            }
            setClientes(data || []);
        } catch (err) {
            console.error("Excepción al cargar clientes:", err.message);
            setToast({
                mostrar: true,
                mensaje: "Error inesperado al cargar clientes.",
                tipo: "error",
            });
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarClientes();
    }, []);





    const manejoCambioInputEdicion = (e) => {
        const { name, value } = e.target;
        setClienteEditar((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const manejoCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoCliente((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const agregarCliente = async () => {
        try {
            if (
                !nuevoCliente.primer_nombre.trim() ||
                !nuevoCliente.segundo_nombre.trim() ||
                !nuevoCliente.primer_apellido.trim() ||
                !nuevoCliente.segundo_apellido.trim() ||
                !nuevoCliente.celular.trim() ||
                !nuevoCliente.direccion.trim() ||   
                !nuevoCliente.cedula.trim()
            ) {
                setToast({
                    mostrar: true,
                    mensaje: "Debe llenar todos los campos.",
                    tipo: "advertencia",
                });
                return;
            }

            const { data, error } = await supabase
                .from("clientes")
                .insert([
                    {
                        primer_nombre: nuevoCliente.primer_nombre,
                        segundo_nombre: nuevoCliente.segundo_nombre,
                        primer_apellido: nuevoCliente.primer_apellido,
                        segundo_apellido: nuevoCliente.segundo_apellido,
                        celular: nuevoCliente.celular,
                        direccion: nuevoCliente.direccion,
                        cedula: nuevoCliente.cedula,
                    },
                ])
                .select();

            if (error) {
                console.error("Error al agregar cliente:", error.message);
                setToast({
                    mostrar: true,
                    mensaje: "Error al registrar cliente.",
                    tipo: "error",
                });
                return;
            }

            console.log("Cliente creado:", data);

            // Éxito
            setToast({
                mostrar: true,
                mensaje: `Cliente "${nuevoCliente.primer_nombre} ${nuevoCliente.primer_apellido}" registrado exitosamente.`,
                tipo: "exito",
            });

            await cargarClientes();

            // Limpiar formulario y cerrar modal
            setNuevoCliente({ primer_nombre: "", segundo_nombre: "", primer_apellido: "", segundo_apellido: "", celular: "", direccion: "", cedula: "" });
            setMostrarModal(false);
        } catch (err) {
            console.error("Excepción al agregar cliente:", err.message);
            setToast({
                mostrar: true,
                mensaje: "Error inesperado al registrar cliente.",
                tipo: "error",
            });
        }
    };

    const actualizarCliente = async () => {
        try {
            if (
                !clienteEditar.primer_nombre.trim() ||
                !clienteEditar.segundo_nombre.trim() ||
                !clienteEditar.primer_apellido.trim() ||
                !clienteEditar.segundo_apellido.trim() ||
                !clienteEditar.celular.trim() ||
                !clienteEditar.direccion.trim() ||
                !clienteEditar.cedula.trim()
            ) {
                setToast({
                    mostrar: true,
                    mensaje: "Debe llenar todos los campos.",
                    tipo: "advertencia",
                });

   
                return;
            }

            const { error } = await supabase
                .from("clientes")
                .update({
                    primer_nombre: clienteEditar.primer_nombre,
                    segundo_nombre: clienteEditar.segundo_nombre,
                    primer_apellido: clienteEditar.primer_apellido,
                    segundo_apellido: clienteEditar.segundo_apellido,
                    celular: clienteEditar.celular,
                    direccion: clienteEditar.direccion,
                    cedula: clienteEditar.cedula,
                })
                .eq("id_cliente", clienteEditar.id_cliente)
                .select();

            if (error) {
                console.error("Error al actualizar cliente:", error.message);
                setToast({
                    mostrar: true,
                    mensaje: "Error al actualizar cliente.",
                    tipo: "error",
                });
                return;
            }

            setMostrarModalEdicion(false);

            await cargarClientes();

            setToast({
                mostrar: true,
                mensaje: `Cliente "${clienteEditar.primer_nombre} ${clienteEditar.primer_apellido}" actualizado exitosamente.`,
                tipo: "exito",
            });
        } catch (err) {
            console.error("Excepción al actualizar cliente:", err.message);
            setToast({
                mostrar: true,
                mensaje: "Error inesperado al actualizar cliente.",
                tipo: "error",
            });
            console.error("Error al actualizar cliente:", err.message);
        }
    };

    const eliminarCliente = async () => {
        if (!clienteAEliminar) return;
        try {
            setMostrarModalEliminacion(false);
            const { error } = await supabase
                .from("clientes")
                .delete()
                .eq("id_cliente", clienteAEliminar.id_cliente)
                .select();

            if (error) {
                console.error("Error al eliminar cliente:", error.message);
                setToast({
                    mostrar: true,
                    mensaje: `Error al eliminar cliente "${clienteAEliminar.primer_nombre} ${clienteAEliminar.primer_apellido}": ${error.message}`,
                    tipo: "error",
                });
                return;
            }

            await cargarClientes();
            setToast({
                mostrar: true,
                mensaje: `Cliente "${clienteAEliminar.primer_nombre} ${clienteAEliminar.primer_apellido}" eliminado exitosamente.`,
                tipo: "exito",
            });
        } catch (err) {
            console.error("Excepción al eliminar cliente:", err.message);
            setToast({
                mostrar: true,
                mensaje: "Error inesperado al eliminar cliente.",
                tipo: "error",
            });
            console.error("Error al eliminar cliente:", err.message);
        }
    };

    return (
        <Container className="mt-3">
            {/* Título y botón Nueva Cliente */}
            <Row className="align-items-center mb-3">
                <Col xs="auto" sm="7" md="7" lg="7" className="d-flex align-items-center">
                    <div className="titulo-pagina">
                        <div className="titulo-icono">
                            <i className="bi bi-people-fill"></i>
                        </div>

                        <div>
                            <h2 className="mb-1">Clientes</h2>
                            <p className="subtitulo-pagina mb-0">
                                Administra y organiza la información de los clientes de la ferretería
                            </p>
                        </div>
                    </div>
                </Col>

                <Col xs="auto" className="ms-auto">
                    <Button
                        className="btn-nueva-categoria"
                        onClick={() => setMostrarModal(true)}
                    >
                        <i className="bi bi-plus-circle-fill"></i>
                        <span>Nuevo Cliente</span>
                    </Button>
                </Col>
            </Row>

            <hr />


            {/* Spinner mientras se cargan los clientes */}
            {cargando && (
                <Row className="text-center my-5">
                    <Col>
                        <Spinner animation="border" variant="success" size="lg" />
                        <p className="mt-3 text-muted">Cargando clientes...</p>
                    </Col>
                </Row>
            )}

            {/* Cuadro de búsqueda debajo de la línea divisoria */}
            <Row className="mb-4">
                <Col md={6} lg={5}>
                    <CuadroBusquedas
                        textoBusqueda={textoBusqueda}
                        manejarCambioBusqueda={manejarCambioBusqueda}
                        placeholder="Buscar por nombre o descripción..."
                    />
                </Col>
            </Row>



            {/* Mensaje de no coincidencias solo cuando hay búsqueda y no hay resultados */}
            {!cargando && textoBusqueda.trim() && clientesFiltrados.length === 0 && (
                <Row className="mb-4">
                    <Col>
                        <Alert variant="info" className="text-center">
                            <i className="bi bi-info-circle me-2"></i>
                            No se encontraron clientes que coincidan con "{textoBusqueda}".
                        </Alert>
                    </Col>
                </Row>
            )}

            {/* Lista de clientes filtrados */}
            {!cargando && clientesPaginados.length > 0 && (
                <Row>
                    <Col xs={12} sm={12} md={12} className="d-lg-none">
                        <TarjetaCliente
                            clientes={clientesPaginados}
                            abrirModalEdicion={abrirModalEdicion}
                            abrirModalEliminacion={abrirModalEliminacion}
                        />
                    </Col>
                    <Col lg={12} className="d-none d-lg-block">
                        <TablaClientes
                            clientes={clientesPaginados}
                            abrirModalEdicion={abrirModalEdicion}
                            abrirModalEliminacion={abrirModalEliminacion}
                        />
                    </Col>
                </Row>
            )}

            {/* Paginación */}
            {clientesPaginados.length > 0 && (
                <Paginacion
                    registrosPorPagina={registrosPorPagina}
                    totalRegistros={clientesFiltrados.length}
                    paginaActual={paginaActual}
                    establecerPaginaActual={setPaginaActual}
                    establecerRegistrosPorPagina={setRegistrosPorPagina}
                />
            )}




            {/* Modal de Registro */}
            <ModalRegistroCliente
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                nuevoCliente={nuevoCliente}
                manejoCambioInput={manejoCambioInput}
                agregarCliente={agregarCliente}
            />

            {/* Modal de Edición */}
            <ModalEdicionCliente
                mostrarModalEdicion={mostrarModalEdicion}
                setMostrarModalEdicion={setMostrarModalEdicion}
                clienteEditar={clienteEditar}
                manejoCambioInputEdicion={manejoCambioInputEdicion}
                actualizarCliente={actualizarCliente}
            />

            {/* Modal de Eliminación */}
            <ModalEliminacionCliente
                mostrarModalEliminacion={mostrarModalEliminacion}
                setMostrarModalEliminacion={setMostrarModalEliminacion}
                eliminarCliente={eliminarCliente}
                cliente={clienteAEliminar}
            />

            {/* Notificación */}
            <NotificacionOperacion
                mostrar={toast.mostrar}
                mensaje={toast.mensaje}
                tipo={toast.tipo}
                onCerrar={() => setToast((prev) => ({ ...prev, mostrar: false }))}
            />
        </Container>
    );
};

export default Clientes;