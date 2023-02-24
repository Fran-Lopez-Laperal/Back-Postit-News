const { generateError } = require("../../../helpers");
const getDB = require("../../getDB");

const insertCategoryQuery = async (category) => {
  let connection;
  try {
    connection = await getDB();

    //comprobar si ya existe ese nombre de categoría
    const [categories] = await connection.query(`SELECT name FROM categories`);

    for (let data of categories) {
      const { name } = data;
      console.log(name);
      if (name === category) {
        generateError("La categoría ya existe");
      }
    }

    await connection.query(`INSERT INTO categories (name) VALUES (?)`, [
      category,
    ]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertCategoryQuery;
