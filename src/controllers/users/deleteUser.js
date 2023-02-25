const deleteUserQuery = require("../../db/queries/users/deleteUserQuery");
const selectUserByIdQuery = require("../../db/queries/users/selectUserByIdQuery");
const { deleteImg } = require("../../helpers");

const deleteUser = async (req, res, next) => {
  console.log(req.user.id);
  const { avatar } = await selectUserByIdQuery(req.user.id);

  await deleteImg(avatar);
  const ImageNews = await deleteUserQuery(req.user.id);

  for (let item of ImageNews) {
    let { image } = item;
    await deleteImg(image);
  }

  res.send({
    status: "ok",
    message: "Usuario eliminado",
  });
};

module.exports = deleteUser;
