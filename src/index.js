const express = require("express");
const app = express();
const cors = require("cors");
const Truckdetails = require("./model/truckdetailsSchemea");
const mongoose = require("mongoose");
const CoalMine = require("./model/Coalschemea");
const Truck = require("./model/truckScheme");
const { runprompt } = require("./qrook");

app.use(express.json());
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://nandhakrishnan:0zlzGBdS7rEEbZ2j@bhuvan.kj0irmq.mongodb.net/?retryWrites=true&w=majority&appName=bhuvan",
      {
        dbName: "Truckconnect",
      }
    );
    console.log("connected to mongoDB");
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();
// test



app.post("/mohan" , async(req,res)=>{
  try {
    const data = req.body;
  console.log(data);

  const pressure = data.key1;
  const newData = await Truck.findOneAndUpdate( {registrationNumber: "CIL001"} , {tyrePressure: pressure});
   await newData.save(); 
    console.log("Saved successfully");
  res.json({
      message: "Updated the pressure",
    }).status(200);
    
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message }).status(400);
  }
  
})





app.post("/data", async (req, res) => {
  const updatedData = req.body;
console.log(updatedData);


const newdata = await Truck.findOneAndUpdate(
    { registrationNumber: updatedData.registrationNumber },
    updatedData,
   
  );
  await newdata.save();
  res.json(newdata).status(200);
});

// sending the tkph map data
app.get("/coalmine", async (req, res) => {
  const AllCoalMine = await CoalMine.find();
  console.log(AllCoalMine);
  res.json(AllCoalMine).status(200);
});

app.use("/truckdetails", require("./routes/truckdetailsRoute"));
app.use("/tkph", require("./routes/tkphRoute"));

app.get("/:registrationNumber", async (req, res) => {
  const registrationNumber = req.params.registrationNumber;
  try {
    const truck = await Truckdetails.findOne({
      registrationNumber: registrationNumber,
    });
    console.log(truck);
    res.json(truck).status(200);
  } catch (error) {
    res.json({ message: error.message }).status(400);
  }
});

app.get("/addtruck", (req, res) => {
  const newtruck = new truckSchemea({
    registrationNumber: "123",
    tyrePressure: 30,
    payload: 100,
    speed: 60,
    location: {
      type: "Point",
      coordinates: [12.9716, 77.5946],
    },
  });

  res.send("Add truck details");
});

app.post("/suggest" , async (req,res)=>{
  try{
   console.log(req.body);
  const {data} =req.body;
  
  const prompt = "your are the truck tyre health checker , you need to give suggestio for the dump truck,dont say that as per the data , only tell about from available  ,  Only give 3 points ,  This the data of the mining dumper truck from the data say that the truck is in good condition , or need a maintence first give a health index from 1-100% ";
  
  const suggestion = await runprompt(prompt , data);

  res.json({suggestion}).status(200);
 }
  catch(err){
    console.log(err.message);
    res.json({message: err.message}).status(400);
  }


})





app.use(cors());

app.use(express.json());

app.listen( 3000 , () => {
  console.log("Server is running on port 3000");
});
