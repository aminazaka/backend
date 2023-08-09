const express = require('express');
const router = express.Router();
const {body,validationResult} = require("express-validator")
const {GenerateDataResponse,ValidateInput,ValidateUploadType} = require("../../common/common");
const {addNewuser,Login} = require('./auth.service');
const {uploads} = require("../../common/upload.setting");
const path = require("path");
const nodemailer = require("nodemailer");
const SendEmail = require('../../common/mail');





// router.post("/register",async (req,res)=>{
//     const user = req.body
//     let result = await addNewuser(user)
//     res.send(result)
// })
router.post("/login",[body("email").isEmail(),body("password").isLength(5)],async (req,res)=>{
    const user = req.body
    const err = ValidateInput(validationResult(req),res)
    if(err) return;
    await Login(user.email,user.password,res)
})
router.post("/register",uploads.single('image'),async (req,res)=>{
    if(!req.file) return res.send(GenerateDataResponse("invalid file",1))
    try{
        var user = JSON.parse(req.body.data)
    }catch(err){
        return res.send(GenerateDataResponse("Invalid data",true))
    }
    let result = await addNewuser(user,path.join(`${process.env.BASE_URL}:${process.env.BACKEND_PORT}/uploads/`, req.file.filename))
    res.send(result)
})
router.post("/sendmail",async (req,res)=>{

    let transporter  = nodemailer.createTransport({
        host : "smtp.gmail.com",
        port: "465",
        secure :true,
        auth:{
            user : "aminazaka7@gmail.com",
            pass :"eobskxfweomwbvay"
        }
    })
    const info  = await transporter.sendMail({
    from : 'abc@gmail.com',
        to : "raniyaarooj06@gmail.com",
        subject : "New Account is created on Daraz",
        html: "<b>Hello world?</b>"
    })
    console.log(`Email Status ${JSON.stringify(info)}`)
})
    

module.exports = router;