const uuid = require('uuid/v1');


class Trip {
    constructor(tripTitle, tripImage, dateDEP, dateRET, userid) {
        this.title = tripTitle
        this.image = tripImage
        this.dateDEP = dateDEP
        this.dateRET = dateRET
        this.tripUUID = uuid()
        this.userid = userid
    }
}

module.exports = Trip