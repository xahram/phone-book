const express = require('express');
const contacts = express.Router()
const { contactList, addContact } = require('../controllers/contacts.controller')
const upload = require("../utils/multer")


contacts.get("/contacts-list", contactList)

contacts.post("/add-contact", upload.single("profile"), addContact)


module.exports = contacts