const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { ACCESS_SECRET_KEY } = require("../../utils/constant");
const { getCookieList } = require("../../utils/getCookie");

function verifyToken(req , res , next) {

    const _TurkT = req.headers.cookie;
    const cookies = getCookieList(_TurkT); 
    if (!cookies._TurkT) return next(createHttpError.Unauthorized("You don't have permission to access this api , please login"))
        const parsedToken = cookies._TurkT;
        const result = JWT.decode(parsedToken , ACCESS_SECRET_KEY ) 
        if(!result) createHttpError.Unauthorized("You don't have permission to access this api , please login")
        return next();
} 
   
  module.exports = {
    verifyToken
  }