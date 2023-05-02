const asyncHandler = require("express-async-handler")
const { Candidate } = require("../models/candidateModel")
const ListCandidate = require("../models/electionModel")


const candidateList = asyncHandler(async (req, res) => {
    const candidate = await Candidate.find();
    const pageNumber = candidate.length / 10

    // to get page number possible from params or body
    const pageNo = req.params.id * 10 - 10 || req.body.pageno * 10 - 10

    const listCandidate =  await Candidate.find()

    const objCandiate = {
        "listCandidate": listCandidate,
        "totalCandidate": candidate.length,
        "pageNo": pageNo,
        "pageOption": req.body.pageoption || 10,
        "pageNumber": Math.ceil(pageNumber)
    }

    res.status(200).json(objCandiate)
});


const createCandidatePresident = asyncHandler(async (req, res) => {
    const { president, vicePresident, comments } = req.body
    console.log('works', req.body);
    if( !president || !vicePresident ){
        res.status(400)
        throw new Error("president, & vicePresident is mandatory")
    }

    //find id get from body and compare to db
    const presidentCandidates = await ListCandidate.findById(president)
   
    const vicepresidentCandidates = await ListCandidate.findById(vicePresident)

    if(!presidentCandidates || !vicepresidentCandidates) {
        res.status(400)
        throw new Error("president, & vicePresident not in the lists")
    }

    // const preventDuplicateCandidate = 
    // prevent duplicate same president and vice president here
    
    const candidates = await Candidate.create({
        "president": {
            "name": presidentCandidates.name,
            "status": presidentCandidates.status,
            "images": presidentCandidates.images
        },
        "vicePresident": {
            "name": vicepresidentCandidates.name,
            "status": vicepresidentCandidates.status,
            "images": vicepresidentCandidates.images
        },
        "votes": 1,
        comments
    })

    res.status(201).json(candidates)
});

const deleteAllCandidate = asyncHandler(async(req, res) => {
    const deleteAll = await Candidate.deleteMany()
    res.status(200).json(deleteAll)
})

const deleteFromelection = asyncHandler(async(req, res) => {
    const selectedCandidate = await ListCandidate.findById(req.params.id)
    console.log('deleteFromelection', selectedCandidate);
    if(!selectedCandidate){
        res.status(400)
        throw new Error('Id not found')
    }
    
    await selectedCandidate.deleteOne({_id: req.params.id});
    res.status(200).json(selectedCandidate)
    
})

const voteCandidate = asyncHandler(async(req, res) => {
    console.log('req', req.params.id)
    const findCandidate  = await Candidate.findById(req.params.id)

    if(!Candidate){
        res.status(400)
        throw new Error('candidate not exist on db')
    }
   

    const updateVotes = await Candidate.findByIdAndUpdate(
        req.params.id,
        {
            "votes": findCandidate.votes + 1
        },
        {new: true}
    )

    console.log('update', findCandidate.votes += 1);


    res.status(200).json(updateVotes)
    


})



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
    candidateList,
    deleteAllCandidate,
    voteCandidate,
    deleteFromelection
}