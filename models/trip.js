const uuid = require('uuid/v1');


class Trip {
    constructor(tripTitle, tripImage, dateDEP, dateRET) {
        this.title = tripTitle
        this.image = tripImage
        this.dateDEP = dateDEP
        this.dateRET = dateRET
        this.uuid = uuid()
    }
}



module.exports = Trip