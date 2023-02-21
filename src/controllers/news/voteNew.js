const selectNewByIdQuery = require("../../db/queries/news/selectNewByIdQuery")
const selectUserByIdQuery = require("../../db/queries/users/selectUserByIdQuery")
const { generateError } = require("../../helpers")
const insertVoteQuery = require("../../db/queries/news/insertVoteQuery");


const voteNew = async(req, res, next)=>{

    try{

        let {idNews, value} = req.params;
        let idUser = req.user.id;

        let foundNew = await selectNewByIdQuery(idNews)

        if(!foundNew) generateError("Noticia no encontrada", 404)
        console.log(req.user);
        let foundUser = await selectUserByIdQuery(idUser)

        if(!foundUser) generateError("Usuario no encontrado", 404)

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