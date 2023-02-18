const getDB = require('../../getDB');

const insertNewQuery = async (title, introduction, text, idUser) => {
    let connection;

    try {
        connection = await getDB();

        const [createNew] = await connection.query(
            `INSERT INTO news (title, introduction, text, idUser) VALUES (?, ?, ?, ?)`,
            [title, introduction, text, idUser]
        );

        return createNew.insertId;
        
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertNewQuery;
