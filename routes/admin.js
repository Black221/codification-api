const express = require('express')
const Controller = require('../controllers/admin')

const router = express.Router()
/* instancie le controller */
const controller = new Controller()

router.post('/connexion', controller.connexion)

module.exports = router