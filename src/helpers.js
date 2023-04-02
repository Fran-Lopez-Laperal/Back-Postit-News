const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");
const { v4: uuid } = require("uuid");

const { UPLOADS_DIR } = process.env;

const generateError = (msg, code) => {
  const err = new Error(msg);
  err.httpStatus = code;
  throw err;
};

const saveImg = async (img, width) => {
  try {
    // Ruta absoluta al directorio de subida de archivos.
    const uploadsPath = path.join(__dirname, UPLOADS_DIR);

    // Utilizamos el método "ensureDir" de "fs-extra" para crear el directorio si no existe.
    // ¡Ojo! Este módulo no tiene nada que ver con el core module "fs", es una dependencia externa.
    await fs.ensureDir(uploadsPath);

    const sharpImg = sharp(img.photo.data);

    sharpImg.resize(width);

    const imgName = `${uuid()}.jpg`;

    const imgPath = path.join(uploadsPath, imgName);

    await sharpImg.toFile(imgPath);

    return imgName;
  } catch (err) {
    console.error(err);
    generateError("Error al intentar guardar la imagen en disco");
  }
};

const deleteImg = async (imgName) => {
  try {
    const imgPath = path.join(__dirname, UPLOADS_DIR, imgName);
    await fs.remove(imgPath);
  } catch (err) {
    generateError("Error al intentar borrar la imagen del disco");
  }
};

module.exports = {
  generateError,
  saveImg,
  deleteImg,
};
