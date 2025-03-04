const express=require("express")
const app=express();
const mongoose=require("mongoose");
const cors=require("cors")
require("dotenv").config()

const Database_url=process.env.Database;

//importing Files

const registerDonor=require("./controllers/donar_router")
const getDonar=require("./controllers/get_donar");

const GetAllDonors=require("./controllers/getAllDonors")
// Connect to MongoDB
mongoose
  .connect(Database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(' Connected to MongoDB successfully'))
  .catch((err) => console.error(' MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded());


app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//Register Http method

app.use("/",registerDonor);

app.use("/",getDonar);
app.use("/",GetAllDonors)

app.listen(8080,(err)=>{
    if(err){
        console.log("Issue in server configuration"+err);
    }
else{
    console.log("server is running at the port Number 8080");

}
})