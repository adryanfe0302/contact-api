const getContact = (req, res) => {
    res.status(200).json({ message: 'view all here'})
};

const getDetailContact = (req, res) => {
    res.status(200).json({ message: `view here ${req.params.id}`})
};

const createContact = (req, res) => {
    console.log('req', req.body);
    if(req.body.age >= 17) {
        res.status(201).json({ message: 'create here big'})
    } else {
        res.status(201).json({ message: 'create here small'})
    }

    
};

const editContact = (req, res) => {
    res.status(200).json({ message: `update here ${req.params.id}`})
};

const deleteContact = (req, res) => {
    res.status(200).json({ message: `delete here ${req.params.id}`})
};

module.exports = { 
    getContact,
    getDetailContact,
    createContact,
    editContact,
    deleteContact
}