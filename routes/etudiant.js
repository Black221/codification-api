const express = require('express')
const Controller = require('../controllers/etudiant')
const requireAuth = require('../middlewares/authMiddleware')
const {RequireAdminToken} = require('../middlewares/adminMiddleware')

const router = express.Router()
/* instancie le controller */
const controller = new Controller()


router.post('/create', controller.createEtudiant)
router.post('/createRandom', controller.createEtudiantRandom)
router.get('/carte/:carte', controller.getEtudiantByCarte)
router.get('/all', RequireAdminToken, controller.getEtudiants)
router.get('/:id', requireAuth, controller.getEtudiant)


module.exports = router

