require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

//MIDDLEWARES

app.use(cors());

app.use(morgan("dev"));

app.use(express.static(process.env.UPLOADS_DIR));

app.use(express.json());

app.use(fileUpload());



//CONTROLLERS
const {
  newUser,
  loginUser,
  getUser,
  editAvatar,
  editUser,
  deleteUser,
} = require("./controllers/users");

const {
  createNew,
  editNew,
  filterOldNews,
  createCategory,
  filterNews,
  voteNew,
  deleteNew,
  getNew,
  getNews
} = require("./controllers/news");


const { isAuth, isAuthOptional, isAdmin } = require("./middleware");




//ENDPOINTS

app.post("/users/register", newUser);
app.post("/users/login", loginUser);
app.get("/users", isAuth, getUser);
app.put("/users", isAuth, editUser);
app.put("/users/avatar", isAuth, editAvatar);
app.delete("/users", isAuth, deleteUser);

app.post("/news", isAuth, createNew);
app.put("/news/:idNew", isAuth, editNew);

app.post("/news/categories", isAuth, isAdmin, createCategory);
app.post("/news/filter", filterNews);
app.get("/news/old", filterOldNews);

app.get('/news/:idNews/vote/:value', isAuth, voteNew);

app.delete("/news/:idNew", isAuth, deleteNew);
app.get('/news/:idNew', isAuthOptional, getNew);
app.get('/news', getNews)


//MIDDLEWARE ERROR

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.httpStatus || 500).send({
    status: "error",
    message: err.message,
  });
});

//MIDDLEWARE RUTA NO ENCONTRADA
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
