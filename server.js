import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jobsRoute from "./routes/jobsRoute.js";
import "dotenv/config";

const app = express();

// middleware for handling cors policy instead of adding proxy in react app
app.use(cors());

app.use(bodyParser.json()); // allows us to take in incoming post request bodies

app.use("/jobs", jobsRoute);

app.get("/", (req, res) => {
    res.send("This is the homepage!");
});

// establish a connection to the database
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Server connected to database");
        app.listen(process.env.PORT, () => {
            console.log(
                `Server listening on port: http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });
