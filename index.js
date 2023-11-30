const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const initSocket = require('./socket/index');

const app= express();
const PORT = process.env.PORT || 4000;

const authRoutes = require("./routes/auth");  
const userRoutes = require("./routes/users");  

const authMiddleware = require("./middleware/authMiddleware");

const corsOptions = {
    origin: ["https://mern-chat-l99i.onrender.com","http://localhost:5173"],
    allowedHeaders: ["Orgin","X-Requested-With","Content-Type","Accept"],
    credentials:true,
    methods:['GET','POST'],
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/auth", authRoutes);
app.use("/users", userRoutes);

mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("DB connected"))
.catch((err)=> console.log("DB connection Error" + err.message));


app.post("/",authMiddleware);

const server = app.listen(PORT,()=>{
    console.log(`Your Server seems to be running on port ${PORT}, hahahahhahahhahhahahahahahahhahahahahaha better go catch it hahahahhahaahHAHAHAHAHAHAHAHAHHAHAHAHAHAHAHAHAHAHAHAHAHAH`)
})

initSocket(server,corsOptions);

