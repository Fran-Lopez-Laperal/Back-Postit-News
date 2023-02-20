const selectOldNewsQuery = require("../../db/queries/news/selectOldNesQuery")

const filterOldNews = async ( req, res, next) => {

    try {

         const news = await selectOldNewsQuery()

        res.send({
            status: 'ok',
            data: {
                news
            }
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports = filterOldNews;