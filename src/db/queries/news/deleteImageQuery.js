const getBD = require("../../getDB");

const deleteImageQuery = async (idNew) => {
  let connection;

  try {
    connection = await getBD();

    await connection.query(`UPDATE news SET image = null WHERE id = ? ;`, [
      idNew,
    ]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteImageQuery;
