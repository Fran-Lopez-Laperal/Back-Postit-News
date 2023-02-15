require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const app = express();


//MIDDLEWARES

app.use(cors());

app.use(morgan('dev'));

app.use(express.static(process.env.UPLOADS_DIR));

app.use(express.json());

app.use(fileUpload());

//ENDPOINTS

app.post('/users/register', newUser);
app.post('/users/login', loginUser);
app.get('/users', getUser);
app.put('/users', editUser);
app.put('/users/avatar', editAvatar);
app.delete('/users', deleteUser);

app.post('/news' , createNew);
app.get('/news', getNews);
app.put('/news/:idNews', editNew);
app.get('/news/filter/:idCategory', filterNews);
app.get('/news/old', filterOldNews);
app.post('/news/:idNews/vote',voteNew);


//MIDDLEWARE ERROR

app.use ((err,req,res,next) => {
    console.err(err);
    res.status (err.httpStatus || 500).send ({
        status:'error',
        message:err.message,
    });
});

//MIDDLEWARE RUTA NO ENCONTRADA
app.use ((req,res) => {
    res.status(404).send ({
        status:'error',
        message:'Ruta no encontrada',
    });
});

app.listen (process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});