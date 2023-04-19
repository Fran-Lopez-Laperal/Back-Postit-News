const getDB = require("../../getDB");

const insertNewQuery = async (title, introduction, text, category, idUser) => {
  let connection;

  console.log("title", title);
  console.log("introduction", introduction);
  console.log("text", text);
  console.log("category", category);
  console.log("idUSer", idUser);

  try {
    console.log("entra en el try del insertNewQuery");
    connection = await getDB();

    const [createNew] = await connection.query(
      `INSERT INTO news (title, introduction, text, idUser, idCategory) VALUES (?, ?, ?, ?, ?)`,
      [title, introduction, text, idUser, category]
    );

    console.log("createNew", createNew);
    console.log("insertId", createNew.insertId);

    return createNew.insertId;
  } finally {
    if (connection) connection.release();
    console.log("finally");
  }
};

module.exports = insertNewQuery;
