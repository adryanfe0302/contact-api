const asyncHandler = require("express-async-handler")
const Election = require("../models/electionModel")

const electionVote = asyncHandler(async (req, res) => {
    const election = await Election.find()
    console.log('stacks', election);
    res.status(200).json(election)
});

const createCandidate = asyncHandler(async (req, res) => {
    const { name, status } = req.body
    if( !name || !status ){
        res.status(400)
        throw new Error("name, & status is mandatory")
    }
    if(req.body.images === "" || req.boyd.images === null){
        req.body.images = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYA0StKR6zPsiDKElNE_yeeylY_xvUcqEYBg&usqp=CAU"
    }
    const candidate = await Election.create(req.body)

    res.status(201).json(candidate)
});

const createCandidatePresident = asyncHandler(async (req, res) => {
    const { president, vicePresident } = req.body

    if( !president || !vicePresident ){
        res.status(400)
        throw new Error("president, & vicePresident is mandatory")
    }
 
    const candidateSelection = await Election.create(req.body)

    res.status(201).json(candidateSelection)
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
    electionVote,
    createCandidate,
    createCandidatePresident
}