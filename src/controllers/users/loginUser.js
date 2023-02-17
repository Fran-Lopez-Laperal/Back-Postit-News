const { generateError } = require("../../helpers")

const loginUser = async (req, res ,next) => {
    const {email, password} = req.body

    if(! email || !password){
        generateError('')
    }

    console.log(req.body)

}


module.exports = loginUser