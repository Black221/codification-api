const express = require('express')
const Controller = require('../controllers/reserverTerrain')

const router = express.Router()
/* instancie le controller */
const controller = new Controller()


router.post('/reserver/:numCarte', controller.reserver)
router.get('/reservations', controller.getAll)
router.post('/annulerReservation', controller.annuler)
router.post('/deleteReservation', controller.delete)


module.exports = router