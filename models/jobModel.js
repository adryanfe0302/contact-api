const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    industry: {
        type: [String],
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    companysize: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
    overview: {
        type: String,
        required: false
    }
})

const jobSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    job_title: {
        type: String,
        required: [true, "Please add contact name"]
    },
    job_desc: {
        type: [String],
        required: [false, "Please add contact name"]
    },
    job_req: {
        type: String || [String],
        required: [true, "Please add contact name"]
    },
    likes: {
        type: Number,
        required: [true, "Please add contact name"]
    },
    companyinfo: companySchema
},{
    timestamps: true,
})

module.exports = mongoose.model("Jobs", jobSchema);
