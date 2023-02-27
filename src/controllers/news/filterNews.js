const selectNewsByCategory = require("../../db/queries/news/selectNewsByCategory");

const filterNews = async (req, res, next) => {
  try {
    const { category: categories } = req.query;

    console.log(categories);

    let newWithFilter = [];

    for (idCategory of categories) {
      newWithFilter.push(await selectNewsByCategory(idCategory));
    }

    res.send({
      status: "ok",
      newWithFilter,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = filterNews;
