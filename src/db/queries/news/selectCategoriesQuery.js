const getDB = require("../../getDB")



const selectCategoriesQuery = async()=>{

    let connection
    try{
        connection = await getDB()

        const [categories] = await connection.query(`
            SELECT * FROM categories
        `)

        return categories

    }finally{

    }
}

module.exports= selectCategoriesQuery;

