const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//properties and values
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        default: Date.now 
    },
});

//password hashing
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
            console.log('Hashed password:', this.password);
        } catch (error) {
            console.error('Error hashing password:', error.message);
            next(error);
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema);