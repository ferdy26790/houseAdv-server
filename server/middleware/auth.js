const jwt = require('jsonwebtoken')

class Auth{
  static authentication(req, res, next) {
    jwt.verify(req.headers.token, process.env.SECURITY_KEY, (err, decoded) => {
      if(!err) {
        next()
      } else {
        res.status(401).json({
          msg:"Not Authenticated"
        })
      }
    })
  }

  static authorizationAdmin(req, res, next) {
    jwt.verify(req.headers.token, process.env.SECURITY_KEY, (err, decoded) => {
      if(!err) {
        if(decoded.role == 'admin') {
          next()
        } else {
          res.status(401).json({
            msg:"Not Authorized"
          })
        }
      } else {
        res.status(500)
      }
    })
  }

  static authorizationUser(req, res, next) {
    jwt.verify(req.headers.token, process.env.SECURITY_KEY, (err, decoded) => {
      if(!err) {
        if(decoded.role == 'user') {
          next()
        } else {
          res.status(401).json({
            msg:"Not Authorized"
          })
        }
      } else {
        res.status(500)
      }
    })
  }

}

module.exports = Auth
