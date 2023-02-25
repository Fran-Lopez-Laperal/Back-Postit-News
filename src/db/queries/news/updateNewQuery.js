const getBD = require("../../getDB");

const updateNewQuery = async (title, introduction, text, idCategory, idNew) => {
  let connection;

  try {
    connection = await getBD();

    const [updateNew] = await connection.query(
      `UPDATE news SET title = ?, introduction = ?, text = ?, idCategory = ? WHERE id = ?`,
      [title, introduction, text, idCategory, idNew]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateNewQuery;
