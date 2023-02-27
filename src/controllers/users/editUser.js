const editUserQuery = require("../../db/queries/users/editUserQuery");
const { generateError } = require("../../helpers");


const editUser = async (req, res, next) => {
    try {
        let { name, email, bio } = req.body;
        let {id} = req.user;
        console.log(id);
        if (!name && !email) {
            generateError('Faltan campos', 400)
        }
        
        await editUserQuery(name, email, bio, id);

        res.send({
            status: 'ok',
            message: 'Usuario actualizado'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = editUser;