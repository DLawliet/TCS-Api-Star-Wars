const _ = require('lodash');
const { COLLECTIONS } = require("../config/collections");
const { connectToDatabase, getNextSequence } = require("../config/database");
const { validator } = require("../request/planetValidator");
const { errorResponse } = require("../util/helper");

module.exports.getAllPlanets = async (req, res) => {
    const db = await connectToDatabase();
    const collection = await db.collection(COLLECTIONS.PLANETS);
    const planets = await collection.find().toArray();

    return res.status(200).json({
        coleccion: COLLECTIONS.PLANETS,
        total: planets.length,
        resultado: planets,
    });
}

module.exports.findPlanetById = async (req, res) => {
    const id = Number(req.params.id);
    if (_.isInteger(id) && id > 0) {
        const db = await connectToDatabase();
        const collection = await db.collection(COLLECTIONS.PLANETS);
        const planet = await collection.findOne({ "_id": id });
        if (planet != null) {
            return res.status(200).json({
                coleccion: COLLECTIONS.PLANETS,
                total: 1,
                resultado: planet,
            });
        }
    }
    return res.status(200).json({
        coleccion: COLLECTIONS.PLANETS,
        mensaje: 'registro no encontrado',
        total: 0,
        resultado: null,
    });
}

module.exports.createPlanet = async (req, res) => {
    try {
        await validator.request.createPlanet(req.body);

        const db = await connectToDatabase();
        const id = await getNextSequence(db, COLLECTIONS.PLANETS);
        const collection = await db.collection(COLLECTIONS.PLANETS);
        const planet = req.body;
        planet._id = id;
        planet.created_at = new Date();
        planet.updated_at = new Date();
        const result = await collection.insertOne(planet);
        const { ops } = result;
        if (ops.length === 1) {
            return res.status(200).json({
                mensaje: 'planeta fue creado',
                resultado: ops[0],
            });
        }
        return res.status(500).json({
            error: 'Error en base de datos',
            mensaje: 'Planeta no pudo ser creado'
        });
    } catch (error) {
        errorResponse(error, res);
    }
}

module.exports.updatePlanet = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (_.isInteger(id) && id > 0) {
            await validator.request.updatePlanet(req.body);

            const db = await connectToDatabase();
            const collection = await db.collection(COLLECTIONS.PLANETS);

            const result = await collection.findOneAndUpdate(
                { _id: id },
                { $set: req.body },
                { upsert: false }
            );
            const { value } = result;
            if (value != null) {
                return res.status(200).json({
                    mensaje: 'planeta fue actualizado',
                    resultado: { ...value, ...req.body },
                });
            }
        }

        return res.status(404).json({
            error: '404',
            mensaje: `Planeta con id:${id} no fue encontrado`,
        });
    } catch (error) {
        errorResponse(error, res);
    }

}

module.exports.deletePlanet = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (_.isInteger(id) && id > 0) {
            const db = await connectToDatabase();
            const collection = await db.collection(COLLECTIONS.PLANETS);

            const result = await collection.deleteOne(
                { _id: id },
            );
            const { deletedCount } = result;
            if (deletedCount === 1) {
                return res.status(200).json({
                    mensaje: 'planeta fue eliminado',
                    resultado: { id: id },
                });
            }
        }

        return res.status(404).json({
            error: '404',
            mensaje: `Planeta con id:${id} no fue encontrado`,
        });
    } catch (error) {
        errorResponse(error, res);
    }
}
