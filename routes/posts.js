const express = require('express')
const router = express.Router();


const postsControllers = require('../controllers/postControllers.js')

router.get('/:slug', postsControllers.show)
router.get('/', postsControllers.index)

module.exports = router