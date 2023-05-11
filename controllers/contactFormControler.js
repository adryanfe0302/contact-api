const asyncHandler = require("express-async-handler")
const ContactForm = require("../models/contactFormModel")

const contactFormPost = asyncHandler(async (req, res) => {
    const {name,email,message} = req.body
    const createFormRecord = await ContactForm.create({
        name,
        email,
        message
    })
    res.status(200).json(createFormRecord)
});

const contactFormGet = asyncHandler(async (req, res) => {
    const listform = await ContactForm.find()
    console.log('resget', listform);
    
    res.status(200).json(listform)
});

module.exports = {
    contactFormPost,
    contactFormGet
}