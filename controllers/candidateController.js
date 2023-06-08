const asyncHandler = require("express-async-handler")
const { Candidate } = require("../models/candidateModel")
const ListCandidate = require("../models/electionModel")


const candidateList = asyncHandler(async (req, res) => {

    const candidate = await Candidate.find();
   
    const pageno = candidate.length / req.body.pageoption

    const keyword = req.body.keyword || ''

    const listCandidate =  await Candidate.find()
    .limit(req.body.pageoption * 1).skip((req.body.pageno - 1) * req.body.pageoption)

    
    const searchCandidate = candidate.filter(c => c.president.name.toLowerCase().includes(keyword.toLowerCase()) || c.vicePresident.name.toLowerCase().includes(keyword.toLowerCase()));


    const objCandiate = {
        "listCandidate": keyword ? searchCandidate : listCandidate,
        "totalCandidate": candidate.length,
        "pageOption": req.body.pageoption || 10,
        "totalpage": Math.ceil(pageno),
        "keyword": keyword
    }

    res.status(200).json(objCandiate)
});


const createCandidatePresident = asyncHandler(async (req, res) => {
    const { president, vicePresident, comments, votes } = req.body


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
    console.log('candidates1', votes);
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
        comments,
        "votes": votes || 1
    })
    console.log('candidates2', candidates);
    res.status(201).json(candidates)
});

const deleteAllCandidate = asyncHandler(async(req, res) => {
    const deleteAll = await Candidate.deleteMany()
    res.status(200).json(deleteAll)
})

const deleteSelectedCandidate = asyncHandler(async(req, res) => {
    // const deleteAll = await Candidate.deleteMany()
    // res.status(200).json(deleteAll)
    const selectedCandidate = await Candidate.findById(req.params.id)
    if(!selectedCandidate){
        res.status(400)
        throw new Error('Id not found')
    }
    await selectedCandidate.deleteOne({_id: req.params.id});
    res.status(200).json(selectedCandidate)
})

const deleteFromelection = asyncHandler(async(req, res) => {
    const selectedCandidate = await ListCandidate.findById(req.params.id)
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
    deleteSelectedCandidate,
    voteCandidate,
    deleteFromelection
}