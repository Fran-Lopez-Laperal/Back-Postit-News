const selectNewsQuery = require('../../db/queries/news/selectNewsQuery')
const { generateError } = require('../../helpers')

const getNews = async(req, res, next)=>{

    try{

        const news = await selectNewsQuery()
        if(!news){
            generateError('No existe ninguna noticia', 404)
        }
        res.send({
            status: "ok",
            data: news
        })
    }catch(e){
        next(e)
    }

}

module.exports= getNews