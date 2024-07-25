//with twilio messaging
{/*
const express = require('express');
const router = express.Router();
const Fees = require('../models/Fee');
const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Create fees record
router.post('/create', async (req, res) => {
  try {
    // const savedFees = await newFees.save();

    const newFees = new Fees(req.body);
    // newFees.remainingFees = newFees.totalStandardFees - newFees.totalFeesPaid;
    // console.log(req,"newFees /create routs/fees ");
    await newFees.save();
    // sendNotification(req.body);
    res.status(201).json(newFees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all fees records
router.get('/all', async (req, res) => {
  try {
    const fees = await Fees.find();
    res.status(200).json(fees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update fees record
router.put('/update/:id', async (req, res) => {
  // console.log(req,"req /update routs/fees ");
  try {
    const updatedFees = await Fees.findByIdAndUpdate(req.params.id, req.body, { new: true });
    sendNotification(req.body);
    res.status(200).json(updatedFees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete fees record
router.delete('/delete/:id', async (req, res) => {
  try {
    await Fees.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Function to send notification
const sendNotification = (data) => {
  const message = 
  `Student Name: ${data.studentName}\n
  GR No.: ${data.grNo}\n
  Standard: ${data.standard}\n
  Standard Fees: ${data.totalStandardFees}\n
  Date: ${new Date().toLocaleDateString()}\n
  Time: ${new Date().toLocaleTimeString()}\n
  Total Fees Paid: ${data.totalFeesPaid}\n
  Remaining Fees: ${data.totalStandardFees - data.totalFeesPaid}`;
  
  
  client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.YOUR_PHONE_NUMBER,
  });

  const phoneNo = "+91" + data.studentPhoneNumber;
  console.log(phoneNo,"phone number client fee.js");
  client.messages.create(
    {
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNo,
  });
  // to: data.studentPhoneNumber,
};

module.exports = router;
 */}

// -------------------------------------
// what's app business api
// Function to send WhatsApp message
{/**const sendWhatsAppMessage = async (to, message) => {
  console.log(to, "to fees.js server");
  console.log(message, "message fees.js server");
  const { WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID } = process.env;
  const url = `https://graph.facebook.com/v13.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: message },
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
  };

  try {
    await axios.post(url, data, { headers });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.response.data);
  }
};
 */}
// await sendWhatsAppMessage('+91 7990094848', message); // Replace with your phone number (YOUR_PHONE_NUMBER)
// ----------------------------
const express = require('express');
const router = express.Router();
const Fees = require('../models/Fee'); // Assuming you have a Fees model set up
const axios = require('axios');
//const puppeteer = require('puppeteer');
 const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();// Load environment variables from .env file



async function loadSessionData(page) {
  const cookiesPath = path.resolve(__dirname, 'cookies.json');
  const localStoragePath = path.resolve(__dirname, 'localStorage.json');

  console.log(cookiesPath,"cookiespath loadSession data fees.js routs");
  console.log(localStoragePath,"localStorage path loadSession data fees.js routs");
  // Load cookies
  if (fs.existsSync(cookiesPath)) {
    const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
    await page.setCookie(...cookies);
    console.log('Cookies loaded.');
  }

  // Load local storage
  if (fs.existsSync(localStoragePath)) {
    const localStorageData = JSON.parse(fs.readFileSync(localStoragePath, 'utf-8'));
    await page.evaluate((data) => {
      for (let key in data) {
        localStorage.setItem(key, data[key]);
      }
    }, localStorageData);
    console.log('Local storage data loaded.');
  }
}

async function sendSMS(phoneNumber, message) {
  let browser;
  // "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222

  try {
    browser = await puppeteer.launch({
      headless: false, // Show the browser for debugging purposes
      // executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', // Path to Chrome executable
      executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', // Path to Chrome executable
      userDataDir: path.resolve(__dirname, 'user_data'), // Specify a directory to store session data
      args: ['--remote-debugging-port=9222'],
    });
    // browser = await puppeteer.launch({
    //   headless: true, // Run in headless mode for production
    //   executablePath: '/usr/bin/chromium-browser', // Path to Chromium executable
    //   // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', // Path to Chromium executable
    //   userDataDir: path.resolve(__dirname, 'user_data'), // Specify a directory to store session data
    //   // args: ['--remote-debugging-port=9222'],

    //   args: ['--no-sandbox', '--disable-setuid-sandbox'], // Necessary flags for running as root or in Docker
    // });

    // //------------- open new window then scan QR then message will send
    // browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    
    // const page = await browser.newPage();
    // await page.goto('https://messages.google.com/web/', { waitUntil: 'networkidle2' });
// //-------------------------------
// // -------------------
    const pages = await browser.pages();
    let page = pages.find(p => p.url().includes('messages.google.com/web'));

    if (!page) {
      page = await browser.newPage();
      await page.goto('https://messages.google.com/web/');
      console.log('Navigating to Google Messages Web.');

      // Load session data
      await loadSessionData(page);

      // Ensure the page is fully loaded
      // await page.waitForSelector('mw-fab-link[label="Start chat"]', { timeout: 10000 });
      await page.waitForSelector('a[queryparamshandling="merge"]');
      console.log('Loaded Google Messages Web with session data.');
    } else {
      console.log('Using existing Google Messages Web page.');
    }
// // -------------------
    console.log('Page loaded, waiting for QR code to be scanned...');

    // await page.waitForSelector('mw-fab-link[label="Start chat"]',{ timeout: 6000 });
    await page.waitForSelector('a[queryparamshandling="merge"]');
    console.log('QR code scanned, starting new conversation...');

    // Click on "New conversation"
    // await page.click('mw-fab-link[label="Start chat"]');
    await page.click('a[queryparamshandling="merge"]');
    console.log("done button clicked");

    await page.waitForSelector('mw-fab-link[label="Start chat"]',{ timeout: 4000 });
    await page.click('mw-fab-link[label="Start chat"]');

    // Wait for the input to appear and type the phone number
    await page.waitForSelector('input[type="text"]', { visible: true });
    console.log('New conversation button clicked, input field found.');

    await page.type('input[type="text"]', phoneNumber).then(
      await page.keyboard.press('Enter')
    );
    await page.keyboard.press('Enter');
    console.log('Phone number entered.');

    // await page.waitForTimeout(2000);
    // await page.type('input[type="text"]', phoneNumber, { delay: 100 });
    // await page.keyboard.press('Enter');
    // console.log('Phone number entered, waiting for message input...');

    // Wait for the message input to appear and type the message
    await page.waitForSelector('textarea[class="input"]', { visible: true });
    console.log('Message input field found.');

    // Split the message by \n and type each part, followed by Shift+Enter for new line
    const messageLines = message.split('\n');
    for (const line of messageLines) {
      await page.type('textarea[class="input"]', line);
      await page.keyboard.down('Shift');
      await page.keyboard.press('Enter');
      await page.keyboard.up('Shift');
    }
    await page.keyboard.press('Enter');

    // // await page.type('div[aria-label="Message"]', message);
    // await page.type('textarea[class="input"]', message);
    await page.keyboard.press('Enter');

    console.log('Message sent successfully');
    console.log('Message sent ', phoneNumber, message);
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error; // Propagate the error to the caller
  }
  finally {
    if (browser) {
      // await browser.disconnect();
      await browser.close();
    }
  }
}

async function sendEmail(email, message) {
  // Validate input
  if (!email) {
    return res.status(400).send('Name and email are required');
  }

  // port: 465,
  // Set up transporter with your email provider's settings
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Set up email options
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Fees alert',
    text: message
  };

  try {
    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    // res.status(200).send('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    // res.status(500).send('Failed to send email: ' + error.toString());
  }
}

// Function to format the message
const formatMessage = (fees) => {
  const remainingFees = fees.totalStandardFees - fees.totalFeesPaid;
  const lastPaymentDetail = fees.paymentDetails[fees.paymentDetails.length - 1];
  return `Student Name: ${fees.studentName}\nGR No.: ${fees.stuNo}\nStandard: ${fees.standard}\nStandard Fees: ${fees.totalStandardFees}\nDate: ${new Date().toLocaleDateString()}\nTime: ${new Date().toLocaleTimeString()}\nCurrent Fees Paid: ${lastPaymentDetail.amount}\nTotal Fees Paid: ${fees.totalFeesPaid}\nTotal Remaining Fees: ${remainingFees}`;
};

// Get all fees
router.get('/all', async (req, res) => {
  try {
    const fees = await Fees.find();
    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new fees record
router.post('/create', async (req, res) => {
  const newFees = new Fees(req.body);
  try {
    const savedFees = await newFees.save();
    const message = formatMessage(savedFees);

    // Send WhatsApp messages
    // await sendWhatsAppMessage(savedFees.studentPhoneNumber, message);
    // await sendWhatsAppMessage('+91 7990094848', message); // Replace with your phone number (YOUR_PHONE_NUMBER)

    res.json(savedFees);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update fees record
router.put('/update/:id', async (req, res) => {
  try {
    const updatedFees = await Fees.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const message = formatMessage(updatedFees);

    console.log(message, " message fees route");
    // Send WhatsApp messages
    // await sendWhatsAppMessage(updatedFees.studentPhoneNumber, message);
    // console.log(sendWhatsAppMessage , " sendWhatsAppMessage 1");

    // await sendWhatsAppMessage('+91 7990094848', message); // Replace with your phone number (YOUR_PHONE_NUMBER)
    // await sendSMS('9586049783', message);
    // await sendSMS('9925602108', message);
    await sendSMS(updatedFees.studentPhoneNumber, message);
    await sendEmail(updatedFees.parentEmail, message);

    res.json(updatedFees);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete fees record
router.delete('/delete/:id', async (req, res) => {
  try {
    await Fees.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fees record deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;