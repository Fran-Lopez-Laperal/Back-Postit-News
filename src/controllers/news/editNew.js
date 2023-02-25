const deleteImageQuery = require("../../db/queries/news/deleteImageQuery");
const insertPhotoNewQuery = require("../../db/queries/news/insertPhotoNewQuery");
const selectNewByIdQuery = require("../../db/queries/news/selectNewByIdQuery");
const updateNewQuery = require("../../db/queries/news/updateNewQuery");
const { generateError, deleteImg, saveImg } = require("../../helpers");

const editNew = async (req, res, next) => {
  try {
    const { idNew } = req.params;

    const [infoNew] = await selectNewByIdQuery(idNew);

    const { title, introduction, text, category } = req.body;

    console.log(infoNew);
    if (!title || !introduction || !text || !category) {
      generateError("Faltan campos", 404);
    }

    await updateNewQuery(title, introduction, text, category, idNew);

    //Si existe imagen pero el usuario quiere que la noticia no tenga:
    await deleteImageQuery(idNew);

    if (req.files) {
      //Si existe una imagen previa, se borra
      if (infoNew.image) {
        await deleteImg(infoNew.image);
      }

      const nameImage = await saveImg(req.files.image, 500);

      await insertPhotoNewQuery(nameImage, idNew);
    } else {
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
