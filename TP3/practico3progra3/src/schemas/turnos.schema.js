const Joi = require('joi');

const turnoSchema = {
    create: Joi.object({
        idPaciente: Joi.number().integer().required(),
        fecha: Joi.date().required(),
        hora: Joi.string().required(),
        especialidad: Joi.string().required(),
        medico: Joi.string().required().min(3).message('El nombre del médico debe tener al menos 3 caracteres'),
        estado: Joi.string().valid('activo', 'cancelado', 'completado')
    }),
}

module.exports = turnoSchema;