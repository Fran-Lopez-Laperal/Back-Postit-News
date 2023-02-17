const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');

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

        const sharpImg = sharp(img.data);

        sharpImg.resize(width);

        const imgName = `${uuid()}.jpg`;

        const imgPath = path.join(uploadsPath, imgName);

        await sharpImg.toFile(imgPath);

        return imgName;
    } catch (err) {
        console.error(err);
        generateError('Error al intentar guardar la imagen en disco');
    }
};

module.exports = {
    generateError,
    saveImg,
};