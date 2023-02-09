const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

require("dotenv").config({path:"/Users/rohanmote/Desktop/Thapa Projects/Mini Projects/BookMyShow_Capstone/Server/.env"});

const URI = process.env.URI;

mongoose.connect(URI)
.then(()=>{
    console.log("Databse Connected Successfully..");
})
.catch((err)=>{
    console.log(err);
});

