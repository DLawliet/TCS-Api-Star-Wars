module.exports = async (req, res) => {
    const enpoints = {
        app: 'tata-consultancy-services-api-star-wars',
        description: 'Api de Star Wars',
        author: 'Jonathan David Gutierrez Matos',
        database: 'MongoDB',
        services: {
            planetas: [
                {
                    url: '/planetas',
                    method: 'GET',
                    description: 'Lista de planetas',
                },
                {
                    url: '/planetas/{ID}',
                    method: 'GET',
                    description: 'Buscar un planeta por id',
                },
                {
                    url: '/planetas',
                    method: 'POST',
                    description: 'Crear un planeta',
                },
                {
                    url: '/planetas/{ID}',
                    method: 'PUT',
                    description: 'Actualizar información de un planeta',
                },
                {
                    url: '/planetas/{ID}',
                    method: 'DELETE',
                    description: 'Eliminar un planeta',
                },
            ]
        }
    };

    res.status(200).json(enpoints);
}
