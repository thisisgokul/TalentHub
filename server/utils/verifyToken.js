const jwt = require('jsonwebtoken');
const customError=require("./errorHandler");
const dotenv = require('dotenv');
dotenv.config()

const verifyToken=(req,res,next)=>{
    const token = req.cookies.token;

    if (!token) return next(customError(401, 'You are not authenticated!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(customError(403, 'Token is not valid!'));

        req.user = user;
        next();
    });


}

module.exports=verifyToken