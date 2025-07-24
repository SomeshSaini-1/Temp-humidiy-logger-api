const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const DeviceRoutes = require("./routes/deviceRoutes");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
// Allow all origins (open CORS)
app.use(cors());



// Routes
app.use('/api/users', userRoutes);
app.use('/api',DeviceRoutes);

app.get('/',(req,res) => {
    res.status(200).json({message : "server is working."})
})

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
