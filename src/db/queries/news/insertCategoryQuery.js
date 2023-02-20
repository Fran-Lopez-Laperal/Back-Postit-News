const getDB = require("../../getDB");

const insertCategoryQuery = async (category) => {
  let connection;
  try {
    connection = await getDB();

    await connection.query(`INSERT INTO categories (name) VALUES (?)`, [
      category,
    ]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertCategoryQuery;
