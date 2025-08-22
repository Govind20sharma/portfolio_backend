// File: server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS for production
const allowedOrigins = [
  'http://localhost:5173', // Local frontend
  'https://your-portfolio.vercel.app', // Replace with your Vercel URL later
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/contact', contactRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'healthy', message: 'Portfolio API is running' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));