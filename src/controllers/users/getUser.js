const selectUserByIdQuery = require('../../db/queries/users/selectUserByIdQuery');

const getUser = async (req, res, next) => {
    try {
        const user = await selectUserByIdQuery(req.user.id);

        res.send({
            status: 'ok',
            data: 
                user,
            
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getUser;