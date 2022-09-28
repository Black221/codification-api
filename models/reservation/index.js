const mongoose = require('mongoose')
const ReservationModel = require('./ReservationModel')
const reservationSchema = require('./reservationSchema')


reservationSchema.loadClass(ReservationModel)


module.exports = mongoose.model('Reservation', reservationSchema)
