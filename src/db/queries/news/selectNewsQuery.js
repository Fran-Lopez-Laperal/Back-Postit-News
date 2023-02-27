const getDB = require("../../getDB");

const selectNewsQuery = async () => {
  let connection;
  try {
    connection = await getDB();

    let [news] = await connection.query(`

        SELECT N.*, count(V.idNew) as numVotes , V.id, V.idUser, V.idNew FROM news N 
        LEFT JOIN votes V ON N.id = V.idNew 
        GROUP BY N.id
        ORDER BY numVotes DESC`);

    return news;
  } finally {
    connection?.release();
  }
};

module.exports = selectNewsQuery;
