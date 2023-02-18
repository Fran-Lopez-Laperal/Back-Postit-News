const getDB = require("../../getDB")


const selectNewsQuery = async()=>{
    let connection
    try{

        connection = await getDB()

        let [news] = await connection.query(`
            SELECT * FROM news
        `)
        return news

    }finally{   
        connection?.release()
    }
}

module.exports = selectNewsQuery