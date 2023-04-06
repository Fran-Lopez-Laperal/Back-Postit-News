const { generateError } = require("../../../helpers");
const getDB = require("../../getDB");

const editUserQuery = async (name, email, bio, idUser) => {
  let connection;
  console.log("name", name);
  try {
    connection = await getDB();
    if (name) {
      const [users] = await connection.query(
        `SELECT id, name FROM users WHERE name = ?`,
        [name]
      );

      if (users.length > 0 && users[0].name !== name) {
        generateError("El nombre de usuario no está disponible", 403);
      }

      const prueba = await connection.query(
        `UPDATE users SET name  = ? WHERE id = ?`,
        [name, idUser]
      );
      console.log(prueba);
    }

    if (email) {
      const [users] = await connection.query(
        `SELECT id, email FROM users WHERE email = ?`,
        [email]
      );

      if (users.length > 0 && users[0].email !== email) {
        generateError(`El email ya esta asociado a un usuario`);
      }

      await connection.query(`UPDATE users SET  email = ? WHERE id = ?`, [
        email,
        idUser,
      ]);
    }

    if (bio) {
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
