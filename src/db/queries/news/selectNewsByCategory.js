const getDB = require("../../getDB");

const selectNewsByCategory = async (idCategory) => {
  let connection;

  try {
    connection = await getDB();

    const [selectNewsByCategory] = await connection.query();
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectNewsByCategory;
