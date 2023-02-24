const getDB = require("../../getDB");
const { generateError } = require("../../../helpers");

const insertCategoryInNewQuery = async (idNew, idCategory) => {
  let connection;

  try {
    connection = await getDB();

    const [insertCategory] = await connection.query(
      `INSERT INTO newscategories (idNews, idCategory) VALUES (?, ?)`,
      [idNew, idCategory]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertCategoryInNewQuery;
