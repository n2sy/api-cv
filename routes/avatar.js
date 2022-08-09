const express = require('express');
var multer = require('multer');
const avatarCtrl = require('../controllers/avatar');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
}

const upload = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        // const name = file.originalname.toLowerCase().split(' ').join('-');
        // const ext = MIME_TYPE_MAP[file.mimetype];
        // cb(null, name + '-' + Date.now() + '.' + ext)
    }
})

const router = express.Router();

router.post('', multer({ storage: upload }).single("avatar"), avatarCtrl.postAvatar);

module.exports = router;

