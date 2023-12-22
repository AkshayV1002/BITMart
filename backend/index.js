import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js"

// configure env
dotenv.config({path: '../.env' });

// database config
connectDB();

// rest object
const app = express();

// MiddleWare
app.use(express.json());


// routes
app.use('/api/users',userRoutes);


// rest api
app.get('/',(req,res)=>{
     res.send("<h1>Welcome to BITMART app</h1>");
});

// PORT
const PORT = process.env.PORT || 5000 ;


app.listen(PORT , ()=>{
    console.log(`App is listening to port: ${PORT}`);
});