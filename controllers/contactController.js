const asyncHandler = require("express-async-handler")

const Contact = require("../models/contactModel")

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find()
    res.status(200).json(contacts)
});

const getDetailContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    // res.status(200).json({ message: `view here ${req.params.id}`})

    if(!contact){
        res.status(400)
        throw new Error('Contact not found')
    }
    res.status(200).json(contact)
});

const createContact = asyncHandler(async (req, res) => {
    console.log('req', req.body);
    // if(req.body.age >= 17) {
    //     res.status(201).json({ message: 'create here big'})
    // } else {
    //     res.status(201).json({ message: 'create here small'})
    // }
    const {name,email,phone} = req.body 
    if(!name || !email || !phone){
    
       throw new Error(`please fill`)
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    })

    res.status(201).json(contact)
    
});

const editContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(400)
        throw new Error('Contact not found')
    }
    console.log('req', req.body)
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    // res.status(200).json({ message: `update here ${req.params.id}`})
    res.status(200).json(updateContact)
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(400)
        throw new Error('Contact not found')
    }
    console.log('oe');
    await Contact.findOneAndRemove();
    res.status(200).json(contact)
});

module.exports = { 
    getContact,
    getDetailContact,
    createContact,
    editContact,
    deleteContact
}