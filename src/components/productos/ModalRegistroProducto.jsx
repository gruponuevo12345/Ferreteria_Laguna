import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalRegistroProducto = ({ 
  mostrarModal, 
  setMostrarModal,
   nuevoProducto,
   manejoCambioInput,
   manejoCambioArchivo,
   agregarProducto,
   categorias
  }) => {
    
 const [deshablitado, setDeshabilitado] = useState(false);

 const handleAgregar = async () => {
   if (deshablitado) return;
   setDeshabilitado(true);
   await agregarProducto();
   setDeshabilitado(false);
 };

 return (
   <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}backdrop="static" centered
   size="lg">
     <Modal.Header closeButton>
       <Modal.Title>Nuevo Producto</Modal.Title>
     </Modal.Header>


     <Modal.Body>
       <Form>
         <Row>
           {/* Columna: Categoría */}
           <Col xs={12} md={6}>
             <Form.Group className="mb-3">
               <Form.Label>Categoría *</Form.Label>
               <Form.Select
                 name="id_categoria"
                 value={nuevoProducto.id_categoria || ""}
                 onChange={manejoCambioInput}
                 required
               >
                 <option value="">Seleccione...</option>
                 {categorias.map((cat) => (
                   <option key={cat.id_categoria} value={cat.id_categoria}>
                     {cat.nombre_categoria}
                   </option>
                 ))}
               </Form.Select>
             </Form.Group>
           </Col>

           {/* Columna: Nombre */}
           <Col xs={12} md={6}>
             <Form.Group className="mb-3">
               <Form.Label>Nombre *</Form.Label>
               <Form.Control
                 type="text"
                 name="nombre_producto"
                 value={nuevoProducto.nombre_producto || ""}
                 onChange={manejoCambioInput}
                 placeholder="Nombre del producto"
                 required
               />
             </Form.Group>
           </Col>

           {/* Columna: Precio de venta */}
           <Col xs={12}>
             <Form.Group className="mb-3">
               <Form.Label>Precio unitario *</Form.Label>
               <Form.Control
                 type="number"
                 step="0.01"
                 min="0"
                 name="precio_unitario"
                 value={nuevoProducto.precio_unitario || ""}
                 onChange={manejoCambioInput}
                 placeholder="Precio unitario del producto"
                 required
               />
             </Form.Group>
           </Col>

           {/* Columna: Imagen del producto */}
           <Col xs={12}>
             <Form.Group className="mb-3">
               <Form.Label>Imagen del producto *</Form.Label>
               <Form.Control
                 type="file"
                 accept="image/*"
                 onChange={manejoCambioArchivo}
                 required
               />
             </Form.Group>
           </Col>

           {/* Columna: Descripción */}
           <Col xs={12}>
             <Form.Group className="mb-3">
               <Form.Label>Descripción</Form.Label>
               <Form.Control
                 as="textarea"
                 rows={5}
                 name="descripcion_producto"
                 value={nuevoProducto.descripcion_producto || ""}
                 onChange={manejoCambioInput}
                 placeholder="Descripción del producto (opcional)"
               />
             </Form.Group>
           </Col>
         </Row>
       </Form>
     </Modal.Body>

     {/* Columna: Precio de venta */}
           <Col xs={12}>
             <Form.Group className="mb-3">
               <Form.Label>Stock </Form.Label>
               <Form.Control
                 type="number"
                 step="0.01"
                 min="0"
                 name="stock"
                 value={nuevoProducto.stock || ""}
                 onChange={manejoCambioInput}
                 placeholder="Stock del producto"
                 required
               />
             </Form.Group>
           </Col>

     <Modal.Footer>
       <Button variant="secondary" onClick={() => setMostrarModal(false)}>
         Cancelar
       </Button>
       <Button variant="primary" onClick={handleAgregar} disabled={deshablitado}>
         Agregar
       </Button>
     </Modal.Footer>
   </Modal>
 );
}
export default ModalRegistroProducto;