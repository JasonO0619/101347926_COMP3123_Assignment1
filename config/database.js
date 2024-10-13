const mongoose = require('mongoose');

//databse created from Atlas
const DB_URL = "mongodb+srv://jasonopoku:OygLj1pqp075370A@comp3123.mhej6.mongodb.net/?retryWrites=true&w=majority&appName=Comp3123"

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connection successful!');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;