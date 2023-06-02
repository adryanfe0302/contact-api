const asyncHandler = require("express-async-handler")
const Images = require("../models/imageModel")
const fs = require('fs');

const getUploadImages = asyncHandler(async (req, res) => {
    const image = await Images.find()
    console.log('get here', image[image.length - 1].image);
    const imageUrl = image[image.length - 1].image
    res.render("uploader", { imageUrl: imageUrl })
    
    // res.status(200).json(image)
});

const postUploadImages = asyncHandler(async (req, res) => {

    console.log('postUploadImages');
    // console.log('post', req.body);
    // res.status(200).send('images uploaded')

    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');

    // console.log('img', img);
    // console.log('encode_image', encode_image);

    const finalImg = {
        contentType: req.file.mimetype,
        image:  new Buffer(encode_image, 'base64')
    };

    
    
    console.log('finalImg', finalImg);


    const { originalname, buffer, mimetype, path} = req.file
    
    // console.log('req', req.file);
    const newImage = new Images({
        contentType: req.file.mimetype,
        image:  new Buffer(encode_image, 'base64')
    })
    console.log('newimage 1', newImage);
    await newImage.save()
    res.status(200).json({
        message: 'Image uploaded successfully'
    })
});

const deleteAllImages = asyncHandler(async (req,res) => {
    await Images.deleteMany()
    res.status(200).json({message: 'delete success'})
})

module.exports = {
    getUploadImages,
    postUploadImages,
    deleteAllImages
}