const ValidateInput = (req, res) => {
  if (req.errors.length > 0) {
      res.status(403).send({
          "msg": `${req.errors[0].type} ${req.errors[0].path} has ${req.errors[0].msg} ${req.errors[0].value}`,
          "error": 1
      })
      return true;
  } else {
      return false
  }
}

const GenerateResponse = async (obj, res, msg = "No Record Found") => {
    let input = await obj;
    if (input.length > 0) {
        res.send({
            "data": input,
            "error": 0
        })
    } else {
        res.send({
            "msg": msg,
            "data": input,
            "error": 0
        })
    }
}
const GenerateDataResponse = (msg,isError = false) =>{
   return {"msg":msg,"error":Number(isError)}

}
const ValidateUploadType = (req,res,next)=>{
    if(req.file?.filename == undefined){
        res.send(GenerateDataResponse("Image File Not found"));
        return null
    }
    if( req.file?.mimetype != 'image/png'){
        console.log("Invalid")
        res.send("Invalid upload type")
        return null
    }
    return next()
}
module.exports = {ValidateInput,GenerateDataResponse,GenerateResponse,ValidateUploadType};