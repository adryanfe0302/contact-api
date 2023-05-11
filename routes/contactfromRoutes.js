const express = require("express");

const { contactFormPost, contactFormGet } = require("../controllers/contactFormControler");


// then continue accesss the route

const router = express.Router()

router.post("/", contactFormPost)
router.get("/", contactFormGet)

module.exports = router