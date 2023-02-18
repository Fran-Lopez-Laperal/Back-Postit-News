const selectNewsQuery = require('../../db/queries/news/selectNewsQuery')

const getNews = async(req, res, next)=>{

    try{

        const news = await selectNewsQuery()

        res.send({
            status: "ok",
            data: news
        })

    }catch(e){
        next(e)
    }

}

module.exports= getNews