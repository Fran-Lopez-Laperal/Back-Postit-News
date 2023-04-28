const { generateError } = require("../../../helpers");
const getDB = require("../../getDB");



const selectUserByEmailQuery = async (email) => {
    let connection;

    try {

        connection = await getDB();

        let [users] = await connection.query(
            `SELECT id , password FROM users WHERE email = ?`,
            [email]
        )

        if (users.length < 1) {
            generateError('Email no válido', 404);
        }

        return users[0]
    } finally {
        if (connection) connection.release()
    }
}

module.exports = selectUserByEmailQuery;