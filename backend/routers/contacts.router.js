const express = require('express');
const contacts = express.Router()
const { contactList, addContact } = require('../controllers/contacts.controller')
const multer = require('multer');
const uuid = require("uuid")
const path = require('path')

const publicFolder = path.join(__dirname, "../public/uploads")
// console.log(publicFolder)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, publicFolder)
    },
    filename: function (req, file, cb) {
        // const id = uuid.v4()
        // req.id = id
        // console.log("multer", id)
        cb(null, file.originalname)
    },
    limits: {
        fileSize: 210000
    },


})


const upload = multer({ storage: storage })

contacts.get("/contacts-list", contactList)

contacts.post("/add-contact", upload.single("profile"), addContact)


module.exports = contacts