const getDB = require("../../getDB");

const selectNewsQuery = async () => {
  let connection;
  try {
    connection = await getDB();

    let [news] = await connection.query(`

    SELECT C.name as nameCategory, U.name, U.email, U.avatar, N.*, 
    SUM(CASE WHEN V.value = "like" THEN 1 ELSE 0 END) as totalLikes,
    SUM(CASE WHEN V.value = "dislike" THEN 1 ELSE 0 END) as totalDisLikes
    FROM news N 
    LEFT JOIN votes V ON N.id = V.idNew
    LEFT JOIN users U ON U.id = N.idUser
    LEFT JOIN categories C ON C.id = N.idCategory
    GROUP BY N.id
    `

    );
    /* SELECT count(V.idNew) as numVotes,V.value="like", V.value="dislike", N.id as idNew, N.* FROM news N 
    LEFT JOIN votes V ON N.id = V.idNew 
    GROUP BY N.id, V.value ="like", V.value="dislike"
    ORDER BY numVotes DESC` */



    return news;
  } finally {
    connection?.release();
  }
};

module.exports = selectNewsQuery;
