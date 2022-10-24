const express = require('express')
const Controller = require('../controllers/chambre')
const {RequireAdminToken} = require("../middlewares/adminMiddleware");
const requireAuth = require('../middlewares/authMiddleware')

const router = express.Router()
/* instancie le controller */
const controller = new Controller()

router.post('/add', RequireAdminToken, controller.addChambres)
router.get('/getAllChambres', RequireAdminToken, controller.getAllChambres)
router.post('/getChambre/:num_carte', requireAuth, controller.getChambre)
router.post('/getChambreVide/:num_carte', requireAuth, controller.getChambreVide)
router.get('/getReserved/:idChambre', requireAuth, controller.getReserved)
router.get('/getPlace', requireAuth, controller.getPlaces)

module.exports = router