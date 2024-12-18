const { ACCESS_SECRET_KEY , REFRESH_SECRET_KEY} = require("../utils/constant");
const createError = require("http-errors");
const fs = require("fs");
const path = require("path");
const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");

function SignAccessToken(username) {
  return new Promise((resolve, reject) => {
    const payload = {
      username: username,
      date: new Date()
    };
    const option = {
      expiresIn: "8h",
    };
    JWT.sign(payload, ACCESS_SECRET_KEY, option, (err, token) => {
      if (err) reject(createError.InternalServerError("Server error"));
      resolve(token);
    });
  });
}

function SignRefreshToken(username) {
  return new Promise((resolve, reject) => {
    const payload = {
      username: username,
      date: new Date()
    };
    const option = {
      expiresIn: "1y",
    };
    JWT.sign(payload, REFRESH_SECRET_KEY, option, (err, token) => {
      if (err) reject(createError.InternalServerError("Server error"));
      resolve(token);
    });
  });
}

function verifyRefreshToken(token) {
return new Promise((resolve , reject) =>{
   const result = JWT.decode(token , REFRESH_SECRET_KEY ) 
      if(!result) createHttpError.Unauthorized("You don't have permission to access this api , please login")
     resolve(result)
})
     
} 

module.exports = { SignAccessToken,SignRefreshToken,verifyRefreshToken };
