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

  async cancelarTurnoGet(req, res) {
    try {
      const { idTurno } = req.params

      if (!idTurno || isNaN(idTurno)) {
        return res.status(400).send("ID de turno inválido");
      }

      await turnosModel.cancelarTurno(idTurno);

      // Redirige a la lista de turnos después de cancelar
      res.redirect("/api/v1/turnos");
    } catch (error) {
      let msg = "Error al cancelar el turno";
      if (error.message === "Turno no encontrado" || error.message === "El turno ya está cancelado") {
        msg = error.message;
      }
      res.status(400).send(msg);
    }
  }

  // Métodos adicionales para funcionalidades futuras
async list(req, res) {
      try {
          const turnos = await turnosModel.list(); // Usa el método correcto del modelo
          res.render("turnos/list", { turnos }); // Renderiza la vista EJS y pasa los turnos
      } catch (error) {
          res.status(500).send("Error al obtener los turnos");
      }
  }

   async create(req, res) {
    try {
      let { idPaciente, fecha, hora, especialidad, medico } = req.body

      if (!idPaciente || !fecha || !hora || !especialidad || !medico) {
        // Si viene de un formulario, renderiza el form con error
        return res.render("turnos/form", { error: "Faltan datos obligatorios" });
      }

      idPaciente = Number(idPaciente); // <-- Asegura que sea número

      const nuevoTurno = new Turno(idPaciente, fecha, hora, especialidad, medico)
      const turnoCreado = await turnosModel.create(nuevoTurno)

      return res.redirect("/api/v1/turnos");
    } catch (error) {
      return res.render("turnos/form", { error: "Error al crear turno" });
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
