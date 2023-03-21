const mongoose = require("mongoose");


const candidateSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    president: {
        type: String,
        required: [true, "Please add name"]
    },
    vicePresident: {
        type: String,
        required: [true, "Please add status candidate"]
    },
    votes: {
        type: Number,
        required: [false]
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("Candidates", candidateSchema);
