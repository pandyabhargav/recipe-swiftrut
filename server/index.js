import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './Config/mongoose.js';
import authRoutes from './Routes/userRoutes.js';
import foodRoutes from './Routes/foodRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB();

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

const port = process.env.PORT;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
