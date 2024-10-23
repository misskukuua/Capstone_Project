const mongoose = require('mongoose');

const abuseReportSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    typeOfAbuse: {
        type: String,
        required: [true, 'Type of abuse is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    contact: {
        type: String,
        required: [true, 'Contact number is required']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age must be a positive number']
    },
    status: {
        type: String,
        enum: ['pending', 'investigating', 'resolved'],
        default: 'pending'
    },
    reportDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AbuseReport', abuseReportSchema);