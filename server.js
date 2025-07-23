const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const DeviceRoutes = require("./routes/deviceRoutes");
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api',DeviceRoutes);

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
