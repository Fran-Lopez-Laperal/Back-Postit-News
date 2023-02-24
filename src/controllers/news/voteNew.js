const selectNewByIdQuery = require("../../db/queries/news/selectNewByIdQuery")
const selectUserByIdQuery = require("../../db/queries/users/selectUserByIdQuery")
const { generateError } = require("../../helpers")
const insertVoteQuery = require("../../db/queries/news/insertVoteQuery");
const selectVoteQuery = require("../../db/queries/news/selectVoteQuery");
const deleteVoteQuery = require("../../db/queries/news/deleteVoteQuery");


const voteNew = async(req, res, next)=>{

    try{

        let {idNews, value} = req.params;

        let idUser = req.user.id;

        let foundNew = await selectNewByIdQuery(idNews)

        if(!foundNew) generateError("Noticia no encontrada", 404)

        let foundUser = await selectUserByIdQuery(idUser)

        if(!foundUser) generateError("Usuario no encontrado", 404)

        let voteValue = await selectVoteQuery(idUser, idNews)
        
        if(voteValue.length >0) {
            await deleteVoteQuery(idUser, idNews)

            return res.send({
                status:"ok",
                data: {
                    idNews : idNews,
                    action: "Voto quitado de la noticia"
                }
            })
        
        }

        const vote = await insertVoteQuery(idUser, idNews, value)

        res.send({
            status: 'ok',
            data: {
                idVote: vote.insertId,
                value,
            },
        });

    }catch(e){
        next(e)
    }
}

module.exports = voteNew;