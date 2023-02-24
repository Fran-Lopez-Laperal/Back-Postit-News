const getDB = require("../../getDB")



const deleteVoteQuery = async (idUser, idNew)=>{
    let connection
    try{
        console.log(idUser, idNew)
        connection= await getDB()

        await connection.query(`
            DELETE FROM votes WHERE idNew = ? AND idUser = ?
        `,[idNew, idUser])

    }finally{
        connection?.release()
    }
}

module.exports= deleteVoteQuery 