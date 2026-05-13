const  Request  = require("../models/bloodrequestmodel");

exports.donaterequest = async (req,res) => {
    try {
           
     const{userId,fullName,bloodGroup,donationtype,quantity,hospital,unitid,message,status} = req.body;

     if(!userId){
       return  res.status(400).send({message:"userId is required"});
     }

     const newdonor = new Request({
        userId,
        fullName,
        bloodGroup,
        donationtype,
        quantity,
        hospital,
        unitid,
        message,
        status
     });

    await newdonor.save();

     res.status(201).send({
        message:"Donor Request Submitted Sucessfully",
        request:newdonor
     })

    } catch (error) {
         res.status(500).send({
            message:"Error Submitting request",
            error:error.message
         })
    }
}