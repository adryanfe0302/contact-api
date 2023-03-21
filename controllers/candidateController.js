const asyncHandler = require("express-async-handler")
const Candidate = require("../models/candidateModel")
const ListCandidate = require("../models/electionModel")


const candidateList = asyncHandler(async (req, res) => {
    const candidate = await Candidate.find()
    res.status(200).json(candidate)
});


const createCandidatePresident = asyncHandler(async (req, res) => {
    const { president, vicePresident } = req.body
 
    if( !president || !vicePresident ){
        res.status(400)
        throw new Error("president, & vicePresident is mandatory")
    }

    const presidentCandidates = await ListCandidate.findById(president)

    const vicepresidentCandidates = await ListCandidate.findById(vicePresident)

    if(!presidentCandidates || !vicepresidentCandidates) {
        res.status(400)
        throw new Error("president, & vicePresident not in the lists")
    }

    // const preventDuplicateCandidate = 
    // prevent duplicate same president and vice president here

    const candidates = await Candidate.create({
        "president": presidentCandidates.name,
        "vicePresident": vicepresidentCandidates.name,
        "votes": 1
    })

    res.status(201).json(candidates)
});

// const likeJob = asyncHandler(async (req, res) => {
//     const findJob = await Job.findById(req.params.id)
//     if(findJob.user_id.toString() !== req.user.id){
//         res.status(400)
//         throw new Error("job title, req, or like is mandatory")
//     }

//     const updateJob = await Job.findByIdAndUpdate(
//         req.params.id,
//         {
//             "likes": findJob.likes + 1 
//         },
//         {new: true}
//     )
//     console.log('goes here3');
//     res.status(201).json(updateJob)
// });

module.exports = {
    createCandidatePresident,
    candidateList
}