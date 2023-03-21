const express = require("express");

const { electionVote, createCandidate } = require("../controllers/electionController");

const { createCandidatePresident, candidateList } = require("../controllers/candidateController");

//check token is valid or no
// const validateToken = require("../middleware/validateToken");

// then continue accesss the route

const router = express.Router()

// for all need validatetoken just use this
// router.use(validateToken)
// for all need validatetoken just use this

router.get("/", electionVote)
router.post("/", createCandidate)

router.get("/candidate", candidateList)
router.post("/votes", createCandidatePresident)
// router.put("/:id", likeJob)

module.exports = router