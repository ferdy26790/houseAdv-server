const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
class User{
  static addUser(req, res){
    console.log('masuk');
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(!err){
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if(!err){
              let newUser = new userModel({
                name   : req.body.name,
                password  : hash,
                address : req.body.address,
                email : req.body.email,
                phone : req.body.phone,
              })
              newUser.save()
              .then((user) => {
                res.status(200).json({
                  data:user
                })
              }).catch((err) => {
                console.log(err);
                res.status(200).json({
                  msg:err
                })
              })
            } else {
              console.log(err);
            }
        });
      } else {
        console.log(err);
      }
    })
  }

  static login(req, res){
    let email = req.body.email
    let password = req.body.password
    userModel.findOne({
      'email':email
    })
    .then((user) => {
      bcrypt.compare(password, user.password, function(err, response) {
        if(!err){
          if(response){
            let token = jwt.sign({
              data:user
            }, process.env.SECURITY_KEY)
            res.status(200).json({
              token:token,
              name:user.name
            })
          } else {
            res.status(200).json({
              msg:'password salah'
            })
          }
        } else {
          console.log(err);
        }
      });
    }).catch((err) => {
      res.status(200).json({
        msg:'email tidak terdaftar'
      })
    })
  }


}

module.exports = User
