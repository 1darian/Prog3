import TarjetaPersona from "./TarjetaPersona"
import "./ListaTarjetas.css"

const ListaTarjetas = ({ personas }) => {
  if (!personas || personas.length === 0) {
    return (
      <div className="no-personas">
        <h3>No hay personas para mostrar</h3>
        <p>La lista está vacía o no se pudieron cargar los datos.</p>
      </div>
    )
  }

  return (
    <div className="lista-container">
      <h2>Total de personas: {personas.length}</h2>
      <div className="lista-tarjetas">
        {personas.map((persona) => (
          <TarjetaPersona key={persona.id} persona={persona} />
        ))}
      </div>
    </div>
  )
}

export default ListaTarjetas
