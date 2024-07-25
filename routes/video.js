{/**
const express = require('express');
const Video = require('../models/Video');

const router = express.Router();

// Route to fetch videos based on optional standard, subject, and chapter
router.get('/', async (req, res) => {
  const { standard, subject, chapter } = req.query;
  try {
    const query = {};
    if (standard) {
      query.standard = standard;
    }
    if (subject) {
      query.subject = subject;
    }
    if (chapter) {
      query.chapter = chapter;
    }
    const videos = await Video.find(query);
    if (videos.length === 0) {
      return res.status(404).json({ msg: 'No data available' });
    }
    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Dummy route to add sample videos for testing
router.post('/add', async (req, res) => {
  try {
    const sampleVideos = [
      { standard: 1, subject: 'Math', chapter: 'Chapter 1', title: 'Math Std 1 - Chapter 1', url: 'https://vedantclasses.org.in/TreeView.mp4' },
      { standard: 2, subject: 'Science', chapter: 'Chapter 1', title: 'Science Std 2 - Chapter 1', url: 'https://vedantclasses.org.in/TreeView.mp4' },
      { standard: 12, subject: 'Physics', chapter: 'Chapter 1', title: 'Physics Std 12 - Chapter 1', url: 'https://vedantclasses.org.in/TreeView.mp4' },
      { standard: 1, subject: 'Science', chapter: 'Chapter 2', title: 'Science Std 1 - Chapter 2', url: 'https://vedantclasses.org.in/TreeView.mp4' },
      // Add more sample data as needed
    ];
    await Video.insertMany(sampleVideos);
    res.json({ msg: 'Sample videos added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new video
router.post('/', async (req, res) => {
  const { title, standard, subject, chapter, url } = req.body;
  try {
    const newVideo = new Video({ title, standard, subject, chapter, url });
    await newVideo.save();
    res.json(newVideo);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update a video
router.put('/:id', async (req, res) => {
  const { title, standard, subject, chapter, url } = req.body;
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { title, standard, subject, chapter, url },
      { new: true }
    );
    res.json(updatedVideo);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a video
router.delete('/:id', async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Video deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
 */}

//  ------------------------

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getAllVideos, createVideo, updateVideo, deleteVideo } = require('../controllers/videoController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/video');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.get('/', getAllVideos);
router.post('/', upload.single('file'), createVideo);
router.put('/:id', upload.single('file'), updateVideo);
router.delete('/:id', deleteVideo);

module.exports = router;
