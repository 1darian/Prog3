const { Router } = require("express")
const turnosController = require("../controllers/API/turnos.controller.js")
const { verifyTokenMiddleware } = require("../middlewares/verifyToken.middleware.js")

const rutaTurnos = Router()

// Rutas obligatorias según requerimientos
rutaTurnos.get("/:idPaciente", verifyTokenMiddleware, turnosController.getTurnosByPaciente)
rutaTurnos.delete("/:idTurno", verifyTokenMiddleware, turnosController.cancelarTurno)

// Rutas adicionales para funcionalidades futuras
rutaTurnos.get("/", verifyTokenMiddleware, turnosController.list)
rutaTurnos.post("/", verifyTokenMiddleware, turnosController.create)
rutaTurnos.get("/detalle/:idTurno", verifyTokenMiddleware, turnosController.getTurnoById)

module.exports = rutaTurnos
