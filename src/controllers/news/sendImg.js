const { generateError } = require('../../helpers');
const sharp = require('sharp');
const path = require('path');

const sendImg = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const imagePath = path.join(__dirname, '..', '..', 'uploads', filename ?? 'foto.jpg');

    const resizedImage = await sharp(imagePath).resize(800).toBuffer();

    const fileExtension = path.extname(imagePath).substring(1);
    const contentType = `image/${fileExtension}`;

    res.set('Content-Type', contentType);
    res.send(resizedImage);
  } catch (error) {
    next(generateError('Error al enviar la imagen', 500));
  }
};

module.exports = sendImg;

