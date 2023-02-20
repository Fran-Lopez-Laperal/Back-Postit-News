const selectOldNewsQuery = require("../../db/queries/news/selectOldNewsQuery")

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