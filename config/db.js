const mongoose=require("mongoose")

const connectDB=async()=>{
    console.log(process.env.MONGO_URL);
      try {
            const connect=await mongoose.connect(`${process.env.MONGO_URL} `)
            
            console.log(`Database connected successfully to ${connect.connection.host} and port is ${connect.connection.port}`)
      } catch (error) {  

        console.log(error,"Error in Connceting database");
        

      }
}
module.exports=connectDB;