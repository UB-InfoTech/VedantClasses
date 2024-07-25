// previous working
{/**
  const mongoose = require('mongoose');
  const Fee = require('./Fee');
  
  const siblingSchema = new mongoose.Schema({
    name: String,
    age: Number,
    instituteName: String,
    standard: String
  });
  
  const studentSchema = new mongoose.Schema({
    studentPhoto: { type: String, required: false },
    motherPhoto: { type: String, required: false },
    fatherPhoto: { type: String, required: false },
    firstName: { type: String, required: false },
    middleName: { type: String, required: false },
    lastName: { type: String, required: false },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: false },
    dob: { type: Date, required: false },
    bloodGroup: { type: String, required: false },
    religion: { type: String, required: false },
    cast: { type: String, enum: ['SC', 'ST', 'OBC', 'General', 'Other'], required: false },
    nationality: { type: String, required: false },
    motherTongue: { type: String, required: false },
    address: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    standard: { type: String, required: false },
    stuNo: { type: String, unique: true, required: false },
    batchYear: { type: String, required: false },
    studentProblem: { type: String },
    schoolName: { type: String, required: false },
    schoolBoard: { type: String, enum: ['GSEB', 'CBSE', 'ICSE', 'Other'], required: false },
    FatherName: String,
    FatherAge: Number,
    FatherEducationQualification: String,
    FatherOccupation: String,
    FatherDesignation: String,
    FatherAnnualIncome: Number,
    FatherMobileNumber: Number,
    FatherPhoneNumber: Number,
    previousSchoolName: { type: String },
    previousStandardMarks: Number,
    previousSchoolBoard: { type: String, enum: ['GSEB', 'CBSE', 'ICSE', 'Other'] },
    siblingName: String,
    siblingAge: Number,
    siblingSchoolName: String,
    siblingStandard: String,
    
  });
  
  // Middleware to sync with fees collection
  studentSchema.post('save', async function(doc) {
    try {
      console.log("middleware student.js for fees secction models");
      
      const standardFees = {
        '1': 10000,
        '2': 11000,
        '3': 12000,
        '4': 13000,
        '5': 14000,
        '6': 15000,
        '7': 16000,
        '8': 17000,
        '9': 18000,
        '10': 19000,
        '11-science': 20000,
        '11-commerce': 21000,
        '11-arts': 22000,
        '12-science': 23000,
        '12-commerce': 24000,
        '12-arts': 25000,
      };
      const fees = standardFees[doc.standard]
  
      await Fee.create({
        studentName: doc.firstName + " " + doc.middleName + " " + doc.lastName,
        studentPhoneNumber: doc.phoneNumber,
        ParentsMobileNumber: doc.FatherMobileNumber,
        ParentsPhoneNumber: doc.FatherPhoneNumber,
        batchYear: doc.batchYear,
        standard: doc.standard,
        stuNo: doc.stuNo,
        totalStandardFees: fees,
        totalFeesPaid: 0,
        totalFeesRemaining: fees,
        paymentDetails: []
      });
    } catch (error) {
      console.error('Error creating fee record:', error);
    }
  });
  
  // const sequenceSchema = new mongoose.Schema({
  //   year: { type: String, unique: true },
  //   sequenceNumber: { type: Number, default: 0 }
  // });
  
  // const Sequence = mongoose.model('Sequence', sequenceSchema);
  // const Student = mongoose.model('Student', studentSchema);
  
  module.exports = mongoose.model('Student', studentSchema);
   
  
  // module.exports = { Student, Sequence };
   */}
// -------------------------------------------
//old array inside arrey 
{/**
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentPhoto: String,
  motherPhoto: String,
  fatherPhoto: String,
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  bloodGroup: { type: String, required: true },
  religion: { type: String, required: true },
  cast: { type: String, required: true },
  nationality: { type: String, required: true },
  motherTongue: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  standard: { type: String, required: true },
  stuNo: { type: String, unique: true, required: true },
  batchYear: { type: String, required: true },
  studentProblem: String,
  schoolName: { type: String, required: true },
  schoolBoard: { type: String, required: true },
  father: {
    name: { type: String, required: true },
    age: { type: String, required: true },
    nationality: { type: String, required: true },
    educationQualification: { type: String, required: true },
    occupation: { type: String, required: true },
    designation: { type: String, required: true },
    annualIncome: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  siblings: [{
    name: String,
    age: String,
    instituteName: String,
    standard: String,
  }],
  previousSchools: [{
    batchYear: String,
    schoolName: String,
    standard: String,
    marks: String,
    schoolBoard: String,
  }],
});

const sequenceSchema = new mongoose.Schema({
  year: { type: String, unique: true },
  sequenceNumber: { type: Number, default: 0 }
});

const Sequence = mongoose.model('Sequence', sequenceSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = { Student, Sequence };


 */}

//  ------------------------------------


const mongoose = require('mongoose');
const Fee = require('./Fee');

const siblingSchema = new mongoose.Schema({
  name: String,
  age: Number,
  instituteName: String,
  standard: String
});

const studentSchema = new mongoose.Schema({
  studentPhoto: { type: String, required: false },
  motherPhoto: { type: String, required: false },
  fatherPhoto: { type: String, required: false },
  firstName: { type: String, required: false },
  middleName: { type: String, required: false },
  lastName: { type: String, required: false },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: false },
  dob: { type: Date, required: false },
  bloodGroup: { type: String, required: false },
  religion: { type: String, required: false },
  cast: { type: String, enum: ['SC', 'ST', 'OBC', 'General', 'Other'], required: false },
  // nationality: { type: String, required: false },
  motherTongue: { type: String, required: false },
  address: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  standard: { type: String, required: false },
  stuNo: { type: String, unique: true, required: false },
  batchYear: { type: String, required: false },
  studentProblem: { type: String },
  // schoolName: { type: String, required: false },
  // schoolBoard: { type: String, enum: ['GSEB', 'CBSE', 'ICSE', 'Other'], required: false },
  FatherName: String,
  FatherAge: Number,
  FatherEducationQualification: String,
  FatherOccupation: String,
  FatherDesignation: String,
  FatherAnnualIncome: Number,
  FatherMobileNumber: Number,
  FatherPhoneNumber: Number,
  EmergencyPhoneNumber: Number,
  parentEmail: {type: String},
  previousSchoolName: { type: String },
  previousStandardMarks: Number,
  previousSchoolBoard: { type: String, enum: ['GSEB', 'CBSE', 'ICSE', 'Other'] },
  siblingName: String,
  siblingAge: Number,
  siblingSchoolName: String,
  siblingStandard: String,
  
});

// Middleware to sync with fees collection
studentSchema.post('save', async function(doc) {
  try {
    console.log("middleware student.js for fees secction models");
    
    const standardFees = {
      'ENG Play Group': 23000,
      'ENG NR.': 23000,
      'ENG JR.': 24000,
      'ENG SR.': 24000,
      'GUJ Play Group': 20000,
      'GUJ NR.': 20000,
      'GUJ JR.': 21000,
      'GUJ SR.': 21000,
    };
    const fees = standardFees[doc.standard]

    await Fee.create({
      studentName: doc.firstName + " " + doc.middleName + " " + doc.lastName,
      studentPhoneNumber: doc.phoneNumber,
      ParentsMobileNumber: doc.FatherMobileNumber,
      ParentsPhoneNumber: doc.FatherPhoneNumber,
      EmergencyPhoneNumber: doc.EmergencyPhoneNumber,
      parentEmail: doc.parentEmail,
      batchYear: doc.batchYear,
      standard: doc.standard,
      stuNo: doc.stuNo,
      totalStandardFees: fees,
      totalFeesPaid: 0,
      totalFeesRemaining: fees,
      paymentDetails: []
    });
  } catch (error) {
    console.error('Error creating fee record:', error);
  }
});

// const sequenceSchema = new mongoose.Schema({
//   year: { type: String, unique: true },
//   sequenceNumber: { type: Number, default: 0 }
// });

// const Sequence = mongoose.model('Sequence', sequenceSchema);
// const Student = mongoose.model('Student', studentSchema);

module.exports = mongoose.model('Student', studentSchema);
 

// module.exports = { Student, Sequence };
// -------------------------------------------

{/**
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentPhoto: String,
  motherPhoto: String,
  fatherPhoto: String,
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  bloodGroup: { type: String, required: true },
  religion: { type: String, required: true },
  cast: { type: String, required: true },
  nationality: { type: String, required: true },
  motherTongue: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  standard: { type: String, required: true },
  stuNo: { type: String, unique: true, required: true },
  batchYear: { type: String, required: true },
  studentProblem: String,
  schoolName: { type: String, required: true },
  schoolBoard: { type: String, required: true },
  father: {
    name: { type: String, required: true },
    age: { type: String, required: true },
    nationality: { type: String, required: true },
    educationQualification: { type: String, required: true },
    occupation: { type: String, required: true },
    designation: { type: String, required: true },
    annualIncome: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  siblings: [{
    name: String,
    age: String,
    instituteName: String,
    standard: String,
  }],
  previousSchools: [{
    batchYear: String,
    schoolName: String,
    standard: String,
    marks: String,
    schoolBoard: String,
  }],
});

const sequenceSchema = new mongoose.Schema({
  year: { type: String, unique: true },
  sequenceNumber: { type: Number, default: 0 }
});

const Sequence = mongoose.model('Sequence', sequenceSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = { Student, Sequence };


 */}