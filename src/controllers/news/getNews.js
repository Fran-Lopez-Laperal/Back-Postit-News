const selectNewsQuery = require('../../db/queries/news/selectNewsQuery')
const { generateError } = require('../../helpers')
const path = require('path')
require('dotenv').config()

const { MYSQL_HOST, PORT, UPLOADS_DIR } = process.env;
const getNews = async(req, res, next)=>{


    try{

        const news = await selectNewsQuery()
        if(!news){
            generateError('No existe ninguna noticia', 404)
        }

        let pathDir = __dirname.split('src')

        for(let i = 0; i < news.length ; i ++){
               news[i].imagePath = `${pathDir[0]}src/${UPLOADS_DIR}/${news[i].image}`
            
            // news[i].imagePath = "" + path.join(__dirname, 'src', 'uploads', news[i].image )
        }
        array_final= []

        for(let i =0; i < news.length; i++){
            
            let existe = array_final.filter(e=>e.id == news[i].id)
            
            if (existe.length ==0) {
                array_final.push(news[i])
            }else{
            
            array_final.map(e=>{ 
                if(e.id == news[i].id) {
                    e.totalLikes += news[i].totalLikes;
                    e.totalDisLikes += news[i].totalDisLikes;
                } 
            })
            }
        }
        
        

        res.send({
            status: "ok",
            data: array_final,
        })
    }catch(e){
        next(e)
    }

}

module.exports= getNews 


