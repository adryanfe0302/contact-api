const express = require("express");

const { getUploadImages, postUploadImages, deleteAllImages } = require("../controllers/uploadContoller");

//check token is valid or no
// const validateToken = require("../middleware/validateToken");

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        console.log('file', file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({'storage': storage})

// then continue accesss the route

const router = express.Router()

// for all need validatetoken just use this
// router.use(validateToken)
// for all need validatetoken just use this

router.get("/", getUploadImages)
router.delete("/", deleteAllImages)
router.post("/", upload.single('image'), postUploadImages)

module.exports = router