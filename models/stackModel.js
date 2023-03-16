const mongoose = require("mongoose");

const stackSchema = mongoose.Schema({
    stacks: {
        type: Array,
        required: [true, "Please add contact name"]
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("Stack", stackSchema);
