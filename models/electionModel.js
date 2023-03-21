const mongoose = require("mongoose");


const electionSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add name"]
    },
    status: {
        type: String,
        required: [true, "Please add status candidate"]
    },
    images: {
        type: String,
        required: [false]
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("Elections", electionSchema);
