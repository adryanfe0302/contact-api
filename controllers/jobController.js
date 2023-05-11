const asyncHandler = require("express-async-handler")
const Job = require("../models/jobModel")

const jobLists = asyncHandler(async (req, res) => {
    const job = await Job.find()
   
    res.status(200).json(job)
});

const createJob = asyncHandler(async (req, res) => {
    const { job_title, job_req, likes } = req.body
    console.log('goes here');
    if( !job_title || !job_req || !likes ){
        res.status(400)
        throw new Error("job title, req, or like is mandatory")
    }
    
  
    let jobs = {...req.body}
    jobs.user_id = req.user.id
  
    const job = await Job.create(jobs)

    res.status(201).json(job)
});

const likeJob = asyncHandler(async (req, res) => {
    const findJob = await Job.findById(req.params.id)
    if(findJob.user_id.toString() !== req.user.id){
        res.status(400)
        throw new Error("job title, req, or like is mandatory")
    }

    const updateJob = await Job.findByIdAndUpdate(
        req.params.id,
        {
            "likes": findJob.likes + 1 
        },
        {new: true}
    )
    res.status(201).json(updateJob)
});

module.exports = {
    jobLists,
    createJob,
    likeJob
}