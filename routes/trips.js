const express = require('express')
const router = express.Router()
const session = require('express-session')

const Trip = require("../models/trip")
const User = require('../models/user')

trips = []

users = []

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
            res.redirect('/trips/login')
        }
    }
}

// create an authentication middleware 
function userTrips(req, res, next) {

    if (req.session) {

        let sessID = req.session.userUUID

        function userTrips(trips, sessID) {

            return trips.filter(function (trip) {
                return trip.userid == sessID
            });
        }

        myTrips = userTrips(trips, sessID)

        if (req.session.username) {
            // perform the original request 
            next()
        } else {
            res.redirect('/trips/login')
        }
    }
}

// GET Shows all the trips created
router.get("/", userTrips, (req, res) => {

    res.render('trips', { myTrips })
    console.log(req.session)
    console.log(trips)
})

// GET Shows the register form
router.get('/register', (req, res) => {
    res.render('register')
})

// POST Registers user in array
router.post('/register', (req, res) => {

    let username = req.body.username
    let password = req.body.password

    let user = new User(username, password)

    users.push(user)
    console.log(users)
    res.redirect('/trips/login')
})

// GET Shows log in form
router.get("/login", (req, res) => {
    res.render("login")
})

// POST Logins in the user
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
            req.session.userUUID = persistedUser.userUUID
            // where should we redirect 
            res.redirect('/trips')
        }
    } else {
        // user is not authenticated successfully 
        res.render('login', { message: 'Invalid username or password' })
    }
    // console.log(req.session)
})

// Logouts the current user
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                next(error)
            } else {
                res.redirect('/trips/login')
            }
        })
    }
    console.log("User Logged Out!")
    console.log(req.session)
})

// GET Shows the create trip form
router.get("/create-trip", authenticate, (req, res) => {
    res.render("create-trip")
})

// POST the trip to the array
router.post('/create-trip', (req, res) => {
    let tripTitle = req.body.tripTitle
    let tripImage = req.body.tripImage
    let dateDEP = req.body.dateDEP
    let dateRET = req.body.dateRET
    let userid = req.session.userUUID

    let trip = new Trip(tripTitle, tripImage, dateDEP, dateRET, userid)

    trips.push(trip)

    // put something in the session
    if (req.session) { // check if session is available 
        req.session.tripTitle = tripTitle
        req.session.tripTitle = tripTitle
    }
    console.log(req.session)
    console.log(trips)
    res.redirect("/trips")
})

// POST deletes the trip
router.post("/delete-trip", (req, res) => {
    let tripID = req.body.tripID

    function removeTrip(trips, tripID) {

        return trips.filter(function (trip) {
            return trip.tripUUID != tripID
        });
    }

    trips = removeTrip(trips, tripID)

    res.redirect("/trips")
})

module.exports = router