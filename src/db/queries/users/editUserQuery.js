const { generateError } = require("../../../helpers");
const getDB = require("../../getDB");

const editUserQuery = async (name, email, bio, idUser) => {
  let connection;
  try {
    connection = await getDB();
    if (name) {
      const [users] = await connection.query(
        `SELECT id FROM users WHERE name = ?`,
        [name]
      );
      if (users.length > 0) {
        generateError("El nombre de usuario no está disponible", 403);
      }

      await connection.query(`UPDATE users SET name  = ? WHERE id = ?`, [
        name,
        idUser,
      ]);
    }

    if (email) {
      const [users] = await connection.query(
        `SELECT id FROM users WHERE email = ?`,
        [email]
      );
      if (users.length > 0) {
        generateError(`El email ${users.email} ya esta asociado a un usuario`);
      }

      await connection.query(`UPDATE users SET  email = ? WHERE id = ?`, [
        email,
        idUser,
      ]);
    }

    if (bio) {
      await connection.query(`SELECT id FROM users WHERE bio = ?`, [bio]);

      await connection.query(`UPDATE users SET bio = ? WHERE id = ? `, [
        bio,
        idUser,
      ]);
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUserQuery;
