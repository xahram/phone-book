const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const contactsRouter = require("../routers/contacts.router");

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan("dev"));



//Routes
app.use("/api/v1", contactsRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server Up and Running at ${PORT}`)
})