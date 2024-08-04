const jwt=require('jsonwebtoken');

const auth =(req,res,next)=>{
    const authHeader = req.header('Authorization');
    if(!authHeader){
        return res.status(401).json({message:'Authorization header required'});
    }
    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).json({error:"Token required"});
    try{
        const decoded = jwt.verify(token,"secret_key");
        console.log(decoded);
        req.authId = decoded.authId;
        req.role = decoded.role;
        next();
    }catch(err){ 
        res.status(401).json({error:"Invalid Token"});
    }
};
module.exports = auth;