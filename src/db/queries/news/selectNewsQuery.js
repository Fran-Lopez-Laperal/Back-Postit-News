const getDB = require("../../getDB");

const selectNewsQuery = async () => {
  let connection;
  try {
    connection = await getDB();

    let [news] = await connection.query(`
      SELECT N.*, U.name as userName, U.email as userEmail, U.avatar as userAvatar, C.name as categoryName, 
        (SELECT count(*) FROM news WHERE value="like") as totalLikes, 
        (SELECT count(*) FROM news 
          WHERE value="dislike") as totalDisLikes 
          FROM news N 
              LEFT JOIN votes V ON N.id = V.idNew
             INNER JOIN users U ON U.id = N.idUser
             INNER JOIN categories C ON C.id = N.idCategory`);
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
