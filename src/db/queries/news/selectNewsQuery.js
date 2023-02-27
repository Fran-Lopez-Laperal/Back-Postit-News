const getDB = require("../../getDB")


const selectNewsQuery = async()=>{
    let connection
    try{

        connection = await getDB()

        let [news] = await connection.query(`

        SELECT N.*,count(N.id) as numValues, V.id, V.idUser, V.idNew, V.value FROM news N 
        INNER JOIN votes V ON N.id = V.idNew 
        GROUP BY V.idNew 
        ORDER BY numValues DESC`)


        return news

    }finally{   
        connection?.release()
    }
}

module.exports = selectNewsQuery