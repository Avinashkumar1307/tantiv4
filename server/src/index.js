const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const cryptoRouter = require("./routes/CryptoBuckRouter");
const trendingRouter = require("./routes/trendingRouter");
// const videos = require("./db/video");



const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000

app.use('/api/crypto', cryptoRouter);
app.use('/api/trending', trendingRouter);


mongoose
  .connect(
    "mongodb+srv://youtube:youtube@cluster0.urxx7wc.mongodb.net/"
  )
  .then(() => {
    console.log("database connected ");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log("Server is started");
});