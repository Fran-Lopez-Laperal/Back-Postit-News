const mysql = require("mysql2/promise");

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

let pool;

const getDB = async () => {
  try {
    if (!pool) {
      pool = await mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        timezone: "Z",
      });
    }

    return await pool.getConnection();
  } catch (err) {
    console.error(err);
    throw new Error("Error al conectar con MySQL");
  }
};

module.exports = getDB;



