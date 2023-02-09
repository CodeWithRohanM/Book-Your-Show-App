const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true,
        trim: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    slots: {
        A1: {
            type: Number,
            required: true,
        },
        A2: {
            type: Number,
            required: true,
        },
        A3: {
            type: Number,
            required: true,
        },
        A4: {
            type: Number,
            required: true,
        },
        D1: {
            type: Number,
            required: true,
        },
        D2: {
            type: Number,
            required: true,
        }
    }
});

const createCollection = new mongoose.model("bookmyshow_user", documentSchema);

module.exports = createCollection;