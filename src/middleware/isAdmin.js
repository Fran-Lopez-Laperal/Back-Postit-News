const isAdmin = async (req, res, next) => {


    try {
       
        next();
    } catch (err) {
        next(err);
    }
}




module.exports = isAdmin;