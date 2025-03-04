const express = require("express");
const router = express.Router();
const Donor = require("../models/donarSchema"); 
const bcrypt=require("bcryptjs");

// Donor Registration Endpoint
router.post("/registerDonor", async (req, res) => {
    try {
        const { donorID, name, bloodType } = req.body;
        
console.log("body is:",req.body);
console.log("DOnar id is:",donorID)
        // Check if Donor Already Exists
        const existingDonor = await Donor.findOne({ donorID });
        if (existingDonor) {
            return res.status(400).json({ nessage: "Donor already registered!" });
        }

        // Create and Save New Donor
        const newDonor = new Donor({ donorID, name, bloodType });
        await newDonor.save()
        .then(()=>{
            console.log("Data Saved!");
        
        })
        .catch((err)=>{
            console.log("Error in data saving :"+err);
            return     res.status(400).json({ message: "Invalid Details!" });
        })

        res.status(201).json({ message: "Donor registered successfully!", donor: newDonor });
    } catch (error) {
        console.error("Error in donor registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
console.log("Registraion imported! imported!@")
