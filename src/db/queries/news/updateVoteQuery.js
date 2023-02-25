
const getDB = require("../../getDB")


const updateVoteQuery =async(idUser, idNew, newValue)=>{

    let connection

    try{
        connection = await getDB()

        await connection.query(`
            UPDATE votes SET value = ? WHERE idUser=? AND idNew=?
        `, [newValue, idUser, idNew])

    }finally{
        connection?.release()
    }

}

module.exports = updateVoteQuery