import jwt from 'jsonwebtoken'


export const authMiddleware = async (req, res, next) => {
    try {
        
        const jwtToken=req.cookies?.jwtToken 
        console.log("jwt1=   ",jwtToken);

        if(!jwtToken){
            return res.status(400).json({
                message: 'User is not authorized',
                error: true,
                success: false,
              });
        }
        jwt.verify(jwtToken,process.env.SECRET_KEY,function(error,decoded){
            console.log(decoded);
            if(error) {console.log("error in jwt",error);}
            console.log(decoded?.userId);
            req.userId=decoded?.userId
            next()

        })
        

        // if(!decoded){
        //     return res.status(401).json({
        //         message:"Unauthorized Token",
        //         error: true,
        //         success: false,
        //     })
        // }
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data:[],
            error: true,
            success: false,
          });
    }

}