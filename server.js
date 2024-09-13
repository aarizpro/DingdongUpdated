require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { S3Client, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

// Import routes
const userdetails = require('./routes/userdetailsRoute');
const courierdetails = require('./routes/courierRoute');
const custdetails = require('./routes/customerRoute');
const booking = require('./routes/bookingRoute');
const autoawb = require('./routes/autoawbRoute');
const profile = require('./routes/profileRoute');
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const crcustRoutes = require("./routes/creditcustRoute");
const crbookRoutes = require("./routes/creditBookingRoute");
const clientRoutes = require("./routes/clientRoute");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const BUCKET_NAME = process.env.BUCKET_NAME;

// Set up S3 client
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
  },
  region: process.env.REGION
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Routes for APIs
app.use('/api/userdetails', userdetails);
app.use('/api/courier', courierdetails);
app.use('/api/customer', custdetails);
app.use('/api/booking', booking);
app.use('/api/autoawb', autoawb);
app.use('/api/profile', profile);
app.use('/api/crcust', crcustRoutes);
app.use('/api/crbook', crbookRoutes);
app.use('/api/client', clientRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// S3 Upload Route
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
      },
    });
    await upload.done();
    res.send({ location: `https://${BUCKET_NAME}.s3.amazonaws.com/${req.file.originalname}` });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).send('Failed to upload file.');
  }
});

// S3 List Files Route
app.get('/list', async (req, res) => {
  try {
    const command = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
    const response = await s3Client.send(command);
    const files = response.Contents.map(item => item.Key);
    res.send(files);
  } catch (error) {
    console.error('List files error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// S3 Download Route
app.get('/download/:filename', async (req, res) => {
  const filename = req.params.filename;
  try {
    const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: filename });
    const response = await s3Client.send(command);
    response.Body.pipe(res);  // Stream the file to the client
  } catch (error) {
    console.error('File download error:', error);
    res.status(404).send('File Not Found');
  }
});

// S3 Delete File Route
app.delete('/delete/:filename', async (req, res) => {
  const filename = req.params.filename;
  try {
    const command = new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: filename });
    await s3Client.send(command);
    res.send('File Deleted Successfully');
  } catch (error) {
    console.error('File deletion error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).send('Internal Server Error');
});
