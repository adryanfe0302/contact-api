const express = require("express");

const { createCandidatePresident } = require("../controllers/electionController");

//check token is valid or no
// const validateToken = require("../middleware/validateToken");

// then continue accesss the route

const router = express.Router()

// for all need validatetoken just use this
// router.use(validateToken)
// for all need validatetoken just use this


router.post("/votes", createCandidatePresident)
// router.put("/:id", likeJob)

module.exports = router