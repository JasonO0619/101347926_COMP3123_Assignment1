const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');


const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});