const uuid = require("uuid")
const contactList = (req, res, next) => {
    console.log(global.contacts)
    res.send({ status: 200, contacts: global.contacts })
}

const addContact = (req, res, next) => {
    console.log(req.body)
    // console.log(req.file)
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        bio: req.body.bio,
        profilePic: "/uploads/" + req.file.originalname
    }
    global.contacts.push(newUser)
    // console.log(global.contacts)
    // contacts.push(req)
    res.send({ status: 200 })
}



module.exports = {
    contactList,
    addContact
}