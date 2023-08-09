const{persons}= require("../customer/customer.model");
const bcrypt = require('bcrypt');
const {GenerateDataResponse,GenerateResponse} = require("../../common/common");
const {setsession} = require("./auth.middlewayer")

const addNewuser = async (obj,imagepath) => {
    const salt = bcrypt.genSaltSync(1);
    const password = bcrypt.hashSync(obj.password,salt);
    const cust = new persons({ id: obj.id, image : imagepath , name: obj.name, age: obj.age, email: obj.email, password: password })
    let result = {}
    try {
        let res = await cust.save();
        return GenerateDataResponse("New user is added")
    } catch (e) {
        return GenerateDataResponse(e['message'], true)
    }
}
const Login = async (email,password,res)=>{
    let obj = (await persons.findOne({email:email}))?.toJSON()
    if(obj == undefined){
        return res.send(GenerateDataResponse("Invalid email or passwrod",true),401);
    }else{
        const verifyPassword = bcrypt.compareSync(password,obj['password']) 
        if(verifyPassword){
            delete obj.password
            const token = setsession(obj)
            return GenerateResponse({"token":token},res,"User Logged In")
        }else{
            return  res.send(GenerateDataResponse("Invalid email or passwrod",true),401)
        }
    }
}

module.exports = {addNewuser,Login}
