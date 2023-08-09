/* Node Modules*/

const express = require('express');
var router = express.Router();
const {body,param,validationResult} = require("express-validator")
const customerservice = require("./customer.service");
const {ValidateInput,GenerateResponse} = require("../../common/common");


//---------------- Get Customer By Id -----------------------------------------------------

router.get("/:id", async (req, res) => {
    try {
      let customerId = req.params.id;
      let result = await customerservice.getCustomerById(customerId);
      res.send(result);
    } catch (e) {
      res.status(500).send("An error occurred while retrieving the customer.");
    }
  });
//---------------------------------------------------------------------------------------------------

//-------------------Delete End Point--------------------------------------------------------------

router.delete("/:id", async (req,res)=>{
    let customersId = req.params.id;
    let result = await customerservice.deleteCustomer(customersId);
    res.send(result);
})

//--------------------Delete Customer By Name-------------------------------------------------------------

// router.delete("/student/deleteByName", 
//   body("name").notEmpty().withMessage("Name is required").isLength(5),
//  async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     let name = req.body.name;
//     let result = await customerservice.deleteCustomerByName(name);
//     res.send(result);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });
  

//---------------------put End point-----------------------------------------------------------


router.put("/:id", async (req, res) =>{
    let customerId = req.params.id;
    let customers = req.body;
    let result = await customerservice.updateCustomer(customerId, customers);
    res.send(result);
})

//-----------------post end point------and email validation---------------------------------------------------------------------------


router.post('/persons',body("email").isEmail().trim(), async (req, res)=> {
  
  try {
    const err = ValidateInput(validationResult(req),res);
    if(err) return;
    let cash = req.body;
      let result = await customerservice.addnewcash(cash)
      res.send(result)
  } catch (error) {
    res.status(404).send(error.message);
  }
});
  
  
  
  
  
  
  
  
  
  
  
  
  
  // try {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  //   let cash = req.body.cash;
  //   let result = await customerservice.addnewcash(cash)
  //   res.send(result)
  // }
  // })
//---------------------------------------------------------------------------------------------

//------------------------Get All Data---------------------------------------------------------------------

router.get("/persons/getAllData", async (req, res) => {
    try {
      let result = await customerservice.getAllData();
     
      res.send(result);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "An error occurred while retrieving data." });
    }
  });
  //.........................validate email.......................
  router.post('/validate-email', [
    body('email').isEmail().trim().withMessage('Invalid email address'),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Email is valid
    res.json({ message: 'Email is valid' });
  });

  module.exports =router;

