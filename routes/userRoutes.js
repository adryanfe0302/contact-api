const express = require("express");

const { registerUser, loginUser, currentUser, forgotUser } = require("../controllers/userController");

//check token is valid or no
const validateToken = require("../middleware/validateToken");

// then continue accesss the route

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/forgetpassword", forgotUser)
router.get("/current", validateToken, currentUser)

module.exports = router