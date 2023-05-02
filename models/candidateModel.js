const mongoose = require("mongoose");

const detailCandidate = mongoose.Schema({
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
})

const candidateSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    president: detailCandidate,
    vicePresident: detailCandidate,
    votes: {
        type: Number,
        required: [false]
    },
    comments: {
        type: [String],
        required: [false, "comment is mandatory"]
    },
    pageno: {
        type: Number,
        required: [false]
    },
    pageoption: {
        type: Number,
        required: [false]
    }
},{
    timestamps: true,
})

const candidateObjectSchema = mongoose.Schema({
    listCandidate: candidateSchema,
    total: {
        type: Number,
        required: [false, "total candidate"]
    }
})

const Candidate = mongoose.model(
    "Candidate", candidateSchema,
);

const CandidateObject = mongoose.model(
    "CandidatesObject", candidateObjectSchema
);



module.exports = {
    Candidate, CandidateObject
}