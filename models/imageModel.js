const mongoose = require("mongoose")

const imageSchema = mongoose.Schema({
    contentType: String,
    image: String
})

module.exports = mongoose.model("Images", imageSchema)