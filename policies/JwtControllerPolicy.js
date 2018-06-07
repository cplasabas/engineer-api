var jwt = require('jsonwebtoken');
const config = require("../config/config")

module.exports = {
  secure(req, res, next) {
    var token = req.headers['authorization']

    if (token) {
      
      jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
          res.json({ "error": true })
        }
        req.decoded = decoded;
        next()
      })
    } else {
      // forbidden without token
      res.status(403).send({
        "error": true
      })
    }
  }
}
