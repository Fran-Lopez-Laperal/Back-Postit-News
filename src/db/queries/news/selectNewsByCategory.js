const { generateError } = require("../../../helpers");
const getDB = require("../../getDB");

const selectNewsByCategory = async (idCategory) => {
  let connection;

  try {
    connection = await getDB();

    const [newsByCategory] = await connection.query(
      ` 
      SELECT N.*, U.name as userName, U.email as userEmail, U.avatar as userAvatar, C.name as categoryName, 
        (SELECT count(*) FROM news WHERE value="like") as totalLikes, 
        (SELECT count(*) FROM news 
          WHERE value="dislike") as totalDisLikes 
          FROM news N 
              LEFT JOIN votes V ON N.id = V.idNew
             INNER JOIN users U ON U.id = N.idUser
             INNER JOIN categories C ON C.id = N.idCategory
             WHERE C.id= ?
`,
      [idCategory]
    );

    if (newsByCategory.length < 1) {
      generateError(
        `No se encontraron noticias para la categoría ${idCategory}`,
        404
      );
    }

    return newsByCategory;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectNewsByCategory;
