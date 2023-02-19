const getBD = require("../../getDB");

const updateNewQuery = async (title, introduction, text, idNew) => {
  let connection;

  try {
    connection = await getBD();

    const [updateNew] = await connection.query(
      `UPDATE news SET title = ?, introduction = ?, text = ? WHERE id = ?`,
      [title, introduction, text, idNew]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateNewQuery;
