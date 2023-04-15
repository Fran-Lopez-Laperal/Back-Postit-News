const { generateError } = require("../../../helpers");
const getBD = require("../../getDB");
const selectNewByIdQuery = async (idNew) => {
  let connection;
  try {
    connection = await getBD();

    let [infoNew] = await connection.query(
       `
       SELECT C.name as nameCategory, U.name, U.email, U.avatar, N.*, 
    SUM(CASE WHEN V.value = "like" THEN 1 ELSE 0 END) as totalLikes,
    SUM(CASE WHEN V.value = "dislike" THEN 1 ELSE 0 END) as totalDisLikes
    FROM news N 
    LEFT JOIN votes V ON N.id = V.idNew
    LEFT JOIN users U ON U.id = N.idUser
    LEFT JOIN categories C ON C.id = N.idCategory
    GROUP BY N.id HAVING N.id=? `,
      [idNew]
    );

    if (infoNew.length < 1) {
      generateError(
        `No se encontraron noticias para la categoría "${nameCategory[0].name}"`,
        404
      );
    }
    return infoNew;
  } finally {
    if (connection) connection.release();
  }
};
module.exports = selectNewByIdQuery;
