const { generateError, deleteImg, saveImg } = require("../../helpers");
const selectUserByIdQuery = require("../../db/queries/users/selectUserByIdQuery");
const updateAvatarQuery = require("../../db/queries/users/updateAvatarQuery");

const editAvatar = async (req, res, next) => {
  try {
    if (!req.files?.avatar) {
      generateError("Falta el avatar", 400);
    }

    const idUser = await selectUserByIdQuery(req.user.id);

    console.log(idUser);

    if (idUser.avatar) {
      await deleteImg(idUser.avatar);
    }

    const avatar = await saveImg(req.files.avatar, 500);

    await updateAvatarQuery(avatar, req.user.id);

    res.send({
      status: "ok",
      message: "avatar actualizado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editAvatar;
