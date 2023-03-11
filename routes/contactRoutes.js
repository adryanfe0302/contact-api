const express = require('express')
const router = express.Router()
const { 
    getContact,
    getDetailContact,
    createContact,
    editContact,
    deleteContact
} = require('../controllers/contactController.js')

router.route("/").get(getContact)

router.route("/:id").get(getDetailContact)

router.route("/").post(createContact)

router.route("/:id").put(editContact)

router.route("/:id").delete(deleteContact)

module.exports = router;