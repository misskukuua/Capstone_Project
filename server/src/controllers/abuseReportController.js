const AbuseReport = require('../models/abuseReport');

const createAbuseReport = async (req, res) => {
  try {
    const { fullName, email, typeOfAbuse, address, contact, age } = req.body;

    // Validate required fields
    if (!fullName || !email || !typeOfAbuse || !address || !contact || !age) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newReport = new AbuseReport({
      fullName,
      email,
      typeOfAbuse,
      address,
      contact,
      age
    });

    await newReport.save();

    // You might want to send an email notification here to relevant staff

    res.status(201).json({ 
      message: 'Abuse report submitted successfully', 
      reportId: newReport._id 
    });

  } catch (error) {
    console.error('Error creating abuse report:', error);
    res.status(500).json({ message: 'Error submitting report' });
  }
};

const getAbuseReports = async (req, res) => {
  try {
    const reports = await AbuseReport.find()
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'username firstName lastName');
    
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching abuse reports:', error);
    res.status(500).json({ message: 'Error fetching reports' });
  }
};

module.exports = {
  createAbuseReport,
  getAbuseReports
};