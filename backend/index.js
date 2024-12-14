import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
dotenv.config();
connectDB();
app.use(bodyParser.json());
app.use(cors());

//route
app.use('/api',userRoutes);

const port = process.env.PORT || 8001

app.listen(port, () => {
    console.log(`server is running on localhost:${port}`);
})