const getDB = require("../../getDB");


const selectOldNewsQuery = async () => {
    let connection;

    try {

        connection = await getDB();

        let [news] = await connection.query(
            
            `SELECT C.name as nameCategory, U.name, U.email, U.avatar, N.*, 
            SUM(CASE WHEN V.value = "like" THEN 1 ELSE 0 END) as totalLikes,
            SUM(CASE WHEN V.value = "dislike" THEN 1 ELSE 0 END) as totalDisLikes
            FROM news N 
            LEFT JOIN votes V ON N.id = V.idNew
            LEFT JOIN users U ON U.id = N.idUser
            LEFT JOIN categories C ON C.id = N.idCategory
            WHERE DATE(N.createdAt) < CURDATE() 
            GROUP BY N.id 
            ORDER BY N.createdAt
        `

        )
        return news

    } finally {
        if (connection) connection.release()
    }

}

module.exports = selectOldNewsQuery;