const mongoose = require("mongoose");

async function main(){
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Connected to MongoDB successfully");
    });
}

main().catch(err=>console.log(err));