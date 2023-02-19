const selectNewByIdQuery = require("../../db/queries/news/selectNewByIdQuery");
const updateNewQuery = require("../../db/queries/news/updateNewQuery");
const { generateError } = require("../../helpers");

const editNew = async (req, res, next) => {
  try {
    const { idNew } = req.params;

    await selectNewByIdQuery(idNew);

    const { title, introduction, text, photo } = req.body;

    if (!title || !introduction || !text) {
      generateError("Faltan campos", 404);
    }

    await updateNewQuery(title, introduction, text, idNew);

    if (req.files) {
      await insertPhotoNewQuery(photo, idNew);
    }

    res.send({
      status: "ok",
      message: "Noticia actualizada",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editNew;
