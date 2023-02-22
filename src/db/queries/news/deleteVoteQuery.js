const getDB = require("../../getDB")



const deleteVoteQuery = async (idUser, idNew)=>{
    let connection
    try{
        connection= await getDB()

        await connection.query(`
            DELETE FROM votes WHERE idNew = ? AND idUser = ?
        `[idUser, idNew])

    }finally{
        connection?.release()
    }
}

module.exports= deleteVoteQuery 