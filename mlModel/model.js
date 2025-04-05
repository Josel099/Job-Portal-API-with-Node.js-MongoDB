const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const College = require('../models/College');
const Job = require('../models/Job');
const User = require('../models/User');

async function exportDataToCSV() {
  try {

    // Fetch data from MongoDB
    const colleges = await College.find({});
    const jobs = await Job.find({});
    const users = await User.find({});

    // Define CSV fields for each collection
    const collegeFields = ["_id", "name", "location", "mail", "minMarks", "courses"];
    const jobFields = ["_id", "title", "company", "description", "location", "salary", "experience", "skills", "postDate", "requiredDegree", "minMarks", "minAge", "requiredCourse", "mail"];
    const userFields = ["_id", "name", "email", "role", "degree", "course", "marks", "age", "plusTwoPercentage", "plusTwoStream"];

    // Convert MongoDB data to CSV format
    const collegeCSV = new Parser({ fields: collegeFields }).parse(colleges);
    const jobCSV = new Parser({ fields: jobFields }).parse(jobs);
    const userCSV = new Parser({ fields: userFields }).parse(users);

    // Combine all CSV data into a single file
    const csvData = `Colleges Data\n${collegeCSV}\n\nJobs Data\n${jobCSV}\n\nUsers Data\n${userCSV}`;

    // Define file path
    const directoryPath = path.join(__dirname, '../exports');
    const filePath = path.join(directoryPath, 'data.csv');

    // Ensure directory exists
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Write CSV file
    fs.writeFileSync(filePath, csvData);
    console.log(`✅ CSV file saved at: ${filePath}`);
    buildModel()
    
  } catch (error) {
    console.error("❌ Error exporting CSV:", error);
  }
}

async function buildModel() {
    try {
    console.log("🚀 Starting ML model training...");
      // Get the absolute path to the Python script
     path.join(__dirname, "mlModel/train_model.py");
    console.log("✅ ML Model built successfully");
    } catch (error) {
      console.error("❌ Error building ML model:", error);
    }
  }
// Call the function (optional)
exportDataToCSV();


module.exports = exportDataToCSV ;