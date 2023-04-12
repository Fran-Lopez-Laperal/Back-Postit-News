const { generateError } = require("../../../helpers");
const getBD = require("../../getDB");

const selectNewByIdQuery = async (idNew) => {
  let connection;
  try {
    connection = await getBD();

    let [infoNew] = await connection.query(
      `SELECT N.*, U.name as userName, U.email as userEmail, U.avatar as userAvatar, C.name as categoryName, 
(SELECT count(*) FROM news WHERE value="like") as totalLikes, 
(SELECT count(*) FROM news 
    WHERE value="dislike") as totalDisLikes 
    FROM news N 
    LEFT JOIN votes V ON N.id = V.idNew
    INNER JOIN users U ON U.id = N.idUser
    INNER JOIN categories C ON C.id = N.idCategory
    WHERE N.id=2 `,
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
