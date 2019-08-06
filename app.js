const express = require("express")
const app = express()
const mustacheExpress = require("mustache-express")

const Trip = require("./models/trip")

app.use(express.urlencoded({ extended: false }))

app.use(express.static("css"));

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

let trips = []

// Shows all the trips created
app.get("/trips", (req, res) => {
    res.render('trips', { trips: trips })
})

// Show the FORM to create a trip
app.get("/create-trip", (req, res) => {
    res.render("create-trip")
})

// POST the trip to the array
app.post('/create-trip', (req, res) => {
    let tripTitle = req.body.tripTitle
    let tripImage = req.body.tripImage
    let dateDEP = req.body.dateDEP
    let dateRET = req.body.dateRET

    // console.log(tripTitle)
    // console.log(tripImage)
    // console.log(dateDEP)
    // console.log(dateRET)

    let trip = new Trip(tripTitle, tripImage, dateDEP, dateRET)

    trips.push(trip)
    // console.log(trips)

    res.redirect("/trips")
})

app.post("/delete-trip", (req, res) => {
    let tripID = req.body.tripID
    // console.log("Trying to Delete Trip")
    // console.log(tripID)
    // console.log(trips)

    function removeTrip(trips, tripID) {

        return trips.filter(function (trip) {
            return trip.title != tripID;
        });

    }

    trips = removeTrip(trips, tripID);

    res.redirect("/trips")
})


app.listen(3000, () => {
    console.log("The server is running Nick....")
})