const express = require('express')
const Controller = require('../controllers/etudiant')
const requireAuth = require('../middlewares/authMiddleware')
const requireAdmin = require('../middlewares/adminMiddleware')

const router = express.Router()
/* instancie le controller */
const controller = new Controller()


router.post('/create', controller.createEtudiant)
router.post('/createRandom', controller.createEtudiantRandom)
router.get('/carte/:carte', controller.getEtudiantByCarte)
router.get('/:id', requireAuth, controller.getEtudiant)
router.get('/', requireAdmin, controller.getEtudiants)


module.exports = router

