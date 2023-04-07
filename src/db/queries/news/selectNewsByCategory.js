const { generateError } = require("../../../helpers");
const getDB = require("../../getDB");

const selectNewsByCategory = async (categoryName) => {
  let connection;

  try {
    connection = await getDB();

    

    const [newByCategory] = await connection.query(
      `SELECT C.name AS nameCategory, N.id as idNew, N.title, N.image, N.introduction, N.text, N.createdAt, U.name AS nameUser 
      FROM news N
      INNER JOIN users U ON N.idUser = U.id
      INNER JOIN categories C ON N.idCategory = C.id
      WHERE C.name = ?;
`,
      [categoryName]
    );

    if (newByCategory.length < 1) {
      generateError(
        `No se encontraron noticias para la categoría ${categoryName}`,
        404
      );
    }

    return newByCategory;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectNewsByCategory;
