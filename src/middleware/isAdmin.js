const selectUserByIdQuery = require("../db/queries/users/selectUserByIdQuery");
const selectUserByRoleQuery = require("../db/queries/users/selectUserByRoleQuery");
const { generateError } = require("../helpers");

const isAdmin = async (req, res, next) => {
    try {

        const adminUser = await selectUserByRoleQuery(req.user.id);
        console.log('HOLA AMIGOOOOOOOOSS', adminUser.role)

        if(adminUser.role === null){
            generateError('Este Usuario no es un administrador')
        }

        if (adminUser.role === 'admin') {
            next()
        }
    } catch (err) {
        next(err);
    }
}




module.exports = isAdmin;