const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {

    try{
        //Read Authorization header
        const authHeader = req.headers.authorization;

        //Check if header exists
        if(!authHeader){
            return res.status(401).json({message:"Unauthorized"})
        }

        //Extract token
        const token = authHeader.split(" ")[1];


        //verify token

        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        //Attach user to request object
        req.user = decoded;


        //Continue to next route

        next();

    } catch (error){
        return res.status(401).json({message:"Unauthorized"})
    }
}


module.exports = authMiddleware