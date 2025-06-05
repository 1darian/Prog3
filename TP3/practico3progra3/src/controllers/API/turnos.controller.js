const turnosModel = require("./../../models/mock/turnos.models.js")
const Turno = require("./../../models/mock/entities/turno.entity.js")

class TurnosController {
  // GET /api/v1/turnos/:idPaciente - Consultar turnos por paciente
  async getTurnosByPaciente(req, res) {
    try {
      const { idPaciente } = req.params

      if (!idPaciente || isNaN(idPaciente)) {
        return res.status(400).json({
          message: "ID de paciente inválido",
        })
      }

      const turnos = await turnosModel.getTurnosByPacienteId(idPaciente)

      res.status(200).json({
        message: "Turnos consultados exitosamente",
        idPaciente: Number(idPaciente),
        cantidad: turnos.length,
        turnos: turnos,
      })
    } catch (error) {
      res.status(500).json({
        message: "Error interno del servidor",
        error: error.message,
      })
    }
  }

  // DELETE /api/v1/turnos/:idTurno - Cancelar un turno
  async cancelarTurno(req, res) {
    try {
      const { idTurno } = req.params

      if (!idTurno || isNaN(idTurno)) {
        return res.status(400).json({
          message: "ID de turno inválido",
        })
      }

      const resultado = await turnosModel.cancelarTurno(idTurno)

      res.status(200).json(resultado)
    } catch (error) {
      if (error.message === "Turno no encontrado") {
        res.status(404).json({
          message: error.message,
        })
      } else if (error.message === "El turno ya está cancelado") {
        res.status(409).json({
          message: error.message,
        })
      } else {
        res.status(500).json({
          message: "Error interno del servidor",
          error: error.message,
        })
      }
    }
  }

  // Métodos adicionales para funcionalidades futuras
  async list(req, res) {
    try {
      const turnos = await turnosModel.list()
      res.status(200).json(turnos)
    } catch (error) {
      res.status(500).json({
        message: "Error al listar turnos",
        error: error.message,
      })
    }
  }

  async create(req, res) {
    try {
      const { idPaciente, fecha, hora, especialidad, medico } = req.body

      if (!idPaciente || !fecha || !hora || !especialidad || !medico) {
        return res.status(400).json({
          message: "Faltan datos obligatorios",
        })
      }

      const nuevoTurno = new Turno(idPaciente, fecha, hora, especialidad, medico)
      const turnoCreado = await turnosModel.create(nuevoTurno)

      res.status(201).json({
        message: "Turno creado exitosamente",
        turno: turnoCreado,
      })
    } catch (error) {
      res.status(500).json({
        message: "Error al crear turno",
        error: error.message,
      })
    }
  }

  async getTurnoById(req, res) {
    try {
      const { idTurno } = req.params

      if (!idTurno || isNaN(idTurno)) {
        return res.status(400).json({
          message: "ID de turno inválido",
        })
      }

      const turno = await turnosModel.getTurnoById(idTurno)
      res.status(200).json(turno)
    } catch (error) {
      if (error.message === "Turno no encontrado") {
        res.status(404).json({
          message: error.message,
        })
      } else {
        res.status(500).json({
          message: "Error interno del servidor",
          error: error.message,
        })
      }
    }
  }
}

module.exports = new TurnosController()
