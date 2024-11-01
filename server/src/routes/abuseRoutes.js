const express = require('express');
const router = express.Router();
const AbuseReport = require('../models/abuseReport');

router.post('/abuse-reports', async (req, res) => {
    try {
        // Debug log
        console.log('Received abuse report request:', req.body);

        const { fullName, email, typeOfAbuse, address, contact, age } = req.body;

        // Validate input
        if (!fullName || !email || !typeOfAbuse || !address || !contact || !age) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required',
                receivedFields: { fullName, email, typeOfAbuse, address, contact, age }
            });
        }

        // Create new report
        const newReport = new AbuseReport({
            fullName,
            email,
            typeOfAbuse,
            address,
            contact,
            age: parseInt(age)
        });

        // Save to database
        const savedReport = await newReport.save();
        console.log('Report saved successfully:', savedReport);

        res.status(201).json({
            success: true,
            message: 'Abuse report submitted successfully',
            reportId: savedReport._id
        });

    } catch (error) {
        console.error('Error in abuse report submission:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting report',
            error: error.message
        });
    }
});

// Get all reports (protected route, add authentication middleware as needed)
router.get('/abuse-reports', async (req, res) => {
    try {
        const reports = await AbuseReport.find().sort({ createdAt: -1 });
        res.json({ success: true, reports });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reports',
            error: error.message
        });
    }
});

module.exports = router;