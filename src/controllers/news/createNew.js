const insertNewQuery = require('../../db/queries/news/insertNewQuery');
const insertPhotoNewQuery = require('../../db/queries/news/insertPhotoNewQuery');

const { generateError, saveImg } = require('../../helpers');

const createNew = async (req, res, next) => {
    try {
        const { title, introduction, text } = req.body;
        console.log(req.body);
        if (!title || !introduction || !text) {
            generateError('Faltan campos', 400);
        }

        const idNews = await insertNewQuery(
            title,
            introduction,
            text,
            req.user.id
        );

      
        let photo;

        if (req.files) {
            
            const photo = {...req.files.photo};

            const photoNew = await saveImg(photo, 500);
   
            const idPhoto = await insertPhotoNewQuery(photoNew, idNews);

               /*  // Pusheamos la foto al array de fotos.
                photo.push({
                    id: idPhoto,
                    name: photoNew,
                }); */
            }
        console.log(photo);

        res.send({
            status: 'ok',
            data: {
                new: {
                    id: idNews,
                    title,
                    introduction,
                    text,
                    photo,
                    idUser: req.user.id,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = createNew;