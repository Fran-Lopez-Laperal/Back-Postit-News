


const inserVoteQuery = async(idUser, idNews, value)=>{
    let connection
    try{
        connection = await getDB()

        const [vote] = await connection.query(`
            INSERT INTO votes (idUser, idNew, value) VALUES(?, ?, ?)
        `, [idUser, idNews, value])

        return vote
    }finally{
        connection?.release()
    }
}