const express = require("express");
const router = express.Router();
const Donor = require("../models/donarSchema"); // Import Donor Schema

// Get Donor by ID Endpoint
router.get("/donor/:id", async (req, res) => {
    try {
        const donorID = req.params.id;
        console.log("Requested Donor ID:", donorID);

        // Validate Input
        if (!donorID) {
            return res.status(400).json({ message: "Donor ID is required!" });
        }

        // Check if Donor Exists
        const donor = await Donor.findOne({ donorID });

        if (!donor) {
            return res.status(404).json({ message: "Donor not found!" });
        }

        // Return Donor Data
        res.status(200).json({ message: "Donor found!", donor });

    } catch (error) {
        console.error("Error fetching donor data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
console.log("Donor Fetch Router Imported!");
