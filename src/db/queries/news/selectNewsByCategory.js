const { generateError } = require("../../../helpers");
const getDB = require("../../getDB");

const selectNewsByCategory = async (idCategory) => {
  let connection;

  try {
    connection = await getDB();

    const [newByCategory] = await connection.query(
      `SELECT C.id AS idCategory, N.id as idNew, N.title, N.image, N.introduction, N.text, N.createdAt, U.name AS nameUser FROM newscategories NC
INNER JOIN news N ON NC.idNews = N.id
INNER JOIN users U ON N.idUser = U.id
INNER JOIN categories C ON NC.idCategory = C.id
WHERE C.id = ?;`,
      [idCategory]
    );

    if (newByCategory.length < 1) {
      generateError("No existe la categoría", 404);
    }

    return newByCategory;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectNewsByCategory;
