const express = require('express')
const Controller = require('../controllers/admin')

const router = express.Router()
/* instancie le controller */
const controller = new Controller()

router.post('/connexion', controller.connexion)
router.post('/create/:num_carte', controller.createAdmin)

module.exports = router;