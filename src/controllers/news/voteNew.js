const selectNewByIdQuery = require("../../db/queries/news/selectNewByIdQuery")
const selectUserByIdQuery = require("../../db/queries/users/selectUserByIdQuery")
const { generateError } = require("../../helpers")


const voteNew = async(req, res, next)=>{

    try{

        let {idNews, value} = req.params
        let {idUser} = req.user.id

        let foundNew = await selectNewByIdQuery(idNews)

        if(!foundNew) generateError("Noticia no encontrada", 404)

        let foundUser = await selectUserByIdQuery(idUser)

        if(!foundUser) generateError("Usuario no encontrado", 404)

        const vote = await inserVoteQuery(idUser, idNews, value)

        res.send({
            status: 'ok',
            data: {
                vote
            },
        });

    }catch(e){
        next(e)
    }
}

module.exports = voteNew;