// controllers/contactController.js
import sendMail from "../utils/sendMail.js";
import fs from "fs";
import path from "path";

export const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // ✅ Send email
    await sendMail({ name, email, message });

    // ✅ Log to CSV
    const csvLine = `"${name}","${email}","${message.replace(/\n/g, ' ')}","${new Date().toISOString()}"\n`;
    const filePath = path.join("logs", "contact_submissions.csv");

    // Create directory if not exists
    if (!fs.existsSync("logs")) {
      fs.mkdirSync("logs");
    }

    fs.appendFileSync(filePath, csvLine, "utf8");

    res.status(200).json({ success: true, message: "Message sent & logged." });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Something went wrong!" });
  }
};