const insertNewQuery = require("../../db/queries/news/insertNewQuery");
const insertPhotoNewQuery = require("../../db/queries/news/insertPhotoNewQuery");

const { generateError, saveImg } = require("../../helpers");

const createNew = async (req, res, next) => {
  try {
    const { title, introduction, text, category } = req.body;
    console.log(req.body);
    if (!title || !introduction || !text || !category) {
      generateError("Faltan campos", 400);
    }

    const idNews = await insertNewQuery(
      title,
      introduction,
      text,
      category,
      req.user.id
    );

    //await insertCategoryInNewQuery(idNews, category);

    let photo;

    if (req.files) {
      const photo = { ...req.files.photo };

      const photoNew = await saveImg(photo, 500);

      const idPhoto = await insertPhotoNewQuery(photoNew, idNews);
    }

    res.send({
      status: "ok",
      data: {
        new: {
          id: idNews,
          title,
          introduction,
          text,
          photo,
          category,
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
