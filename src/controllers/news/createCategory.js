const insertCategoryQuery = require("../../db/queries/news/insertCategoryQuery");
const { generateError } = require("../../helpers");

const createCategory = async (req, res, next) => {
  try {
    const { category } = req.body;

    if (!category) {
      generateError("Faltan campos", 404);
    }

    //Condicional para que solo se pueda insertar una categoría

    await insertCategoryQuery(category);

    res.send({
      status: "ok",
      message: `Categoría ${category} creada`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createCategory;
