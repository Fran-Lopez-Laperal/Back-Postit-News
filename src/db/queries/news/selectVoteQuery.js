const { generateError } = require("../../../helpers")
const getDB = require("../../getDB")


const selectVoteQuery = async (idUser, idNew)=>{
    let connection
    
    try{
        connection = await getDB()
        
        let vote = await connection.query(`
            SELECT * FROM votes WHERE idUser=? AND idNew=?
        `, [idUser, idNew])

        
        if (vote.length > 0) return vote[0]
        
        return false

    }finally{
        connection?.release()
    }
}

module.exports = selectVoteQuery