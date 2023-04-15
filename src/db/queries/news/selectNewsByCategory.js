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
      ` SELECT count(V.idNew) as numVotes,V.value="like", V.value="dislike", N.id as idNew, N.* FROM news N 
        LEFT JOIN votes V ON N.id = V.idNew 
        INNER JOIN categories C ON N.idCategory = C.id
        GROUP BY N.id, V.value ="like", V.value="dislike"
        HAVING N.idCategory= ?
        ORDER BY numVotes DESC
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
