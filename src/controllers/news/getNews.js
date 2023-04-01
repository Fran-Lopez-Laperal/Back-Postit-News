const selectNewsQuery = require('../../db/queries/news/selectNewsQuery')
const { generateError } = require('../../helpers')
const path = require('path')
require('dotenv').config()

const { MYSQL_HOST, PORT, UPLOADS_DIR } = process.env;
const getNews = async(req, res, next)=>{


    try{

        const news = await selectNewsQuery()
        if(!news){
            generateError('No existe ninguna noticia', 404)
        }

        let pathDir = __dirname.split('src')

        for(let i = 0; i < news.length ; i ++){
               news[i].imagePath = `${pathDir[0]}src/${UPLOADS_DIR}/${news[i].image}`
            
            // news[i].imagePath = "" + path.join(__dirname, 'src', 'uploads', news[i].image )
        }

        res.send({
            status: "ok",
            data: news,
        })
    }catch(e){
        next(e)
    }

}

module.exports= getNews 


