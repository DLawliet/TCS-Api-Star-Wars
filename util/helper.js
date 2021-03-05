const { Validator } = require('node-input-validator');

module.exports.validateRequest = async (data, struct) => {
    const validator = new Validator(data, struct);
    const matched = await validator.check();
    if (!matched) {
        throw validator.errors;
    }
}

module.exports.errorResponse = async (err, res) => {
    res.status(400).json({
        mensaje: 'Error',
        validacion: err,
    });
}
