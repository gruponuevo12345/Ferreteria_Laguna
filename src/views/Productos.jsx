import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import { supabase } from "../database/supabaseconfig";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import NotificacionOperacion from "../components/NotificacionOperacion";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import TablaProductos from "../components/productos/TablaProductos";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";
import TarjetaProductos from "../components/productos/TarjetasProductos";
import Paginacion from "../components/ordenamiento/Paginacion";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ModalQRProducto from "../components/productos/ModalQRProducto";

import ModalEnvioCorreoProductos from "../components/productos/ModalEnvioCorreoProductos";
import emailjs from '@emailjs/browser';



const Productos = () => {
  const [toast, setToast] = useState({ mostrar: false, mensaje: "", tipo: "" });

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosPorPagina, setRegistrosPorPagina] = useState(5);

  const [categorias, setCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [mostrarModalQR, setMostrarModalQR] = useState(false);
  const [productoQR, setProductoQR] = useState(null);

  const [mostrarModalCorreo, setMostrarModalCorreo] = useState(false);
const [emailDestino, setEmailDestino] = useState("");
const [enviandoCorreo, setEnviandoCorreo] = useState(false);


  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * registrosPorPagina,
    paginaActual * registrosPorPagina
  );


  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: "",
    descripcion_producto: "",
    id_categoria: "",
    precio_unitario: "",
    stock: "",
    archivo: null,
  });

  const [productoEditar, setProductoEditar] = useState({
    id_producto: "",
    nombre_producto: "",
    descripcion_producto: "",
    id_categoria: "",
    precio_unitario: "",
    stock: "",
    url_imagen: "",
    archivo: null,
  });


  const generarPDFProducto = (producto) => {

    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text("Reporte de Producto", 14, 20);

    // Línea decorativa
    doc.line(14, 25, 195, 25);

    // Información del producto
    doc.setFontSize(12);

    autoTable(doc, {
      startY: 35,
      head: [["Campo", "Valor"]],
      body: [
        ["ID", categoria.id_categoria],
        ["Nombre", categoria.nombre_categoria],
        ["Descripción", categoria.descripcion_categoria],
      ],
    });

    // Descargar PDF
    doc.save(`categoria_${categoria.id_categoria}.pdf`);
  };


  const manejoCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setProductoEditar((prev) => ({
      ...prev, [name]: value,
    }));
  };

  const manejoCambioArchivoActualizar = (e) => {
    const archivo = e.target.files[0];
    if (archivo && archivo.type.startsWith("image/")) {
      setProductoEditar((prev) => ({ ...prev, archivo }));
    } else {
      alert("Selecciona una imagen válida (JPG, PNG, etc.)");
    }
  };

  const manejoCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const manejoCambioArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo && archivo.type.startsWith("image/")) {
      setNuevoProducto((prev) => ({ ...prev, archivo }));
    } else {
      alert("Selecciona una imagen válida (JPG, PNG, etc.)");
    }
  };

  const manejarCambioBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };



  useEffect(() => {
    if (!textoBusqueda.trim()) {
      setProductosFiltrados(productos);
    } else {
      const textoLower = textoBusqueda.toLowerCase().trim();
      const filtrados = productos.filter((prod) => {
        const nombre = prod.nombre_producto?.toLowerCase() || "";
        const descripcion = prod.descripcion_producto?.toLowerCase() || "";
        const precio = prod.precio_unitario?.toString() || "";
        const stock = prod.stock?.toString() || "";
        return (
          nombre.includes(textoLower) ||
          descripcion.includes(textoLower) ||
          precio.includes(textoLower) ||
          stock.includes(textoLower)
        );
      });
      setProductosFiltrados(filtrados);
    }
  }, [textoBusqueda, productos]);

  useEffect(() => {
    cargarCategorias();
    cargarProductos();
  }, []);

  const abrirModalEdicion = (producto) => {
    setProductoEditar({
      id_producto: producto.id_producto,
      nombre_producto: producto.nombre_producto,
      descripcion_producto: producto.descripcion_producto,
      id_categoria: producto.id_categoria,
      precio_unitario: producto.precio_unitario,
      stock: producto.stock,
    });
    setMostrarModalEdicion(true);
  };

  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminacion(true);
  };

  const generarQRImagen = (producto) => {
    if (!producto?.url_imagen) {
      setToast({
        mostrar: true,
        mensaje: "Este producto no tiene imagen asociada",
        tipo: "advertencia"
      });
      return;
    }

    setProductoQR(producto);
    setMostrarModalQR(true);
  };

  const actualizarProducto = async () => {
    try {
      if (
        !productoEditar.nombre_producto.trim() ||
        !productoEditar.id_categoria ||
        !productoEditar.precio_unitario ||
        !productoEditar.stock
      ) {
        setToast({
          mostrar: true,
          mensaje: "Completa los campos obligatorios",
          tipo: "advertencia",
        });


        return;
      }

      setMostrarModalEdicion(false);

      let datosActualizados = {
        nombre_producto: productoEditar.nombre_producto,
        descripcion_producto: productoEditar.descripcion_producto || null,
        id_categoria: productoEditar.id_categoria,
        precio_unitario: parseFloat(productoEditar.precio_unitario),
        stock: parseInt(productoEditar.stock, 10),
        url_imagen: productoEditar.url_imagen,
      };

      if (productoEditar.archivo) {
        const nombreArchivo = `${Date.now()}_${productoEditar.archivo.name}`;

        const { error: uploadError } = await supabase.storage
          .from("imagenes_productos")
          .upload(nombreArchivo, productoEditar.archivo);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("imagenes_productos")
          .getPublicUrl(nombreArchivo);

        datosActualizados.url_imagen = urlData.publicUrl;

        if (productoEditar.url_imagen) {
          const nombreAnterior = productoEditar.url_imagen.split("/").pop().split("?")[0];
          await supabase.storage.from("imagenes_productos").remove([nombreAnterior]).catch(() => { });
        }
      }

      const { error } = await supabase
        .from("productos")
        .update(datosActualizados)
        .eq("id_producto", productoEditar.id_producto);

      if (error) throw error;

      await cargarProductos();

      setProductoEditar({
        id_producto: "",
        nombre_producto: "",
        descripcion_producto: "",
        id_categoria: "",
        precio_unitario: "",
        stock: "",
        url_imagen: "",
        archivo: null,
      });

      setToast({ mostrar: true, mensaje: "Producto actualizado correctamente", tipo: "exito" });
    } catch (err) {
      console.error("Error al actualizar:", err);
      setToast({ mostrar: true, mensaje: "Error al actualizar producto", tipo: "error" });
    }
  };

  const eliminarProducto = async () => {
    if (!productoAEliminar) return;
    try {
      setMostrarModalEliminacion(false);
      const { error } = await supabase
        .from("productos")
        .delete()
        .eq("id_producto", productoAEliminar.id_producto)
        .select();

      if (error) {
        console.error("Error al eliminar el producto:", error.message);
        setToast({
          mostrar: true,
          mensaje: `Error al eliminar el producto "${productoAEliminar.nombre_producto}": ${error.message}`,
          tipo: "error",
        });
        return;
      }

      await cargarProductos();
      setToast({
        mostrar: true,
        mensaje: `Producto "${productoAEliminar.nombre_producto}" eliminado exitosamente.`,
        tipo: "exito",
      });
    } catch (err) {
      console.error("Excepción al eliminar el producto:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al eliminar el producto.",
        tipo: "error",
      });
      console.error("Error al eliminar el producto:", err.message);
    }
  };


  const cargarProductos = async () => {
    try {
      setCargando(true);
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("id_producto", { ascending: true });
      if (error) {
        console.error("Error al cargar productos:", error.message);
        setToast({
          mostrar: true,
          mensaje: "Error al cargar productos.",
          tipo: "error",
        });
        return;
      }
      setProductos(data || []);
    } catch (err) {
      console.error("Excepción al cargar productos:", err.message);
      setToast({
        mostrar: true,
        mensaje: "Error inesperado al cargar productos.",
        tipo: "error",
      });
    } finally {
      setCargando(false);
    }
  };


  const cargarCategorias = async () => {
    try {
      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .order("id_categoria", { ascending: true });

      if (error) throw error;
      setCategorias(data || []);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    }
  };


  const agregarProducto = async () => {
    try {
      if (
        !nuevoProducto.nombre_producto.trim() ||
        !nuevoProducto.id_categoria ||
        !nuevoProducto.precio_unitario ||
        !nuevoProducto.stock ||
        !nuevoProducto.archivo
      ) {
        setToast({
          mostrar: true,
          mensaje: "Completa los campos obligatorios (nombre, categoría, precio, stock e imagen)",
          tipo: "advertencia",
        });
        return;
      }

      setMostrarModal(false);

      const nombreArchivo = `${Date.now()}_${nuevoProducto.archivo.name}`;

      const { error: uploadError } = await supabase.storage
        .from("imagenes_productos")
        .upload(nombreArchivo, nuevoProducto.archivo);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("imagenes_productos")
        .getPublicUrl(nombreArchivo);
      const urlPublica = urlData.publicUrl;

      const { error } = await supabase.from("productos").insert([
        {
          nombre_producto: nuevoProducto.nombre_producto,
          descripcion_producto: nuevoProducto.descripcion_producto || null,
          id_categoria: nuevoProducto.id_categoria,
          precio_unitario: parseFloat(nuevoProducto.precio_unitario),
          url_imagen: urlPublica,
          stock: parseInt(nuevoProducto.stock, 10),
        },
      ]);

      if (error) throw error;

      await cargarProductos();

      setNuevoProducto({
        nombre_producto: "",
        descripcion_producto: "",
        id_categoria: "",
        precio_unitario: "",
        archivo: null,
        stock: "",
      });

      setToast({ mostrar: true, mensaje: "Producto registrado correctamente", tipo: "exito" });
    } catch (err) {
      console.error("Error al agregar producto:", err);
      setToast({ mostrar: true, mensaje: "Error al registrar producto", tipo: "error" });
    }
  };

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);
const abrirModalCorreo = () => {
    setEmailDestino("");
    setMostrarModalCorreo(true);
  };

  const formatearProductosParaCorreo = () => {
    if (productos.length === 0) return "No hay productos registrados.";

    let texto = `LISTADO DE PRODUCTOS\n\n`;
    texto += `Fecha: ${new Date().toLocaleDateString("es-NI")}\n`;
    texto += `Total de productos: ${productos.length}\n\n`;

productos.forEach((prod, index) => {
  texto += `${index + 1}. ${prod.nombre_producto}\n`;

  if (prod.descripcion_producto) {
    texto += `   Descripción: ${prod.descripcion_producto}\n`;
  }

  if (prod.id_categoria) {
    texto += `   Categoría: ${prod.id_categoria}\n`;
  }

  if (prod.precio_unitario) {
    texto += `   Precio Unitario: C$ ${prod.precio_unitario}\n`;
  }

  if (prod.stock) {
    texto += `   Stock: ${prod.stock}\n`;
  }

  if (prod.archivo) {
    texto += `   Imagen: ${prod.archivo}\n`;
  }

  texto += `\n`;
});

return texto;
  };
    const enviarCorreoProductos = () => {
    if (!emailDestino.trim()) {
      setToast({
        mostrar: true,
        mensaje: "Por favor ingresa un correo destino.",
        tipo: "advertencia",
      });
      return;
    }

    setEnviandoCorreo(true);

    const mensaje = formatearProductosParaCorreo();

    const templateParams = {
      to_name: "Administrador",
      user_email: emailDestino,
      message: mensaje,
      fecha_envio: new Date().toLocaleDateString("es-NI")
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams
    )
      .then(() => {
        setToast({
          mostrar: true,
          mensaje: "Correo enviado correctamente.",
          tipo: "exito",
        });
        setMostrarModalCorreo(false);
        setEmailDestino("");
      })
      .catch((error) => {
        console.error("Error EmailJS:", error);
        setToast({
          mostrar: true,
          mensaje: "Error al enviar el correo.",
          tipo: "error",
        });
      })
      .finally(() => {
        setEnviandoCorreo(false);
      });
  };




  return (
    <Container className="mt-3">
<Row className="align-items-center mb-3">
  <Col xs={8} sm={8} md={8} lg={8} className="d-flex align-items-center">
    <h3 className="mb-0">
      <i className="bi-bookmark-plus-fill me-2"></i> Produtos
    </h3>
  </Col>
  <Col xs={2} sm={2} md={2} lg={2} className="text-end">
    <Button variant="primary" onClick={abrirModalCorreo} size="md">
      <i className="bi bi-envelope"></i>
      <span className="d-none d-lg-inline ms-2">Enviar por Correo</span>
    </Button>
  </Col>
  <Col xs={2} sm={2} md={2} lg={2} className="text-end">
    <Button
      onClick={() => setMostrarModal(true)}
      size="md"
    >
      <i className="bi-plus-lg"></i>
      <span className="d-none d-lg-inline ms-2">Nuevo Producto</span>
    </Button>
  </Col>
</Row>


      <hr />

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

      <Col xs={12} md={12} lg={12}>
        {/* Spinner de carga de productos */}
        {cargando && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="success" size="lg" />
            <p className="mt-3 text-muted">Cargando productos...</p>
          </div>
        )}
      </Col>


      {/* Mensaje de no coincidencias solo cuando hay búsqueda y no hay resultados */}
      {!cargando && textoBusqueda.trim() && productosFiltrados.length === 0 && (
        <Row className="mb-4">
          <Col>
            <Alert variant="info" className="text-center">
              <i className="bi bi-info-circle me-2"></i>
              No se encontraron productos que coincidan con "{textoBusqueda}".
            </Alert>
          </Col>
        </Row>
      )}

      {/* Paginación */}
      {productosPaginados.length > 0 && (
        <Paginacion
          registrosPorPagina={registrosPorPagina}
          totalRegistros={productosFiltrados.length}
          paginaActual={paginaActual}
          establecerPaginaActual={setPaginaActual}
          establecerRegistrosPorPagina={setRegistrosPorPagina}
        />
      )}

      {/* Lista de productos filtrados */}
      {!cargando && productosPaginados.length > 0 && (
        <Row>
          <Col xs={12} sm={12} md={12} className="d-lg-none">
            <TarjetaProductos
              productos={productosPaginados}
              categorias={categorias}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
            />
          </Col>
          <Col lg={12} className="d-none d-lg-block">
            <TablaProductos
              productos={productosPaginados}
              categorias={categorias}
              abrirModalEdicion={abrirModalEdicion}
              abrirModalEliminacion={abrirModalEliminacion}
              generarQRImagen={generarQRImagen}


            />
          </Col>
        </Row>
      )}

      {/* Modales */}

      <ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejoCambioInput={manejoCambioInput}
        manejoCambioArchivo={manejoCambioArchivo}
        agregarProducto={agregarProducto}
        categorias={categorias}
      />

      {/* Modal de Edición */}
      <ModalEdicionProducto
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        productoEditar={productoEditar}
        manejoCambioInputEdicion={manejoCambioInputEdicion}
        manejoCambioArchivoActualizar={manejoCambioArchivoActualizar}
        actualizarProducto={actualizarProducto}
        categorias={categorias}
      />

      {/* Modal de Eliminación */}
      <ModalEliminacionProducto
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarProducto={eliminarProducto}
        productoAEliminar={productoAEliminar}
      />

      <ModalQRProducto
        mostrar={mostrarModalQR}
        onHide={() => setMostrarModalQR(false)}
        producto={productoQR}
      />

      <NotificacionOperacion
        mostrar={toast.mostrar}
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        onCerrar={() => setToast({ ...toast, mostrar: false })}
      />

<ModalEnvioCorreoProductos
  mostrarModalCorreo={mostrarModalCorreo}
  setMostrarModalCorreo={setMostrarModalCorreo}
  emailDestino={emailDestino}
  setEmailDestino={setEmailDestino}
  enviandoCorreo={enviandoCorreo}
  enviarCorreoProducto={enviarCorreoProductos}
  totalProductos={productos.length}
/>

    </Container>

  );
};

export default Productos;