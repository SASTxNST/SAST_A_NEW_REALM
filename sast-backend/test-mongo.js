const mongoose = require('mongoose');

const uri = "mongodb+srv://Aadi_Kalra:Aadi%4001022007@sast.9mzkez6.mongodb.net/?appName=sast";

console.log("Attempting to connect...");
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("Connected successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection failed:", err);
    process.exit(1);
  });
