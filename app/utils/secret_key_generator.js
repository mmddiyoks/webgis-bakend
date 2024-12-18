const { log } = require("console");
const crypto = require("crypto");


function SecretGen(){
    const key = crypto.randomBytes(32).toString("hex").toUpperCase();
console.log(key);
    return key

}

module.exports ={
    SecretGen
}