const selectNewByIdQuery = require('../../db/queries/news/selectNewByIdQuery');
const deleteNewQuery = require('../../db/queries/news/deleteNewQuery');

const { generateError, deleteImg } = require('../../helpers');

const deleteNew = async (req, res, next) => {
    try {
        const { idNew } = req.params;

        const ownNew = await selectNewByIdQuery(idNew);
        console.log(req.user.id);
        console.log(ownNew[0].id);
        if (ownNew[0].idUser !== req.user.id) {
            generateError('No tienes suficientes permisos', 401);
        }

        if (ownNew.image) {
            await deleteImg(ownNew.image);
        }

        await deleteNewQuery(idNew);

        res.send({
            status: 'ok',
            message: 'Noticia eliminada',
        });

    } catch (err) {
        next(err);
    }
};

module.exports = deleteNew;