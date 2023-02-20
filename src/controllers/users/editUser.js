const editUserQuery = require("../../db/queries/users/editUserQuery");
const { generateError } = require("../../helpers");


const editUser = async (req, res, next) => {
    try {
        let { name, email } = req.body;

        if (!name && !email) {
            generateError('Faltan campos', 400)
        }
        await editUserQuery(name, email, req.user.id);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = editUser;