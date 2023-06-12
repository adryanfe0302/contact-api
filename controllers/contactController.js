const asyncHandler = require("express-async-handler")

const Contact = require("../models/contactModel")
// const DeleteSome = require("../models/deleteSome")

//as admin get all contacts


// as user get all contact his created
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id})
    res.status(200).json(contacts)
});

const getDetailContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id)
    // res.status(200).json({ message: `view here ${req.params.id}`})
    console.log('contact', contact);
    if(!contact){
        res.status(400)
        throw new Error('Contact not found')
    }
    res.status(200).json(contact)
});

const createContact = asyncHandler(async (req, res) => {

    const {name,email,phone} = req.body 
    if(!name || !email || !phone){
        res.status(400)
       throw new Error(`all field is mandatory`)
       
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })

    res.status(201).json(contact)
    
});

const editContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(400)
        throw new Error('Contact not found')
    }
    
    // console.log('contact', contact.user_id);
    // console.log('req', req.user);
    // console.log('req2', req.params);
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error('user dont have permisson to update this contact')
    }

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

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error('user dont have permisson to update this contact')
    }
    // await Contact.findOneAndRemove();
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact)
});

const deleteAll = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id})
    if(contacts.length > 0){
        console.log('enter');
        await Contact.deleteMany()
        res.status(200).json(contacts)
    } else {
        res.status(404)
        throw new Error("no contacts available")
    }
    
});

const deleteSome = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id})
    console.log('cont', req.body.ids);
    if(contacts.length > 0){
        let ids = req.body.ids
        // ids.map(async id => {
        //     console.log('id', id);
        //     await Contact.deleteOne({_id: id})
        // })
        const deleteSome = await Contact.deleteMany({_id:{$in:ids}})
        res.status(200).json(deleteSome)
    } else {
        res.status(404)
        throw new Error("no contacts available")
    }
});

module.exports = { 
    getContact,
    getDetailContact,
    createContact,
    editContact,
    deleteContact,
    deleteAll,
    deleteSome
}