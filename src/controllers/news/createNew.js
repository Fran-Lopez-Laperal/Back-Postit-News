const insertNewQuery = require("../../db/queries/news/insertNewQuery");
const insertPhotoNewQuery = require("../../db/queries/news/insertPhotoNewQuery");

const { generateError, saveImg } = require("../../helpers");

const createNew = async (req, res, next) => {
  try {
    const { title, introduction, text, category } = req.body;
    console.log("req.body", req.body);

    if (!title || !introduction || !text || !category) {
      generateError("Faltan campos", 400);
    }

    const idNew = await insertNewQuery(
      title,
      introduction,
      text,
      +category,
      req.user.id
    );

    console.log("idNew", idNew);

    let photo;

    if (req.files && req.files.photo) {
      photo = { ...req.files.photo };

      console.log("photo", photo);

      const photoNew = await saveImg(photo, 500);

      await insertPhotoNewQuery(photoNew, idNew);
    }

    console.log("Va a enviar el res.send");

    res.send({
      status: "ok",
      data: {
        new: {
          id: idNew,
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

    console.log("res.send enviado");
  } catch (err) {
    next(err);
  }
};

module.exports = createNew;
