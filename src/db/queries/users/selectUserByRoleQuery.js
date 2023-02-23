const { generateError } = require("../../../helpers");
const getDB = require("../../getDB");

const selectUserByRoleQuery = async (idAdmin) => {
    let connection;

    try {

        connection = await getDB();


        let [users] = await connection.query(
            `SELECT role FROM users WHERE id = ?`,
            [idAdmin]
        )

        if (users.length < 1) {
            generateError('Este usuario no tiene derechos de Administrador')
        }

        return users[0]
    } finally {
        if (connection) connection.release()
    }
}


module.exports = selectUserByRoleQuery;