require("dotenv").config();

const getDB = require("./getDB");

const createTables = async () => {
  let connection;

  try {
    connection = await getDB();

    console.log("Borrando tablas...");
    await connection.query("SET GLOBAL sql_mode=''");
    await connection.query("DROP TABLE IF EXISTS votes");
    await connection.query("DROP TABLE IF EXISTS news");
    await connection.query("DROP TABLE IF EXISTS categories");
    await connection.query("DROP TABLE IF EXISTS users");

    console.log("Creando tablas...");

    await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(30) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                bio TEXT NOT NULL,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS news (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(30) NOT NULL,
                image VARCHAR(100),
                introduction VARCHAR(255) NOT NULL,
                text TEXT NOT NULL,
                idUser INT UNSIGNED NOT NULL,
                idCategory INT UNSIGNED NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (idUser) REFERENCES users(id),
                FOREIGN KEY (idCategory) REFERENCES categories(id)
            )
        `);

    await connection.query(`
            CREATE TABLE IF NOT EXISTS votes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idUser INT UNSIGNED NOT NULL,
                idNew INT UNSIGNED NOT NULL,
                value ENUM("like", "dislike") NOT NULL,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (idUser) REFERENCES users(id),
                FOREIGN KEY (idNew) REFERENCES news(id)
            )
        `);

    console.log("¡Tablas creadas!");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();

    process.exit();
  }
};

createTables();
