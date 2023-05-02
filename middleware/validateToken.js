const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


const validateToken = asyncHandler(async (req,res,next) => {
    let token;
    
    let authHeader = req.headers.authorization || req.headers.Authorization
    console.log('authHeaders', authHeader);
    
    if(authHeader){
        console.log('authHeaders 2');
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_ID, (err, decoded) => {
            if(err){
                res.status(401)
                throw new Error('user token is not authorized')
            }
            // res.json(decoded)
            console.log('authHeaders 3', decoded.user)
            req.user = decoded.user;
            next()
        });
        
    } 

    if(!token){
        res.status(401);
        throw new Error("user not authorize or token is missing")
    }
})

module.exports = validateToken;