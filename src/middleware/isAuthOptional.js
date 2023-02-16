const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');



const isAuthOptional = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        // Si existe token creamos la propiedad user, de lo contrario pasamos el control
        // al siguiente middleware o función controladora.
        if (authorization) {
            let userInfo;

            try {
                userInfo = jwt.verify(authorization, process.env.SECRET);
            } catch (err) {
                console.error(err);
                generateError('Token incorrecto', 401);
            }

            req.user = userInfo;
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = isAuthOptional;