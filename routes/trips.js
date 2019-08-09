const express = require('express')
const router = express.Router()
const session = require('express-session')

const Trip = require("../models/trip")
const User = require('../models/user')

// initialize session 
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// create an authentication middleware 
function authenticate(req, res, next) {

    if (req.session) {
        if (req.session.username) {
            // perform the original request 
            next()
        } else {
            res.redirect('/login')
        }
    }
}

// Shows all the trips created
router.get("/", (req, res) => {
    res.render('trips', { trips: trips })
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {

    let username = req.body.username
    let password = req.body.password

    let user = new User(username, password)

    users.push(user)
    console.log(users)
    res.redirect('login')
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post('/login', (req, res) => {

    let username = req.body.username
    let password = req.body.password

    let persistedUser = users.find(user => {
        return user.username == username && user.password == password
    })

    if (persistedUser) {
        // user is authenticated successfully 
        if (req.session) {
            req.session.username = persistedUser.username
            // where should we redirect 
            res.redirect('trips')
        }
    } else {
        // user is not authenticated successfully 
        res.render('login', { message: 'Invalid username or password' })
    }

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

    let trip = new Trip(tripTitle, tripImage, dateDEP, dateRET)

    trips.push(trip)
    // console.log(trips)

    res.redirect("/trips")
})

// POST deletes the trip
router.post("/delete-trip", (req, res) => {
    let tripID = req.body.tripID

    function removeTrip(trips, tripID) {

        return trips.filter(function (trip) {
            return trip.uuid != tripID;
        });
    }

    trips = removeTrip(trips, tripID);

    res.redirect("/trips")
})

module.exports = router