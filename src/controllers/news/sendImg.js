const { generateError } = require('../../helpers')

const path = require("path");

const sendImg = (req, res, next) => {
  try{
    const { filename } = req.params;

    console.log("filename", filename);

    let imgPath = path
      .join(__dirname, "..", "..", "uploads", filename ?? "foto.jpg")
      .trim();

    // if (!filename) {
    //   imgPath = path.join(__dirname, "..", "..", "uploads", "foto.jpg").trim();
    // }

    res.sendFile(imgPath);

    generateError("Esto esta que arde", 404)
    
  }catch(error){
    next(error)
  }
};

module.exports = sendImg;
