const mongoose = require("mongoose");

const inputDataSchema = new mongoose.Schema({
    inputKey: {
        type: String,
        // required: true
    },
    inputValue: {
        type: String,
        // required: true
    }
}, { _id: false });

const pageDataSchema = new mongoose.Schema({
    page: {
        type: Number,
        // required: true,
        unique: true 
    },
    inputs: [inputDataSchema]
});

const PageData = mongoose.model("PageData", pageDataSchema);
module.exports = PageData;
