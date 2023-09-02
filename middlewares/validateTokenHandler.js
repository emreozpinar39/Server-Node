const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) return res.status(401).json({message:"Please Login!"});
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
        if(err){
            console.log(err);
            return res.status(400).json(err);
        }
        req.tokenPayload = payload;
        next();
    })
}

module.exports = {authMiddleware}