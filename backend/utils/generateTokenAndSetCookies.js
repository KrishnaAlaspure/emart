import jwt from 'jsonwebtoken'

const generateTokenAndSetCookies=(userId,res)=>{
    const token =jwt.sign({userId},process.env.SECRET_KEY,{
        expiresIn:'10d'
    })
    res.cookie("jwtToken",token,{
        maxAge : 10 * 60 * 60 * 60 * 1000,
        httpOnly : true,  // prevent XSS attacks cross-site scripting attacks
        sameSite : "strict" , //CSRF (Cross Site Request Forgery ) attacks
        secure : process.env.NODE_ENV !== "development"
    })
    return token
}


export default generateTokenAndSetCookies;