const getDB = require("../../getDB")


const selectNewsQuery = async()=>{
    let connection
    try{

        connection = await getDB()

        let [news] = await connection.query(`
<<<<<<< HEAD
        SELECT N.*,count(N.id) as numValues, V.id, V.idUser, V.idNew, V.value FROM news N 
        INNER JOIN votes V ON N.id = V.idNew 
        GROUP BY V.idNew 
        ORDER BY numValues DESC`)

=======
        SELECT N.*, count(V.idNew) as numVotes , V.id, V.idUser, V.idNew, V.value FROM news N 
        LEFT JOIN votes V ON N.id = V.idNew 
        GROUP BY idNew
        ORDER BY numVotes DESC
        `)
        
>>>>>>> dac587964382f5da40d1459b8e779fd56d302355
        return news

    }finally{   
        connection?.release()
    }
}

module.exports = selectNewsQuery