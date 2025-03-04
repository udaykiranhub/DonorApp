const express = require("express");
const router = express.Router();
const Donor = require("../models/donarSchema");

// Get All Donors Endpoint
router.get("/donors", async (req, res) => {
    try {
        // Fetch all donors from the database
        const donors = await Donor.find();

        // Check if donors exist
        if (donors.length === 0) {
            return res.status(404).json({ message: "No donors found!" });
        }

        // Return the list of donors
        res.status(200).json({ message: "Donors retrieved successfully!", donors });

    } catch (error) {
        console.error("Error fetching donors:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
console.log("GetAllDonors importedQ:")