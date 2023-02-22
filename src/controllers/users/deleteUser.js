const deleteUserQuery = require("../../db/queries/users/deleteUserQuery");
const selectUserByIdQuery = require("../../db/queries/users/selectUserByIdQuery");

const deleteUser = async (req, res, next) => {
  await deleteUserQuery(req.user.id);

  res.send({
    status: "ok",
  });
};

module.exports = deleteUser;
