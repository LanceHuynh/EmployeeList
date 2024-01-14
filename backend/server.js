const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = require('./database.js')
const employeeRoutes = require('./routes/employee.route.js');

const app = express();
const path = require('path');
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

console.log('Middleware before routes');
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
console.log("name below here")
console.log(__dirname);
console.log("name above here")
console.log('API Routes');
app.use('/employees', employeeRoutes);
console.log('Catch-all route');
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log(uri)
});