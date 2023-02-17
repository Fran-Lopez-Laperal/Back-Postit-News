const insertPhotoQuery = require('../../db/queries/users/insertPhotoQuery');
const insertUserQuery = require('../../db/queries/users/insertUserQuery');

const { generateError, saveImg } = require('../../helpers');


const newUser = async (req, res, next) => {
  try {
    const {name, email, password, bio, photo} = req.body;

    if (!name || !email || !password || !bio) {
      generateError('Faltan campos', 400);
    };

    const idNewUser = await insertUserQuery(
        name,
        email,
        password,
        bio
    );
    console.log(idNewUser);
    if(req.files) {

      const photo = {...req.files.photo};
      
      
      const photoName = await saveImg(photo,500);
      
      
      await insertPhotoQuery (photoName, idNewUser);
    }



    res.send ({
      status: 'ok',
      message: 'Usuario creado',
      }
    );
    
  } catch (err) {
    next(err)
  };
};

module.exports = newUser;
