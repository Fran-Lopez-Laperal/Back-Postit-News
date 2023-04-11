const selectNewsByCategory = require("../../db/queries/news/selectNewsByCategory");

const filterNews = async (req, res, next) => {
  try {
    const { categoryId } = req.params; //comprobar el cambio a params de query

    /*   let newWithFilter = [];

    for (categoryName of categories) {
      newWithFilter.push(await selectNewsByCategory(categoryName));
    } */

    let newsWithFilter = await selectNewsByCategory(categoryId);

    res.send({
      status: "ok",
      newsWithFilter,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = filterNews;
