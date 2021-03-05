/**
 * Run local server
 */

const { server } = require('./handler');

server.listen(3000, () => {
    console.info(`Listening on port 3000.`);
});
