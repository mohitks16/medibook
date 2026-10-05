const mongoose = require("mongoose")
let {DBNAME,ATLASUSERNAME,ATLASPASSWORD} = process.env


const db=()=>{
 
    mongoose.connect(`mongodb+srv://${ATLASUSERNAME}:${ATLASPASSWORD}@cluster0.erhuuwa.mongodb.net/${DBNAME}?retryWrites=true&w=majority&appName=Cluster0`)
        .then(() =>{
            console.log(`Atlas connection successfully 👍`)
        })
        .catch(()=>{
            console.log(`Atlas connection error`)
        })
        
}

module.exports=db