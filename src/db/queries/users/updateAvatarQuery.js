const getDB = require("../../getDB");

const updateAvatarQuery = async (avatar, idUser) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(
      `
        UPDATE users SET avatar = ? WHERE id = ? `,
      [avatar, idUser]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateAvatarQuery;
