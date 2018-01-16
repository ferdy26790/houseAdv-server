const houseModel = require('../models/house')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const getDecode = function (token) {
  let decode = jwt.verify(token, process.env.SECURITY_KEY)
  return decode
}
class House{
  static getHouse (req, res) {
    houseModel.findById(req.params.id)
    .populate('user')
    .then((response) => {
      res.status(200).json({
        data: response
      })
    }).catch((err) => {
      console.log(err);
    })
  }
  static getAllHouse (req, res) {
    console.log('masuk');
    houseModel.find({category:'house'}).
    populate('user')
    .then((houses) => {
      res.status(200).json({
        data:houses
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  static findHouse (req, res) {
    houseModel.findById(req.params.id)
    .then((house) => {
      res.status(200).json({
        data: house
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  static addHouse (req, res) {
    console.log('masuk');
    let decoded = getDecode(req.headers.token)
    console.log(decoded);
    let newHouse = new houseModel({
      title: req.body.title,
      description: req.body.description,
      category: 'house',
      img: req.file.cloudStoragePublicUrl,
      available: true,
      price: req.body.price,
      address: req.body.address,
      user: decoded.data._id
    })
    newHouse.save()
    .then((response) => {
      console.log(response);
      res.status(200).json({
        data: response
      })
    }).catch((err) => {
      res.status(500).json({
        msg: 'internal server error'
      })
    })
  }
}

module.exports = House
