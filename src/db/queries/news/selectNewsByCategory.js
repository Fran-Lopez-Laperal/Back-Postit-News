const { generateError } = require("../../../helpers");
const getDB = require("../../getDB");

const selectNewsByCategory = async (idCategory) => {
  let connection;

  try {
    connection = await getDB();

    const [nameCategory] = await connection.query(
      `SELECT name FROM categories WHERE id= ?`,
      [idCategory]
    );

    console.log("nameCategory", nameCategory);

    const [newsByCategory] = await connection.query(
      ` SELECT C.name as nameCategory, U.name, U.email, U.avatar, N.*, 
      SUM(CASE WHEN V.value = "like" THEN 1 ELSE 0 END) as totalLikes,
      SUM(CASE WHEN V.value = "dislike" THEN 1 ELSE 0 END) as totalDisLikes,
      V.value as userVote
      FROM news N 
      LEFT JOIN votes V ON N.id = V.idNew
      LEFT JOIN users U ON U.id = N.idUser
      LEFT JOIN categories C ON C.id = N.idCategory
      GROUP BY N.id HAVING N.idCategory=?
`,
      [idCategory]
    );

    if (newsByCategory.length < 1) {
      generateError(
        `No se encontraron noticias para la categoría "${nameCategory[0].name}"`,
        404
      );
    }

    return newsByCategory;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectNewsByCategory;
