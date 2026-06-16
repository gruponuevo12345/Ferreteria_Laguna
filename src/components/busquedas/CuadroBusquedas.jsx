const CuadroBusquedas = ({ textoBusqueda, manejarCambioBusqueda }) => {
  return (
    <div className="buscador-container">
      <i className="bi bi-search buscador-icono"></i>

      <input
        type="text"
        className="buscador-input"
        placeholder="Buscar..."
        value={textoBusqueda}
        onChange={manejarCambioBusqueda}
      />
    </div>
  );
};

export default CuadroBusquedas;