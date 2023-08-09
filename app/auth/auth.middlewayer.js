require('dotenv').config();
const {GenerateDataResponse} = require("../../common/common");
const jwt = require('jsonwebtoken');

const Auth = (req,res,next) =>{
const token = req.headers?.authorization;
if(token == undefined) return res.send(GenerateDataResponse("Token is missing",1),401)
try {   
    var decoded = jwt.verify(token,  process.env.PRIVATE_KEY);
    console.log(decoded)
  } catch(err) {
    return res.send(GenerateDataResponse(err['message'],1))
  }
  return next();
// if(req.session.user){
   
// }else{
  
// }

}

const setsession = (obj) =>{


    //Logic to create JWT

    const token = jwt.sign(obj, process.env.PRIVATE_KEY, { expiresIn: 60 * 60 });
    return token
}

module.exports = {Auth,setsession}