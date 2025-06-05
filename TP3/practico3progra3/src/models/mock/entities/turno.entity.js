const Identificador = require("./identificador.entity")

class Turno extends Identificador {
  constructor(idPaciente, fecha, hora, especialidad, medico, estado = "activo", id = 0) {
    super(id)
    this.idPaciente = idPaciente
    this.fecha = fecha
    this.hora = hora
    this.especialidad = especialidad
    this.medico = medico
    this.estado = estado // 'activo', 'cancelado', 'completado'
    this.fechaCreacion = new Date()
  }
}

module.exports = Turno
