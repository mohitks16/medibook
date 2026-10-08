const express = require("express") ; 
const app = express() ; 
require("dotenv").config()
const db = require("./src/config/db_config");
const { DoctorRouter, AdminRouter } = require("./src/routes/app");
const { submitDoctorApplication } = require("./src/controller/ApplicationController/DoctorsController/DoctorApplicationController");
const upload = require("./src/middleware/uploadMiddleware");

db() ; 



console.log(process.env.PORT) ; 

app.use(express.json());


app.use("/doctor" , DoctorRouter) ; // catching all routes related to doctor 
app.use("/admin", AdminRouter); // catching all routes related to admin

// app.use("/doctor/doctorApplication/apply",upload.single("credentialDocument") ,  submitDoctorApplication);

app.listen(process.env.PORT,()=>{
    console.log(`server runs on ${process.env.PORT}`)
})

