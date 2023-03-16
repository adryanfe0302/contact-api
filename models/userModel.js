const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please fill the username']
    },
    email: {
        type: String,
        required: [true, 'please add the email'],
        unique: [true, 'email address already taken']
    },
    password: {
        type: String,
        required: [true, 'please add the password']
    }
}, {
    timestamp: true
})

module.exports = mongoose.model("User", userSchema)