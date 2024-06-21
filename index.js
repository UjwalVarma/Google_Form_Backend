const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const PageData = require("./models/PageData");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const mongoURI = "mongodb+srv://ujwalvarma954:ujwalvarma954@clustergoolge.dttijmr.mongodb.net/?retryWrites=true";

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.post("/submit", async (req, res) => {
    try {
        for (const page of req.body) {
            const { page: pageNumber, inputs } = page;

            let pageData = await PageData.findOne({ page: pageNumber });
            if (pageData) {
                pageData.inputs = inputs;
                await pageData.save();
            } else {
                pageData = new PageData({ page: pageNumber, inputs });
                await pageData.save();
            }
        }
        res.status(200).send("Data saved successfully");
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send("Error saving data");
    }
});

app.get('/response', async (req, res) => {
    try {
        const data = await PageData.find(); 
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching response data:', err);
        res.status(500).send('Internal Server Error');
    }
});

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
