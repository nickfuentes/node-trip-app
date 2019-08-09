const express = require("express")
const app = express()
const mustacheExpress = require("mustache-express")

const tripsRouter = require('./routes/trips')

global.trips = []

global.users = []

app.use(express.urlencoded({ extended: false }))

app.use("/css", express.static(__dirname + '/css'))
// app.use('/css', express.static("css"));

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

app.use("/trips", tripsRouter)

app.listen(3000, () => {
    console.log("The server is running Nick....")
})