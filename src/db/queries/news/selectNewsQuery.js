const getDB = require("../../getDB");

const selectNewsQuery = async () => {
  let connection;
  try {
    connection = await getDB();

    let [news] = await connection.query(`

        SELECT count(V.idNew) as numVotes,V.value="like", V.value="dislike", N.id as idNew, N.* FROM news N 
        LEFT JOIN votes V ON N.id = V.idNew 
        GROUP BY N.id, V.value ="like", V.value="dislike"
        ORDER BY numVotes DESC`);

    return news;
  } finally {
    connection?.release();
  }
};

module.exports = selectNewsQuery;
