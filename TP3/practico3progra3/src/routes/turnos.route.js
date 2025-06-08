const { Router } = require("express")
const turnosController = require("../controllers/API/turnos.controller.js")
const {validate} = require("../middlewares/validate.js")
const turnoSchema = require("../schemas/turnos.schema.js")
const rutaTurnos = Router()

// Rutas adicionales para funcionalidades futuras
rutaTurnos.get("/", turnosController.list)
rutaTurnos.post("/", validate(turnoSchema.create), turnosController.create)
rutaTurnos.get("/detalle/:idTurno", turnosController.getTurnoById)
rutaTurnos.get("/nuevo", (req, res) => {
    res.render("turnos/form", { error: undefined});
})

rutaTurnos.get("/cancelar/:idTurno", async (req, res) => {
    // Llama al método cancelarTurno del controlador, pero desde GET
    try {
        await require("../controllers/API/turnos.controller.js").cancelarTurnoGet(req, res);
    } catch (error) {
        res.status(500).send("Error al cancelar el turno");
    }
});

// Rutas obligatorias según requerimientos (van al final)
rutaTurnos.get("/:idPaciente", turnosController.getTurnosByPaciente)
rutaTurnos.delete("/:idTurno", turnosController.cancelarTurno)

module.exports = rutaTurnos