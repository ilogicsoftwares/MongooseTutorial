import jwt from 'jsonwebtoken';
export default (req,res,next)=>{
  let token;

  token = req.headers['x-access-token'] || null;
  
   
    if(token){
        jwt.verify(token,'NicoleDylanKelly',(err,decoded)=>{
            if (err) {
                return res.json({
                  success: false,
                  message: 'Failed to authenticate token'
                });
              } else {
                req.decoded = decoded;
                next();
              } 
        });
    }else{
        return res.status(403).send({
            success: false,
            message: 'No token provided'
          });
    }
    }