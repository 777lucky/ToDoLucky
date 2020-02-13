const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
    let token = req.headers.authorization;
    try {
        let payload = jwt.verify(token, process.env.SECRET_KEY)

        req.headers.authorization = payload._id
        next();
    }

    catch(err) {
        res.status(401).json({
            status: false,
            errors: 'Invalid Token'
        })
    }
}

module.exports = authenticate