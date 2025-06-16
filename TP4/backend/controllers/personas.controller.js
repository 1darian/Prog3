const personas = require('../models/personas.model');

const obtenerPersonas = (req, res) => {
  res.json(personas);
};

module.exports = {
  obtenerPersonas
};
