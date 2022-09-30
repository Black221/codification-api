const express = require('express')
const Controller = require('../controllers/reservation')
const requireAdmin = require('../middlewares/adminMiddleware')
const requireAuth = require('../middlewares/authMiddleware')

const router = express.Router()
/* instancie le controller */
const controller = new Controller()


router.post('/reserver/:id', requireAuth,controller.reserver)
router.post('/valider/:numCarte', requireAuth, controller.valider)
router.post('/annuler/:numCarte', requireAuth, controller.annuler)


module.exports = router
