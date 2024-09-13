const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const sampleSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

// Correct collection name
const Sample = mongoose.model('Sample', sampleSchema, 'sampleCollection');

app.get('/api/data', async (req, res) => {
    try {
        const data = await Sample.find();
        console.log('Data fetched from MongoDB:', data); // Log the data
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err); // Log errors
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});