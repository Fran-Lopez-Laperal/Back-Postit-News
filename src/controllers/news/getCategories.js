const selectCategoriesQuery = require("../../db/queries/news/selectCategoriesQuery");
const { generateError } = require("../../helpers");

const getCategories = async (req, res, next) => {
  try {
    const categories = await selectCategoriesQuery();

    console.log("querydeCategorias", categories);

    if (categories.length == 0) generateError("No existen categorias", 404);

    res.send({
      status: "ok",
      categories,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = getCategories;
