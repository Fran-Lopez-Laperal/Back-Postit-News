const getDB = require("../../getDB");

const deleteUserQuery = async (idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [ImageNews] = await connection.query(
      "SELECT image FROM news WHERE idUser = ?",
      [idUser]
    );

    await connection.query(" DELETE FROM votes WHERE idUser = ?", [idUser]);

    await connection.query(" DELETE FROM news WHERE idUser = ?", [idUser]);

    await connection.query("DELETE FROM users WHERE id = ?", [idUser]);

    return ImageNews;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteUserQuery;
