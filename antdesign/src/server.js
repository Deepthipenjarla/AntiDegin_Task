// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/mydataba';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.json());

// Define routes for CRUD operations
app.post('/api/students', async (req, res) => {
    try {
        const { username, age } = req.body;
        const student = new Student({ username, age });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
