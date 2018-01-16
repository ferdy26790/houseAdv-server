const express = require('express');
const router = express.Router();
const images = require('../helper/image')
const houseController = require('../controller/houseController')
const auth = require('../middleware/auth')
/* GET users listing. */
router.post('/addHouse', auth.authentication, images.multer.single('image'),
  images.sendUploadToGCS, auth.authentication, houseController.addHouse)
router.get('/detailHouse/:id', houseController.getHouse)
router.get('/getAllHouse', houseController.getAllHouse)

module.exports = router;
