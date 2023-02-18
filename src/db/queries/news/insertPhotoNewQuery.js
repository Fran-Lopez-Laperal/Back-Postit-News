const getDB = require('../../getDB');

const insertPhotoNewQuery = async (photo, idNew) => {
    let connection;

    try {
        connection = await getDB();

        //¿no tendría que tener una tabla aparte para las fotos de las news?
        const [newPhoto] = await connection.query(
            `UPDATE news SET image = ? WHERE id = ?`,
            [photo, idNew]
        );
        console.log(photo, idNew);
        return newPhoto.insertId;

    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertPhotoNewQuery;