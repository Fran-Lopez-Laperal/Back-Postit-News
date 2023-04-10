const deleteUserQuery = require("../../db/queries/users/deleteUserQuery");
const selectUserByIdQuery = require("../../db/queries/users/selectUserByIdQuery");
const { deleteImg } = require("../../helpers");

const deleteUser = async (req, res, next) => {
  try {
    console.log(req.user.id);

    const { avatar } = await selectUserByIdQuery(req.user.id);

    console.log("avatar", avatar);

    if (avatar !== null) {
      await deleteImg(avatar);
    }

    const imageNews = await deleteUserQuery(req.user.id);

    for (let item of imageNews) {
      let { image } = item;
      await deleteImg(image);
    }

    res.send({
      status: "ok",
      message: "Usuario eliminado",
    });
  } catch (e) {
    next(e);
  }
};

module.exports = deleteUser;
