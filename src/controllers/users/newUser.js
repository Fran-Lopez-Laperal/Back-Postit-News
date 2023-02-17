const insertUserQuery = require('../../db/queries/users/insertUserQuery');
const { generateError } = require('../../helpers');


const newUser = async (req, res, next) => {
  try {
    const {name, email, password, bio} = req.body;

    if (!name || !email || !password || !bio) {
      generateError('Faltan campos', 400);
    };

    await insertUserQuery(name, email, password, bio);

    res.send ({
      status: 'ok',
      message: 'Usuario creado'
    });
    
  } catch (err) {
    next(err)
  };
};

module.exports = newUser;
