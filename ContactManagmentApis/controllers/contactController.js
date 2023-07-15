//@des Get All Contacts
//@routes GET /api/contacts
//@access public
const getContacts = (req,res)=>{
    res.status(200).json({message:"Get All Contacts"})
}

//@des Get Contact
//@routes GET /api/contacts/:id
//@access public
const getContact = (req,res)=>{
    res.status(200).json({message:`Get Contact For id ${req.params.id}`})
}


//@des Create New Contact
//@routes POST /api/contacts
//@access public
const createContact = (req,res)=>{
    console.log("Got Request",req.body)
    const {name,email,phone} = req.body

    if (!name || !email || !phone) {
        res.status(400)
        throw Error("All Field Are Mendatory!")
    }

    res.status(201).json({message:"Created New Contact"})
}

//@des Update Contact
//@routes PUT /api/contacts/:id
//@access public
const updateContact = (req,res)=>{
    res.status(200).json({message:`Updated Contact For id ${req.params.id}`})
}

//@des Delete Contact
//@routes DELETE /api/contacts/:id
//@access public
const deleteContact = (req,res)=>{
    res.status(200).json({message:`Deleted Contact For id ${req.params.id}`})
}


module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}