const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = require('./database.js')
const employeeRoutes = require('./routes/employee.route.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Route setup

app.use('/employees', employeeRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log(uri)
});