const express = require("express");

const { electionVote, createCandidate } = require("../controllers/electionController");

const { createCandidatePresident, candidateList, deleteAllCandidate, voteCandidate, deleteFromelection, deleteSelectedCandidate, commentCandidate, detailCandidate } = require("../controllers/candidateController");

//check token is valid or no
const validateToken = require("../middleware/validateToken");

// then continue accesss the route

const router = express.Router()

// for all need validatetoken just use this
router.use(validateToken)

// for all need validatetoken just use this

router.get("/", electionVote)
router.post("/", createCandidate)

router.post("/candidate", candidateList)
router.get("/candidate/:id", detailCandidate)
router.get("/candidate/pageno/:id", candidateList)
router.post("/votes", createCandidatePresident)
router.delete("/deletecandidate", deleteAllCandidate)
router.delete("/deleteselectedcandidate/:id", deleteSelectedCandidate)
router.delete("/deletefromelection/:id", deleteFromelection)
router.put("/votes/:id", voteCandidate)
router.put("/comment/:id", commentCandidate)

module.exports = router