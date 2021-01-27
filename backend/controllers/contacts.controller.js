const contacts = require('../utils/contacts')

const contactList = (req, res, next) => {
    res.send({ status: 200, contacts })
}



module.exports = {
    contactList
}