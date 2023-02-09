const express = require("express");
const app = express();
require("dotenv").config({ path: "/Users/rohanmote/Desktop/Thapa Projects/Mini Projects/BookMyShow_Capstone/Server/.env" });
const cors = require("cors");

require("./DB/connection");
const userData = require("./Models/userDataSchema");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let PORT = process.env.PORT || 8080;

app.get("/", (req, res)=>{
    res.send("Heyy");
})


// EndPoint To Save The User Booking Into Database
app.post("/api/booking", async (req, res) => {
    try {

        const getMovieName = req.body.movieName;
        const getTimeSlot = req.body.timeSlot;
        const getSlots = req.body.slots;

        const insertData = new userData({
            movieName: getMovieName,
            timeSlot: getTimeSlot,
            slots: getSlots,

        });

        const getData = await insertData.save();
        return res.status(200).json({ message: `✅ Your Movie "${getMovieName}"` + " Booked Successfully!! ✅" });

    } catch (err) {
        return res.status(401).json({ error: err });
    }
});



// End Point To Display The Previous Booking Made By The User
app.get("/api/booking", async (req, res) => {
    try {
        const getData = await userData.find().sort({ _id: -1 }).limit(1).skip(1);

        if (getData.length === 0) {
            return res.status(401).json({ error: "No Previous Booking Found.." });
        } else {
            return res.status(200).json(getData);
        }

    } catch (err) {
        return res.status(401).json({ error: err });
    }

});



if (process.env.NODE_ENV == "production"){

    app.use(express.static("client/build"));

    const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })


}

// Listening On PORT To Start The Server
app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
    console.log("Express Server On Fire.. 🔥🔥");
});



