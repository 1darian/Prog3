const {Router} = require('express');
const pacientesController = require('../controllers/API/pacientes.controller.js');
const  {verifyTokenMiddleware}  = require('../middlewares/verifyToken.middleware.js');
const rutaPacientes = Router();
rutaPacientes.get('/', verifyTokenMiddleware, pacientesController.list);
rutaPacientes.post('/login',pacientesController.login)
rutaPacientes.post('/',verifyTokenMiddleware,pacientesController.create);
rutaPacientes.put('/:id',verifyTokenMiddleware,pacientesController.update);
rutaPacientes.delete('/:id',verifyTokenMiddleware,pacientesController.delete);

//Otras rutas CRUD
rutaPacientes.get('/mostrar', async (req, res) => {
    const pacientesModel = require('../models/mock/pacientes.models.js');
    const pacientes = await pacientesModel.list();
    res.render('turnos/pacientes', { pacientes });
});
rutaPacientes.get('/eliminar/:id', async (req, res) => {
    const pacientesModel = require('../models/mock/pacientes.models.js');
    try {
        await pacientesModel.delete(req.params.id);
        res.redirect('/api/v1/pacientes/mostrar');
    } catch (error) {
        res.status(400).send("Error al eliminar paciente");
    }
});
module.exports = rutaPacientes;