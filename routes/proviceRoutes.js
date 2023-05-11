const express = require("express");

const { provinceList, provinceAdd } = require("../controllers/provinceController");

//check token is valid or no
// const validateToken = require("../middleware/validateToken");

// then continue accesss the route

const router = express.Router()

// for all need validatetoken just use this
// router.use(validateToken)
// for all need validatetoken just use this

router.get("/", provinceList)
router.post("/", provinceAdd)

module.exports = router