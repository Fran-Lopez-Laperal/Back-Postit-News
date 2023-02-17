const getDB = require('../../getDB');

const insertPhotoQuery = async (photo, idUser) => {
    let connection;

    try {
        connection = await getDB();

        const [newPhoto] = await connection.query(
            `UPDATE users SET avatar = ? WHERE id = ?`,
            [photo, idUser]
        );
        console.log(photo, idUser);

    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPhotoQuery;