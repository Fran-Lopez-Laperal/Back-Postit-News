const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');



const isAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            generateError('Falta la cabecera de autenticación', 401);
        }

        let userInfo;

        try {
            userInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (err) {
            console.error(err);
            generateError('Token incorrecto', 401);
        }

        
        req.user = userInfo;

        
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = isAuth;