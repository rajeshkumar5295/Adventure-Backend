const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const mongoos=require('mongoose');
const connectDB=require("./config/db");


const app=express();

app.use(cors());

dotenv.config();
app.use(express.json());

const PORT=process.env.PORT||8000
connectDB();


app.get("/" , (req,res)=>{
    res.status(200).json({
       message:"Hi server ,This is Quantum IT Innovation"
    })
})


app.use("/api/v1/auth",require("./Routes/userRoute"));

app.listen(PORT,()=>{
    console.log(  `Server is Running on port ${PORT}`)
})
