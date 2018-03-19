const fs = require('fs');
const users = cargarUsuarios();

/**
 * GET     /api/users              ->  getAll
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  getById
 **/

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.create = create;

function getAll(req, res) {
    return res.json(users)
}

function getById(req, res) {
    const id = +req.params.id;
    a * 5;
    if (!id)
        return res
            .status(400)
            .send('No has especificado el id correctamente en la url');
    const user = users.find(u => u.id === id);
    if (!user)
        return res
            .status(404)
            .send(`No existe ningún usuario con el id ${id}`);
    else
        return res.json(user);
}

function create(req, res) {
    const body = req.body;
    if (invalidBody(body)) {
        return res
            .status(400)
            .send('Cuerpo de la solicitud vacío o inválido');
    }
    const { name, email } = req.body;
    const user = { name, email }
    user.id = generateId();
    users.push(user);
    return res.json(user);
}

// Auxiliars 
function cargarUsuarios() {
    const fileData = fs.readFileSync(__dirname + '/../../data/users.json');
    return JSON.parse(fileData);
}

function generateId() {
    return users.length + 1;
}

function invalidBody(body) {
    return !body || !Object.keys(body).length;
}