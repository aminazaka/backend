

const {persons} = require("./customer.model.js")




//---------------- Get Customer By Id --------------------------------------//

const getCustomerById = async(customerId)=>{
    try {
        return await customer.findById(customerId);
        console.log(result);
      } catch (e) {
        console.log(e);
        throw e; // Rethrow the error to be handled at the higher level
      }
}

//-------------------Delete End Point---------------------//

const deleteCustomer = async (customersId)=> {
    try{
        let result = await customer.findByIdAndDelete(customersId)
            return ("customer is deleted successfully")
    }
    catch(err){
        console.log(err)
}};


//--------------------Delete Customer By Name-----

const deleteCustomerByName = async (customerName) => {
    try {
      let result = await customer.deleteOne({ name: customerName });
      if (result.deletedCount > 0) {
        return "Customer is deleted successfully";
      } else {
        throw new Error("Customer not found");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  

//---------------------put End point--------------------
  
const updateCustomer = async(customerId, customers)=>{
    try{
        let result = await customer.findByIdAndUpdate(customerId,customers);
                    return ("customer is updated successfully")
    }catch (e) {
        console.log(e);
        res.status(500).send("An error occurred while updating the customer.");
      }
}

//-----------------post end point------------------//

const addnewcash = async(cash)=>{
    const scan = new persons({
        'age':cash.age, 
        'name': cash.name,
        'email': cash.email
        
    })
    

    let result = { };
    try{
        result = await scan.save()
        console.log("New customer is added")
    }
    catch(e){
        console.log("data is not enter" + e)
    }
    return result;
}

//--------------------Get All Customer data------------------------

const getAllData = async ()=>{
    try{
        let result = await persons.find();
        return result;
    }
    catch(e){
        console.log(e);
        throw e; // Rethrow the error to be handled at the higher level
    }
}

module.exports = {getAllData, addnewcash, updateCustomer, deleteCustomerByName, deleteCustomer, getCustomerById}