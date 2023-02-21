const getDB = require('../../getDB');
const bcrypt = require('bcrypt');
const { generateError } = require('../../../helpers');


const insertUserQuery = async ( name, email, password, bio, role ) => {

  let connection;

  try {
    connection = await getDB();

    let [users] = await connection.query (
      `SELECT id, name FROM users WHERE name = ?`,
      [name]
    );
      console.log(users);

    if (users.length > 0) {
      generateError (`El nombre de usuario ${users[0].name} ya existe`,403);
    };

    [users] = await connection.query (
      `SELECT id, email FROM users WHERE email = ?`,
      [email]
    );

    if (users.length > 0) {
      generateError (`El email ${users[0].email} ya existe`,403);
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await connection.query (
      'INSERT INTO users (name, email, password, bio, role) VALUES (?, ?, ?, ?, ?)', 
      [name, email, hashedPassword, bio, role]
    );
    console.log(newUser.insertId);
    return newUser.insertId;


  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;