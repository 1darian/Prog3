const express = require('express');
const router = express.Router();
const { obtenerPersonas } = require('../controllers/personas.controller');

router.get('/', obtenerPersonas);

module.exports = router;
