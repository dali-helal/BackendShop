const express=require('express')
const mongoose=require('mongoose')
const authRoutes=require('./Routes/authRoutes')
const watchRoutes=require('./Routes/watchRoutes')
const cors=require('cors')
const app=express()

//middleware

app.use(cors({origin :"*"}))
app.use(express.json())
require('dotenv').config()

// env variables

const port = process.env.PORT || 5000;
const url = process.env.URL;

// launching the app

app.listen(port , ()=>{
    console.log(`listening to requests on port ${port}`);
})

// connecting to mongoDB

mongoose.connect(url)
.then(()=>{console.log("connected to mongoDB !")})
.catch((err)=>{console.error(err)})

app.use('/api/auth',authRoutes);
app.use('/api/watch',watchRoutes);