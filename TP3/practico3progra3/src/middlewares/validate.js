const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error) {
            // Si la petición espera HTML (formulario), renderiza la vista con el error
            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                return res.render('turnos/form', { error: error.details[0].message });
            }
            // Si es API, responde con JSON
            return res.status(400).json({
                success: false,
                error: error.details[0].message
            });
        }
        next();
    };
}

module.exports = { validate };