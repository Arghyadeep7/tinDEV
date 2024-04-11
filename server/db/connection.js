const mongoose = require("mongoose");

async function main(){
    mongoose.connect("mongodb+srv://arghyadeep100:GNvUw9Jj3Yvu00tj@cluster0.gtmn67m.mongodb.net/tindevDB").then(()=>{
        console.log("Connected to MongoDB successfully");
    });
}

main().catch(err=>console.log(err));