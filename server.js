const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const galleryRoutes = require('./routes/gallery');
const pdfRoutes = require('./routes/pdf');
const videoRoutes = require('./routes/video');
const feesRoutes = require('./routes/fees');
const studentRoutes = require('./routes/student');
const authRoutes = require('./routes/auth');

const puppeteer = require('puppeteer-core');
const fs = require('fs');



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes); // Use the auth routes

app.use('/uploads/gallery', express.static('uploads/gallery'));
app.use('/uploads/pdf', express.static(path.join(__dirname, 'uploads/pdf')));
app.use('/uploads/students', express.static('uploads/students'));
app.use('/uploads/video', express.static(path.join(__dirname, 'uploads/video')));
app.use('/api/gallery', galleryRoutes);
app.use('/api/pdfs', pdfRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/fees', feesRoutes);
app.use('/api/students', studentRoutes);
mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch((err) => console.error(err));
