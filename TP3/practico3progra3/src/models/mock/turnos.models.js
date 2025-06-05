const Turno = require("./entities/turno.entity.js")

class TurnosModel {
  constructor() {
    this.data = []
    this.id = 1

    // Datos mock de ejemplo
    this.data.push(
      new Turno(1, "2024-12-10", "09:00", "Cardiología", "Dr. García", "activo", 1),
      new Turno(1, "2024-12-15", "14:30", "Dermatología", "Dra. López", "activo", 2),
      new Turno(1, "2024-12-20", "11:00", "Oftalmología", "Dr. Martínez", "cancelado", 3),
    )
    this.id = 4
  }

  // Obtener turnos por ID de paciente
  getTurnosByPacienteId(idPaciente) {
    return new Promise((resolve, reject) => {
      try {
        const pacienteId = Number(idPaciente)
        const turnos = this.data.filter((turno) => turno.idPaciente === pacienteId && turno.estado !== "cancelado")

        if (turnos.length === 0) {
          resolve([])
        } else {
          resolve(turnos)
        }
      } catch (error) {
        reject(new Error("Error al consultar turnos del paciente"))
      }
    })
  }

  // Cancelar un turno por ID
  cancelarTurno(idTurno) {
    return new Promise((resolve, reject) => {
      try {
        const turnoId = Number(idTurno)
        const turno = this.data.find((t) => t.id === turnoId)

        if (!turno) {
          throw new Error("Turno no encontrado")
        }

        if (turno.estado === "cancelado") {
          throw new Error("El turno ya está cancelado")
        }

        turno.estado = "cancelado"
        turno.fechaCancelacion = new Date()

        resolve({
          message: "Turno cancelado exitosamente",
          turno: turno,
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  // Obtener turno por ID
  getTurnoById(idTurno) {
    return new Promise((resolve, reject) => {
      try {
        const turnoId = Number(idTurno)
        const turno = this.data.find((t) => t.id === turnoId)

        if (!turno) {
          throw new Error("Turno no encontrado")
        }

        resolve(turno)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Crear un nuevo turno
  create(turno) {
    return new Promise((resolve, reject) => {
      try {
        turno.id = this.id
        this.id++
        this.data.push(turno)
        resolve(turno)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Listar todos los turnos
  list() {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.data)
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = new TurnosModel()
