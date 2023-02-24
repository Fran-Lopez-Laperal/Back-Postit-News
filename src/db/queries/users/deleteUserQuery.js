const getDB = require("../../getDB");

const deleteUserQuery = async (idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [idAndImageNews] = await connection.query(
      "SELECT id, image FROM news WHERE idUser = ?",
      [idUser]
    );

    await connection.query("set SQL_SAFE_UPDATES=0");

    for (const idNew of idAndImageNews) {
      let { id } = idNew;
      await connection.query("DELETE FROM newscategories WHERE idNews = ?", [
        id,
      ]);
    }

    await connection.query("set SQL_SAFE_UPDATES=1");

    await connection.query(" DELETE FROM votes WHERE idUser = ?", [idUser]);

    await connection.query(" DELETE FROM news WHERE idUser = ?", [idUser]);

    await connection.query("DELETE FROM users WHERE id = ?", [idUser]);

    return idAndImageNews;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteUserQuery;
