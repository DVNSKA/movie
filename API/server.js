import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import listRoutes from './routes/list.js';
import sampleRoutes from './routes/sample.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://abhiram20bcn7065:VGZACTUru59lz0Yz@cluster0.j3mco.mongodb.net/",
    {
        dbName:"movie"
    }
).then(()=>{console.log("connected")})


app.use('/api/samples', sampleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes); 
// Routes
app.listen(2000,()=>{
    console.log("running in 2000");
})
//abhiram20bcn7065
//VGZACTUru59lz0Yz