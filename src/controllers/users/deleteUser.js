const deleteUserQuery = require("../../db/queries/users/deleteUserQuery");
const selectUserByIdQuery = require("../../db/queries/users/selectUserByIdQuery");
const { deleteImg } = require("../../helpers");

const deleteUser = async (req, res, next) => {
  const { avatar } = await selectUserByIdQuery(req.user.id);

  await deleteImg(avatar);
  const idAndImageNews = await deleteUserQuery(req.user.id);

  for (let item of idAndImageNews) {
    let { image } = item;
    await deleteImg(image);
  }

  res.send({
    status: "ok",
    message: "Usuario eliminado",
  });
};

module.exports = deleteUser;
