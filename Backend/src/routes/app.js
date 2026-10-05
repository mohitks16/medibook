const express = require("express");
const DoctorApplicationRouter = require("./ApplicationRoutes/DoctorsRoutes/DoctorApplicationRoutes");

const DoctorRouter = express.Router() ; 



// All DoctorRoutes goes here --> 

DoctorRouter.use("/doctor" , DoctorApplicationRouter)


// All PatientRoutes goes here --> 



module.exports = {
    DoctorRouter
}