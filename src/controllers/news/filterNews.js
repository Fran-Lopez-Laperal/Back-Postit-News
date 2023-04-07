const selectNewsByCategory = require("../../db/queries/news/selectNewsByCategory");

const filterNews = async (req, res, next) => {
  try {
    const { categoryName } = req.params; //comprobar el cambio a params de query

    console.log("hola",categoryName);

  /*   let newWithFilter = [];

    for (categoryName of categories) {
      newWithFilter.push(await selectNewsByCategory(categoryName));
    } */

    let newWithFilter = await selectNewsByCategory(categoryName);

    res.send({
      status: "ok",
      newWithFilter,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = filterNews;
