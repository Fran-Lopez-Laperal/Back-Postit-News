const getDB = require("../../getDB");

const insertNewQuery = async (
  title,
  introduction,
  text,
  idCategory,
  idUser
) => {
  console.log("query", title, introduction, text, idCategory, idUser);
  let connection;

  try {
    connection = await getDB();
    console.log(idUser);
    const [createNew] = await connection.query(
      `INSERT INTO news (title, introduction, text, idUser, idCategory) VALUES (?, ?, ?, ?, ?)`,
      [title, introduction, text, idUser, idCategory]
    );

    return createNew.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertNewQuery;
