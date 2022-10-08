const express = require('express')
const Controller = require('../controllers/chambre')

const router = express.Router()
/* instancie le controller */
const controller = new Controller()

router.post('/add', controller.addChambres)
router.get('/getAllChambres', controller.getAllChambres)
router.post('/getChambre/:num_carte', controller.getChambre)
router.post('/getChambreVide/:num_carte', controller.getChambreVide)
router.get('/getReserved/:idChambre', controller.getReserved)
router.get('/getPlace', controller.getPlaces)

module.exports = router