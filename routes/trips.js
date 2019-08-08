const express = require('express')
const router = express.Router()
const session = require('express-session')


const Trip = require("../models/trip")

// initialize session 
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// Shows all the trips created
router.get("/", (req, res) => {
    res.render('trips', { trips: trips })
})

// Show the FORM to create a trip
router.get("/create-trip", (req, res) => {
    res.render("create-trip")
})

// POST the trip to the array
router.post('/create-trip', (req, res) => {
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

// POST deletes the trip
router.post("/delete-trip", (req, res) => {
    let tripID = req.body.tripID
    // console.log("Trying to Delete Trip")
    // console.log(tripID)
    // console.log(trips)

    function removeTrip(trips, tripID) {

        return trips.filter(function (trip) {
            return trip.uuid != tripID;
        });

    }

    trips = removeTrip(trips, tripID);

    res.redirect("/trips")
})

module.exports = router