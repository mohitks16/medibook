const express = require("express") ; 
const app = express() ; 
require("dotenv").config()
const db = require("./src/config/db_config");
const { DoctorRouter } = require("./src/routes/app");

db() ; 



console.log(process.env.PORT) ; 

app.use(express.json());

// Can be used to inspect the incoming req type 

// app.use((req, res, next) => {
//     console.log("CONTENT TYPE:", req.headers["content-type"]);
//     console.log("BODY:", req.body);
//     next();
// });

app.use("/doctorapp" , DoctorRouter) ; 

app.listen(process.env.PORT,()=>{
    console.log(`server runs on ${process.env.PORT}`)
})

