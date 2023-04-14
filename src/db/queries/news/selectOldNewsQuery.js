const getDB = require("../../getDB");


const selectOldNewsQuery = async () => {
    let connection;

    try {

        connection = await getDB();

        let [news] = await connection.query(
            `SELECT * FROM news WHERE DATE(createdAt) < CURDATE() ORDER BY createdAt
            `
        )
        return news

    } finally {
        if (connection) connection.release()
    }

}

module.exports = selectOldNewsQuery;