const { validateRequest } = require("../util/helper");

const inputs = {
    /***
     * struct input request
     */
    create: {
        nombre: 'required|string',
        periodo_rotacion: 'required|integer',
        periodo_orbital: 'required|integer',
        diametro: 'required|integer',
        clima: 'required|string',
        gravedad: 'required|string',
        terreno: 'required|string',
        superficie_agua: 'required|integer',
        poblacion: 'required|string',
    },

    update: {
        nombre: 'string',
        periodo_rotacion: 'integer',
        periodo_orbital: 'integer',
        diametro: 'integer',
        clima: 'string',
        gravedad: 'string',
        terreno: 'string',
        superficie_agua: 'integer',
        poblacion: 'string',
    },


}


const validator = {
    request: {
        createPlanet: async (body) => {
            await validateRequest(body, inputs.create);
        },
        updatePlanet: async (body) => {
            await validateRequest(body, inputs.update);
        }
    }
}

module.exports.validator = validator;
