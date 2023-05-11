const mongoose = require("mongoose");


const provinceSchema = mongoose.Schema({
    statusCode: {
        type: Number,
        require: false
    },
    status: {
        type: String,
        require: false
    },
    provinceName: {
        type: String,
        require: false
    },
    provinceCode: {
        type: String,
        require: false
    }
})


module.exports = mongoose.model("provinceCollections", provinceSchema);
