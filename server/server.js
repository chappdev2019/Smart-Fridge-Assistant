require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const foodItemRoutes = require('./routes/foodItemRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', chatRoutes);
app.use('/api', foodItemRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});