
const express = require('express');
const multer = require('multer');
const Student = require('../models/Student');
const router = express.Router();
// const { Student, Sequence } = require('../models/Student');
const Sequence = require('../models/sequence');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/students');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Helper function to get next student number
// const getNextStudentNumber = async () => {
//   const lastStudent = await Student.findOne().sort({ stuNo: -1 });
//   return lastStudent ? lastStudent.stuNo + 1 : 1;
// };



// Generate student number
// async function generateStudentNumber(firstName, middleName, lastName) {
//   const currentYear = new Date().getFullYear().toString().slice(-2);
//   const initials = `${firstName[0]}${middleName[0]}${lastName[0]}`.toUpperCase();

//   let sequence = await Sequence.findOne({ year: currentYear });

//   if (!sequence) {
//     sequence = new Sequence({ year: currentYear, sequenceNumber: 0 });
//   }

//   sequence.sequenceNumber += 1;
//   await sequence.save();

//   const sequenceNumber = String(sequence.sequenceNumber).padStart(3, '0');
//   console.log(currentYear ," ", initials ," ", sequenceNumber, " stuNO routs student");
//   return `${currentYear}${initials}${sequenceNumber}`;
// }
const generateStudentNumber = async (firstName, middleName, lastName) => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const initials = `${firstName[0]}${middleName[0]}${lastName[0]}`.toUpperCase();

  // Find or create the sequence for the current year
  let sequence = await Sequence.findOne({ year: currentYear });
  if (!sequence) {
    sequence = new Sequence({ year: currentYear, seq: 0 });
  }
  
  sequence.seq += 1;
  await sequence.save();

  const seqNumber = sequence.seq.toString().padStart(3, '0');
  return `${currentYear}${initials}${seqNumber}`;
};





//students .get/students
// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new student
router.post('/', upload.fields([{ name: 'studentPhoto' }, { name: 'motherPhoto' }, { name: 'fatherPhoto' }]), async (req, res) => {
  try {
    // const stuNo = await getNextStudentNumber();
    // const stuNo = await generateStudentNumber();
    // --------
    // const { firstName, middleName, lastName, ...rest } = req.body;
    // const stuNo = await generateStudentNumber(firstName, middleName, lastName);
    // ------------
    const { firstName, middleName, lastName } = req.body;
    const stuNo = await generateStudentNumber(firstName, middleName, lastName);
    
    const batchYear = new Date().getFullYear() + '-' + (new Date().getFullYear() + 1);

    const newStudent = new Student({
      ...req.body,
      studentPhoto: req.files.studentPhoto[0].path,
      motherPhoto: req.files.motherPhoto[0].path,
      fatherPhoto: req.files.fatherPhoto[0].path,
      stuNo,
      batchYear
    });
    console.log(newStudent, "student.js try routs backend post");
    await newStudent.save();
    res.status(201).send('Student registered successfully');
  } catch (error) {
    console.log(error, "student.js catch routs backend post");
    res.status(400).send(error);
  }
});

// Update a student
router.put('/:id', upload.fields([{ name: 'studentPhoto' }, { name: 'motherPhoto' }, { name: 'fatherPhoto' }]), async (req, res) => {
  try {
    const updatedStudent = {
      ...req.body,
    };
    if (req.files.studentPhoto) {
      updatedStudent.studentPhoto = req.files.studentPhoto[0].path;
    }
    if (req.files.motherPhoto) {
      updatedStudent.motherPhoto = req.files.motherPhoto[0].path;
    }
    if (req.files.fatherPhoto) {
      updatedStudent.fatherPhoto = req.files.fatherPhoto[0].path;
    }

    await Student.findByIdAndUpdate(req.params.id, updatedStudent);
    res.status(200).send('Student updated successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).send('Student deleted successfully');
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

//  -----------------------
{/**
const express = require('express');
const router = express.Router();
const { Student, Sequence } = require('../models/Student');

// Generate student number
async function generateStudentNumber(firstName, middleName, lastName) {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const initials = `${firstName[0]}${middleName[0]}${lastName[0]}`.toUpperCase();
  
  let sequence = await Sequence.findOne({ year: currentYear });
  
  if (!sequence) {
    sequence = new Sequence({ year: currentYear, sequenceNumber: 0 });
  }
  
  sequence.sequenceNumber += 1;
  await sequence.save();
  
  const sequenceNumber = String(sequence.sequenceNumber).padStart(3, '0');
  return `${currentYear}${initials}${sequenceNumber}`;
}

// Create a new student
router.post('/students', async (req, res) => {
  try {
    const { firstName, middleName, lastName, ...rest } = req.body;
    const stuNo = await generateStudentNumber(firstName, middleName, lastName);

    const student = new Student({
      firstName,
      middleName,
      lastName,
      stuNo,
      ...rest
    });

    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other routes remain the same...

module.exports = router;
 */}