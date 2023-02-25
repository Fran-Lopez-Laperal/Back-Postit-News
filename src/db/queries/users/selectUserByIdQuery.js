const { generateError } = require("../../../helpers");
const getDB = require("../../getDB");

const selectUserByIdQuery = async (idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT  id, name, email, avatar,role, bio, createdAt FROM users WHERE  id =  ?`,
      [idUser]
    );

    if (users.length < 1) {
      generateError(`Usuario ${users.name} no encontrado`, 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
