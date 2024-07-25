{/**const express = require('express');
const Pdf = require('../models/Pdf');

const router = express.Router();

// Route to fetch PDFs based on optional standard, subject, and chapter
router.get('/', async (req, res) => {
  const { standard, subject, chapter } = req.query;
  try {
    // const query = { standard, subject };
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
    const pdfs = await Pdf.find(query);
    if (pdfs.length === 0) {
      return res.status(404).json({ msg: 'No data available' });
    }
    res.json(pdfs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Dummy route to add sample PDFs for testing
router.post('/add', async (req, res) => {
  try {
    const samplePdfs = [
      { standard: 1, subject: 'Math', chapter: 'Chapter 1', title: 'Math Std 1 - Chapter 1', url: 'https://vedantclasses.org.in/01.pdf' },
      { standard: 2, subject: 'Science', chapter: 'Chapter 1', title: 'Science Std 2 - Chapter 1', url: 'https://vedantclasses.org.in/02.pdf' },
      { standard: 12, subject: 'Physics', chapter: 'Chapter 1', title: 'Physics Std 12 - Chapter 1', url: 'https://vedantclasses.org.in/03.pdf' },
    ];
    await Pdf.insertMany(samplePdfs);
    res.json({ msg: 'Sample PDFs added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// ---------------------------------
// Add a new PDF
router.post('/', async (req, res) => {
  const { title, standard, subject, chapter, url } = req.body;
  try {
    const newPdf = new Pdf({ title, standard, subject, chapter, url });
    await newPdf.save();
    res.json(newPdf);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update a PDF
router.put('/:id', async (req, res) => {
  const { title, standard, subject, chapter, url } = req.body;
  try {
    const updatedPdf = await Pdf.findByIdAndUpdate(
      req.params.id,
      { title, standard, subject, chapter, url },
      { new: true }
    );
    res.json(updatedPdf);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a PDF
router.delete('/:id', async (req, res) => {
  try {
    await Pdf.findByIdAndDelete(req.params.id);
    res.json({ msg: 'PDF deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
 */}

// backend/routes/pdfRoutes.js
const express = require('express');
const multer = require('multer');
const PDF = require('../models/Pdf');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/pdf/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  const pdfs = await PDF.find();
  res.json(pdfs);
});

router.post('/', upload.single('file'), async (req, res) => {
  const { title, standard, subject, chapter, url } = req.body;
  const filePath = req.file ? req.file.path : null;
  const newPDF = new PDF({ title, standard, subject, chapter, url, filePath });
  await newPDF.save();
  res.json(newPDF);
});

router.put('/:id', upload.single('file'), async (req, res) => {
  const { title, standard, subject, chapter, url } = req.body;
  const filePath = req.file ? req.file.path : null;
  const updatedPDF = await PDF.findByIdAndUpdate(
    req.params.id,
    { title, standard, subject, chapter, url, filePath },
    { new: true }
  );
  res.json(updatedPDF);
});

router.delete('/:id', async (req, res) => {
  await PDF.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
