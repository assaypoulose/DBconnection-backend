const {expressjwt} = require('express-jwt');

exports.requireSignIn = expressjwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256'],
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
    const user = (req.auth._id === req.params.userID);
    if(!user){
        return res.status(401).send('Access Denied! Signin again.')
    }

    next();
}