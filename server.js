const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const DeviceRoutes = require("./routes/deviceRoutes");
const cors = require('cors'); // Import cors
require('dotenv').config();

const app = express();

require('./info_script')

// Connect to MongoDB
connectDB();

// Enable CORS for all domains
app.use(cors({ origin: '*' }));

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api', DeviceRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: "server is working Done." });
});

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// const express = require('express');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const DeviceRoutes = require("./routes/deviceRoutes");
// require('dotenv').config();

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api',DeviceRoutes);

// app.get('/',(req,res) => {
//     res.status(200).json({message : "server is working."})
// })

// const PORT = process.env.PORT || 4005;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
