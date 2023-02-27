const getDB = require("../../getDB")


const selectNewsQuery = async()=>{
    let connection
    try{

        connection = await getDB()

        let [news] = await connection.query(`
        SELECT N.*,V.id, V.idUser, V.idNew, V.value, count(N.id) as numValues FROM news N 
        LEFT JOIN votes V ON N.id = V.idNew 
        GROUP BY idNew
        ORDER BY numValues DESC
        `)

        return news

    }finally{   
        connection?.release()
    }
}

module.exports = selectNewsQuery