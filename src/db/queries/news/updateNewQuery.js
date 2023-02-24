const getBD = require("../../getDB");

const updateNewQuery = async (title, introduction, text, category, idNew) => {
  let connection;

  try {
    connection = await getBD();

    const [updateNew] = await connection.query(
      `UPDATE news SET title = ?, introduction = ?, text = ? WHERE id = ?`,
      [title, introduction, text, idNew]
    );

    const [updateCategory] = await connection.query(
      `UPDATE newscategories SET idcategory =? WHERE idNews = ?`,
      [category, idNew]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateNewQuery;
