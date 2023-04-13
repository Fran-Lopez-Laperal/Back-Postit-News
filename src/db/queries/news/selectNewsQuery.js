const getDB = require("../../getDB");

const selectNewsQuery = async () => {
  let connection;
  try {
    connection = await getDB();

    let [news] = await connection.query(`
<<<<<<< HEAD
      SELECT N.*, U.name as userName, U.email as userEmail, U.avatar as userAvatar, C.name as categoryName, 
        (SELECT count(*) FROM news WHERE value="like") as totalLikes, 
        (SELECT count(*) FROM news 
          WHERE value="dislike") as totalDisLikes 
          FROM news N 
              LEFT JOIN votes V ON N.id = V.idNew
             INNER JOIN users U ON U.id = N.idUser
             INNER JOIN categories C ON C.id = N.idCategory`);
    /* SELECT count(V.idNew) as numVotes,V.value="like", V.value="dislike", N.id as idNew, N.* FROM news N 
=======

    SELECT C.name as nameCategory, U.name, U.email,U.avatar, N.*, (SELECT count(*) FROM news WHERE value="like") as totalLikes, 
    (SELECT count(*) FROM news 
    WHERE value="dislike") as totalDisLikes 
    FROM news N 
    LEFT JOIN votes V ON N.id = V.idNew
    LEFT JOIN users U ON U.id = N.idUser
    LEFT JOIN categories C ON C.id = N.idCategory
    `
        
        );
        /* SELECT count(V.idNew) as numVotes,V.value="like", V.value="dislike", N.id as idNew, N.* FROM news N 
>>>>>>> 24bd39784259ac6be6582fff770d9d99d4d5855d
        LEFT JOIN votes V ON N.id = V.idNew 
        GROUP BY N.id, V.value ="like", V.value="dislike"
        ORDER BY numVotes DESC` */

    return news;
  } finally {
    connection?.release();
  }
};

module.exports = selectNewsQuery;
