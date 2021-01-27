const express = require('express');
const contacts = express.Router()
const { contactList } = require('../controllers/contacts.controller')

contacts.get("/contacts-list", contactList)


module.exports = contacts