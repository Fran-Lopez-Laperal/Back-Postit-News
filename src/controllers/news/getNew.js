const selectNewByIdQuery = require("../../db/queries/news/selectNewByIdQuery");

const getNew = async (req, res, next) => {
  try {
    const { idNew } = req.params;

    const ownNew = await selectNewByIdQuery(idNew);

    res.send({
      status: "ok",
      data: {
        ownNew,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getNew;
