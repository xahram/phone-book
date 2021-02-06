const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
require("../utils/contacts");
const path = require("path")

const contactsRouter = require("../routers/contacts.router");

const app = express();

const PORT = process.env.PORT || 5000



const server = app.listen(PORT, () => {
    console.log(`Server Up and Running at ${PORT}`)
})

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})



app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")))



//Routes
app.use("/api/v1", contactsRouter)



//Error Handlers
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
})




const clients = new Set()
io.on("connection", (socket) => {
    console.log(socket.id)
    clients.add(socket.id)
    io.emit("client-total", clients.size)

    socket.on("disconnect", () => {
        console.log("Disconnected", socket.id)
        clients.delete(socket.id);
        io.emit("client-total", clients.size)
    })
})
