const { generateError } = require("../../../helpers");
const getBD = require("../../getDB");

const selectNewByIdQuery = async (idNew) => {
  let connection;
  try {
    connection = await getBD();

    let [infoNew] = await connection.query(
      `SELECT count(*) as numVotes, N.*, V.value FROM news N
LEFT JOIN votes V ON V.idNew = N.id WHERE N.id= ? GROUP BY V.value; `,
      [idNew]
    );

    if (infoNew.length < 1) {
      generateError("Noticia no encontrada", 404);
    }

    return infoNew;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectNewByIdQuery;
