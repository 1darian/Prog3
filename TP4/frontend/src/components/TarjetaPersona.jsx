import "./TarjetaPersona.css"

const TarjetaPersona = ({ persona }) => {
  const { id, nombre, apellido, edad, email } = persona

  const getInitials = (nombre, apellido) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="tarjeta-persona">
      <div className="tarjeta-header">
        <div className="avatar">{getInitials(nombre, apellido)}</div>
        <div className="persona-info">
          <h3 className="nombre-completo">
            {nombre} {apellido}
          </h3>
          <span className="persona-id">ID: {id}</span>
        </div>
      </div>

      <div className="tarjeta-body">
        <div className="info-item">
          <span className="info-icon">👤</span>
          <div className="info-content">
            <span className="info-label">Edad</span>
            <span className="info-value">{edad} años</span>
          </div>
        </div>

        <div className="info-item">
          <span className="info-icon">📧</span>
          <div className="info-content">
            <span className="info-label">Email</span>
            <span className="info-value">{email}</span>
          </div>
        </div>
      </div>

      <div className="tarjeta-footer">
        <button className="contact-button">Contactar</button>
      </div>
    </div>
  )
}

export default TarjetaPersona
