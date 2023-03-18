const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/validateToken.js')
const { 
    getContact,
    getDetailContact,
    createContact,
    editContact,
    deleteContact,
    deleteAll,
    deleteSome
} = require('../controllers/contactController.js')

// for all need validatetoken just use this
router.use(validateToken)
// for all need validatetoken just use this



router.route("/").get(getContact)

router.route("/:id").get(getDetailContact)

router.route("/").post(createContact)

router.route("/:id").put(editContact)

router.route("/:id").delete(deleteContact)

router.route("/").delete(deleteAll)

router.route("/deletesome").post(deleteSome)

module.exports = router;